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
  image: string;
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
    image: "/images/products/charger-front1.png",
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
    description: "Practical AC charging designed for everyday overnight use.",
    connector: "Type 2",
    price: "From PKR 80,000",
    image: "/images/products/7kw-jensonn-ac.png",
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
    image: "/images/products/22kw-jensonn-ac.png",
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
    image: "/images/products/20kw-dc.png",
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
    image: "/images/products/60kw-dc.png",
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
    image: "/images/products/60kw-dc.png",
    imagePosition: "center",
    available: false,
  },
];

export const getCatalogProduct = (
  slug: string
): CatalogProduct | undefined =>
  CATALOG_PRODUCTS.find((product) => product.slug === slug);