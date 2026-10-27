import type { CatalogProduct } from "@/lib/products";

/* =========================================================
    PRODUCT PAGE CONTENT

    Specs below are taken from the Jensonn datasheets
    (7kW / 11kW / 22kW, V1.0). Where a figure appears on a
    page it should match the PDF a visitor can download two
    sections later.

    Copy still needs Multiline's approval, but the technical
    claims are now sourced rather than assumed.
========================================================= */

export type Feature = {
  title: string;
  body: string;
  image: string;
};

export type Highlight = {
  label: string;
  value: string;
};

export type Capability = {
  title: string;
  body: string;
};

export type SpecRow = {
  label: string;
  value: string;
};

export type ProductDocument = {
  label: string;
  file: string;
  size?: string;
};

export type ProductPage = {
  slug: string;
  productSlugs: string[];
  category: "AC" | "DC";

  eyebrow: string;
  title: string;
  lede: string;

  introHeading: string;
  introBody: string;

  features: Feature[];
  highlights: Highlight[];

  capabilitiesHeading: string;
  capabilities: Capability[];

  /** Full table, straight off the datasheet. */
  specs: SpecRow[];

  documents: ProductDocument[];
};

/* ---------------------------------------------------------
    PROTECTION

    Identical across the three Jensonn units, so it's written
    once. Every figure here is on the datasheets.
--------------------------------------------------------- */

const JENSONN_PROTECTION: Capability[] = [
  {
    title: "Protected against unstable supply",
    body: "Cuts out above 265V and below 175V, with over-current protection at 110% of rated output. Built for a grid that doesn't always behave.",
  },
  {
    title: "Lightning and earth protection",
    body: "Surge protection, ground fault protection and relay bonding detection are built into the unit rather than left to the distribution board.",
  },
  {
    title: "IP65 enclosure",
    body: "Sealed against dust and water jets — a step above the IP54 rating most imported wallboxes carry, and it matters on an outdoor wall in monsoon season.",
  },
  {
    title: "Thermal cut-off",
    body: "Monitors its own temperature and stops at 80°C, resuming at 60°C. Rated for ambient temperatures from -25°C to +50°C.",
  },
];

const JENSONN_SPECS_COMMON: SpecRow[] = [
  { label: "Operating frequency", value: "50 Hz" },
  { label: "Enclosure rating", value: "IP65" },
  { label: "Operating temperature", value: "-25°C to +50°C" },
  { label: "Storage temperature", value: "-40°C to +60°C" },
  { label: "Cooling", value: "Natural" },
  { label: "Over-voltage protection", value: "≥ 265V" },
  { label: "Under-voltage protection", value: "≤ 175V" },
  { label: "Over-current protection", value: "≥ 110% rated output" },
  { label: "Over-temperature", value: "80°C cut-off, 60°C recovery" },
  { label: "Installation", value: "Wall-mounted or pedestal" },
  { label: "Standards", value: "IEC 61851-1, IEC 62196-2" },
];

