"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/helpers/cn";
import { CATALOG_PRODUCTS, type ProductCategory } from "@/lib/products";

type CategoryFilter = "ALL" | ProductCategory;

type CategoryPanel = {
  id: CategoryFilter;
  number: string;
  title: string;
  subtitle: string;
  meta: string;
  activeClass: string;
};

const CATEGORY_PANELS: CategoryPanel[] = [
  {
    id: "ALL",
    number: "01",
    title: "All Chargers",
    subtitle: "Browse the full EV charging range",
    meta: `${CATALOG_PRODUCTS.length} products`,
    activeClass: "bg-inverse text-inverse-foreground",
  },
  {
    id: "AC",
    number: "02",
    title: "AC Charging",
    subtitle: "Home · Workplace · Destination",
    meta: "7 — 22 kW",
    activeClass: "bg-accent text-brand",
  },
  {
    id: "DC",
    number: "03",
    title: "DC Fast Charging",
    subtitle: "Commercial · Fleet · Public",
    meta: "30 — 120+ kW",
    activeClass: "bg-brand text-accent",
  },
];

export default function EVChargersPage() {
  const [filter, setFilter] = useState<CategoryFilter>("ALL");

  const visibleProducts = useMemo(() => {
    if (filter === "ALL") {
      return CATALOG_PRODUCTS;
    }

    return CATALOG_PRODUCTS.filter((product) => product.category === filter);
  }, [filter]);

  const filterLabel =
    filter === "ALL"
      ? "All chargers"
      : filter === "AC"
        ? "AC chargers"
        : "DC fast chargers";

  return (
    <main className="bg-paper text-ink">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products" },
          { label: "EV Charging" },
        ]}
      />

      <section className="page-pad pb-14 pt-14 lg:pb-16 lg:pt-16">
        <div className="page-shell flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionEyebrow>Multiline EV Charging</SectionEyebrow>
<h1 className="-ml-[5px] mt-5 text-[56px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[76px] lg:-ml-[7px] lg:text-[92px]">
  EV Chargers
</h1>
          </div>

<p className="max-w-[470px] text-[16px] leading-[1.65] text-ink-soft lg:text-right">
  AC and DC charging systems for homes, workplaces, commercial
  locations, fleets and public charging infrastructure.
</p>
        </div>
      </section>

      <section
  className="border-y border-line bg-surface"
  aria-label="Categories"
>
  {/* CATEGORY LABEL */}
  <div className="page-pad py-4">
    <div className="page-shell flex items-center justify-between">
      <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-ink-soft">
        Categories
      </span>

      <span className="hidden text-[11px] text-ink-faint sm:block">
        Select a charging type
      </span>
    </div>
  </div>

  {/* CATEGORY CARDS */}
  <div className="border-t border-line">
    <div className="page-shell grid lg:grid-cols-3">
      {CATEGORY_PANELS.map((panel, index) => {
        const isActive = filter === panel.id;
        const isLast = index === CATEGORY_PANELS.length - 1;

        return (
          <button
            key={panel.id}
            type="button"
            onClick={() => setFilter(panel.id)}
            aria-pressed={isActive}
            className={cn(
              "group min-h-[148px] border-b border-line px-5 py-7 text-left transition-colors md:px-8 lg:border-b-0 lg:px-12",
              !isLast && "lg:border-r lg:border-line",
              isActive
                ? panel.activeClass
                : "bg-surface text-ink hover:bg-paper"
            )}
          >
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-[0.09em]",
                    isActive ? "opacity-55" : "text-ink-faint"
                  )}
                >
                  {panel.number}
                </span>

                <span
                  className={cn(
                    "text-[11px]",
                    isActive ? "opacity-55" : "text-ink-faint"
                  )}
                >
                  {panel.meta}
                </span>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-[28px] font-medium tracking-[-0.045em]">
                    {panel.title}
                  </h2>

                  <p
                    className={cn(
                      "mt-2 text-[12px]",
                      isActive ? "opacity-70" : "text-ink-soft"
                    )}
                  >
                    {panel.subtitle}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="text-[20px] transition-transform duration-300 group-hover:translate-x-2"
                >
                  →
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
</section>

      <section id="products" className="page-pad border-b border-line py-8">
        <div className="page-shell flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionEyebrow>
              {filter === "ALL"
                ? "All products"
                : filter === "AC"
                  ? "AC charging"
                  : "DC fast charging"}
            </SectionEyebrow>
            <h2 className="mt-3 text-[36px] font-medium tracking-[-0.045em] md:text-[44px]">
              {filterLabel}.
            </h2>
          </div>

          <p className="text-[12px] text-ink-faint" aria-live="polite">
            {visibleProducts.length}{" "}
            {visibleProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
      </section>

      <section className="page-pad pb-20 pt-10 lg:pb-28 lg:pt-12">
        {visibleProducts.length === 0 ? (
          <EmptyState
            title="No chargers in this category"
            description="Try another category, or talk to an engineer about a custom configuration."
            action={
              <button
                type="button"
                onClick={() => setFilter("ALL")}
                className="text-[12px] font-semibold uppercase tracking-[0.08em] text-brand"
              >
                Show all chargers →
              </button>
            }
          />
        ) : (
          <div className="page-shell grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-line bg-surface page-pad py-14 lg:py-16">
        <div className="page-shell flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <SectionEyebrow>Charger compatibility</SectionEyebrow>
            <h2 className="mt-3 text-[32px] font-medium tracking-[-0.04em] md:text-[40px]">
              Not sure which charger fits your EV?
            </h2>
          </div>

          <Link
            href="/products/11kw-home-charger#compatibility"
            className="group flex min-w-[260px] items-center justify-between border-y border-line-strong py-5"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              Check compatibility
            </span>
            <span
              aria-hidden
              className="text-[18px] text-brand transition-transform duration-300 group-hover:translate-x-2"
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
