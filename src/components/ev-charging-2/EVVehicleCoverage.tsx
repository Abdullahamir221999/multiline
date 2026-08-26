// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRef, type ReactNode } from "react";
// import { motion, useInView, useReducedMotion } from "motion/react";

// import {
//   EV_BRANDS,
//   EV_VEHICLE_GROUPS,
// } from "@/lib/evChargingContent";

// /* =========================================================
//     SECTION 04 — VEHICLE COVERAGE

//     Pass `map` once the SVG version exists:
//       <EVVehicleCoverage map={<CoverageMap />} />
//     Falls back to the current JPG until then.
// ========================================================= */

// type Stat = {
//   value: string;
//   label: string;
// };

// /* TODO: confirm all three with Multiline. The 5,000+ figure is
//    from the client; the city count came off the old map. */
// const STATS: Stat[] = [
//   { value: "5,000+", label: "Chargers installed" },
//   { value: "12", label: "Cities covered" },
//   { value: "2017", label: "Charging since" },
// ];

// export const EVVehicleCoverage = ({ map }: { map?: ReactNode }) => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const reduceMotion = useReducedMotion();

//   const inView = useInView(sectionRef, {
//     once: true,
//     margin: "-15% 0px",
//   });

//   const reveal = (delay = 0) => ({
//     initial: reduceMotion ? false : { opacity: 0, y: 24 },
//     animate:
//       inView || reduceMotion
//         ? { opacity: 1, y: 0 }
//         : { opacity: 0, y: 24 },
//     transition: {
//       duration: 0.7,
//       delay: reduceMotion ? 0 : delay,
//       ease: [0.22, 1, 0.36, 1] as const,
//     },
//   });

//   return (
//     <section
//       ref={sectionRef}
//       id="vehicle-coverage"
//       className="scroll-mt-24 bg-canvas py-20 lg:py-28"
//     >
//       <div className="page-pad page-shell">
//         {/* =====================================================
//             HEADER
//         ===================================================== */}

//         <motion.div {...reveal()} className="max-w-[680px]">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
//             Vehicle Coverage
//           </p>

//           <h2 className="mt-5 text-[38px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[52px]">
//             Supporting the EVs
//             <br />
//             Pakistan drives.
//           </h2>

//           <p className="mt-5 max-w-[520px] text-[16px] leading-[1.65] text-ink-soft">
//             Charging experience across every major electric vehicle
//             on Pakistani roads, backed by nationwide installation
//             and support.
//           </p>
//         </motion.div>

//         {/* =====================================================
//             STATS
//         ===================================================== */}

//         <motion.dl
//           {...reveal(0.1)}
//           className="mt-12 grid max-w-[680px] grid-cols-3 gap-8"
//         >
//           {STATS.map((stat) => (
//             <div key={stat.label}>
//               <dt className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-brand sm:text-[40px]">
//                 {stat.value}
//               </dt>

//               <dd className="mt-2.5 text-[13px] leading-[1.4] text-ink-soft">
//                 {stat.label}
//               </dd>
//             </div>
//           ))}
//         </motion.dl>

//         {/* =====================================================
//             VEHICLES + MAP
//         ===================================================== */}

//         <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
//           {/* VEHICLE LIST */}

//           <motion.div {...reveal(0.15)} className="flex flex-col">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
//               Experience across
//             </p>

//             <div className="mt-6 space-y-6">
//               {EV_VEHICLE_GROUPS.map((vehicle) => (
//                 <div key={vehicle.brand}>
//                   <p className="text-[17px] font-semibold leading-[1.3] tracking-[-0.015em] text-ink">
//                     {vehicle.brand}
//                   </p>

//                   <p className="mt-1 text-[14px] leading-[1.5] text-ink-soft">
//                     {vehicle.models}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <Link
//               href="#compatibility"
//               className="mt-10 inline-flex h-[52px] w-fit items-center justify-center rounded-full bg-brand px-7 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
//             >
//               Find your charger
//               <span aria-hidden="true" className="ml-2.5 text-accent">
//                 →
//               </span>
//             </Link>
//           </motion.div>

