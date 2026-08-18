"use client";

import { motion, useReducedMotion } from "motion/react";

import { ABOUT_MULTILINE_PARAGRAPHS } from "@/lib/homeContent";

/* ==========================================================
   SECTION HEADER
========================================================== */

const SectionHeaderBar = ({
  title,
  id,
}: {
  title: string;
  id?: string;
}) => {
  return (
    <div className="border-b border-line">
      <div className="page-pad page-shell flex items-center justify-between py-4">
        <h2
          id={id}
          className="text-[11px] font-semibold uppercase tracking-[0.07em] text-brand"
        >
          {title}
        </h2>

        <span
          aria-hidden
          className="h-[5px] w-[5px] bg-accent"
        />
      </div>
    </div>
  );
};

/* ==========================================================
   CORPORATE IDENTITY
========================================================== */

export const CorporateIdentity = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="corporate-identity-heading"
      className="border-b border-line bg-[#F3F6FF]"
    >
      <SectionHeaderBar
        title="Corporate Identity"
        id="corporate-identity-heading"
      />

      <div className="page-shell grid lg:grid-cols-[0.62fr_1.38fr]">
        {/* LEFT */}

        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 18,
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
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="border-b border-line px-5 py-8 md:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10"
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.07em] text-brand">
            About
          </p>

          <h3 className="font-display text-[38px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[46px] lg:text-[50px]">
            About
            <br />
            Multiline.
          </h3>

          <motion.div
            initial={
              reduceMotion
                ? undefined
                : {
                    scaleX: 0,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    scaleX: 1,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 h-[2px] w-10 origin-left bg-accent"
          />
        </motion.div>

        {/* RIGHT */}

        <div className="px-5 md:px-8 lg:px-10">
          {ABOUT_MULTILINE_PARAGRAPHS.map(
            (paragraph, index) => (
              <motion.div
                key={paragraph.slice(0, 48)}
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 12,
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
                  amount: 0.35,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid gap-4 border-b border-line py-5 sm:grid-cols-[44px_1fr] sm:gap-5 lg:py-6"
              >
                <span className="pt-[2px] text-[9px] font-semibold tracking-[0.05em] text-brand/55">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="max-w-[760px] text-[15px] leading-[1.6] text-ink-soft">
                  {paragraph}
                </p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export { SectionHeaderBar };