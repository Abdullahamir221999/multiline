import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to a Multiline engineer about EV charging, solar or power.",
};

export default function ContactPage() {
  return (
    <main className="bg-paper text-ink">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="page-pad page-shell py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionEyebrow>Contact</SectionEyebrow>
            <h1 className="mt-5 max-w-2xl text-[48px] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[64px]">
              Talk to an engineer.
            </h1>
            <p className="mt-6 max-w-lg text-[16px] leading-[1.65] text-ink-soft">
              Tell us what you need to power — home EV charging, commercial DC,
              solar or backup generation. We’ll route you to the right specialist.
            </p>

            <div className="mt-10 space-y-5 border-t border-line pt-8 text-[14px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                  Email
                </p>
                <a
                  href="mailto:info@multiline.pk"
                  className="mt-2 inline-block text-[16px] font-medium text-brand"
                >
                  info@multiline.pk
                </a>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                  Location
                </p>
                <p className="mt-2 text-[16px]">Lahore, Pakistan</p>
              </div>
            </div>
          </div>

          <div className="border border-line bg-surface p-7 md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-brand">
              Quick routes
            </p>
            <ul className="mt-6 space-y-0 divide-y divide-line">
              <li>
                <Link
                  href="/ev-chargers"
                  className="group flex items-center justify-between py-5 text-[15px] font-medium"
                >
                  EV Charging
                  <span className="text-brand transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/solar"
                  className="group flex items-center justify-between py-5 text-[15px] font-medium"
                >
                  Solar
                  <span className="text-brand transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products/11kw-home-charger#compatibility"
                  className="group flex items-center justify-between py-5 text-[15px] font-medium"
                >
                  Check compatibility
                  <span className="text-brand transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            </ul>

            <Button
              href="mailto:info@multiline.pk"
              variant="primary"
              size="bar"
              showArrow
              className="mt-8"
            >
              Email Multiline
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
