"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { SelectField, type Option } from "@/components/Selectfield";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

import { createWhatsAppLink } from "@/lib/contact";
import { EV_VEHICLES } from "@/lib/evCompatibility";
import { EV_PRODUCTS, type EVProduct } from "@/lib/evProducts";

const MAX_ALTERNATIVES = 6;

const toOptions = (values: (string | number)[]): Option[] =>
  values.map((value) => ({
    value: String(value),
    label: String(value),
  }));

const SUPPLY_OPTIONS: Option[] = [
  { value: "1", label: "Single-phase (230V)" },
  { value: "3", label: "Three-phase (400V)" },
  { value: "unknown", label: "Not sure" },
];

export const EVCompatibilityFinder = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [supply, setSupply] = useState("");
  const [searched, setSearched] = useState(false);
  const [runId, setRunId] = useState(0);

  const resultRef = useRef<HTMLDivElement>(null);

  /* =====================================================
      OPTIONS
  ===================================================== */

  const brands = useMemo(
    () =>
      Array.from(
        new Set(EV_VEHICLES.map((vehicle) => vehicle.brand))
      ).sort(),
    []
  );

  const models = useMemo(
    () =>
      Array.from(
        new Set(
          EV_VEHICLES.filter(
            (vehicle) => vehicle.brand === brand
          ).map((vehicle) => vehicle.model)
        )
      ).sort(),
    [brand]
  );

  // Expanded from each entry's yearFrom–yearTo range so a model
  // year never falls into a gap.
  const years = useMemo(() => {
    const set = new Set<number>();

    EV_VEHICLES.filter(
      (vehicle) =>
        vehicle.brand === brand && vehicle.model === model
    ).forEach((vehicle) => {
      for (let y = vehicle.yearFrom; y <= vehicle.yearTo; y++) {
        set.add(y);
      }
    });

    return Array.from(set).sort((a, b) => b - a);
  }, [brand, model]);

  /* =====================================================
      SELECTED VEHICLE
  ===================================================== */

  const selectedVehicle = useMemo(() => {
    if (!brand || !model || !year) return undefined;

    const selectedYear = Number(year);

    return EV_VEHICLES.find(
      (vehicle) =>
        vehicle.brand === brand &&
        vehicle.model === model &&
        selectedYear >= vehicle.yearFrom &&
        selectedYear <= vehicle.yearTo
    );
  }, [brand, model, year]);

  /* =====================================================
      PRODUCT MATCHING

      Derived from the vehicle spec instead of a curated list
      per vehicle: take the AC chargers, drop anything the site
      can't power, then rank by how much of the vehicle's AC
      capability the unit actually delivers.
  ===================================================== */

  const { primary, alternatives, hiddenByPhase } = useMemo(() => {
    if (!selectedVehicle) {
      return {
        primary: null as EVProduct | null,
        alternatives: [] as EVProduct[],
        hiddenByPhase: 0,
      };
    }

    // DC units and accessories aren't home-charging options.
    const compatible = EV_PRODUCTS.filter(
      (product) =>
        product.category === "AC Chargers" &&
        !selectedVehicle.excludeProductIds?.includes(product.id)
    );

    // A single-phase charger runs off a three-phase supply,
    // but not the other way round.
    const usable =
      supply === "1"
        ? compatible.filter((product) => product.phase !== 3)
        : compatible;

    const ranked = [...usable].sort((a, b) => {
      const kwA = a.outputKw ?? 0;
      const kwB = b.outputKw ?? 0;

      const usableA = Math.min(kwA, selectedVehicle.maxAC);
      const usableB = Math.min(kwB, selectedVehicle.maxAC);

      // Most usable power first…
      if (usableB !== usableA) return usableB - usableA;

      // …then the least wasted headroom.
      return kwA - kwB;
    });

    const pinnedIndex = selectedVehicle.pinnedProductId
      ? ranked.findIndex(
          (product) =>
            product.id === selectedVehicle.pinnedProductId
        )
      : -1;

    if (pinnedIndex > 0) {
      const [pinned] = ranked.splice(pinnedIndex, 1);
      ranked.unshift(pinned);
    }

    const [best = null, ...rest] = ranked;

    return {
      primary: best,
      alternatives: rest.slice(0, MAX_ALTERNATIVES),
      hiddenByPhase: compatible.length - usable.length,
    };
  }, [selectedVehicle, supply]);

  const canSearch = Boolean(brand && model && year && supply);

  const vehicleLabel = [brand, model, year]
    .filter(Boolean)
    .join(" ");

  const supplyLabel =
    SUPPLY_OPTIONS.find((option) => option.value === supply)?.label ??
    "";

  const showResults = searched && Boolean(selectedVehicle);

  /* =====================================================
      ACTIONS
  ===================================================== */

  const hideResults = () => setSearched(false);

  const handleSearch = () => {
    setSearched(true);
    setRunId((n) => n + 1);
  };

  const handleReset = () => {
    setBrand("");
    setModel("");
    setYear("");
    setSupply("");
    setSearched(false);
  };

  useEffect(() => {
    if (!searched) return;

    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    resultRef.current?.focus({ preventScroll: true });
  }, [runId, searched]);

  return (
    <section className="border-b border-line bg-white">
      <div className="page-shell">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid border-b border-line lg:grid-cols-[1.15fr_0.85fr]">
          <div className="px-5 py-8 md:px-8 lg:px-10 lg:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-brand">
              Charger Compatibility
            </p>

            <h2 className="mt-3 max-w-[620px] text-[36px] font-semibold leading-[1] tracking-[-0.04em] text-ink sm:text-[42px] lg:text-[48px]">
              Find the right
              <br />
              charger for your EV.
            </h2>
          </div>

          <div className="flex items-end px-5 pb-8 md:px-8 lg:border-l lg:px-10 lg:pb-10">
            <p className="max-w-[470px] text-[14px] leading-[1.65] text-ink-soft">
              Tell us your vehicle and the power supply at your site.
              We&apos;ll show you the chargers that work with both —
              and confirm everything before installation.
            </p>
          </div>
        </div>

        {/* =====================================================
            FORM PANEL
        ===================================================== */}

        <div className="border-b border-line bg-[#F7F8FA] px-5 py-7 md:px-8 lg:px-10 lg:py-8">
          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField
              label="Car brand"
              value={brand}
              placeholder="Select brand"
              options={toOptions(brands)}
              onChange={(value) => {
                setBrand(value);
                setModel("");
                setYear("");
                hideResults();
              }}
            />

            <SelectField
              label="Model"
              value={model}
              placeholder="Select model"
              options={toOptions(models)}
              disabled={!brand}
              onChange={(value) => {
                setModel(value);
                setYear("");
                hideResults();
              }}
            />

            <SelectField
              label="Year"
              value={year}
              placeholder="Select year"
              options={toOptions(years)}
              disabled={!model}
              onChange={(value) => {
                setYear(value);
                hideResults();
              }}
            />

            <SelectField
              label="Supply at your site"
              value={supply}
              placeholder="Select supply"
              options={SUPPLY_OPTIONS}
              onChange={(value) => {
                setSupply(value);
                hideResults();
              }}
            />
          </div>

          {/* ACTION */}

          <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Escape hatch for vehicles not in the dataset */}
            <a
              href={createWhatsAppLink(
                "Hi Multiline, my EV isn't listed in the charger finder. Can you recommend a charger for it?"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-brand underline underline-offset-4 transition-colors hover:text-[#0f3d7d]"
            >
              Can&apos;t find your vehicle? Ask us directly
            </a>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {showResults && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-[50px] px-2 text-[13px] font-semibold text-ink-soft transition-colors hover:text-ink"
                >
                  Start over
                </button>
              )}

              <button
                type="button"
                disabled={!canSearch}
                onClick={handleSearch}
                className="
                  flex
                  h-[50px]
                  w-full
                  items-center
                  justify-center
                  bg-brand
                  px-6
                  text-[13px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-[#0f3d7d]
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-brand
                  disabled:cursor-not-allowed
                  disabled:bg-brand/35
                  sm:w-auto
                "
              >
                Show compatible chargers

                <span aria-hidden="true" className="ml-3 text-accent">
                  →
                </span>
              </button>
            </div>
          </div>

          {!canSearch && (
            <p className="mt-3 text-[12px] leading-[1.5] text-ink-faint">
              Select all four to see your recommendation.
            </p>
          )}
        </div>

        {/* =====================================================
            RESULTS PANEL
        ===================================================== */}

        {showResults && selectedVehicle && (
          <div
            ref={resultRef}
            tabIndex={-1}
            className="scroll-mt-24 px-5 py-8 outline-none md:px-8 lg:px-10 lg:py-10"
          >
            {primary ? (
              <>
                {/* RESULT HEADER */}

                <div className="mb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-brand">
                    Your recommendation
                  </p>

                  <h3 className="mt-2 text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[30px]">
                    Chargers for your {vehicleLabel}
                  </h3>

                  {/* Selection summary — keeps the answer tied to the inputs */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Chip label={vehicleLabel} />
                    <Chip label={supplyLabel} />
                    <Chip
                      label={`Accepts up to ${selectedVehicle.maxAC} kW AC`}
                    />
                  </div>

                  <p className="mt-4 max-w-[760px] text-[14px] leading-[1.6] text-ink-soft">
                    A charger rated above {selectedVehicle.maxAC} kW
                    will still work — the vehicle only draws the power
                    it can accept, so there&apos;s no risk in going
                    higher, just no extra speed.
                  </p>

                  {supply === "unknown" && (
                    <p className="mt-3 max-w-[760px] text-[13px] leading-[1.55] text-ink-soft">
                      Some options below need a three-phase (400V)
                      connection. Most homes in Pakistan are
                      single-phase — we&apos;ll confirm your supply
                      before quoting.
                    </p>
                  )}
                </div>

                {/* =====================================================
                    BEST MATCH
                ===================================================== */}

                <div className="border border-black/10 bg-white">
                  <div className="grid md:grid-cols-[300px_1fr]">
                    {/* IMAGE */}

                    <div className="relative min-h-[240px] bg-[#F5F6F8]">
                      <Image
                        src={primary.image}
                        alt={primary.title}
                        fill
                        sizes="(min-width: 768px) 300px, 100vw"
                        className="object-contain p-6"
                      />
                    </div>

                    {/* CONTENT */}

                    <div className="flex flex-col justify-center border-t border-black/10 p-6 md:border-l md:border-t-0 md:p-8">
                      <div className="w-fit bg-[#E8F0FF] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.055em] text-brand">
                        Best match
                      </div>

                      <h4 className="mt-4 text-[25px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
                        {primary.title}
                      </h4>

                      <p className="mt-3 max-w-[570px] text-[14px] leading-[1.6] text-ink-soft">
                        {primary.summary ?? primary.description}
                      </p>

                      {/* SPECS */}

                      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-4 text-[13px]">
                        {(primary.output || primary.outputKw) && (
                          <SimpleSpec
                            label="Output"
                            value={
                              primary.output ??
                              `${primary.outputKw} kW`
                            }
                          />
                        )}

                        {primary.connector && (
                          <SimpleSpec
                            label="Connector"
                            value={primary.connector}
                          />
                        )}

                        {primary.supply && (
                          <SimpleSpec
                            label="Supply"
                            value={primary.supply}
                          />
                        )}
                      </div>

                      {/* BUTTONS */}

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={createWhatsAppLink(
                            `Hi Multiline, I have a ${vehicleLabel} with ${
                              supplyLabel || "an unknown"
                            } supply. I'm interested in the ${
                              primary.title
                            }. Please guide me.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-[48px] items-center justify-center bg-brand px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f3d7d]"
                        >
                          <WhatsAppIcon className="mr-2.5 h-[16px] w-[16px]" />
                          Enquire about this charger
                        </a>

                        {primary.href && (
                          <Link
                            href={primary.href}
                            className="inline-flex h-[48px] items-center justify-center border border-black/15 px-5 text-[13px] font-semibold text-ink transition-colors hover:bg-black/[0.03]"
                          >
                            View details
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* =====================================================
                    SUPPLY UPGRADE

                    Turns the "options hidden" note into an offer
                    rather than a message about what's missing.
                ===================================================== */}

                {hiddenByPhase > 0 && (
                  <div className="mt-5 border border-black/10 bg-[#FBFAF4] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
                    <div>
                      <p className="text-[14px] font-semibold text-ink">
                        Want faster charging at home?
                      </p>

                      <p className="mt-1.5 max-w-[620px] text-[13px] leading-[1.55] text-ink-soft">
                        Your vehicle can take up to{" "}
                        {selectedVehicle.maxAC} kW, but that needs a
                        three-phase (400V) connection. Multiline can
                        assess your supply and quote the upgrade
                        alongside the charger.
                      </p>
                    </div>

                    <a
                      href={createWhatsAppLink(
                        `Hi Multiline, I have a ${vehicleLabel} on a single-phase supply. Can you quote a three-phase upgrade with a faster charger?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex h-[46px] shrink-0 items-center justify-center border border-brand/25 bg-white px-5 text-[13px] font-semibold text-brand transition-colors hover:bg-brand/[0.04] sm:mt-0"
                    >
                      Ask about an upgrade
                    </a>
                  </div>
                )}

                {/* =====================================================
                    ALTERNATIVES
                ===================================================== */}

                {alternatives.length > 0 && (
                  <div className="mt-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-faint">
                      Also compatible
                    </p>

                    <h4 className="mt-1 text-[19px] font-semibold tracking-[-0.025em] text-ink">
                      Other options for this vehicle
                    </h4>

                    <div className="mt-4 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
                      {alternatives.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 border-b border-r border-line bg-white p-4"
                        >
                          <div className="relative h-[88px] w-[88px] shrink-0 bg-[#F5F6F8]">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              sizes="88px"
                              className="object-contain p-2"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[14px] font-semibold leading-[1.35] text-ink">
                              {product.title}
                            </p>

                            <p className="mt-1 text-[12px] leading-[1.45] text-ink-soft">
                              {[
                                product.output ??
                                  (product.outputKw
                                    ? `${product.outputKw} kW`
                                    : null),
                                product.phase === 3
                                  ? "Three-phase"
                                  : "Single-phase",
                              ]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>

                            <a
                              href={createWhatsAppLink(
                                `Hi Multiline, I'm interested in the ${product.title} for my ${vehicleLabel}.`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold text-brand transition-colors hover:text-[#0f3d7d]"
                            >
                              Enquire
                              <span className="text-accent">→</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* DISCLAIMER */}

                <p className="mt-6 max-w-[900px] border-t border-line pt-5 text-[12px] leading-[1.6] text-ink-faint">
                  Recommendations are based on the vehicle&apos;s
                  stated charging capability. Final charger selection
                  depends on the electrical load and wiring available
                  at the installation site, which Multiline confirms
                  before installation.
                </p>
              </>
            ) : (
              /* =====================================================
                  NO MATCH
              ===================================================== */

              <div className="border border-black/10 bg-[#F7F8FA] p-7 sm:p-8">
                <h3 className="text-[20px] font-semibold tracking-[-0.025em] text-ink">
                  Let&apos;s sort this one manually
                </h3>

                <p className="mt-2 max-w-[560px] text-[14px] leading-[1.6] text-ink-soft">
                  {hiddenByPhase > 0
                    ? "The chargers that suit this vehicle need a three-phase connection. We can recommend a single-phase option or quote a supply upgrade."
                    : "We haven't listed a charger for this vehicle yet. Send us the details and our team can recommend or source the right unit."}
                </p>

                <a
                  href={createWhatsAppLink(
                    `Hi Multiline, I have a ${vehicleLabel} with ${
                      supplyLabel || "an unknown"
                    } supply. Which charger do you recommend?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-[48px] items-center justify-center bg-brand px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f3d7d]"
                >
                  <WhatsAppIcon className="mr-2.5 h-[16px] w-[16px]" />
                  Ask our team
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

/* =========================================================
    CHIP
========================================================= */

function Chip({ label }: { label: string }) {
  if (!label) return null;

  return (
    <span className="border border-black/10 bg-[#F7F8FA] px-3 py-1.5 text-[12px] font-medium text-ink-soft">
      {label}
    </span>
  );
}

/* =========================================================
    SIMPLE SPEC
========================================================= */

function SimpleSpec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <span className="text-ink-faint">{label}: </span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}