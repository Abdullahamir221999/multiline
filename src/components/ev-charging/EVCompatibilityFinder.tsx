"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { createWhatsAppLink } from "@/lib/contact";
import { EV_VEHICLES } from "@/lib/evCompatibility";
import { EV_PRODUCTS } from "@/lib/evProducts";

type EvProduct = (typeof EV_PRODUCTS)[number];

type Option = { value: string; label: string };

const toOptions = (values: (string | number)[]): Option[] =>
  values.map((value) => ({ value: String(value), label: String(value) }));

const SUPPLY_OPTIONS: Option[] = [
  { value: "1", label: "Single-phase (220V)" },
  { value: "3", label: "Three-phase (400V)" },
  { value: "unknown", label: "Not sure" },
];

export const EVCompatibilityFinder = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [supply, setSupply] = useState("");
  const [searched, setSearched] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const brands = useMemo(
    () => Array.from(new Set(EV_VEHICLES.map((vehicle) => vehicle.brand))).sort(),
    []
  );

  const models = useMemo(
    () =>
      Array.from(
        new Set(
          EV_VEHICLES.filter((vehicle) => vehicle.brand === brand).map(
            (vehicle) => vehicle.model
          )
        )
      ).sort(),
    [brand]
  );

  const years = useMemo(
    () =>
      Array.from(
        new Set(
          EV_VEHICLES.filter(
            (vehicle) => vehicle.brand === brand && vehicle.model === model
          ).map((vehicle) => vehicle.year)
        )
      ).sort((a, b) => b - a),
    [brand, model]
  );

  const selectedVehicle = useMemo(
    () =>
      EV_VEHICLES.find(
        (vehicle) =>
          vehicle.brand === brand &&
          vehicle.model === model &&
          vehicle.year === Number(year)
      ),
    [brand, model, year]
  );

  const { products, hiddenByPhase } = useMemo(() => {
    if (!selectedVehicle) return { products: [] as EvProduct[], hiddenByPhase: 0 };

    const all = selectedVehicle.recommendedProductIds
      .map((id) => EV_PRODUCTS.find((product) => product.id === id))
      .filter((product): product is EvProduct => Boolean(product));

    // A single-phase charger runs fine on a three-phase supply, but not the
    // other way round — so only single-phase homes need filtering.
    if (supply !== "1") return { products: all, hiddenByPhase: 0 };

    const usable = all.filter((product) => product.phase !== 3);

    return { products: usable, hiddenByPhase: all.length - usable.length };
  }, [selectedVehicle, supply]);

  const [mainRecommendation, ...alternatives] = products;

  const canSearch = Boolean(brand && model && year && supply);

  const reset = () => setSearched(false);

  const handleSearch = () => {
    setSearched(true);
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      resultRef.current?.focus({ preventScroll: true });
    });
  };

  return (
    <section className="bg-white">
      <div className="page-pad page-shell py-12 lg:py-16">
        {/* HEADER */}

        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="text-[32px] font-semibold tracking-[-0.035em] sm:text-[38px] lg:text-[42px]">
            Find the right charger for your EV
          </h2>

          <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-[1.65] text-ink-soft">
            Tell us your vehicle and the power supply at your site. We&apos;ll
            show the chargers that work with both.
          </p>
        </div>

        {/* FORM */}

        <div className="mx-auto mt-9 max-w-[1050px] rounded-2xl border border-black/10 bg-[#F8FAFF] p-5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField
              label="Car brand"
              value={brand}
              placeholder="Select brand"
              options={toOptions(brands)}
              onChange={(value) => {
                setBrand(value);
                setModel("");
                setYear("");
                reset();
              }}
            />

            <SelectField
              label="Model"
              value={model}
              placeholder="Select model"
              options={toOptions(models)}
              disabled={!brand}
              hint={!brand ? "Pick a brand first" : undefined}
              onChange={(value) => {
                setModel(value);
                setYear("");
                reset();
              }}
            />

            <SelectField
              label="Year"
              value={year}
              placeholder="Select year"
              options={toOptions(years)}
              disabled={!model}
              hint={!model ? "Pick a model first" : undefined}
              onChange={(value) => {
                setYear(value);
                reset();
              }}
            />

            <SelectField
              label="Supply at your site"
              value={supply}
              placeholder="Select supply"
              options={SUPPLY_OPTIONS}
              onChange={(value) => {
                setSupply(value);
                reset();
              }}
            />
          </div>

          <button
            type="button"
            disabled={!canSearch}
            onClick={handleSearch}
            className="mt-5 flex h-[52px] w-full items-center justify-center rounded-xl bg-brand px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#0f3d7d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40 sm:ml-auto sm:w-auto"
          >
            Show compatible chargers
          </button>
        </div>

        {/* RESULT */}

        {searched && selectedVehicle && (
          <div
            ref={resultRef}
            tabIndex={-1}
            aria-live="polite"
            className="mx-auto mt-8 max-w-[1050px] scroll-mt-24 outline-none"
          >
            {mainRecommendation ? (
              <>
                <div className="mb-5">
                  <h3 className="text-[23px] font-semibold tracking-[-0.025em]">
                    Chargers for your {brand} {model} {year}
                  </h3>

                  <p className="mt-1 text-[14px] text-ink-soft">
                    Your vehicle accepts up to{" "}
                    <strong className="font-semibold text-ink">
                      {selectedVehicle.maxAC} kW
                    </strong>{" "}
                    AC charging. A charger rated above that still works — the car
                    just draws what it can.
                  </p>

                  {hiddenByPhase > 0 && (
                    <p className="mt-2 text-[13px] text-ink-soft">
                      {hiddenByPhase} three-phase{" "}
                      {hiddenByPhase === 1 ? "option is" : "options are"} hidden
                      because they need a 400V connection.
                    </p>
                  )}
                </div>

                {/* BEST MATCH */}

                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                  <div className="grid md:grid-cols-[280px_1fr]">
                    <div className="relative min-h-[260px] bg-[#F7F8FA]">
                      <Image
                        src={mainRecommendation.image}
                        alt={mainRecommendation.title}
                        fill
                        sizes="(min-width: 768px) 280px, 100vw"
                        className="object-contain p-6"
                      />
                    </div>

                    <div className="flex flex-col justify-center p-6 md:p-8">
                      <div className="w-fit rounded-full bg-[#EAF2FF] px-3 py-1.5 text-[11px] font-semibold text-brand">
                        Best match
                      </div>

                      <h4 className="mt-4 text-[25px] font-semibold tracking-[-0.03em]">
                        {mainRecommendation.title}
                      </h4>

                      <p className="mt-3 max-w-[540px] text-[14px] leading-[1.6] text-ink-soft">
                        {mainRecommendation.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-[13px]">
                        {mainRecommendation.output && (
                          <SimpleSpec
                            label="Output"
                            value={mainRecommendation.output}
                          />
                        )}

                        {mainRecommendation.connector && (
                          <SimpleSpec
                            label="Connector"
                            value={mainRecommendation.connector}
                          />
                        )}

                        {mainRecommendation.supply && (
                          <SimpleSpec
                            label="Supply"
                            value={mainRecommendation.supply}
                          />
                        )}
                      </div>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        {mainRecommendation.href && (
                          <Link
                            href={mainRecommendation.href}
                            className="flex h-[48px] items-center justify-center rounded-xl border border-black/15 px-5 text-[13px] font-semibold transition-colors hover:bg-black/[0.03]"
                          >
                            View details
                          </Link>
                        )}

                        <a
                          href={createWhatsAppLink(
                            `Hi Multiline, I have a ${brand} ${model} ${year} and I'm interested in the ${mainRecommendation.title}. Please guide me.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-[48px] items-center justify-center rounded-xl bg-brand px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f3d7d]"
                        >
                          Enquire on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ALTERNATIVES */}

                {alternatives.length > 0 && (
                  <div className="mt-7">
                    <h4 className="text-[18px] font-semibold">
                      Other compatible options
                    </h4>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {alternatives.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 rounded-xl border border-black/10 bg-white p-4"
                        >
                          <div className="relative h-[92px] w-[92px] shrink-0 rounded-lg bg-[#F7F8FA]">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              sizes="92px"
                              className="object-contain p-2"
                            />
                          </div>

                          <div>
                            <p className="text-[14px] font-semibold">
                              {product.title}
                            </p>

                            {(product.output || product.connector) && (
                              <p className="mt-1 text-[12px] text-ink-soft">
                                {[product.output, product.connector]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </p>
                            )}

                            <a
                              href={createWhatsAppLink(
                                `Hi Multiline, I'm interested in the ${product.title} for my ${brand} ${model} ${year}.`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-block text-[12px] font-semibold text-brand"
                            >
                              Enquire →
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="mt-6 text-[12px] leading-[1.6] text-ink-faint">
                  Recommendations are based on the vehicle&apos;s stated charging
                  capability. Final selection depends on your load and wiring —
                  our team confirms this before installation.
                </p>
              </>
            ) : (
              <div className="rounded-2xl border border-black/10 bg-[#F8FAFF] p-8 text-center">
                <h3 className="text-[20px] font-semibold">
                  No stock match for this combination
                </h3>

                <p className="mx-auto mt-2 max-w-[480px] text-[14px] leading-[1.6] text-ink-soft">
                  {hiddenByPhase > 0
                    ? "The chargers listed for this vehicle all need a three-phase connection. We can quote a single-phase unit or a supply upgrade."
                    : "We haven't listed a charger for this vehicle yet. Send us the details and we'll source one."}
                </p>

                <a
                  href={createWhatsAppLink(
                    `Hi Multiline, I have a ${brand} ${model} ${year} and a ${
                      supply === "3" ? "three-phase" : "single-phase"
                    } supply. Which charger do you recommend?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-[48px] items-center justify-center rounded-xl bg-brand px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f3d7d]"
                >
                  Ask on WhatsApp
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

function SelectField({
  label,
  value,
  placeholder,
  options,
  disabled = false,
  hint,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: Option[];
  disabled?: boolean;
  hint?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-ink">
        {label}
      </span>

      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-[52px] w-full rounded-xl border border-black/15 bg-white px-4 text-[14px] text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/10 disabled:bg-black/[0.03] disabled:text-ink-faint"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hint && (
        <span className="mt-1.5 block text-[12px] text-ink-faint">{hint}</span>
      )}
    </label>
  );
}

function SimpleSpec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-ink-faint">{label}: </span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}