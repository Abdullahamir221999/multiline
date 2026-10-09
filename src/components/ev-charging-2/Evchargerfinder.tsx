"use client";

import Image from "next/image";
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

/* =========================================================
    SECTION 05 — CHARGER FINDER

    Two questions: vehicle, and whether the site has 3-phase.
    Three AC chargers always shown — the first carries the
    "Recommended" tag, the rest are the same card without it.
    Units the site can't power are shown disabled rather than
    hidden, so the 3-phase upgrade stays visible as an offer.
========================================================= */

/* ---------------------------------------------------------
    PRICING

    From Multiline's price list (7 Apr 2026). Ranges exist
    per brand within a rating, so these are the lowest unit
    for each. OPEN WITH CLIENT:
      - which specific unit each product represents
      - 22kW VEO at 80,000 looks wrong next to 7kW at 150,000
      - DC is 20/40/60kW on their list, 30/60kW on the site
      - whether a "from" price including PIB is possible
--------------------------------------------------------- */

const PRICES: Record<string, string> = {
  "7kw-ac": "From PKR 80,000",
  "11kw-ac": "From PKR 150,000",
  "22kw-ac": "From PKR 80,000",
  "30kw-dc": "From PKR 850,000",
  "60kw-dc": "From PKR 3,000,000",
};

const PRICE_NOTE = "Excluding PIB, installation and sales tax";

const SUPPLY_OPTIONS: Option[] = [
  { value: "3", label: "Yes — I have 3-phase (400V)" },
  { value: "1", label: "No — single-phase (230V)" },
  { value: "unknown", label: "I'm not sure" },
];

const toOptions = (values: string[]): Option[] =>
  values.map((value) => ({ value, label: value }));

