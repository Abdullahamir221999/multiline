"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { HOME_PARTNERS } from "@/lib/homeContent";

export const PartnersGrid = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="partners-heading"
      className="border-b border-line bg-[#EFF3FF]"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-line">
        <div className="page-pad page-shell flex items-end justify-between gap-8 py-8 lg:py-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
              Our Network
            </p>

            <h2
              id="partners-heading"
              className="mt-3 text-[32px] font-medium leading-[1] tracking-[-0.04em] sm:text-[38px]"
            >
              Our Partners
            </h2>
          </div>

          <p className="hidden max-w-[360px] text-right text-[13px] leading-[1.6] text-ink-soft md:block">
            Working with established technology and energy partners across our
            engineering portfolio.
          </p>
        </div>
      </div>

      {/* =====================================================
          LOGO GRID
      ===================================================== */}

      <div className="page-shell">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {HOME_PARTNERS.map((partner, index) => (
            <motion.li
              key={partner.name}
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 16,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={[
                "group flex min-h-[150px] items-center justify-center border-b border-line px-6 py-8 transition-colors duration-300 hover:bg-white/40",

                // Mobile grid borders
                index % 2 === 0 ? "border-r" : "",

                // Small screens
                "sm:border-r",

                // Desktop
                "lg:min-h-[170px]",
                index % 5 === 4 ? "lg:border-r-0" : "lg:border-r",
                index >= HOME_PARTNERS.length - 5
                  ? "lg:border-b-0"
                  : "",
              ].join(" ")}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={180}
                height={64}
                className="h-[48px] w-auto max-w-[130px] object-contain opacity-80 transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-100 sm:max-w-[145px]"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};