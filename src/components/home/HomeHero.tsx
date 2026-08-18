"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { CONTACT_HREF } from "@/lib/navigation";

export const HomeHero = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="relative isolate overflow-hidden border-b border-line lg:grid lg:min-h-[calc(100svh-var(--header-height))] lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-full">
        <Image
          src="/images/solar-house.jpg"
          alt="Modern home with solar panels"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative flex flex-col justify-center bg-brand px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <motion.div {...fadeUp} className="max-w-[540px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
            Since 1975
          </p>

          <h1 className="mt-5 font-display text-[36px] font-medium leading-[1.05] tracking-[-0.03em] text-brand-foreground sm:text-[48px] lg:text-[56px]">
            Over 50 years of quality service to our clients.
          </h1>

          <p className="mt-6 max-w-[480px] text-[16px] leading-[1.65] text-brand-foreground/75 sm:text-[17px]">
            From diesel generators and licensed solar to EV charging — Multiline
            has engineered reliable power for Pakistan for over five decades.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={CONTACT_HREF}
              variant="accent"
              size="lg"
              showArrow
              className="min-w-[200px] justify-between text-accent-foreground sm:min-w-[220px]"
            >
              Get a Quote
            </Button>
            <Button
              href="#our-story"
              variant="inverse"
              size="lg"
              showArrow
              className="min-w-[200px] justify-between sm:min-w-[220px]"
            >
              Explore our story
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