export const PRODUCT_PAGES: ProductPage[] = [
  /* =====================================================
      7 kW
  ===================================================== */
  {
    slug: "7kw-home-charger",
    productSlugs: ["7kw-home-charger"],
    category: "AC",

    eyebrow: "AC Home Charger",
    title: "7kW Home Charger",
    lede: "Single-phase charging that runs on the supply almost every Pakistani home already has. Plug in overnight, drive on a full battery.",

    introHeading: "The one that fits your house as it is.",
    introBody:
      "Most homes in Pakistan run on a single-phase 230V connection, and this charger is built for exactly that — no supply upgrade, no new connection from the utility, no waiting. At 32A it delivers around four times the speed of a standard wall socket, which is enough to refill a typical EV between the time you park and the time you leave.",

    features: [
      {
        title: "No supply upgrade needed",
        body: "Runs on the single-phase 230V connection already at your property. Our engineers confirm your load can carry it before installation.",
        image: "/images/products/features/7kw-supply.jpg",
      },
      {
        title: "Card or app, your choice",
        body: "Start a session with the RFID card or over Bluetooth and Wi-Fi. The indicator light shows status at a glance from across the driveway.",
        image: "/images/products/features/7kw-rfid.jpg",
      },
      {
        title: "Wall or pedestal",
        body: "At 360 × 195 × 95 mm it sits flat against a garage or boundary wall, or on a floor pedestal where there's no wall to use.",
        image: "/images/products/features/7kw-mount.jpg",
      },
    ],

    highlights: [
      { label: "Output", value: "7.4 kW" },
      { label: "Supply", value: "Single-phase 230V" },
      { label: "Current", value: "32 A" },
      { label: "Protection", value: "IP65" },
    ],

    capabilitiesHeading: "Built for the way power works here.",
    capabilities: JENSONN_PROTECTION,

    specs: [
      { label: "Rated output", value: "7.4 kW" },
      { label: "Operating voltage", value: "230 Vac ± 15%" },
      { label: "Rated current", value: "32 A" },
      { label: "Connector", value: "Type 2" },
      { label: "Leakage protection", value: "Type A" },
      { label: "Communication", value: "Bluetooth / Wi-Fi" },
      { label: "Interface", value: "Indicator light + RFID reader" },
      { label: "Dimensions", value: "360 × 195 × 95 mm" },
      ...JENSONN_SPECS_COMMON,
    ],

    documents: [
      {
        label: "7kW product specification",
        file: "/docs/jensonn-7kw-specification.pdf",
        size: "PDF",
      },
    ],
  },

  /* =====================================================
      11 kW
  ===================================================== */
  {
    slug: "11kw-home-charger",
    productSlugs: ["11kw-home-charger"],
    category: "AC",

    eyebrow: "AC Home Charger",
    title: "11kW Home Charger",
    lede: "Three-phase charging for homes and offices with a 400V connection. Roughly half the charging time of a single-phase unit, with a screen and 4G on board.",

    introHeading: "When the supply allows, this is the one.",
    introBody:
      "If your property has a three-phase 400V connection — common in larger homes, offices and commercial buildings — the 11kW charger delivers the full AC charging speed most electric vehicles are designed to accept. Anything faster is wasted on the car; anything slower leaves capability on the table. It draws 16A per phase, so the supply requirement is modest for the output.",

    features: [
      {
        title: "Matches most EVs exactly",
        body: "The majority of electric cars cap their onboard AC charging at 11kW. This meets that ceiling without paying for headroom the vehicle can't use.",
        image: "/images/products/features/11kw-match.jpg",
      },
      {
        title: "4.3-inch display",
        body: "Live voltage, current, power and session energy on the unit itself — not buried in an app you have to open to check whether it's charging.",
        image: "/images/products/features/11kw-display.jpg",
      },
      {
        title: "Connected three ways",
        body: "Bluetooth, Wi-Fi and 4G, so the charger stays reachable even where home internet doesn't reach the garage.",
        image: "/images/products/features/11kw-connectivity.jpg",
      },
    ],

    highlights: [
      { label: "Output", value: "11 kW" },
      { label: "Supply", value: "Three-phase 400V" },
      { label: "Current", value: "16 A" },
      { label: "Display", value: "4.3 inch" },
    ],

    capabilitiesHeading: "Built for the way power works here.",
    capabilities: JENSONN_PROTECTION,

    specs: [
      { label: "Rated output", value: "11 kW" },
      { label: "Operating voltage", value: "400 Vac ± 15%" },
      { label: "Rated current", value: "16 A" },
      { label: "Connector", value: "Type 2" },
      { label: "Leakage protection", value: "Type A / A+DC 6mA" },
      { label: "Communication", value: "Bluetooth / Wi-Fi / 4G" },
      { label: "Interface", value: "4.3\" display + RFID reader" },
      { label: "Dimensions", value: "186 × 354 × 111 mm" },
      ...JENSONN_SPECS_COMMON,
    ],

    documents: [
      {
        label: "11kW product specification",
        file: "/docs/jensonn-11kw-specification.pdf",
        size: "PDF",
      },
    ],
  },

  /* =====================================================
      22 kW
  ===================================================== */
  {
    slug: "22kw-smart-charger",
    productSlugs: ["22kw-smart-charger"],
    category: "AC",

    eyebrow: "AC Charger",
    title: "22kW Smart Charger",
    lede: "The fastest AC charging available, for sites where vehicles turn over through the day rather than sitting overnight.",

    introHeading: "For places where cars don't stay long.",
    introBody:
      "At 22kW on a three-phase 400V supply drawing 32A per phase, this is the highest-output AC charger in the range. Worth saying plainly: most passenger EVs cap their onboard AC charging well below this, so the extra capacity pays off at shared sites — offices, showrooms, hotels — where one unit serves several vehicles across a day rather than one car overnight.",

    features: [
      {
        title: "Built for shared use",
        body: "One unit serving several vehicles through a working day, with RFID cards controlling who can start a session.",
        image: "/images/products/features/22kw-shared.jpg",
      },
      {
        title: "Readable at a glance",
        body: "A 4.3-inch display and a status light visible across a car park, so staff and visitors can see what's happening without asking.",
        image: "/images/products/features/22kw-display.jpg",
      },
      {
        title: "Offices, hotels, showrooms",
        body: "Destination charging that gives visitors a useful top-up in the time they're already on site — wall-mounted or on a pedestal.",
        image: "/images/products/features/22kw-destination.jpg",
      },
    ],

    highlights: [
      { label: "Output", value: "22 kW" },
      { label: "Supply", value: "Three-phase 400V" },
      { label: "Current", value: "32 A" },
      { label: "Display", value: "4.3 inch" },
    ],

    capabilitiesHeading: "Built for the way power works here.",
    capabilities: JENSONN_PROTECTION,

    specs: [
      { label: "Rated output", value: "22 kW" },
      { label: "Operating voltage", value: "400 Vac ± 15%" },
      { label: "Rated current", value: "32 A" },
      { label: "Connector", value: "Type 2" },
      { label: "Communication", value: "Bluetooth / Wi-Fi" },
      { label: "Interface", value: "4.3\" display + RFID reader" },
      { label: "Dimensions", value: "360 × 195 × 90 mm" },
      ...JENSONN_SPECS_COMMON,
    ],

    documents: [
      {
        label: "22kW product specification",
        file: "/docs/jensonn-22kw-specification.pdf",
        size: "PDF",
      },
    ],
  },

  /* =====================================================
      DC — one page, whole range
  ===================================================== */
  {
    slug: "dc-fast-charging",
    productSlugs: [
      "20kw-dc-fast-charger",
      "60kw-dc-fast-charger",
      "120kw-dc-fast-charger",
    ],
    category: "DC",

    eyebrow: "DC Fast Charging",
    title: "DC fast charging",
    lede: "Commercial charging infrastructure from 20kW to 120kW — for fleets, forecourts and public charging points where a useful charge has to happen inside a short stop.",

    introHeading: "Charging measured in minutes, not hours.",
    introBody:
      "DC charging bypasses the vehicle's onboard converter and feeds the battery directly, which is why it's faster by an order of magnitude. It's infrastructure rather than an appliance: the unit is one part of a project that includes the supply, the civil work and the siting. Multiline handles all of it.",

    features: [
      {
        title: "20kW to 120kW",
        body: "Output matched to how long vehicles actually stop — a restaurant and a highway forecourt need very different units.",
        image: "/images/products/features/dc-range.jpg",
      },
      {
        title: "Fleet and public sites",
        body: "Built for depots, fuel stations, hotels and commercial parking where utilisation is high and downtime costs money.",
        image: "/images/products/features/dc-fleet.jpg",
      },
      {
        title: "Full project delivery",
        body: "Supply assessment, civil works, installation and commissioning — handled as one piece of work with one point of contact.",
        image: "/images/products/features/dc-project.jpg",
      },
    ],

    highlights: [
      { label: "Output", value: "20–120 kW" },
      { label: "Supply", value: "Three-phase 400V" },
      { label: "Connector", value: "CCS2" },
      { label: "Application", value: "Commercial" },
    ],

    capabilitiesHeading: "Delivered as a project, not a product.",
    capabilities: [
      {
        title: "Site and load assessment",
        body: "We establish what the site's supply can carry before specifying a unit, and quote any upgrade as part of the same job.",
      },
      {
        title: "Civil and electrical works",
        body: "Foundations, cable routing, protection and commissioning handled by our own engineering team.",
      },
      {
        title: "CCS2 standard",
        body: "The connector standard used across the electric vehicles sold in Pakistan.",
      },
      {
        title: "Ongoing support",
        body: "Commercial sites can't wait on a fault. Multiline has supported charging installations nationwide since 2014.",
      },
    ],

    /* TODO: no DC datasheet supplied yet — these are the
       figures from the catalogue, not a spec sheet. */
    specs: [
      { label: "Output range", value: "20 / 60 / 120 kW" },
      { label: "Supply", value: "Three-phase 400V" },
      { label: "Connector", value: "CCS2" },
      { label: "Installation", value: "Floor-mounted" },
      { label: "Application", value: "Commercial, fleet, public" },
    ],

    documents: [],
  },
];

export const getProductPage = (slug: string): ProductPage | undefined =>
  PRODUCT_PAGES.find((page) => page.slug === slug);

export const getOtherPages = (slug: string): ProductPage[] =>
  PRODUCT_PAGES.filter((page) => page.slug !== slug);

export type { CatalogProduct };