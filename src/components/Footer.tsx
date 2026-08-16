import Link from "next/link";

import { CONTACT_HREF, PRIMARY_NAV } from "@/lib/navigation";

const FOOTER_LINKS = [
  ...PRIMARY_NAV,
  { label: "Contact", href: CONTACT_HREF },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface text-ink">
      <div className="page-pad page-shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-[20px] font-semibold tracking-[-0.04em] text-brand"
            >
              MULTILINE
              <span aria-hidden className="ml-1 inline-block h-[6px] w-[6px] bg-accent" />
            </Link>

            <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-ink-soft">
              Engineering EV charging, solar and power infrastructure —
              designed, supplied and supported in Pakistan since 1975.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                Explore
              </p>
              <ul className="mt-4 space-y-3">
                {FOOTER_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-ink transition-colors hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                Contact
              </p>
              <ul className="mt-4 space-y-3 text-[14px] text-ink-soft">
                <li>Lahore, Pakistan</li>
                <li>
                  <a
                    href="mailto:info@multiline.pk"
                    className="transition-colors hover:text-brand"
                  >
                    info@multiline.pk
                  </a>
                </li>
                <li>
                  <Link
                    href={CONTACT_HREF}
                    className="font-medium text-ink transition-colors hover:text-brand"
                  >
                    Talk to an engineer →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[12px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Multiline Engineering. All rights reserved.</p>
          <p className="uppercase tracking-[0.08em]">
            EV · Solar · Generators · Infrastructure
          </p>
        </div>
      </div>
    </footer>
  );
}
