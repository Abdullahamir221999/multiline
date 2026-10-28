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

  /**
   * Cut-out on a transparent background. Used anywhere the
   * product sits on the canvas with no frame — grids, the
   * "other solutions" row, the charger finder.
   */
  image: string;

  /**
   * Wide environmental or studio shot for the full-bleed
   * product page hero. Falls back to `image` where there
   * isn't one yet, which letterboxes — so these are worth
   * shooting properly.
   */
  heroImage?: string;

  imagePosition?: string;
  tag?: string;
  available: boolean;
};

/* ---------------------------------------------------------
    PRICING — Multiline list, 7 Apr 2026

    AC prices are the Jensonn Type 2 units. Ex-PIB,
    installation and sales tax, which is why they read
    "From" — the PIB alone is 17,000–195,000 depending on
    the unit.

    DC is quote-only on the client's list.
--------------------------------------------------------- */

export const CATALOG_PRODUCTS: CatalogProduct[] = [
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
       and the 7kW only an indicator strip — they should not be
       the same photo. */
    image: "/images/products/7kw-jenson-ac6.png",
    heroImage: "/images/products/11kw-hero.png",

    imagePosition: "center",
    // tag: "Recommended",
    available: true,
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
    price: "From PKR 80,000",

    image: "/images/products/7kw-jenson-ac6.png",
    heroImage: "/images/products/7kw-hero.png",

    imagePosition: "center",
    available: false,
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
    price: "From PKR 225,000",

    /* TODO: this render is a Smappee EV Wall, not a Jensonn.
       Either the image is wrong or Multiline sells the Smappee
       at 280,000 — in which case the spec table on this page
       is for the wrong unit. */
    image: "/images/products/22kw-jensonn-ac4.png",
    heroImage: "/images/products/22kw-jensonn-ac.png",

    imagePosition: "center",
    available: false,
  },
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
    available: false,
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
    // tag: "Commercial",
    available: false,
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

    /* TODO: no 120kW photography — reusing the 60kW. */
    image: "/images/products/60kw-dc2.png",
    heroImage: "/images/products/60kw-dc.png",

    imagePosition: "center",
    available: false,
  },
];

export const getCatalogProduct = (
  slug: string
): CatalogProduct | undefined =>
  CATALOG_PRODUCTS.find((product) => product.slug === slug);