export const EVChargerFinder = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
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

  /* =====================================================
      SELECTED VEHICLE

      No year any more — brand + model resolves directly.
      If several entries share a brand/model, the lowest
      maxAC wins so the recommendation is never optimistic.
  ===================================================== */

  const selectedVehicle = useMemo(() => {
    if (!brand || !model) return undefined;

    const matches = EV_VEHICLES.filter(
      (vehicle) =>
        vehicle.brand === brand && vehicle.model === model
    );

    if (matches.length === 0) return undefined;

    return matches.reduce((lowest, vehicle) =>
      vehicle.maxAC < lowest.maxAC ? vehicle : lowest
    );
  }, [brand, model]);

  /* =====================================================
      MATCHING

      All AC chargers, ranked by how much of the vehicle's
      capability they deliver. Nothing is removed — units the
      site can't power are flagged instead.
  ===================================================== */

  const results = useMemo(() => {
    if (!selectedVehicle) return [];

    const compatible = EV_PRODUCTS.filter(
      (product) =>
        product.category === "AC Chargers" &&
        !selectedVehicle.excludeProductIds?.includes(product.id)
    );

    const ranked = [...compatible].sort((a, b) => {
      const kwA = a.outputKw ?? 0;
      const kwB = b.outputKw ?? 0;

      // A unit the site can't power can't be the recommendation.
      const blockedA = supply === "1" && a.phase === 3;
      const blockedB = supply === "1" && b.phase === 3;

      if (blockedA !== blockedB) return blockedA ? 1 : -1;

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

    return ranked.map((product) => ({
      product,
      needsUpgrade: supply === "1" && product.phase === 3,
    }));
  }, [selectedVehicle, supply]);

  const canSearch = Boolean(brand && model && supply);
  const showResult = searched && Boolean(selectedVehicle);

  const vehicleLabel = [brand, model].filter(Boolean).join(" ");

  const supplyLabel =
    SUPPLY_OPTIONS.find((option) => option.value === supply)?.label ??
    "";

  const anyNeedsUpgrade = results.some((r) => r.needsUpgrade);

  /* =====================================================
      ACTIONS
  ===================================================== */

  const hideResult = () => setSearched(false);

  const handleSearch = () => {
    setSearched(true);

    // Only matters on mobile, where results sit below the form.
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
      className="scroll-mt-24 bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="page-pad page-shell">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div {...reveal()} className="max-w-[660px]">
          <h2 className="text-[38px] font-semibold leading-[1.03] tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[50px]">
            Find the right
            <br className="hidden sm:block" /> charger for your EV.
          </h2>
        </motion.div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <motion.div
          {...reveal(0.08)}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.15fr_auto] lg:items-end"
        >
          <EVSelect
            label="Car brand"
            value={brand}
            placeholder="Select brand"
            options={toOptions(brands)}
            onChange={(value) => {
              setBrand(value);
              setModel("");
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
              hideResult();
            }}
          />

          <EVSelect
            label="Do you have a 3-phase power supply connection?"
            value={supply}
            placeholder="Select an answer"
            options={SUPPLY_OPTIONS}
            onChange={(value) => {
              setSupply(value);
              hideResult();
            }}
          />

          <button
            type="button"
            disabled={!canSearch}
            onClick={handleSearch}
            className="
              inline-flex
              h-[58px]
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
              lg:w-auto
            "
          >
            See my options
            <span aria-hidden="true" className="ml-2.5 text-accent">
              →
            </span>
          </button>
        </motion.div>

        {/* =====================================================
            RESULTS
        ===================================================== */}

        <div ref={panelRef} className="scroll-mt-24">
          <AnimatePresence mode="wait" initial={false}>
            {!showResult ? (
              /* ===== RESTING ===== */

              <motion.p
                key="intro"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 max-w-[640px] text-[15px] leading-[1.65] text-ink-soft"
              >
                Tell us your vehicle and the power supply at your
                site. We&apos;ll show you the chargers that work
                with both — and confirm everything before
                installation.
              </motion.p>
            ) : results.length > 0 ? (
              /* ===== RESULTS ===== */

              <motion.div
                key={`results-${vehicleLabel}-${supply}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-10"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-[15px] font-semibold text-ink">
                    Options for your {vehicleLabel}
                  </p>

                  <p className="text-[13px] text-ink-faint">
                    Accepts up to {selectedVehicle?.maxAC} kW AC ·{" "}
                    {supplyLabel}
                  </p>
                </div>

                {/* THREE EQUAL CARDS */}

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((result, index) => (
                    <ChargerCard
                      key={result.product.id}
                      product={result.product}
                      needsUpgrade={result.needsUpgrade}
                      recommended={index === 0}
                      vehicleLabel={vehicleLabel}
                      supplyLabel={supplyLabel}
                      index={index}
                      reduceMotion={Boolean(reduceMotion)}
                    />
                  ))}
                </div>

                {/* FOOTER */}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12px] leading-[1.55] text-ink-faint">
                    {PRICE_NOTE}. Final selection depends on the
                    wiring at your site, which we confirm before
                    installation.
                  </p>

                  {anyNeedsUpgrade && (
                    <a
                      href={createWhatsAppLink(
                        `Hi Multiline, I have a ${vehicleLabel} on a single-phase supply. Can you quote a 3-phase upgrade with a faster charger?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-[13px] font-semibold text-brand underline underline-offset-4 hover:text-brand-dark"
                    >
                      Ask about a 3-phase upgrade
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              /* ===== NO MATCH ===== */

              <motion.div
                key="no-match"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="mt-10 rounded-[24px] bg-white p-8 sm:p-10"
              >
                <h3 className="text-[22px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
                  Let&apos;s sort this one manually.
                </h3>

                <p className="mt-3 max-w-[460px] text-[15px] leading-[1.6] text-ink-soft">
                  We haven&apos;t listed a charger for this vehicle
                  yet. Send us the details and our team will
                  recommend or source the right unit.
                </p>

                <a
                  href={createWhatsAppLink(
                    `Hi Multiline, I have a ${vehicleLabel} with ${
                      supplyLabel || "an unknown"
                    } supply. Which charger do you recommend?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-[50px] items-center justify-center rounded-full bg-brand px-6 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  <WhatsAppIcon className="mr-2.5 h-[16px] w-[16px]" />
                  Ask our team
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    CHARGER CARD

    Identical for every result. The first gets the tag; the
    others are the same card without it.
========================================================= */

function ChargerCard({
  product,
  needsUpgrade,
  recommended,
  vehicleLabel,
  supplyLabel,
  index,
  reduceMotion,
}: {
  product: EVProduct;
  needsUpgrade: boolean;
  recommended: boolean;
  vehicleLabel: string;
  supplyLabel: string;
  index: number;
  reduceMotion: boolean;
}) {
  const price = PRICES[product.id];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`flex flex-col rounded-[24px] bg-white p-6 ${
        needsUpgrade ? "opacity-70" : ""
      }`}
    >
      {/* TAG ROW — fixed height so all three cards align */}

      <div className="flex h-[26px] items-center">
        {recommended && (
          <span className="rounded-full bg-brand-tint px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.09em] text-brand">
            Recommended
          </span>
        )}
      </div>

      {/* IMAGE */}

      <div className="relative mt-4 h-[130px] w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 280px, 50vw"
          className="object-contain"
        />
      </div>

      {/* BODY */}

      <div className="mt-5 flex-1">
        <h3 className="text-[18px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
          {product.title}
        </h3>

        <p className="mt-2 text-[13px] leading-[1.5] text-ink-soft">
          {product.outputKw} kW ·{" "}
          {product.phase === 3 ? "Three-phase" : "Single-phase"}
        </p>

        {price && (
          <p className="mt-3 text-[15px] font-semibold text-ink">
            {price}
          </p>
        )}

        {needsUpgrade && (
          <p className="mt-3 text-[12px] font-medium leading-[1.45] text-ink-soft">
            Needs a 3-phase connection — we can quote the upgrade.
          </p>
        )}
      </div>

      {/* CTA */}

      <a
        href={createWhatsAppLink(
          `Hi Multiline, I have a ${vehicleLabel} with ${
            supplyLabel || "an unknown"
          } supply. I'm interested in the ${product.title}.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex h-[46px] w-full shrink-0 items-center justify-center rounded-full border border-line text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand"
      >
        <WhatsAppIcon className="mr-2 h-[15px] w-[15px]" />
        Enquire
      </a>
    </motion.div>
  );
}