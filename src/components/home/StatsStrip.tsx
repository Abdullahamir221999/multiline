"use client";

import { motion } from "motion/react";

import { HOME_STATS } from "@/lib/homeContent";
import { cn } from "@/helpers/cn";

export const StatsStrip = () => (
  <section
    aria-label="Company milestones"
    className="border-y border-line bg-[#EFF3FF]"
  >
    <div className="page-shell grid grid-cols-2 lg:grid-cols-5">
      {HOME_STATS.map((stat, index) => {
        const isLast = index === HOME_STATS.length - 1;

        return (
          <motion.div
            key={stat.label}
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.55,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              "relative flex min-h-[110px] flex-col justify-center px-5 py-5 md:px-6 lg:min-h-[122px] lg:px-7 lg:py-5",

              index % 2 === 0 && !isLast && "border-r border-line",
              index < HOME_STATS.length - 1 && "border-b border-line",

              isLast && "col-span-2 lg:col-span-1",

              "lg:border-b-0",
              index < HOME_STATS.length - 1 &&
                "lg:border-r lg:border-line"
            )}
          >
            {/* YELLOW ACCENT */}

            <motion.span
              aria-hidden
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.45,
                delay: 0.1 + index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-[2px] w-7 origin-left bg-accent"
            />

            {/* VALUE */}

            <motion.p
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.45,
                delay: 0.14 + index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 text-[32px] font-medium leading-none tracking-[-0.05em] text-brand sm:text-[35px] lg:text-[38px]"
            >
              {stat.value}
            </motion.p>

            {/* LABEL */}

            <motion.p
              initial={{
                opacity: 0,
                y: 6,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: 0.19 + index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-2 max-w-[170px] text-[10px] font-semibold uppercase leading-[1.35] tracking-[0.065em] text-ink-soft"
            >
              {stat.label}
            </motion.p>
          </motion.div>
        );
      })}
    </div>
  </section>
);