"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/helpers/cn";
import { HOME_PRODUCTS } from "@/lib/homeContent";

export const ProductCards = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="products-heading" className="border-b border-line">
      <div className="bg-brand px-6 py-5 text-center sm:px-10">
        <h2
          id="products-heading"
          className="text-[15px] font-semibold uppercase tracking-[0.12em] text-brand-foreground sm:text-[16px]"
        >
          Multiline Generators, Solar &amp; EV Charging
        </h2>
      </div>

      <div className="page-pad page-shell py-12 lg:py-16">
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {HOME_PRODUCTS.map((product) => (
            <li key={product.href}>
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "group flex h-full flex-col overflow-hidden border border-line bg-surface-elevated shadow-[0_8px_30px_rgba(17,17,17,0.06)]"
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-image-well">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className={cn(
                      "object-contain p-6 transition-transform duration-500",
                      !reduceMotion && "group-hover:scale-105"
                    )}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <h3 className="text-[22px] font-medium tracking-[-0.03em] sm:text-[24px]">
                    {product.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.65] text-ink-soft">
                    {product.description}
                  </p>
                  <Button
                    href={product.href}
                    variant="accent"
                    size="md"
                    showArrow
                    className="mt-6 w-full justify-between sm:w-auto"
                  >
                    Learn more
                  </Button>
                </div>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
