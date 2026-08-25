"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { createWhatsAppLink } from "@/lib/contact";
import { EV_PRODUCTS, type EVProduct } from "@/lib/evProducts";

/* =========================================================
    SECTION 06 — THE RANGE

    Plain by default: product floats on the canvas with just a
    name and a line. The panel, the zoom and the CTA only
    appear on hover — on touch, the CTA is always visible
    since there's no hover to reveal it.
========================================================= */

const ORDER: EVProduct["category"][] = [
  "AC Chargers",
  "DC Chargers",
  "PIB Boxes",
  "Stands",
];

const products = [...EV_PRODUCTS].sort((a, b) => {
  const byCategory =
    ORDER.indexOf(a.category) - ORDER.indexOf(b.category);

  if (byCategory !== 0) return byCategory;

  return (a.outputKw ?? 0) - (b.outputKw ?? 0);
});

export const EVProductRange = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-12% 0px",
  });

  return (
    <section
      ref={sectionRef}
      id="products"
      className="scroll-mt-24 bg-canvas py-20 lg:py-28"
    >
      <div className="page-pad page-shell">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={
            inView || reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 22 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[720px] text-center"
        >
          <h2 className="text-[38px] font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[52px]">
            Every charger we supply.
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-[1.65] text-ink-soft">
            Homes, workplaces and commercial sites — supplied,
            installed and supported nationwide.
          </p>
        </motion.div>

        {/* =====================================================
            GRID
        ===================================================== */}

        <div className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              inView={inView}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  index,
  inView,
  reduceMotion,
}: {
  product: EVProduct;
  index: number;
  inView: boolean;
  reduceMotion: boolean;
}) {
  const hasPage = Boolean(product.href);

  const href =
    product.href ??
    createWhatsAppLink(
      `Hi Multiline, I'm interested in the ${product.title}. Please send me details and pricing.`
    );

  const external = !hasPage;

  const Wrapper = external ? "a" : Link;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      animate={
        inView || reduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 26 }
      }
      transition={{
        duration: 0.6,
        delay: reduceMotion ? 0 : index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Wrapper
        
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="
          group
          relative
          flex
          h-full
          flex-col
          items-center
          rounded-3xl
          px-6
          pb-8
          pt-10
          text-center
          transition-colors
          duration-500
          hover:bg-canvas-deep/70
          focus-visible:bg-canvas-deep/70
        "
      >
        {/* NAME */}

        <h3 className="text-[24px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
          {product.title}
        </h3>

        <p className="mt-2 max-w-[260px] text-[14px] leading-[1.5] text-ink-soft">
          {product.summary ?? product.description}
        </p>

        {/* IMAGE */}

        <div className="relative my-8 h-[220px] w-full lg:h-[260px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
        </div>

        {/* PRICE */}

        {product.priceFrom && (
          <p className="mb-5 text-[14px] font-semibold text-ink">
            {product.priceFrom}
          </p>
        )}

        {/* CTA — always visible on touch, revealed on hover
            where there's a pointer to reveal it with */}

        <span
          className="
            mt-auto
            inline-flex
            h-[46px]
            items-center
            justify-center
            rounded-full
            bg-white
            px-6
            text-[13px]
            font-semibold
            text-ink
            shadow-[0_4px_20px_rgba(0,0,0,0.08)]
            transition-all
            duration-500
            lg:translate-y-2
            lg:opacity-0
            lg:group-hover:translate-y-0
            lg:group-hover:opacity-100
            lg:group-focus-visible:translate-y-0
            lg:group-focus-visible:opacity-100
          "
        >
          {hasPage ? `Discover ${product.title}` : "Enquire"}
          <span aria-hidden="true" className="ml-2">
            ›
          </span>
        </span>
      </Wrapper>
    </motion.div>
  );
}