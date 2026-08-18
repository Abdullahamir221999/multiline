"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import {
  HOME_CLIENT_SLIDES,
  HOME_PARTNERS,
} from "@/lib/homeContent";

/* ==========================================================
   PARTNER LOGO GROUP
========================================================== */

function PartnerGroup() {
  return (
    <div className="flex shrink-0">
      {HOME_PARTNERS.map((partner) => (
        <div
          key={partner.name}
          className="flex h-[88px] w-[220px] shrink-0 items-center justify-center border-r border-line px-7 sm:w-[250px] lg:h-[96px] lg:w-[270px]"
        >
          <Image
            src={partner.logo}
            alt={partner.name}
            width={170}
            height={56}
            className="max-h-[44px] w-auto max-w-[145px] object-contain"
          />
        </div>
      ))}
    </div>
  );
}

/* ==========================================================
   PARTNER MARQUEE
========================================================== */

function PartnersMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden border-y border-line bg-white">
      <motion.div
        className="flex w-max"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["0%", "-50%"],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <PartnerGroup />
        <PartnerGroup />
      </motion.div>
    </div>
  );
}

/* ==========================================================
   CLIENT SLIDE GROUP
========================================================== */

function ClientSlideGroup() {
  return (
    <div className="flex shrink-0">
      {HOME_CLIENT_SLIDES.map((slide) => (
        <div
          key={slide.src}
          className="relative h-[92px] w-[430px] shrink-0 border-r border-line bg-white sm:w-[520px] lg:h-[105px] lg:w-[600px]"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="600px"
            className="object-contain px-8 py-4"
          />
        </div>
      ))}
    </div>
  );
}

/* ==========================================================
   CLIENT MARQUEE
========================================================== */

function ClientsMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden border-b border-line bg-white">
      <motion.div
        className="flex w-max"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-50%", "0%"],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 34,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        <ClientSlideGroup />
        <ClientSlideGroup />
      </motion.div>
    </div>
  );
}

/* ==========================================================
   MAIN SECTION
========================================================== */

export const Home2Heritage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden border-b border-line bg-[#F3F6FF]">
      {/* =====================================================
          INTRO
      ===================================================== */}

      <div className="page-pad page-shell grid gap-8 py-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:py-12">
        {/* LEFT */}

        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 20,
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
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2 className="max-w-[700px] text-[46px] font-semibold uppercase leading-[0.93] tracking-[-0.045em] sm:text-[56px] lg:text-[64px]">
            50 Years of
            <br />
            Power
            <br />
            Solutions
          </h2>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 20,
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
            duration: 0.65,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="lg:pt-2"
        >
          <p className="max-w-[520px] text-[17px] font-medium leading-[1.55] tracking-[-0.02em]">
            Founded in Lahore in 1975, Multiline has evolved from an
            electrical engineering company into a provider of power
            generation, renewable energy and EV charging infrastructure.
          </p>
        </motion.div>
      </div>

      {/* =====================================================
          PARTNERS — LEFT
      ===================================================== */}

      <PartnersMarquee />

      {/* =====================================================
          SMALL TRUST LINE
      ===================================================== */}

      <div className="border-b border-line bg-[#F3F6FF] py-2.5 text-center">
        <p className="text-[11px] font-medium tracking-[-0.01em] text-ink-soft">
          Trusted across energy, infrastructure and industry
        </p>
      </div>

      {/* =====================================================
          CLIENTS — RIGHT
      ===================================================== */}

      <ClientsMarquee />

      {/* =====================================================
          TEAM
      ===================================================== */}

      <div className="page-pad page-shell">
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 24,
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto mt-7 h-[280px] max-w-[1050px] sm:h-[360px] lg:mt-9 lg:h-[440px]"
        >
          <Image
            src="/images/home2/multiline-team.jpg"
            alt="Multiline engineering team"
            fill
            sizes="(max-width: 1024px) 100vw, 1050px"
            className="object-contain object-bottom"
          />
        </motion.div>
      </div>
    </section>
  );
};