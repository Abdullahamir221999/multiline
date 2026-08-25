import Image from "next/image";
import Link from "next/link";

import { createWhatsAppLink } from "@/lib/contact";
import { EV_PRODUCTS, type EVProduct } from "@/lib/evProducts";

const byOutput = (a: EVProduct, b: EVProduct) =>
  (a.outputKw ?? 0) - (b.outputKw ?? 0);

const homeChargers = EV_PRODUCTS.filter(
  (product) => product.category === "AC Chargers"
).sort(byOutput);

const siteChargers = EV_PRODUCTS.filter(
  (product) => product.category === "DC Chargers"
).sort(byOutput);

const enquiryLink = (title: string) =>
  createWhatsAppLink(
    `Hi Multiline, I'm interested in the ${title}. Please send me details and pricing.`
  );

export const EVProductCatalogue = () => {
  return (
    <section className="border-b border-line bg-white">
      <div className="page-shell">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid border-b border-line lg:grid-cols-[1.15fr_0.85fr]">
          <div className="px-5 py-8 md:px-8 lg:px-10 lg:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-brand">
              The Range
            </p>

            <h2 className="mt-3 max-w-[620px] text-[36px] font-semibold leading-[1] tracking-[-0.04em] text-ink sm:text-[42px] lg:text-[48px]">
              Browse every
              <br />
              charger we supply.
            </h2>
          </div>

          <div className="flex items-end px-5 pb-8 md:px-8 lg:border-l lg:px-10 lg:pb-10">
            <p className="max-w-[470px] text-[14px] leading-[1.65] text-ink-soft">
              Already know what you need? Pick it below. Every unit is
              supplied, installed and supported by Multiline, including
              the mounting stand and protection box.
            </p>
          </div>
        </div>

        {/* =====================================================
            HOME & WORKPLACE
        ===================================================== */}

        <ProductGroup
          title="For homes and workplaces"
          description="Everyday charging where the car is parked for a few hours or overnight."
          products={homeChargers}
        />

        {/* =====================================================
            BUSINESS & FLEET
        ===================================================== */}

        <ProductGroup
          title="For businesses, fleets and public sites"
          description="Faster charging for places where drivers stop briefly — shops, stations and depots."
          products={siteChargers}
        />

        {/* =====================================================
            INSTALLATION NOTE
        ===================================================== */}

        <div className="border-t border-line px-5 py-6 md:px-8 lg:px-10">
          <p className="max-w-[720px] text-[13px] leading-[1.6] text-ink-soft">
            Mounting stands and PIB protection boxes are supplied and
            fitted as part of every installation — you don&apos;t need
            to order them separately. Multiline confirms your
            electrical supply on site before installing.
          </p>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    PRODUCT GROUP
========================================================= */

function ProductGroup({
  title,
  description,
  products,
}: {
  title: string;
  description: string;
  products: EVProduct[];
}) {
  if (products.length === 0) return null;

  return (
    <div className="border-t border-line">
      {/* GROUP LABEL */}

      <div className="px-5 py-6 md:px-8 lg:px-10">
        <h3 className="text-[23px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
          {title}
        </h3>

        <p className="mt-2 max-w-[560px] text-[13px] leading-[1.55] text-ink-soft">
          {description}
        </p>
      </div>

      {/* PRODUCT GRID */}

      <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
    PRODUCT CARD
========================================================= */

function ProductCard({ product }: { product: EVProduct }) {
  return (
    <article className="group flex flex-col border-b border-r border-line bg-white">
      {/* IMAGE */}

      <div className="relative min-h-[200px] bg-[#F5F6F8]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* CONTENT */}

      <div className="flex flex-1 flex-col px-5 py-6 md:px-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="text-[19px] font-semibold tracking-[-0.025em] text-ink">
            {product.title}
          </h4>

          {product.outputKw && (
            <span className="text-[13px] font-semibold text-brand">
              {product.outputKw} kW
            </span>
          )}
        </div>

        <p className="mt-2 text-[13px] leading-[1.55] text-ink-soft">
          {product.summary ?? product.description}
        </p>

        {product.bestFor && (
          <p className="mt-2 text-[13px] leading-[1.55] text-ink-faint">
            {product.bestFor}
          </p>
        )}

        {/* The one technical fact a homeowner has to act on. */}
        {product.phase === 3 && (
          <p className="mt-3 w-fit bg-[#FDF3D6] px-2.5 py-1.5 text-[12px] font-semibold text-[#7A5A00]">
            Needs a three-phase (400V) supply
          </p>
        )}

        {/* PRICE + ACTIONS */}

        <div className="mt-auto pt-5">
          <p className="text-[14px] font-semibold text-ink">
            {product.priceFrom ?? "Price on request"}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={enquiryLink(product.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.04em] text-brand"
            >
              Enquire
              <span className="text-accent">→</span>
            </a>

            {product.href && (
              <Link
                href={product.href}
                className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.04em] text-ink-soft transition-colors hover:text-brand"
              >
                Full specs
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}