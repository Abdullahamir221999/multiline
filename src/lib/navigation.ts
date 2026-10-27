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

    TODO: confirm these filenames in cPanel — public_html has
    about.php and clients.php, the rest are assumed.
========================================================= */

const MAIN_SITE = "https://multiline.com.pk";

export const PRIMARY_NAV: NavItem[] = [
  { label: "EV Charging", href: "/ev-chargers" },
  { label: "Solar", href: `${MAIN_SITE}/solar.php` },
  { label: "Generators", href: `${MAIN_SITE}/generators.php` },
  { label: "Projects", href: `${MAIN_SITE}/projects.php` },
  { label: "Company", href: `${MAIN_SITE}/about.php` },
];

/** The quote form lives on the EV page. */
export const CONTACT_HREF = "/ev-chargers#quote";

export const isExternal = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

/* =========================================================
    DROPDOWN CONTENT

    Only EV Charging has one — everything else is a single
    page on the main site.
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

export const getDropdown = (label: string): DropdownColumn[] =>
  label === "EV Charging" ? EV_DROPDOWN : [];