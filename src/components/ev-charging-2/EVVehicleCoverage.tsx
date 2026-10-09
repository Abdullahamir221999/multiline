"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import {
  EV_BRANDS,
  EV_VEHICLE_GROUPS,
} from "@/lib/evChargingContent";

import { scrollToSection } from "@/lib/scrollToSection";
/* =========================================================
    SECTION 04 — VEHICLE COVERAGE
========================================================= */

type Stat = {
  /** Counts up on scroll. */
  value: number;
  suffix?: string;
  label: string;
  /** Years render unformatted — no thousand separator. */
  plain?: boolean;
};

/* TODO: 5,000+ is the client's figure. Confirm 2017 is still the
   right date to lead with. */
const STATS: Stat[] = [
  {
    value: 5000,
    suffix: "+",
    label: "Chargers installed nationwide",
  },
  {
    value: 2017,
    label: "Charging since",
    plain: true,
  },
];

export const EVVehicleCoverage = ({
  map,
}: {
  map?: ReactNode;
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-12% 0px",
  });

  const reveal = (delay = 0, distance = 22) => ({
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: distance,
        },

    animate:
      inView || reduceMotion
        ? {
            opacity: 1,
            y: 0,
          }
        : {
            opacity: 0,
            y: distance,
          },

    transition: {
      duration: 0.7,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      ref={sectionRef}
      id="vehicle-coverage"
      className="scroll-mt-24 bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="page-pad page-shell">
        {/* =====================================================
            MAIN CONTENT

            items-stretch, not items-center — the map panel
            grows to match the left column so the section
            stays one whole frame at every width.
        ===================================================== */}

        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch lg:gap-16 xl:gap-20">
          {/* =====================================================
              LEFT
          ===================================================== */}

          <div>
            {/* INTRO */}

            <motion.div {...reveal()}>
              <h2 className="max-w-[570px] text-[38px] font-semibold leading-[1.03] tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[50px]">
                Supporting the EVs
                <br className="hidden sm:block" />{" "}
                Pakistan drives.
              </h2>

              <p className="mt-4 max-w-[520px] text-[15px] leading-[1.65] text-ink-soft sm:text-[16px]">
                Charging experience across major electric vehicles
                on Pakistani roads, with installation and support
                nationwide.
              </p>
            </motion.div>

            {/* =================================================
                STATS
            ================================================= */}

            <motion.dl
              {...reveal(0.08)}
              className="mt-8 flex flex-wrap gap-x-14 gap-y-6 sm:gap-x-20"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[30px] font-semibold leading-none tracking-[-0.035em] text-brand sm:text-[36px]">
                    <CountUp
                      to={stat.value}
                      suffix={stat.suffix}
                      plain={stat.plain}
                      start={inView}
                      reduceMotion={Boolean(reduceMotion)}
                    />
                  </dt>

                  <dd className="mt-2 text-[12px] leading-[1.4] text-ink-soft sm:text-[13px]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>

            {/* =================================================
                VEHICLE LIST

                Two columns from sm upward — collapsing to one
                at lg is what made the left side run long.
            ================================================= */}

            <motion.div {...reveal(0.14)} className="mt-10">
              <p className="text-[14px] font-semibold text-ink">
                Vehicles we support
              </p>

              <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {EV_VEHICLE_GROUPS.map((vehicle) => (
                  <div key={vehicle.brand}>
                    <p className="text-[15px] font-semibold leading-[1.3] text-ink">
                      {vehicle.brand}
                    </p>

                    <p className="mt-1 text-[13px] leading-[1.45] text-ink-soft">
                      {vehicle.models}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}

              <button
                type="button"
                onClick={() => scrollToSection("compatibility")}
                className="group mt-8 inline-flex h-[50px] items-center justify-center rounded-full bg-brand px-6 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-brand-dark"
              >
                Find your charger

                <span
                  aria-hidden="true"
                  className="ml-2.5 text-accent transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT — MAP
          ===================================================== */}

          <motion.div
            {...reveal(0.12, 28)}
            className="relative flex flex-col"
          >
            <div className="flex flex-1 items-center overflow-hidden rounded-[24px] bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.045)] sm:p-6">
              {map ?? (
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src="/images/ev-charging/ac-chargers-map.jpg"
                    alt="Multiline AC charger installations across Pakistan"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* SMALL MAP CAPTION */}

            <p className="mt-3 text-center text-[12px] leading-[1.5] text-ink-faint">
              Multiline EV charger installations across Pakistan
            </p>
          </motion.div>
        </div>

        {/* =====================================================
            VEHICLE BRANDS
        ===================================================== */}

        <motion.div
          {...reveal(0.2)}
          className="mt-14 overflow-hidden lg:mt-16"
        >
          <p className="text-center text-[15px] font-medium text-ink-soft">
            Compatible with leading EV brands
          </p>

          <div className="relative mt-9 overflow-hidden">
            {/* soft edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent sm:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent sm:w-28" />

            <motion.div
              className="flex w-max items-center"
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
                      duration: 100,
                      ease: "linear",
                      repeat: Infinity,
                    }
              }
            >
              {/* duplicated for a seamless loop */}
              {[...EV_BRANDS, ...EV_BRANDS].map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="mx-7 flex h-[86px] w-[165px] shrink-0 items-center justify-center sm:mx-9 sm:w-[180px] lg:mx-11"
                >
                  <div className="relative h-[64px] w-full">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      sizes="180px"
                      className="object-contain opacity-85 transition-all duration-300 hover:scale-[1.05] hover:opacity-100"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    COUNT UP

    Runs once when the section arrives. Renders the final
    value straight away for reduced-motion users, so the
    number is never missing.
========================================================= */

function CountUp({
  to,
  suffix = "",
  plain = false,
  start,
  reduceMotion,
}: {
  to: number;
  suffix?: string;
  plain?: boolean;
  start: boolean;
  reduceMotion: boolean;
}) {
  const [value, setValue] = useState(reduceMotion ? to : 0);
  const hasRun = useRef(false);

  const format = (n: number) =>
    plain
      ? String(Math.round(n))
      : Math.round(n).toLocaleString("en-US");

  useEffect(() => {
    if (!start || reduceMotion || hasRun.current) return;

    hasRun.current = true;

    // A year ticking up from zero reads as a bug, so start near it.
    const from = plain ? Math.max(to - 12, 0) : 0;

    const controls = animate(from, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(latest),
    });

    return () => controls.stop();
  }, [start, reduceMotion, to, plain]);

  return (
    <span>
      {format(value)}
      {suffix}
    </span>
  );
}