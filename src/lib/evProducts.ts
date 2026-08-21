export type EVProductCategory =
  | "AC Chargers"
  | "DC Chargers"
  | "PIB Boxes"
  | "Stands";

export type EVProduct = {
  id: string;
  title: string;
  category: EVProductCategory;
  image: string;
  description: string;

  output?: string;
  outputKw?: number;
  connector?: string;
  supply?: string;
  /** Electrical supply the unit requires. Omit for non-powered items. */
  phase?: 1 | 3;
  protection?: string;

  href?: string;
};

export const EV_PRODUCTS: EVProduct[] = [
  {
    id: "7kw-ac",
    title: "7kW Home EV Charger",
    category: "AC Chargers",
    image: "/images/products/7kw-jensonn-ac3.png",
    description:
      "Compact home charging solution for everyday residential use.",
    output: "7 kW",
    outputKw: 7,
    connector: "Type 2",
    supply: "Single Phase",
    phase: 1,
  },

  {
    id: "11kw-ac",
    title: "11kW Home EV Charger",
    category: "AC Chargers",
    image: "/images/products/11kw-jensonn.png",
    description:
      "Fast and practical three-phase home charging for compatible EVs.",
    output: "11 kW",
    outputKw: 11,
    connector: "Type 2",
    supply: "3 Phase",
    phase: 3,
    protection: "IP65",
    href: "/products/11kw-home-charger",
  },

  {
    id: "22kw-ac",
    title: "22kW AC EV Charger",
    category: "AC Chargers",
    image: "/images/products/22kw-jensonn-ac3.png",
    description:
      "Higher-output AC charging for homes, offices and destination charging.",
    output: "22 kW",
    outputKw: 22,
    connector: "Type 2",
    supply: "3 Phase",
    phase: 3,
  },

  {
    id: "30kw-dc",
    title: "30kW DC Fast Charger",
    category: "DC Chargers",
    image: "/images/products/30kw-dc.png",
    description:
      "Compact DC fast charging for commercial and fleet environments.",
    output: "30 kW",
    outputKw: 30,
    connector: "CCS2",
    supply: "3 Phase",
    phase: 3,
  },

  {
    id: "60kw-dc",
    title: "60kW DC Fast Charger",
    category: "DC Chargers",
    image: "/images/products/60kw-dc.png",
    description:
      "Commercial fast charging designed for higher-utilisation locations.",
    output: "60 kW",
    outputKw: 60,
    connector: "CCS2",
    supply: "3 Phase",
    phase: 3,
  },

  {
    id: "pib-box",
    title: "EV Charger PIB Box",
    category: "PIB Boxes",
    image: "/images/products/pib-box.png",
    description:
      "Protective electrical infrastructure for safe EV charger installations.",
  },

  {
    id: "charger-stand",
    title: "EV Charger Stand",
    category: "Stands",
    image: "/images/products/charger-stand.png",
    description:
      "Freestanding mounting solution for compatible EV charging units.",
  },
];