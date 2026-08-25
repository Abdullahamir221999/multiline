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

  /** Plain-language line for non-technical buyers. Shown on cards. */
  summary?: string;

  /** Who the unit suits, in words. Shown under the summary. */
  bestFor?: string;

  /** Display price range, e.g. "From PKR 165,000". Omit to show "Request price". */
  priceFrom?: string;

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
    image: "/images/products/7kw-jenson-ac6.png",
    description:
      "Compact home charging solution for everyday residential use.",
    summary:
      "Charges a typical EV overnight — plug in at night, full by morning.",
    bestFor: "Homes on a standard single-phase connection.",
    // TODO: confirm range with Multiline
    // priceFrom: "From PKR 000,000",
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
    image: "/images/products/7kw-jenson-ac6.png",
    description:
      "Fast and practical three-phase home charging for compatible EVs.",
    summary:
      "Roughly half the charging time of a 7kW unit, on a heavier supply.",
    bestFor:
      "Homes and offices with a three-phase (400V) connection.",
    // priceFrom: "From PKR 000,000",
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
    image: "/images/products/22kw-jensonn-ac4.png",
    description:
      "Higher-output AC charging for homes, offices and destination charging.",
    summary:
      "The fastest AC option — though most cars can't draw the full 22kW.",
    bestFor:
      "Offices, showrooms and hotels with three-phase power.",
    // priceFrom: "From PKR 000,000",
    output: "22 kW",
    outputKw: 22,
    connector: "Type 2",
    supply: "3 Phase",
    phase: 3,
  },

  {
    id: "20kw-dc",
    title: "20kW DC Fast Charger",
    category: "DC Chargers",
    image: "/images/products/20kw-dc2.png",
    description:
      "Compact DC fast charging for commercial and fleet environments.",
    summary:
      "Tops up a car in about an hour and a half instead of overnight.",
    bestFor:
      "Shops, restaurants and small fleet yards where cars stop briefly.",
    // priceFrom: "From PKR 000,000",
    output: "20 kW",
    outputKw: 20,
    connector: "CCS2",
    supply: "3 Phase",
    phase: 3,
  },

  {
    id: "60kw-dc",
    title: "60kW DC Fast Charger",
    category: "DC Chargers",
    image: "/images/products/60kw-dc2.png",
    description:
      "Commercial fast charging designed for higher-utilisation locations.",
    summary:
      "The fastest unit in the range — a useful charge inside a short stop.",
    bestFor:
      "Fuel stations, highways and busy commercial charging points.",
    // priceFrom: "From PKR 000,000",
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