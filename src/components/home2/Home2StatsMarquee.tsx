"use client";

import { motion, useReducedMotion } from "motion/react";

const STATS = [
  "50+ YEARS OF EXPERIENCE",
  "100+ DEDICATED EMPLOYEES",
  "3,000+ HAPPY CLIENTS",
  "10,000+ GENERATORS INSTALLED",
  "500+ SOLAR INSTALLATIONS",
  "500+ EV CHARGER INSTALLATIONS",
];

const MarqueeGroup = () => (
  <div className="flex shrink-0 items-center">
    {STATS.map((stat) => (
      <div
        key={stat}
        className="flex shrink-0 items-center"
      >
        <span className="whitespace-nowrap px-6 text-[28px] font-semibold uppercase leading-none tracking-[-0.035em] text-white sm:px-8 sm:text-[34px] lg:px-10 lg:text-[40px] xl:text-[44px]">
          {stat}
        </span>

        <span
          aria-hidden
          className="text-[28px] font-light text-white/55 sm:text-[34px] lg:text-[40px]"
        >
          |
        </span>
      </div>
    ))}
  </div>
);

export const Home2StatsMarquee = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Multiline company statistics"
      className="overflow-hidden border-y border-white/10 bg-black text-white"
    >
      <div className="flex h-[105px] items-center overflow-hidden sm:h-[115px] lg:h-[125px]">
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
                  duration: 32,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
        >
          <MarqueeGroup />

          <MarqueeGroup />
        </motion.div>
      </div>
    </section>
  );
};