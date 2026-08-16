import Link from "next/link";
import type { ReactNode } from "react";

import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type ComingSoonPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  children?: ReactNode;
};

export const ComingSoonPage = ({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: ComingSoonPageProps) => (
  <main className="bg-paper text-ink">
    <Breadcrumb items={breadcrumbs} />

    <section className="page-pad page-shell py-16 lg:py-24">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>

      <h1 className="mt-5 max-w-3xl text-[48px] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[64px] lg:text-[72px]">
        {title}
      </h1>

      <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink-soft">
        {description}
      </p>

      {children}

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button href="/ev-chargers" variant="primary" size="lg" showArrow>
          Browse EV chargers
        </Button>
        <Button href="/contact" variant="secondary" size="lg" showArrow>
          Talk to an engineer
        </Button>
      </div>

      <p className="mt-10 text-[13px] text-ink-faint">
        Looking for something specific?{" "}
        <Link href="/contact" className="text-brand underline-offset-4 hover:underline">
          Contact our team
        </Link>
        .
      </p>
    </section>
  </main>
);
