"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type CategoryFilter = "ALL" | "AC" | "DC";

type Product = {
  name: string;
  slug: string;
  category: "AC" | "DC";
  power: string;
  application: string;
  description: string;
  connector: string;
  price: string;
  image: string;
  imagePosition?: string;
  tag?: string;
};

const products: Product[] = [
  {
    name: "11kW Home Charger",
    slug: "11kw-home-charger",
    category: "AC",
    power: "11 kW",
    application: "Residential",
    description:
      "Balanced everyday home charging for compatible three-phase EVs.",
    connector: "Type 2",
    price: "PKR 185,000",
    image: "/images/products/charger-front1.png",
    imagePosition: "center",
    tag: "Recommended",
  },
  {
    name: "7kW Home Charger",
    slug: "7kw-home-charger",
    category: "AC",
    power: "7 kW",
    application: "Residential",
    description:
      "Practical AC charging designed for everyday overnight use.",
    connector: "Type 2",
    price: "PKR 135,000",
    image: "/images/products/7kw-jensonn-ac.png",
    imagePosition: "center",
  },
  {
    name: "22kW Smart Charger",
    slug: "22kw-smart-charger",
    category: "AC",
    power: "22 kW",
    application: "Home / Commercial",
    description:
      "Higher-output AC charging for compatible vehicles and sites.",
    connector: "Type 2",
    price: "PKR 265,000",
    image: "/images/products/22kw-jensonn-ac.png",
    imagePosition: "center",
  },
  {
    name: "30kW DC Fast Charger",
    slug: "30kw-dc-fast-charger",
    category: "DC",
    power: "30 kW",
    application: "Commercial",
    description:
      "Compact DC charging for workplaces and commercial locations.",
    connector: "CCS2",
    price: "Request Quote",
    image: "/images/products/22kw-smapee-ac.png",
    imagePosition: "center",
  },
  {
    name: "60kW DC Fast Charger",
    slug: "60kw-dc-fast-charger",
    category: "DC",
    power: "60 kW",
    application: "Commercial",
    description:
      "Fast-charging infrastructure for commercial and public locations.",
    connector: "CCS2",
    price: "Request Quote",
    image: "/images/products/60kw-dc.png",
    imagePosition: "center",
    tag: "Commercial",
  },
  {
    name: "120kW DC Fast Charger",
    slug: "120kw-dc-fast-charger",
    category: "DC",
    power: "120 kW",
    application: "Fleet / Public",
    description:
      "High-output charging infrastructure for fleets and public networks.",
    connector: "CCS2",
    price: "Request Quote",
    image: "/images/products/20kw-dc.png",
    imagePosition: "center",
  },
];

