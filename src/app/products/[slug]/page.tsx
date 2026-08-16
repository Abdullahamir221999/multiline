import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { CATALOG_PRODUCTS, getCatalogProduct } from "@/lib/products";

type ProductPreviewPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () =>
  CATALOG_PRODUCTS.filter(
    (product) =>
      product.slug !== "11kw-home-charger" &&
      product.slug !== "11kw-home-charger-alt"
  ).map((product) => ({ slug: product.slug }));

export const generateMetadata = async ({
  params,
}: ProductPreviewPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const product = getCatalogProduct(slug);

  if (!product) {
    return { title: "Product" };
  }

  return {
    title: product.name,
    description: product.description,
  };
};

export default async function ProductPreviewPage({
  params,
}: ProductPreviewPageProps) {
  const { slug } = await params;

  // Dedicated editorial / commerce templates own these routes.
  if (slug === "11kw-home-charger" || slug === "11kw-home-charger-alt") {
    notFound();
  }

  const product = getCatalogProduct(slug);

  if (!product) {
    notFound();
  }

  const isQuote = product.price === "Request Quote";

  return (
    <main className="bg-paper text-ink">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "EV Charging", href: "/ev-chargers" },
          { label: product.name },
        ]}
      />

      <section className="page-pad page-shell grid gap-12 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-20">
        <div className="relative aspect-[4/5] overflow-hidden bg-image-well lg:aspect-auto lg:min-h-[560px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-contain p-8"
          />
        </div>

        <div className="flex flex-col">
          <SectionEyebrow>
            {product.category === "AC" ? "AC Charging" : "DC Fast Charging"}
          </SectionEyebrow>

          <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
            {product.power} · {product.application}
          </p>

          <h1 className="font-display mt-4 text-[44px] font-medium leading-[1.02] tracking-[-0.04em] sm:text-[56px]">
            {product.name}
          </h1>

          <p className="mt-6 max-w-md text-[16px] leading-[1.65] text-ink-soft">
            {product.description}
          </p>

          <dl className="mt-10 grid grid-cols-2 border-y border-line-strong">
            <div className="border-r border-line py-5 pr-6">
              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                Connector
              </dt>
              <dd className="mt-2 text-[17px] font-semibold">{product.connector}</dd>
            </div>
            <div className="py-5 pl-6">
              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                Output
              </dt>
              <dd className="mt-2 text-[17px] font-semibold">{product.power}</dd>
            </div>
          </dl>

          <div className="mt-10 border-b border-line-strong pb-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-ink-faint">
              {isQuote ? "Commercial enquiry" : "Price"}
            </p>
            <p className="mt-2 text-[28px] font-medium tracking-[-0.04em]">
              {product.price}
            </p>
          </div>

          <div className="mt-8 rounded-none border border-dashed border-line bg-surface p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-brand">
              Coming soon
            </p>
            <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft">
              Full product details for this model are being published. You can
              still enquire with our engineering team today.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="primary" size="lg" showArrow>
              Request information
            </Button>
            <Button href="/ev-chargers" variant="secondary" size="lg" showArrow>
              Back to chargers
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
