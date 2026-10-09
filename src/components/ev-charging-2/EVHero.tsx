"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { scrollToSection } from "@/lib/scrollToSection";

/* =========================================================
    SECTION 01 — HERO

    Full-bleed on load. On scroll the frame draws in from the
    edges and rounds off, settling into a card on the canvas.

    Animated with clip-path rather than padding: padding
    forces a layout pass every frame, clip-path only repaints.
    Scroll progress runs through a spring so the inset eases
    instead of tracking the wheel step for step.
========================================================= */

export const EVHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Takes the edge off a mouse wheel's discrete steps.
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.35,
    restDelta: 0.0005,
  });

  const inset = useTransform(progress, [0, 0.62], [0, 28], {
    clamp: true,
  });

  const radius = useTransform(progress, [0, 0.62], [0, 28], {
    clamp: true,
  });

  const clipPath = useMotionTemplate`inset(${inset}px round ${radius}px)`;

  const contentPad = useTransform(progress, [0, 0.62], [0, 24], {
    clamp: true,
  });

  const contentPadPx = useMotionTemplate`${contentPad}px`;

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
              : {
                  clipPath,
                  WebkitClipPath: clipPath,
                  willChange: "clip-path",
                }
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
              reduceMotion ? undefined : { padding: contentPadPx }
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
                  className="mt-4 text-[42px] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[66px]"
                >
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
                  The country&apos;s largest AC charger deployment
                  — over 5,000 installations nationwide, supplied,
                  fitted and supported by our own engineers.
                </motion.p>

                {/* ACTIONS

                    Plain buttons, not Link: a hash href scrolls
                    immediately, and sections below are still
                    growing as their images load, so the browser
                    lands short. scrollToSection re-checks once
                    the page settles. */}

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
                  <button
                    type="button"
                    onClick={() => scrollToSection("quote")}
                    className="inline-flex h-[52px] items-center justify-center rounded-full bg-brand px-7 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Get your quote
                    <span aria-hidden="true" className="ml-2.5">
                      →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection("compatibility")}
                    className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/30 px-7 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Find your charger
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};