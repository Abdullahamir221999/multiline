"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/helpers/cn";
import { HOME_PRODUCTS } from "@/lib/homeContent";

export const ProductCards = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="products-heading"
      className="border-b border-line bg-paper"
    >
      {/* =====================================================
          COMPACT INTRO
      ===================================================== */}

      <div className="page-pad page-shell border-b border-line py-6 lg:py-7">
        <div className="grid gap-4 lg:grid-cols-[0.55fr_1.45fr] lg:items-center">
          {/* LABEL */}

          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-brand">
            What we build
          </p>

          {/* TITLE + DESCRIPTION */}

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <h2
              id="products-heading"
              className="max-w-[500px] text-[31px] font-medium leading-[0.98] tracking-[-0.04em] sm:text-[36px] lg:text-[40px]"
            >
              Generators, solar
              <br />
              &amp; EV charging.
            </h2>

            <p className="max-w-[420px] text-[13px] leading-[1.55] text-ink-soft">
              Integrated energy systems designed, supplied and supported for
              homes, businesses and infrastructure across Pakistan.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <div className="page-shell">
        <ul className="grid md:grid-cols-2 xl:grid-cols-3">
          {HOME_PRODUCTS.map((product, index) => (
            <li
              key={product.href}
              className={cn(
                "border-b border-line",
                index % 2 === 0 && "md:border-r",
                index === HOME_PRODUCTS.length - 1 &&
                  "md:col-span-2 xl:col-span-1",
                "xl:border-b-0",
                index < HOME_PRODUCTS.length - 1 && "xl:border-r"
              )}
            >
              <motion.article
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 18,
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
                  duration: 0.55,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex h-full flex-col"
              >
                {/* IMAGE */}

                <div className="relative aspect-[16/9] overflow-hidden bg-[#EFF3FF]">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className={cn(
                      "object-contain p-6 transition-transform duration-700 lg:p-7",
                      !reduceMotion && "group-hover:scale-[1.03]"
                    )}
                  />
                </div>

                {/* CONTENT */}

                <div className="flex flex-1 flex-col px-5 py-5 md:px-6 lg:px-7">
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="text-[23px] font-medium leading-[1] tracking-[-0.035em] sm:text-[25px]">
                      {product.title}
                    </h3>

                    <span className="text-[17px] text-brand transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <p className="mt-3 max-w-[380px] flex-1 text-[13px] leading-[1.6] text-ink-soft">
                    {product.description}
                  </p>

                  <div className="mt-5 border-t border-line pt-4">
                    <Button
                      href={product.href}
                      variant="secondary"
                      size="md"
                      showArrow
                      className="border-0 p-0 text-brand hover:bg-transparent"
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};