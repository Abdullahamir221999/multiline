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
    price: "PKR 185,000",
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
    price: "PKR 135,000",
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
    price: "PKR 265,000",
    image: "/images/products/22kw-jensonn-ac.png",
    imagePosition: "center",
    available: false,
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
    image: "/images/products/60kw-dc.png",
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
    price: "Request Quote",
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
    price: "Request Quote",
    image: "/images/products/20kw-dc.png",
    imagePosition: "center",
    available: false,
  },
];

export const getCatalogProduct = (
  slug: string
): CatalogProduct | undefined =>
  CATALOG_PRODUCTS.find((product) => product.slug === slug);
