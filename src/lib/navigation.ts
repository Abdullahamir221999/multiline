export type NavItem = {
  label: string;
  href: string;
};

/** Primary site navigation — keep labels consistent everywhere. */
export const PRIMARY_NAV: NavItem[] = [
  { label: "EV Charging", href: "/ev-chargers" },
  { label: "Solar", href: "/solar" },
  { label: "Generators", href: "/generators" },
  { label: "Projects", href: "/projects" },
  { label: "Company", href: "/company" },
];

export const CONTACT_HREF = "/contact";
