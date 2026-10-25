import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { EVProductPage } from "@/components/ev/EVProductPage";
import { PRODUCT_PAGES, getProductPage } from "@/lib/productContent";

/* =========================================================
    /ev-charging/products/[slug]

    File goes at:
      src/app/ev-charging/products/[slug]/page.tsx

    Four slugs:
      7kw-home-charger
      11kw-home-charger
      22kw-smart-charger
      dc-fast-charging
========================================================= */

export function generateStaticParams() {
  return PRODUCT_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getProductPage(slug);

  if (!page) return {};

  return {
    title: `${page.title} | EV Charging | Multiline`,
    description: page.lede,
  };
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getProductPage(slug);

  if (!page) notFound();

  return <EVProductPage page={page} />;
}