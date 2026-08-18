"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

import CompatibilityChecker from "@/components/CompatibilityChecker";
import ProductStory from "@/components/ProductStory";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

const heroSpecs = [
  { label: "Output", value: "11 kW" },
  { label: "Connector", value: "Type 2" },
  { label: "Supply", value: "3 Phase" },
  { label: "Protection", value: "IP65" },
] as const;

export default function ProductHero() {
  const [quantity, setQuantity] = useState(1);
  const [powerIntakeBox, setPowerIntakeBox] = useState(false);

  const basePrice = 185000;
  const powerIntakeBoxPrice = 10500;
  const totalPrice = basePrice * quantity + (powerIntakeBox ? powerIntakeBoxPrice : 0);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <>
      <main className="bg-paper text-ink">
        <Breadcrumb
          items={[
            { label: "EV Charging", href: "/ev-chargers" },
            { label: "Home Chargers" },
            { label: "11kW AC" },
          ]}
        />

        <section className="grid lg:min-h-[650px] lg:grid-cols-[0.98fr_1.02fr]">
          {/* =====================================================
              LEFT
          ===================================================== */}

          <div className="flex flex-col justify-center border-b border-line page-pad py-10 lg:border-b-0 lg:border-r lg:py-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.075em] text-brand">
                AC Home Charger
              </p>

<h1 className="font-display text-[34px] font-medium leading-[0.98] tracking-[-0.035em] sm:text-[38px] lg:whitespace-nowrap lg:text-[40px] xl:text-[44px] 2xl:text-[46px]">
  11kW Home Charger
</h1>

              <p className="mt-6 max-w-[430px] text-[16px] leading-[1.6] tracking-[-0.01em] text-ink-soft">
                Intelligent residential EV charging engineered for reliable
                everyday performance.
              </p>
            </motion.div>

            {/* =====================================================
                SPECS
            ===================================================== */}

            <dl className="mt-10 grid grid-cols-2 border-y border-line-strong">
              {heroSpecs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`py-4 ${
                    index % 2 === 0
                      ? "border-r border-line pr-6"
                      : "pl-6"
                  } ${index < 2 ? "border-b border-line" : ""}`}
                >
                  <dt className="text-[10px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                    {spec.label}
                  </dt>

                  <dd className="mt-2 text-[16px] font-semibold tracking-[-0.02em]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* =====================================================
                PRICE + INSTALLATION
            ===================================================== */}

            <div className="mt-10">
              <div className="flex flex-col gap-5 border-b border-line-strong pb-5 sm:flex-row sm:items-end sm:justify-between min-h-30">
                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.09em] text-ink-faint">
                    Total
                  </p>

                  <p className="text-[28px] font-medium tracking-[-0.04em]">
                    {formatPrice(totalPrice)}
                  </p>

                  {powerIntakeBox ? (
                    <p className="mt-1 text-[10px] text-ink-faint">
                      Includes power intake box: +{formatPrice(powerIntakeBoxPrice)}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className="text-[9px] font-medium uppercase tracking-[0.07em] text-ink-faint">
                    Tax inclusive
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="text-left sm:text-right">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.07em] text-ink-soft">
                        Installation
                      </p>

                      <p className="mt-1 text-[10px] text-ink-faint">
                        Price varies by city
                      </p>
                    </div>

                    <Button variant="secondary" size="md">
                      Select city
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3">
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={powerIntakeBox}
                      onChange={(event) => setPowerIntakeBox(event.target.checked)}
                      className="peer sr-only"
                    />

                    <span className="relative flex h-5 w-5 shrink-0 items-center justify- border border-line-strong bg-white transition-colors duration-200 peer-checked:border-brand peer-checked:bg-brand">
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hidden h-3 w-3 text-white peer-checked:block"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 6.25L4.75 8.5L9.5 3.75"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </span>

                    <span className="flex flex-col">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-ink">
                        Power intake box
                      </span>

                      <span className="text-[12px] text-ink-soft">
                        Add +{formatPrice(powerIntakeBoxPrice)}
                      </span>
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-semibold uppercase tracking-[0.1em] ${
                      powerIntakeBox ? "text-brand" : "text-ink-faint"
                    }`}
                  >
                    {powerIntakeBox ? "Added" : "Optional"}
                  </span>
                </label>
              </div>

              {/* =====================================================
                  CART
              ===================================================== */}

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-[145px_1fr]">
                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  className="border-t-0 border-line-strong sm:border-r-0"
                />

                <Button
                  variant="accent"
                  size="bar"
                  showArrow
                  className="border-0 sm:border-l-0"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* =====================================================
              PRODUCT IMAGE
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="relative min-h-[500px] overflow-hidden bg-[#EFF3FF] lg:min-h-[650px]"
          >
            {/* subtle engineering guides */}

            <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-ink/[0.04]" />

            <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-ink/[0.04]" />

            {/* IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 flex items-center justify-center px-4 py-5 lg:px-6 lg:py-6"
            >
              <Image
                src="/images/products/charger-front1.png"
                alt="11kW home EV charger"
                width={800}
                height={1100}
                priority
                className="h-[96%] max-h-[640px] w-auto object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.13)]"
              />
            </motion.div>
          </motion.div>
        </section>
      </main>

      <CompatibilityChecker />
      <ProductStory />
    </>
  );
}