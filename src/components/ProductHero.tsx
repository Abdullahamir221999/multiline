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

const galleryLabels = ["Front", "Side", "Detail", "Installed"] as const;

export default function ProductHero() {
  const [quantity, setQuantity] = useState(1);
  const [activeGallery, setActiveGallery] = useState(0);

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

        <section className="grid min-h-[calc(100svh-var(--header-height)-57px)] lg:grid-cols-[0.93fr_1.07fr]">
          <div className="flex flex-col border-b border-line page-pad py-10 lg:border-b-0 lg:border-r lg:py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-12 flex items-center justify-between gap-5"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-faint">
                ML / EV / 001
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-brand/[0.07] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand">
                <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-accent" />
                Residential Charging
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-5 text-[14px] font-semibold uppercase tracking-[0.075em] text-brand">
                AC Home Charger
              </p>

              <h1 className="font-display text-[52px] font-medium leading-[0.96] tracking-[-0.045em] sm:text-[64px] lg:whitespace-nowrap lg:text-[60px] xl:text-[70px] 2xl:text-[78px]">
                11kW Home Charger
              </h1>

              <p className="mt-8 max-w-[430px] text-[17px] leading-[1.6] tracking-[-0.01em] text-ink-soft">
                Intelligent residential EV charging engineered for reliable
                everyday performance.
              </p>
            </motion.div>

            <dl className="mt-14 grid grid-cols-2 border-y border-line-strong">
              {heroSpecs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`py-5 ${
                    index % 2 === 0 ? "border-r border-line pr-7" : "pl-7"
                  } ${index < 2 ? "border-b border-line" : ""}`}
                >
                  <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                    {spec.label}
                  </dt>
                  <dd className="mt-2 text-[17px] font-semibold tracking-[-0.02em]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-14 pt-8 xl:mt-16">
              <div className="flex flex-col gap-6 border-b border-line-strong pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.09em] text-ink-faint">
                    Price
                  </p>
                  <p className="text-[30px] font-medium tracking-[-0.04em]">
                    PKR 185,000
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className="text-[10px] font-medium uppercase tracking-[0.07em] text-ink-faint">
                    Tax inclusive
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-soft">
                        Installation
                      </p>
                      <p className="mt-1 text-[11px] text-ink-faint">
                        Price varies by city
                      </p>
                    </div>

                    <Button variant="secondary" size="md">
                      Select city
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[145px_1fr]">
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-[560px] overflow-hidden bg-image-well lg:min-h-full"
          >
            <div className="absolute left-6 top-6 z-20 md:left-8 md:top-8">
              <span className="inline-flex rounded-full bg-paper/75 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.09em] text-ink-soft backdrop-blur-sm">
                Multiline Engineering
              </span>
              <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink">
                EV Charging / AC Series
              </p>
            </div>

            <div className="absolute right-6 top-6 z-20 md:right-8 md:top-8">
              <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-soft">
                0{activeGallery + 1} / 0{galleryLabels.length}
              </span>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-ink/5" />
            <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-ink/5" />

            <motion.div
              initial={{ y: 35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 flex items-center justify-center px-4 pb-24 pt-16 md:px-8"
            >
              <Image
                src="/images/products/charger-front1.png"
                alt="11kW home EV charger"
                width={800}
                height={1100}
                priority
                className="h-[86%] w-auto object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.16)] xl:h-[91%]"
              />
            </motion.div>

            <div
              className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-4 border-t border-line-strong bg-paper"
              role="tablist"
              aria-label="Product views"
            >
              {galleryLabels.map((item, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeGallery === index}
                  key={item}
                  onClick={() => setActiveGallery(index)}
                  className={`h-[78px] border-r border-line px-3 text-left transition-colors last:border-r-0 sm:px-5 ${
                    activeGallery === index
                      ? "bg-surface-elevated shadow-[inset_0_3px_0_var(--brand)]"
                      : "bg-paper hover:bg-surface"
                  }`}
                >
                  <span className="block text-[10px] font-semibold tracking-[0.09em] text-ink-faint">
                    0{index + 1}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.065em] sm:text-[12px]">
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