//           {/* MAP */}

//           <motion.div
//             {...reveal(0.2)}
//             className="overflow-hidden rounded-3xl bg-white p-6 sm:p-8"
//           >
//             {map ?? (
//               <div className="relative aspect-[16/11] w-full">
//                 <Image
//                   src="/images/ev-charging/ac-chargers-map.jpg"
//                   alt="Multiline AC charger installations across Pakistan"
//                   fill
//                   sizes="(max-width: 1024px) 100vw, 55vw"
//                   className="object-contain"
//                 />
//               </div>
//             )}
//           </motion.div>
//         </div>

//         {/* =====================================================
//             BRAND LOGOS
//         ===================================================== */}

//         <motion.div
//           {...reveal(0.25)}
//           className="mt-16 border-t border-line pt-12 lg:mt-20"
//         >
//           <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10 lg:gap-x-20">
//             {EV_BRANDS.map((brand) => (
//               <div
//                 key={brand.name}
//                 className="flex h-[56px] min-w-[110px] items-center justify-center"
//               >
//                 <Image
//                   src={brand.logo}
//                   alt={brand.name}
//                   width={190}
//                   height={64}
//                   className="max-h-[52px] w-auto max-w-[155px] object-contain opacity-75 transition-opacity duration-300 hover:opacity-100"
//                 />
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import {
  EV_BRANDS,
  EV_VEHICLE_GROUPS,
} from "@/lib/evChargingContent";

/* =========================================================
    SECTION 04 — VEHICLE COVERAGE
========================================================= */

type Stat = {
  value: string;
  label: string;
};

const STATS: Stat[] = [
  {
    value: "5,000+",
    label: "Chargers installed",
  },
  {
    value: "12",
    label: "Cities covered",
  },
  {
    value: "2017",
    label: "Charging since",
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

  const reveal = (
    delay = 0,
    distance = 22
  ) => ({
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
        ===================================================== */}

        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 xl:gap-20">
          {/* =====================================================
              LEFT
          ===================================================== */}

          <div>
            {/* INTRO */}

            <motion.div {...reveal()}>
              <h2 className="max-w-[570px] text-[38px] font-semibold leading-[1.03] tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[50px]">
                Supporting the EVs
                <br className="hidden sm:block" />
                {" "}Pakistan drives.
              </h2>

              <p className="mt-4 max-w-[520px] text-[15px] leading-[1.65] text-ink-soft sm:text-[16px]">
                Charging experience across major electric vehicles
                on Pakistani roads, backed by nationwide
                installation and support.
              </p>
            </motion.div>

            {/* =================================================
                STATS
            ================================================= */}

            <motion.dl
              {...reveal(0.08)}
              className="mt-8 grid max-w-[560px] grid-cols-3 gap-5 sm:gap-8"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[28px] font-semibold leading-none tracking-[-0.035em] text-brand sm:text-[34px]">
                    {stat.value}
                  </dt>

                  <dd className="mt-2 text-[12px] leading-[1.4] text-ink-soft sm:text-[13px]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>

            {/* =================================================
                VEHICLE LIST
            ================================================= */}

            <motion.div
              {...reveal(0.14)}
              className="mt-10"
            >
              <p className="text-[14px] font-semibold text-ink">
                Vehicles we support
              </p>

              <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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

              <Link
                href="#compatibility"
                className="mt-8 inline-flex h-[50px] items-center justify-center rounded-full bg-brand px-6 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-brand-dark"
              >
                Find your charger

                <span
                  aria-hidden="true"
                  className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT — MAP
          ===================================================== */}

          <motion.div
            {...reveal(0.12, 28)}
            className="relative"
          >
            <div className="overflow-hidden rounded-[24px] bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.045)] sm:p-6">
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
      {/* duplicate array for seamless infinite loop */}
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