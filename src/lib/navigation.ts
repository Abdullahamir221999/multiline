export type NavItem = {
  label: string;
  href: string;
};

export type DropdownLink = {
  label: string;
  href: string;
  /** Shown under the label in the mega menu. */
  description?: string;
};

export type DropdownColumn = {
  heading: string;
  links: DropdownLink[];
};

/* =========================================================
    MAIN SITE

    This app is a subdomain beside the existing PHP site.
    Anything that isn't EV lives over there.

    The Solar filenames below are taken from the main site's
    own navigation, so they're real. Generators, Projects and
    Company are still assumed — confirm in cPanel.
========================================================= */

const MAIN_SITE = "https://multiline.com.pk";

export const PRIMARY_NAV: NavItem[] = [
  { label: "EV Charging", href: "/ev-chargers" },
  { label: "Solar", href: `${MAIN_SITE}/renewables.php` },
  { label: "Generators", href: `${MAIN_SITE}/generators.php` },
  { label: "Company", href: `${MAIN_SITE}/about.php` },
];

/** The quote form lives on the EV page. */
export const CONTACT_HREF = "/ev-chargers#quote";

export const isExternal = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

/* =========================================================
    DROPDOWN CONTENT

    EV Charging points at pages in this app. Solar mirrors the
    main site's own Solar dropdown, so a visitor who crosses
    over sees the same options either way.
========================================================= */

export const EV_DROPDOWN: DropdownColumn[] = [
  {
    heading: "Home charging",
    links: [
      {
        label: "7kW Home Charger",
        href: "/products/7kw-home-charger",
        description: "Single-phase, fits most homes",
      },
      {
        label: "11kW Home Charger",
        href: "/products/11kw-home-charger",
        description: "Three-phase, twice the speed",
      },
      {
        label: "22kW Smart Charger",
        href: "/products/22kw-smart-charger",
        description: "Fastest AC, for shared sites",
      },
    ],
  },
  {
    heading: "Commercial",
    links: [
      {
        label: "DC Fast Charging",
        href: "/products/dc-fast-charging",
        description: "20kW to 120kW infrastructure",
      },
    ],
  },
  {
    heading: "Get started",
    links: [
      {
        label: "Find your charger",
        href: "/ev-chargers#compatibility",
        description: "Match a charger to your EV",
      },
      {
        label: "How installation works",
        href: "/ev-chargers#how-it-works",
        description: "From enquiry to install day",
      },
      {
        label: "Get a quote",
        href: CONTACT_HREF,
        description: "Tell us about your site",
      },
    ],
  },
];

export const SOLAR_DROPDOWN: DropdownColumn[] = [
  {
    heading: "Solar",
    links: [
      { label: "About", href: `${MAIN_SITE}/about.php` },
      { label: "Solar panels", href: `${MAIN_SITE}/solarpanel.php` },
      { label: "Inverters", href: `${MAIN_SITE}/inverters.php` },
      { label: "Monitoring app", href: `${MAIN_SITE}/monitoring.php` },
    ],
  },
  {
    heading: "Projects",
    links: [
      {
        label: "Residential projects",
        href: `${MAIN_SITE}/residential_project.php`,
      },
      {
        label: "Industrial projects",
        href: `${MAIN_SITE}/industrial_project.php`,
      },
      {
        label: "Structure & civil works",
        href: `${MAIN_SITE}/structure_and_civil.php`,
      },
      { label: "Design", href: `${MAIN_SITE}/design.php` },
    ],
  },
  {
    heading: "Company",
    links: [
      {
        label: "Our engineering team",
        href: `${MAIN_SITE}/our_engineering_and_team.php`,
      },
      {
        label: "Certificates and licenses",
        href: `${MAIN_SITE}/certification_and_lisence.php`,
      },
    ],
  },
];

export const getDropdown = (label: string): DropdownColumn[] => {
  if (label === "EV Charging") return EV_DROPDOWN;
  if (label === "Solar") return SOLAR_DROPDOWN;
  return [];
};