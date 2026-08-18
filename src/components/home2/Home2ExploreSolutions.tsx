"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const SOLUTIONS = [
  {
    title: "EV Charging",
    description:
      "Residential, workplace and commercial EV charging with compatibility guidance and professional installation.",
    href: "/ev-chargers",
    image: "/images/home2/explore-ev.png",
  },
  {
    title: "Solar",
    description:
      "Engineered solar systems sized around your property, consumption and long-term energy requirements.",
    href: "/solar",
    image: "/images/home2/explore-solar.png",
  },
  {
    title: "Generators",
    description:
      "Reliable standby and prime-power generator solutions backed by decades of engineering experience.",
    href: "/generators",
    image: "/images/home2/explore-generators.png",
  },
] as const;

export const Home2ExploreSolutions = () => {
  const [active, setActive] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-line bg-[#F3F6FF]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="page-pad page-shell py-10 text-center lg:py-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand">
          Explore Multiline
        </p>

        <h2 className="mt-3 text-[34px] font-semibold uppercase leading-none tracking-[-0.045em] sm:text-[42px] lg:text-[48px]">
          What are you looking to power?
        </h2>
      </div>

      {/* =====================================================
          EXPANDING PANELS
      ===================================================== */}

      <div className="page-pad page-shell pb-10 lg:pb-12">
        <div className="flex flex-col overflow-hidden border border-line lg:h-[470px] lg:flex-row">
          {SOLUTIONS.map((solution, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={solution.title}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        flexGrow: isActive ? 1.85 : 1,
                      }
                }
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative min-h-[300px] overflow-hidden border-b border-white/15 last:border-b-0 lg:min-h-0 lg:flex-1 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <Link
                  href={solution.href}
                  className="group absolute inset-0 block overflow-hidden"
                  aria-label={`Explore ${solution.title}`}
                >
                  {/* IMAGE */}

                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover transition-all duration-700 ${
                      isActive
                        ? "scale-[1.025]"
                        : "scale-100"
                    }`}
                  />

                  {/* BASE DARK OVERLAY */}

                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${
                      isActive
                        ? "bg-[#071a27]/40"
                        : "bg-[#071a27]/72"
                    }`}
                  />

                  {/* BLUE TINT */}

                  <div
                    className={`absolute inset-0 bg-brand transition-opacity duration-500 ${
                      isActive
                        ? "opacity-[0.06]"
                        : "opacity-[0.18]"
                    }`}
                  />

                  {/* TOP ACTION */}

                  <div className="absolute left-5 top-5 z-10 lg:left-6 lg:top-6">
                    <div
                      className={`flex h-10 w-10 items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-accent text-black"
                          : "bg-brand/80 text-white backdrop-blur-sm"
                      }`}
                    >
                      <span
                        className={`text-[21px] leading-none transition-transform duration-300 ${
                          isActive
                            ? "translate-x-[1px]"
                            : ""
                        }`}
                      >
                        {isActive ? "→" : "+"}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white lg:p-7">
                    <motion.div
                      layout
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                        0{index + 1}
                      </p>

                      <h3 className="mt-3 text-[27px] font-semibold leading-none tracking-[-0.04em] sm:text-[30px] lg:text-[32px]">
                        {solution.title}
                      </h3>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 16 : 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[430px] text-[14px] leading-[1.6] text-white/75">
                          {solution.description}
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.06em]">
                            Explore Solutions
                          </span>

                          <span className="text-accent">
                            →
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* ACTIVE YELLOW RULE */}

                  <div
                    className={`absolute bottom-0 left-0 z-20 h-[4px] bg-accent transition-all duration-500 ${
                      isActive
                        ? "w-full"
                        : "w-0"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};