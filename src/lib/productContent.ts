import type { CatalogProduct } from "@/lib/products";

/* =========================================================
    PRODUCT PAGE CONTENT

    Four pages: 7kW, 11kW, 22kW, and one page covering the
    whole DC range.

    ALL COPY BELOW IS A DRAFT written from the spec sheets.
    Multiline should read it before launch — particularly the
    "built for Pakistan" claims, which assert things about
    the hardware I can't verify (surge tolerance, IP rating,
    warranty length).
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

export type ProductDocument = {
  label: string;
  file: string;
  size?: string;
};

export type ProductPage = {
  slug: string;
  /** Slugs from CATALOG_PRODUCTS shown on this page. */
  productSlugs: string[];
  category: "AC" | "DC";

  /** Hero */
  eyebrow: string;
  title: string;
  lede: string;

  /** Section 2 */
  introHeading: string;
  introBody: string;

  /** Section 3 */
  features: Feature[];

  /** Section 4 */
  highlights: Highlight[];

  /** Section 5 */
  capabilitiesHeading: string;
  capabilities: Capability[];

  /** Section 7 */
  documents: ProductDocument[];
};

/* ---------------------------------------------------------
    DOCUMENTS

    Drop the PDFs in /public/docs/. Sizes are shown so nobody
    opens a 12MB file on mobile data by accident — update them
    to the real figures.
--------------------------------------------------------- */

