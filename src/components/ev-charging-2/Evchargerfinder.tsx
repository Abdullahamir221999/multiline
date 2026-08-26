"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import { EVSelect, type Option } from "@/components/ev/EVSelect";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

import { createWhatsAppLink } from "@/lib/contact";
import { EV_VEHICLES } from "@/lib/evCompatibility";
import { EV_PRODUCTS, type EVProduct } from "@/lib/evProducts";

const MAX_ALTERNATIVES = 3;

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

export const EVChargerFinder = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [supply, setSupply] = useState("");
  const [searched, setSearched] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-15% 0px",
  });

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
      MATCHING

      Derived from the vehicle spec: AC chargers only, drop
      anything the site can't power, rank by how much of the
      vehicle's AC capability the unit actually delivers.
  ===================================================== */

  const { primary, alternatives, hiddenByPhase } = useMemo(() => {
    if (!selectedVehicle) {
      return {
        primary: null as EVProduct | null,
        alternatives: [] as EVProduct[],
        hiddenByPhase: 0,
      };
    }

    const compatible = EV_PRODUCTS.filter(
      (product) =>
        product.category === "AC Chargers" &&
        !selectedVehicle.excludeProductIds?.includes(product.id)
    );

    // Single-phase chargers run off three-phase, not the reverse.
    const usable =
      supply === "1"
        ? compatible.filter((product) => product.phase !== 3)
        : compatible;

    const ranked = [...usable].sort((a, b) => {
      const kwA = a.outputKw ?? 0;
      const kwB = b.outputKw ?? 0;

      const usableA = Math.min(kwA, selectedVehicle.maxAC);
      const usableB = Math.min(kwB, selectedVehicle.maxAC);

      if (usableB !== usableA) return usableB - usableA;
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
  const showResult = searched && Boolean(selectedVehicle);

  const vehicleLabel = [brand, model, year]
    .filter(Boolean)
    .join(" ");

  const supplyLabel =
    SUPPLY_OPTIONS.find((option) => option.value === supply)?.label ??
    "";

  /* =====================================================
      ACTIONS
  ===================================================== */

  const hideResult = () => setSearched(false);

  const handleSearch = () => {
    setSearched(true);

    // Only matters on mobile, where the panel sits below the form.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  };

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate:
      inView || reduceMotion
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 24 },
    transition: {
      duration: 0.7,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      ref={sectionRef}
      id="compatibility"
      className="scroll-mt-24 bg-canvas pt-8 pb-20 lg:pt-10 lg:pb-28"
    >
      <div className="page-pad page-shell">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div {...reveal()} className="max-w-[660px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
            Charger Compatibility
          </p>

          <h2 className="mt-5 text-[38px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[52px]">
            Find the right
            <br />
            charger for your EV.
          </h2>
        </motion.div>

        {/* =====================================================
            FORM + PANEL
        ===================================================== */}

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* ===== LEFT — STACKED SELECTS ===== */}

          <motion.div {...reveal(0.1)} className="space-y-5">
            <EVSelect
              label="Car brand"
              value={brand}
              placeholder="Select brand"
              options={toOptions(brands)}
              onChange={(value) => {
                setBrand(value);
                setModel("");
                setYear("");
                hideResult();
              }}
            />

            <EVSelect
              label="Model"
              value={model}
              placeholder="Select model"
              options={toOptions(models)}
              disabled={!brand}
              onChange={(value) => {
                setModel(value);
                setYear("");
                hideResult();
              }}
            />

            <EVSelect
              label="Year"
              value={year}
              placeholder="Select year"
              options={toOptions(years)}
              disabled={!model}
              onChange={(value) => {
                setYear(value);
                hideResult();
              }}
            />

            <EVSelect
              label="Supply at your site"
              value={supply}
              placeholder="Select supply"
              options={SUPPLY_OPTIONS}
              onChange={(value) => {
                setSupply(value);
                hideResult();
              }}
            />

            <div className="pt-2">
              <button
                type="button"
                disabled={!canSearch}
                onClick={handleSearch}
                className="
                  inline-flex
                  h-[54px]
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-brand
                  px-7
                  text-[14px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-brand-dark
                  disabled:cursor-not-allowed
                  disabled:bg-brand/30
                  sm:w-auto
                "
              >
                Show my charger
                <span aria-hidden="true" className="ml-2.5 text-accent">
                  →
                </span>
              </button>

              <p className="mt-4 text-[13px] leading-[1.5] text-ink-faint">
                Not listed?{" "}
                <a
                  href={createWhatsAppLink(
                    "Hi Multiline, my EV isn't listed in the charger finder. Can you recommend a charger for it?"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand underline underline-offset-4"
                >
                  Ask us directly
                </a>
              </p>
            </div>
          </motion.div>

          {/* ===== RIGHT — PANEL ===== */}

          <motion.div
            {...reveal(0.15)}
            ref={panelRef}
            className="scroll-mt-24"
          >
            <AnimatePresence mode="wait" initial={false}>
              {!showResult ? (
                /* ===== RESTING STATE ===== */

                <motion.div
                  key="intro"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex min-h-[420px] items-center rounded-3xl bg-white px-8 py-12 sm:px-12"
                >
                  <div className="max-w-[440px]">
                    <p className="text-[19px] leading-[1.6] text-ink sm:text-[21px]">
                      Tell us your vehicle and the power supply at
                      your site. We&apos;ll show you the chargers
                      that work with both — and confirm everything
                      before installation.
                    </p>

                    <p className="mt-6 text-[14px] leading-[1.6] text-ink-faint">
                      Your recommendation appears here.
                    </p>
                  </div>
                </motion.div>
              ) : primary ? (
                /* ===== RESULT ===== */

                <motion.div
                  key={`result-${primary.id}-${supply}`}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 14 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-3xl bg-white p-8 sm:p-10"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="rounded-full bg-brand-tint px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-brand">
                      Best match
                    </span>

                    <span className="text-[13px] text-ink-faint">
                      {vehicleLabel} · {supplyLabel}
                    </span>
                  </div>

                  {/* PRODUCT */}

                  <div className="mt-7 flex flex-col gap-7 sm:flex-row sm:items-center">
                    <div className="relative h-[170px] w-full shrink-0 sm:h-[190px] sm:w-[170px]">
                      <Image
                        src={primary.image}
                        alt={primary.title}
                        fill
                        sizes="190px"
                        className="object-contain"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
                        {primary.title}
                      </h3>

                      <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                        {primary.summary ?? primary.description}
                      </p>

                      <p className="mt-4 text-[13px] leading-[1.55] text-ink-faint">
                        Your vehicle accepts up to{" "}
                        {selectedVehicle?.maxAC} kW AC. A higher-rated
                        charger still works — the car only draws what
                        it can take.
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                      className="inline-flex h-[52px] items-center justify-center rounded-full bg-brand px-6 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                      <WhatsAppIcon className="mr-2.5 h-[16px] w-[16px]" />
                      Enquire about this charger
                    </a>

                    {primary.href && (
                      <Link
                        href={primary.href}
                        className="inline-flex h-[52px] items-center justify-center rounded-full border border-line px-6 text-[14px] font-semibold text-ink transition-colors hover:bg-canvas"
                      >
                        View details
                      </Link>
                    )}
                  </div>

                  {/* SUPPLY UPGRADE — the offer, not a note about
                      what's missing */}

                  {hiddenByPhase > 0 && selectedVehicle && (
                    <div className="mt-8 rounded-2xl bg-canvas p-6">
                      <p className="text-[15px] font-semibold text-ink">
                        Want faster charging at home?
                      </p>

                      <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft">
                        Your vehicle can take up to{" "}
                        {selectedVehicle.maxAC} kW, but that needs a
                        three-phase (400V) connection. We can assess
                        your supply and quote the upgrade alongside
                        the charger.
                      </p>

                      <a
                        href={createWhatsAppLink(
                          `Hi Multiline, I have a ${vehicleLabel} on a single-phase supply. Can you quote a three-phase upgrade with a faster charger?`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex h-[46px] items-center justify-center rounded-full border border-brand/25 bg-white px-5 text-[13px] font-semibold text-brand transition-colors hover:bg-brand-tint"
                      >
                        Ask about an upgrade
                      </a>
                    </div>
                  )}

                  {/* ALTERNATIVES */}

                  {alternatives.length > 0 && (
                    <div className="mt-8 border-t border-line pt-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                        Also compatible
                      </p>

                      <div className="mt-4 space-y-3">
                        {alternatives.map((product) => (
                          <a
                            key={product.id}
                            href={createWhatsAppLink(
                              `Hi Multiline, I'm interested in the ${product.title} for my ${vehicleLabel}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-canvas"
                          >
                            <div className="relative h-[52px] w-[52px] shrink-0">
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                sizes="52px"
                                className="object-contain"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-[14px] font-semibold text-ink">
                                {product.title}
                              </p>

                              <p className="mt-0.5 text-[12px] text-ink-faint">
                                {product.phase === 3
                                  ? "Three-phase"
                                  : "Single-phase"}
                              </p>
                            </div>

                            <span
                              aria-hidden="true"
                              className="text-ink-faint"
                            >
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* ===== NO MATCH ===== */

                <motion.div
                  key="no-match"
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 14 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex min-h-[420px] items-center rounded-3xl bg-white px-8 py-12 sm:px-12"
                >
                  <div className="max-w-[440px]">
                    <h3 className="text-[24px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
                      Let&apos;s sort this one manually.
                    </h3>

                    <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                      {hiddenByPhase > 0
                        ? "The chargers that suit this vehicle need a three-phase connection. We can recommend a single-phase option or quote a supply upgrade."
                        : "We haven't listed a charger for this vehicle yet. Send us the details and our team will recommend or source the right unit."}
                    </p>

                    <a
                      href={createWhatsAppLink(
                        `Hi Multiline, I have a ${vehicleLabel} with ${
                          supplyLabel || "an unknown"
                        } supply. Which charger do you recommend?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex h-[52px] items-center justify-center rounded-full bg-brand px-6 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                      <WhatsAppIcon className="mr-2.5 h-[16px] w-[16px]" />
                      Ask our team
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};