export default function EVChargersPage() {
  const [filter, setFilter] = useState<CategoryFilter>("ALL");

  const visibleProducts = useMemo(() => {
    if (filter === "ALL") {
      return products;
    }

    return products.filter((product) => product.category === filter);
  }, [filter]);

  return (
    <main className="bg-[#f5f3ed] text-[#101010]">
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="border-b border-black/15 px-5 py-[18px] md:px-8 lg:px-12">
        <div className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.065em] text-black/45">
          <Link href="/">Home</Link>

          <span className="text-black/20">/</span>

          <span>Products</span>

          <span className="text-black/20">/</span>

          <span className="text-black">EV Charging</span>
        </div>
      </div>

      {/* =====================================================
          CATEGORY HEADER
      ===================================================== */}

      <section className="px-5 pb-16 pt-16 md:px-8 lg:px-12 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#124897]">
                Multiline EV Charging
              </p>

              <h1 className="mt-5 text-[68px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[84px] lg:text-[98px]">
                EV Chargers
              </h1>
            </div>

            <p className="max-w-[470px] text-[16px] leading-[1.65] text-black/50">
              AC and DC charging systems for homes, workplaces, commercial
              locations, fleets and public charging infrastructure.
            </p>
          </div>
        </div>
      </section>

{/* =====================================================
    CATEGORY NAVIGATION
===================================================== */}

<section className="border-y border-black/15 bg-[#f2f0e9]">
  <div className="px-5 py-4 md:px-8 lg:px-12">
    <div className="mx-auto flex max-w-[1600px] items-center justify-between">
      <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-black/55">
        Categories
      </span>

      <span className="hidden text-[11px] text-black/35 sm:block">
        Browse charging systems
      </span>
    </div>
  </div>

  <div className="border-t border-black/15">
    <div className="mx-auto grid max-w-[1600px] lg:grid-cols-3">
      {/* ALL */}
      <button
        type="button"
        onClick={() => setFilter("ALL")}
        className={`group min-h-[160px] border-b border-black/15 px-5 py-7 text-left md:px-8 lg:border-b-0 lg:border-r lg:px-10 ${
          filter === "ALL"
            ? "bg-[#101010] text-white"
            : "bg-[#f2f0e9] text-[#101010]"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.09em] ${
                filter === "ALL"
                  ? "text-white/45"
                  : "text-black/35"
              }`}
            >
              01
            </span>

            <span
              className={`text-[11px] ${
                filter === "ALL"
                  ? "text-white/40"
                  : "text-black/35"
              }`}
            >
              {products.length} products
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-[30px] font-medium tracking-[-0.045em]">
                All Chargers
              </h3>

              <p
                className={`mt-2 text-[12px] ${
                  filter === "ALL"
                    ? "text-white/45"
                    : "text-black/45"
                }`}
              >
                Browse the full EV charging range
              </p>
            </div>

            <span className="text-[20px] transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>
        </div>
      </button>

      {/* AC */}
      <button
        type="button"
        onClick={() => setFilter("AC")}
        className={`group min-h-[160px] border-b border-black/15 px-5 py-7 text-left md:px-8 lg:border-b-0 lg:border-r lg:px-10 ${
          filter === "AC"
            ? "bg-[#f2ca30] text-[#124897]"
            : "bg-[#f2f0e9] text-[#101010]"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.09em] ${
                filter === "AC"
                  ? "text-[#124897]/55"
                  : "text-black/35"
              }`}
            >
              02
            </span>

            <span
              className={`text-[11px] ${
                filter === "AC"
                  ? "text-[#124897]/55"
                  : "text-black/35"
              }`}
            >
              7 — 22 kW
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-[30px] font-medium tracking-[-0.045em]">
                AC Charging
              </h3>

              <p
                className={`mt-2 text-[12px] ${
                  filter === "AC"
                    ? "text-[#124897]/65"
                    : "text-black/45"
                }`}
              >
                Home · Workplace · Destination
              </p>
            </div>

            <span className="text-[20px] transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>
        </div>
      </button>

      {/* DC */}
      <button
        type="button"
        onClick={() => setFilter("DC")}
        className={`group min-h-[160px] px-5 py-7 text-left md:px-8 lg:px-10 ${
          filter === "DC"
            ? "bg-[#124897] text-[#f2ca30]"
            : "bg-[#f2f0e9] text-[#101010]"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.09em] ${
                filter === "DC"
                  ? "text-[#f2ca30]/60"
                  : "text-black/35"
              }`}
            >
              03
            </span>

            <span
              className={`text-[11px] ${
                filter === "DC"
                  ? "text-[#f2ca30]/60"
                  : "text-black/35"
              }`}
            >
              30 — 120+ kW
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-[30px] font-medium tracking-[-0.045em]">
                DC Fast Charging
              </h3>

              <p
                className={`mt-2 text-[12px] ${
                  filter === "DC"
                    ? "text-[#f2ca30]/65"
                    : "text-black/45"
                }`}
              >
                Commercial · Fleet · Public
              </p>
            </div>

            <span className="text-[20px] transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>
        </div>
      </button>
    </div>
  </div>
</section>

      {/* =====================================================
          PRODUCT TOOLBAR
      ===================================================== */}

      <section
        id="products"
        className="border-b border-black/15 px-5 py-8 md:px-8 lg:px-12"
      >
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#124897]">
              {filter === "ALL"
                ? "All Products"
                : filter === "AC"
                  ? "AC Charging"
                  : "DC Fast Charging"}
            </p>

            <h2 className="mt-3 text-[40px] font-medium tracking-[-0.045em] md:text-[48px]">
              {filter === "ALL"
                ? "All chargers."
                : filter === "AC"
                  ? "AC chargers."
                  : "DC fast chargers."}
            </h2>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-[12px] text-black/40">
              {visibleProducts.length}{" "}
              {visibleProducts.length === 1 ? "product" : "products"}
            </span>

            <div className="flex items-center gap-2">
              <FilterButton
                active={filter === "ALL"}
                onClick={() => setFilter("ALL")}
              >
                All
              </FilterButton>

              <FilterButton
                active={filter === "AC"}
                onClick={() => setFilter("AC")}
              >
                AC
              </FilterButton>

              <FilterButton
                active={filter === "DC"}
                onClick={() => setFilter("DC")}
              >
                DC
              </FilterButton>
            </div>
          </div>
        </div>
      </section>

{/* =====================================================
    PRODUCTS
===================================================== */}

<section className="px-5 pb-24 pt-10 md:px-8 lg:px-12 lg:pb-32 lg:pt-12">
  <div className="mx-auto grid max-w-[1600px] gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
    {visibleProducts.map((product) => (
      <ProductCard
        key={product.slug}
        product={product}
      />
    ))}
  </div>
</section>
      

      {/* =====================================================
          SIMPLE ASSISTANCE CTA
      ===================================================== */}

      <section className="border-t border-black/15 bg-[#f2f0e9] px-5 py-14 md:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#124897]">
              Charger Compatibility
            </p>

            <h2 className="mt-3 text-[34px] font-medium tracking-[-0.04em] md:text-[42px]">
              Not sure which charger fits your EV?
            </h2>
          </div>

          <Link
            href="/products/11kw-home-charger#compatibility"
            className="group flex min-w-[280px] items-center justify-between border-y border-black/25 py-5"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              Check My Vehicle
            </span>

            <span className="text-[18px] text-[#124897] transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   CATEGORY CARD
========================================================= */

function CategoryCard({
  active,
  label,
  subtitle,
  image,
  onClick,
  accent,
  last = false,
}: {
  active: boolean;
  label: string;
  subtitle: string;
  image: string;
  onClick: () => void;
  accent?: "yellow" | "blue";
  last?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group text-left md:border-r ${
        last ? "md:border-r-0" : "border-black/15"
      }`}
    >
      <div className="relative aspect-[16/7] overflow-hidden bg-[#d9d9d4]">
        <Image
          src={image}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-black/[0.04]" />

        {active && (
          <div
            className={`absolute bottom-0 left-0 h-[5px] w-full ${
              accent === "yellow"
                ? "bg-[#f2ca30]"
                : accent === "blue"
                  ? "bg-[#124897]"
                  : "bg-[#101010]"
            }`}
          />
        )}
      </div>

      <div
        className={`flex items-center justify-between border-b border-black/15 px-5 py-5 transition-colors md:border-b-0 lg:px-7 ${
          active ? "bg-white" : "bg-[#f2f0e9] group-hover:bg-white/60"
        }`}
      >
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.02em]">
            {label}
          </p>

          <p className="mt-1 text-[11px] text-black/40">
            {subtitle}
          </p>
        </div>

        <span
          className={`text-[17px] transition-transform duration-300 group-hover:translate-x-1 ${
            active ? "text-[#124897]" : "text-black/35"
          }`}
        >
          →
        </span>
      </div>
    </button>
  );
}

/* =========================================================
   FILTER BUTTON
========================================================= */

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.07em] transition-colors ${
        active
          ? "border-[#124897] bg-[#124897] text-white"
          : "border-black/15 bg-transparent text-black/50 hover:border-black/30 hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

function ProductCard({
  product,
}: {
  product: Product;
}) {
  const isQuote = product.price === "Request Quote";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col border border-black/15 bg-[#f8f7f2] transition-colors duration-300 hover:border-black/30"
    >
      {/* ================================================
          IMAGE
      ================================================= */}

      <div className="relative m-3 mb-0 aspect-[4/3] overflow-hidden bg-[#deded8]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          style={{
            objectPosition: product.imagePosition ?? "center",
          }}
        />

        {/* Category */}
        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.075em] backdrop-blur-sm ${
              product.category === "AC"
                ? "border-[#124897]/20 bg-[#f2ca30]/95 text-[#124897]"
                : "border-[#124897] bg-[#124897]/95 text-[#f2ca30]"
            }`}
          >
            {product.category === "AC"
              ? "AC Charging"
              : "DC Fast Charging"}
          </span>
        </div>

        {/* Optional tag */}
        {product.tag && (
          <div className="absolute right-4 top-4">
            <span className="inline-flex border border-black/10 bg-[#f8f7f2]/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.075em] text-black/65 backdrop-blur-sm">
              {product.tag}
            </span>
          </div>
        )}

        {/* Arrow */}
        <div className="absolute bottom-4 right-4 flex h-[42px] w-[42px] items-center justify-center bg-[#f8f7f2] text-[18px] text-[#124897] transition-transform duration-300 group-hover:translate-x-1">
          →
        </div>
      </div>

      {/* ================================================
          CONTENT
      ================================================= */}

      <div className="flex flex-1 flex-col px-6 pb-7 pt-6 lg:px-7">
        {/* Power + application */}

        <div className="flex items-center justify-between gap-6">
          <span className="text-[12px] font-semibold uppercase tracking-[0.065em] text-[#124897]">
            {product.power}
          </span>

          <span className="text-right text-[11px] font-medium uppercase tracking-[0.055em] text-black/40">
            {product.application}
          </span>
        </div>

        {/* Product name */}

        <h3 className="font-display mt-5 text-[29px] font-medium leading-[1.05] tracking-[-0.025em] lg:text-[32px]">
          {product.name}
        </h3>

        {/* Description */}

        <p className="mt-3 max-w-[390px] text-[13px] leading-[1.65] text-black/50">
          {product.description}
        </p>

        {/* Product specifications */}

        <div className="mt-8 flex items-center gap-7 border-t border-black/12 pt-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-black/35">
              Connector
            </p>

            <p className="mt-1.5 text-[13px] font-medium">
              {product.connector}
            </p>
          </div>

          <div className="h-8 w-px bg-black/12" />

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-black/35">
              Output
            </p>

            <p className="mt-1.5 text-[13px] font-medium">
              {product.power}
            </p>
          </div>
        </div>

        {/* Price */}

        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between border-t border-black/12 pt-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-black/35">
                {isQuote ? "Commercial enquiry" : "Price"}
              </p>

              <p className="mt-2 text-[16px] font-semibold tracking-[-0.02em]">
                {product.price}
              </p>
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.07em] text-[#124897]">
              {isQuote ? "View System →" : "View Product →"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}