const JENSONN_AC_DOCS: ProductDocument[] = [
  {
    label: "Product datasheet",
    file: "/docs/jensonn-ac-datasheet.pdf",
    size: "PDF",
  },
  {
    label: "Installation guide",
    file: "/docs/jensonn-ac-installation.pdf",
    size: "PDF",
  },
  {
    label: "User manual",
    file: "/docs/jensonn-ac-manual.pdf",
    size: "PDF",
  },
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
    lede: "Single-phase charging that fits the supply almost every Pakistani home already has. Plug in overnight, drive on a full battery.",

    introHeading: "The one that fits your house as it is.",
    introBody:
      "Most homes in Pakistan run on a single-phase 230V connection. The 7kW charger is built for exactly that — no supply upgrade, no new connection from the utility, no waiting. It delivers around four times the speed of a standard wall socket, which is enough to refill a typical EV between the time you park and the time you leave.",

    features: [
      {
        title: "No supply upgrade needed",
        body: "Runs on the single-phase connection already at your property. Our team confirms your load before installation.",
        image: "/images/products/features/7kw-supply.jpg",
      },
      {
        title: "Full charge overnight",
        body: "A typical EV goes from low to full in the hours it sits parked. You never plan around charging.",
        image: "/images/products/features/7kw-overnight.jpg",
      },
      {
        title: "Wall-mounted and compact",
        body: "Sits flat against a garage or boundary wall, with a tethered Type 2 cable that stores on the unit.",
        image: "/images/products/features/7kw-mount.jpg",
      },
    ],

    highlights: [
      { label: "Output", value: "7 kW" },
      { label: "Supply", value: "Single-phase 230V" },
      { label: "Connector", value: "Type 2" },
      { label: "Mounting", value: "Wall" },
    ],

    capabilitiesHeading: "Built for the way power works here.",
    capabilities: [
      {
        title: "Protected against supply faults",
        body: "Built-in protection against over-voltage, under-voltage and leakage current — the conditions a Pakistani grid connection actually sees.",
      },
      {
        title: "Weather-rated enclosure",
        body: "Sealed against dust and rain, so it can be mounted outdoors on a boundary wall rather than only inside a garage.",
      },
      {
        title: "Plug and charge",
        body: "No app, no account, no subscription. Connect the cable and the charger starts; disconnect and it stops.",
      },
      {
        title: "Installed and supported by us",
        body: "Fitted by Multiline's own engineers, not a subcontractor — and the same team answers the phone afterwards.",
      },
    ],

    documents: JENSONN_AC_DOCS,
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
    lede: "Three-phase charging for homes and offices with a 400V connection. Roughly half the charging time of a single-phase unit.",

    introHeading: "When the supply allows, this is the one.",
    introBody:
      "If your property has a three-phase 400V connection — common in larger homes, offices and commercial buildings — the 11kW charger delivers the full AC charging speed most electric vehicles are designed to accept. Anything faster is wasted on the car; anything slower leaves capability on the table.",

    features: [
      {
        title: "Matches most EVs exactly",
        body: "The majority of electric cars cap their onboard AC charging at 11kW. This charger meets that ceiling without overspending on headroom.",
        image: "/images/products/features/11kw-match.jpg",
      },
      {
        title: "Half the charging time",
        body: "Where a single-phase unit takes a full night, this refills the same battery in a few hours.",
        image: "/images/products/features/11kw-speed.jpg",
      },
      {
        title: "Home or workplace",
        body: "Suited to residences, offices and small commercial sites where vehicles park for several hours at a time.",
        image: "/images/products/features/11kw-site.jpg",
      },
    ],

    highlights: [
      { label: "Output", value: "11 kW" },
      { label: "Supply", value: "Three-phase 400V" },
      { label: "Connector", value: "Type 2" },
      { label: "Protection", value: "IP65" },
    ],

    capabilitiesHeading: "Built for the way power works here.",
    capabilities: [
      {
        title: "Protected against supply faults",
        body: "Over-voltage, under-voltage and leakage protection built into the unit, rather than left to the distribution board.",
      },
      {
        title: "IP65 enclosure",
        body: "Rated against dust ingress and water jets, so outdoor mounting is a design choice rather than a compromise.",
      },
      {
        title: "Plug and charge",
        body: "No app, no account, no subscription. Connect the cable and charging begins.",
      },
      {
        title: "Supply assessment included",
        body: "We confirm your three-phase connection can carry the load before installation — and quote the upgrade if it can't.",
      },
    ],

    documents: JENSONN_AC_DOCS,
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
      "At 22kW this is the highest-output AC charger in the range. Worth noting honestly: most passenger EVs cap their onboard AC charging well below this, so the extra capacity pays off at shared sites — offices, showrooms, hotels — where one unit serves several vehicles across a day rather than one car overnight.",

    features: [
      {
        title: "Built for shared use",
        body: "One unit serving several vehicles through a working day, rather than a single car overnight.",
        image: "/images/products/features/22kw-shared.jpg",
      },
      {
        title: "Full AC headroom",
        body: "Delivers everything an EV's onboard charger can accept, with capacity left for vehicles that arrive later.",
        image: "/images/products/features/22kw-headroom.jpg",
      },
      {
        title: "Offices, hotels, showrooms",
        body: "Destination charging that gives visitors a useful top-up in the time they're already on site.",
        image: "/images/products/features/22kw-destination.jpg",
      },
    ],

    highlights: [
      { label: "Output", value: "22 kW" },
      { label: "Supply", value: "Three-phase 400V" },
      { label: "Connector", value: "Type 2" },
      { label: "Best for", value: "Shared sites" },
    ],

    capabilitiesHeading: "Built for the way power works here.",
    capabilities: [
      {
        title: "Protected against supply faults",
        body: "Over-voltage, under-voltage and leakage protection built into the unit.",
      },
      {
        title: "Weather-rated enclosure",
        body: "Sealed for outdoor mounting in car parks and forecourts, not only sheltered positions.",
      },
      {
        title: "Plug and charge",
        body: "No app or account required — visitors connect and charge without setup.",
      },
      {
        title: "Load assessment included",
        body: "At 22kW the site's capacity matters. We assess the building's load before quoting, not after.",
      },
    ],

    documents: JENSONN_AC_DOCS,
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

    documents: [
      {
        label: "DC range overview",
        file: "/docs/jensonn-dc-overview.pdf",
        size: "PDF",
      },
      {
        label: "Site requirements guide",
        file: "/docs/jensonn-dc-site-requirements.pdf",
        size: "PDF",
      },
    ],
  },
];

export const getProductPage = (slug: string): ProductPage | undefined =>
  PRODUCT_PAGES.find((page) => page.slug === slug);

/* Everything except the current page, for "Other solutions". */
export const getOtherPages = (slug: string): ProductPage[] =>
  PRODUCT_PAGES.filter((page) => page.slug !== slug);

export type { CatalogProduct };