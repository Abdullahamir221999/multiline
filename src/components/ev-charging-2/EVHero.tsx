"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/* =========================================================
    SECTION 01 — HERO

    Full-bleed on load. As the page scrolls, the image draws
    in from the edges and rounds off, settling into a card on
    the warm canvas. Sticky, so the inset happens in place
    rather than the whole block sliding away.
========================================================= */

export const EVHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Inset and radius are driven off the same progress value so
  // the corners round exactly as the edges pull in.
  const padding = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["0rem", "1.75rem"]
  );

  const radius = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["0px", "26px"]
  );

  const contentPad = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["0rem", "1.5rem"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[125svh] bg-canvas"
    >
      <div className="sticky top-0 h-[100svh] w-full">
        <motion.div
          style={
            reduceMotion
              ? undefined
              : { padding, willChange: "padding" }
          }
          className="h-full w-full"
        >
          <motion.div
            style={
              reduceMotion
                ? undefined
                : { borderRadius: radius }
            }
            className="relative h-full w-full overflow-hidden bg-ink"
          >
            {/* IMAGE */}

            <Image
              src="/images/ev-charging/hero.png"
              alt="Multiline EV charger installed at a home in Pakistan"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            {/* Legibility scrim — heavier at the bottom where the
                headline sits, so the top of the frame stays open. */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

            {/* CONTENT */}

            <motion.div
              style={
                reduceMotion ? undefined : { padding: contentPad }
              }
              className="absolute inset-0 flex items-end"
            >
              <div className="w-full px-6 pb-12 sm:px-10 sm:pb-14 lg:px-16 lg:pb-16">
                <div className="max-w-[840px]">
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    // className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70"
                    className="text-[14px] font-semibold text-white/80"
                  >
                    Multiline EV Charging
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    // className="mt-5 text-[42px] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-[58px] lg:text-[72px]"
                    className="mt-4 text-[42px] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[66px]"
                  >
                    {/* Pakistan&apos;s No.1 */}
                    Pakistan&apos;s No. 1
                    <br />
                    EV charging company.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-6 max-w-[520px] text-[15px] leading-[1.65] text-white/80 sm:text-[17px]"
                  >
                    The country&apos;s largest AC charger
                    deployment — over 5,000 installations
                    nationwide, supplied, fitted and supported
                    by our own engineers.
                  </motion.p>

                  {/* ACTIONS */}

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.26,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
                  >
                    <Link
                      href="#quote"
                      className="inline-flex h-[52px] items-center justify-center rounded-full bg-brand px-7 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Get your quote
                      <span aria-hidden="true" className="ml-2.5">
                        →
                      </span>
                    </Link>

                    <Link
                      href="#compatibility"
                      className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/30 px-7 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Find your charger
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};