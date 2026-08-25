import Image from "next/image";
import Link from "next/link";

import {
  CONTACT_HREF,
  PRIMARY_NAV,
} from "@/lib/navigation";

/* =========================================================
   FOOTER LINKS
========================================================= */

const FOOTER_LINKS = [
  ...PRIMARY_NAV.filter(
    (item) => item.label !== "Home 2"
  ),
  {
    label: "Contact",
    href: CONTACT_HREF,
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.07] bg-canvas text-ink">
      <div className="page-pad page-shell py-12 lg:py-14">
        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr_0.65fr] lg:gap-16">
          {/* =================================================
              BRAND
          ================================================= */}

          <div>
            <Link
              href="/"
              aria-label="Multiline Home"
              className="inline-flex items-center"
            >
              <Image
                src="/images/multiline-logo.png"
                alt="Multiline"
                width={190}
                height={52}
                className="h-[40px] w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-[470px] text-[15px] leading-[1.65] text-ink-soft">
              Engineering EV charging, solar and power
              infrastructure — designed, supplied and supported
              across Pakistan since 1975.
            </p>
          </div>

          {/* =================================================
              EXPLORE
          ================================================= */}

          <div>
            <p className="text-[13px] font-semibold text-ink">
              Explore
            </p>

            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.map((item) => (
                <li
                  key={`${item.label}-${item.href}`}
                >
                  <Link
                    href={item.href}
                    className="text-[14px] text-ink-soft transition-colors duration-200 hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div>
            <p className="text-[13px] font-semibold text-ink">
              Contact
            </p>

            <ul className="mt-4 space-y-3 text-[14px] text-ink-soft">
              <li>
                Lahore, Pakistan
              </li>

              <li>
                <a
                  href="mailto:info@multiline.pk"
                  className="transition-colors duration-200 hover:text-brand"
                >
                  info@multiline.pk
                </a>
              </li>
            </ul>

            <Link
              href={CONTACT_HREF}
              className="group mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-brand transition-opacity duration-200 hover:opacity-75"
            >
              Talk to an engineer

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="mt-12 flex flex-col gap-4 border-t border-black/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-ink-faint">
            © {year} Multiline Engineering. All rights reserved.
          </p>

          <p className="text-[12px] text-ink-faint">
            EV · Solar · Generators · Infrastructure
          </p>
        </div>
      </div>
    </footer>
  );
}