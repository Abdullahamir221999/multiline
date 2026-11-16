export type ProductCategory = "AC" | "DC";

export type CatalogProduct = {
  name: string;
  slug: string;
  category: ProductCategory;
  power: string;
  application: string;
  description: string;
  connector: string;
  price: string;

  /** Cut-out on transparent background — grids and finder cards. */
  image: string;

  /** Wide shot for the full-bleed product page hero. */
  heroImage?: string;

  imagePosition?: string;
  tag?: string;
  available: boolean;
};

/* ---------------------------------------------------------
    PRICING — Multiline list, 7 Apr 2026

    Prices exclude the PIB, installation and sales tax. The
    PIB is quoted separately after the site inspection, so
    these read "From".
--------------------------------------------------------- */

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    name: "7kW Home Charger",
    slug: "7kw-home-charger",
    category: "AC",
    power: "7 kW",
    application: "Residential",
    description:
      "Practical AC charging designed for everyday overnight use.",
    connector: "Type 2",
    price: "From PKR 80,000",
    image: "/images/products/7kw-jenson-ac6.png",
    heroImage: "/images/products/7kw-hero.png",
    imagePosition: "center",
    available: true,
  },
  {
    name: "11kW Home Charger",
    slug: "11kw-home-charger",
    category: "AC",
    power: "11 kW",
    application: "Residential",
    description:
      "Balanced everyday home charging for compatible three-phase EVs.",
    connector: "Type 2",
    price: "From PKR 150,000",

    /* TODO: shares the 7kW cut-out. The 11kW has a 4.3" display
       and the 7kW only an indicator strip. */
    image: "/images/products/7kw-jenson-ac6.png",
    heroImage: "/images/products/charger-front1.png",
    imagePosition: "center",
    available: true,
  },

  /* =====================================================
      22 kW — two units on one page

      Multiline stocks both a Jensonn and a Smappee at
      22 kW. Same page, two variants (see TWENTY_TWO_KW
      below); this entry is the page's own identity and
      carries the lower of the two prices.
  ===================================================== */
  {
    name: "22kW Smart Charger",
    slug: "22kw-smart-charger",
    category: "AC",
    power: "22 kW",
    application: "Home / Commercial",
    description:
      "Higher-output AC charging for compatible vehicles and sites.",
    connector: "Type 2",
    price: "From PKR 225,000",
    image: "/images/products/22kw-jensonn-ac4.png",
    heroImage: "/images/products/22kw-jensonn-ac.png",
    imagePosition: "center",
    available: true,
  },

  /* =====================================================
      DC — 20 / 40 / 60 / 80 / 120 / 180 kW, confirmed
      with Multiline 15 Nov 2026. All quote-only.
  ===================================================== */
  {
    name: "20kW DC Fast Charger",
    slug: "20kw-dc-fast-charger",
    category: "DC",
    power: "20 kW",
    application: "Commercial",
    description:
      "Compact DC charging for workplaces and commercial locations.",
    connector: "CCS2",
    price: "Call to enquire",
    image: "/images/products/20kw-dc2.png",
    heroImage: "/images/products/20kw-dc.png",
    imagePosition: "center",
    available: true,
  },
  {
    name: "40kW DC Fast Charger",
    slug: "40kw-dc-fast-charger",
    category: "DC",
    power: "40 kW",
    application: "Commercial",
    description:
      "Mid-range DC charging for sites with steady turnover.",
    connector: "CCS2",
    price: "Call to enquire",
    /* TODO: no 40kW photography — reusing the 20kW. */
    image: "/images/products/20kw-dc2.png",
    heroImage: "/images/products/20kw-dc.png",
    imagePosition: "center",
    available: true,
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
    price: "Call to enquire",
    image: "/images/products/60kw-dc2.png",
    heroImage: "/images/products/60kw-dc.png",
    imagePosition: "center",
    available: true,
  },
  {
    name: "80kW DC Fast Charger",
    slug: "80kw-dc-fast-charger",
    category: "DC",
    power: "80 kW",
    application: "Fleet / Public",
    description:
      "High-output charging for fleet depots and busy public sites.",
    connector: "CCS2",
    price: "Call to enquire",
    /* TODO: no 80kW photography — reusing the 60kW. */
    image: "/images/products/60kw-dc2.png",
    heroImage: "/images/products/60kw-dc.png",
    imagePosition: "center",
    available: true,
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
    price: "Call to enquire",
    image: "/images/products/60kw-dc2.png",
    heroImage: "/images/products/60kw-dc.png",
    imagePosition: "center",
    available: true,
  },
  {
    name: "180kW DC Fast Charger",
    slug: "180kw-dc-fast-charger",
    category: "DC",
    power: "180 kW",
    application: "Highway / Public",
    description:
      "The highest output in the range, for highway and high-traffic charging points.",
    connector: "CCS2",
    price: "Call to enquire",
    image: "/images/products/60kw-dc2.png",
    heroImage: "/images/products/60kw-dc.png",
    imagePosition: "center",
    available: true,
  },
];

export const getCatalogProduct = (
  slug: string
): CatalogProduct | undefined =>
  CATALOG_PRODUCTS.find((product) => product.slug === slug);