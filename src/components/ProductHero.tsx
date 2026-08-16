"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

import CompatibilityChecker from "@/components/CompatibilityChecker";
import ProductStory from "@/components/ProductStory";

const heroSpecs = [
  {
    label: "Output",
    value: "11 kW",
  },
  {
    label: "Connector",
    value: "Type 2",
  },
  {
    label: "Supply",
    value: "3 Phase",
  },
  {
    label: "Protection",
    value: "IP65",
  },
];

export default function ProductHero() {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <main className="bg-[#f2f0e9]">
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}

        <div className="border-b border-black/15 px-5 py-[18px] md:px-8 lg:px-12">
          <div className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.065em] text-black/50">
            <span>EV Charging</span>

            <span className="text-black/25">/</span>

            <span>Home Chargers</span>

            <span className="text-black/25">/</span>

            <span className="text-black">11kW AC</span>
          </div>
        </div>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="grid min-h-[calc(100vh-123px)] lg:grid-cols-[0.93fr_1.07fr]">
          {/* ===================================================
              LEFT
          =================================================== */}

          <div className="flex flex-col border-b border-black/15 px-5 py-10 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
            {/* Top metadata */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-12 flex items-center justify-between gap-5"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-black/40">
                ML / EV / 001
              </span>

<span className="inline-flex items-center gap-2 rounded-full bg-[#124897]/[0.07] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#124897]">
  <span className="h-[6px] w-[6px] rounded-full bg-[#f2ca30]" />

  Residential Charging
</span>
            </motion.div>

            {/* Product title */}

            <motion.div
              initial={{
                opacity: 0,
                y: 28,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="mb-5 text-[14px] font-semibold uppercase tracking-[0.075em] text-[#124897]">
                AC Home Charger
              </p>

              <h1 className="font-display text-[58px] font-medium leading-[0.96] tracking-[-0.045em] sm:text-[68px] lg:whitespace-nowrap lg:text-[60px] xl:text-[70px] 2xl:text-[78px]">
                11kW Home Charger
              </h1>

              <p className="mt-8 max-w-[430px] text-[17px] leading-[1.6] tracking-[-0.01em] text-black/60">
                Intelligent residential EV charging engineered for reliable
                everyday performance.
              </p>
            </motion.div>

            {/* =================================================
                STATIC SPECIFICATION DATA

                Deliberately no row numbers, hover states,
                arrows or button-like full-width rows.
            ================================================= */}

            <dl className="mt-14 grid grid-cols-2 border-y border-black/20">
              {heroSpecs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`py-5 ${
                    index % 2 === 0
                      ? "border-r border-black/15 pr-7"
                      : "pl-7"
                  } ${
                    index < 2
                      ? "border-b border-black/15"
                      : ""
                  }`}
                >
                  <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-black/45">
                    {spec.label}
                  </dt>

                  <dd className="mt-2 text-[17px] font-semibold tracking-[-0.02em] text-black">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* =================================================
                PURCHASE
            ================================================= */}

            <div className="mt-14 pt-8 xl:mt-16">
              <div className="flex items-end justify-between border-b border-black/20 pb-7">
                <div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.09em] text-black/45">
                    Price
                  </p>

                  <p className="text-[30px] font-medium tracking-[-0.04em]">
                    PKR 185,000
                  </p>
                </div>

<div className="flex flex-col items-end gap-2">
  <span className="text-[10px] font-medium uppercase tracking-[0.07em] text-black/40">
    Tax inclusive
  </span>

  <div className="flex items-center gap-3">
    <div className="text-right">
      <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-black/55">
        Installation
      </p>

      <p className="mt-1 text-[11px] text-black/40">
        Price varies by city
      </p>
    </div>

    <button
      type="button"
      className="border border-black/15 px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-black/60 transition-colors hover:border-[#124897]/50 hover:text-[#124897]"
    >
      Select City →
    </button>
  </div>
</div>
              </div>

              <div className="grid grid-cols-[145px_1fr]">
                {/* Quantity */}

                <div className="flex h-[64px] items-center justify-between border-b border-l border-r border-black/20 px-5">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      setQuantity((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    className="text-[20px] font-light"
                  >
                    −
                  </button>

                  <span className="text-[12px] font-semibold tabular-nums">
                    {String(quantity).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      setQuantity((current) => current + 1)
                    }
                    className="text-[20px] font-light"
                  >
                    +
                  </button>
                </div>

                {/* Add to cart */}

                <button
                  type="button"
                  className="group flex h-[64px] items-center justify-between bg-[#f2ca30] px-6 text-[#101010] transition-colors duration-300 hover:bg-[#e0ba24]"
                >
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em]">
                    Add to Cart
                  </span>

                  <span className="text-[19px] transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT PRODUCT VISUAL
          =================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-[650px] overflow-hidden bg-[#dedfd9] lg:min-h-full"
          >
            {/* Metadata */}

            <div className="absolute left-6 top-6 z-20 md:left-8 md:top-8">
<span className="inline-flex rounded-full bg-[#f2f0e9]/75 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.09em] text-black/55 backdrop-blur-sm">
  Multiline Engineering
</span>

              <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-black/75">
                EV Charging / AC Series
              </p>
            </div>

            {/* Counter */}

            <div className="absolute right-6 top-6 z-20 md:right-8 md:top-8">
              <span className="text-[11px] font-semibold tracking-[0.1em] text-black/60">
                01 / 04
              </span>
            </div>

            {/* Engineering grid */}

            <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-black/[0.06]" />

            <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-black/[0.06]" />

            {/* Charger */}

            <motion.div
              initial={{
                y: 35,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 flex items-center justify-center px-4 pb-24 pt-16 md:px-8"
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <Image
                  src="/images/products/charger-front1.png"
                  alt="11kW home EV charger"
                  width={800}
                  height={1100}
                  priority
                  className="h-[86%] w-auto object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.16)] xl:h-[91%]"
                />
              </div>
            </motion.div>

            {/* =================================================
                GALLERY — ACTUALLY INTERACTIVE,
                SO IT CAN LOOK INTERACTIVE
            ================================================= */}

            <div className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-4 border-t border-black/20 bg-[#f2f0e9]">
              {[
                "Front",
                "Side",
                "Detail",
                "Installed",
              ].map((item, index) => (
                <button
                  type="button"
                  key={item}
className={`h-[78px] border-r border-black/15 px-5 text-left transition-colors last:border-r-0 ${
  index === 0
    ? "bg-white shadow-[inset_0_3px_0_#124897]"
    : "bg-[#f2f0e9] hover:bg-white/60"
}`}
                >
                  <span className="block text-[10px] font-semibold tracking-[0.09em] text-black/35">
                    0{index + 1}
                  </span>

                  <span className="mt-1 block text-[12px] font-semibold uppercase tracking-[0.065em]">
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <CompatibilityChecker />

      <ProductStory />
    </>
  );
}