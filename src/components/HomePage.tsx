"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/helpers/cn";

const solutions = [
  {
    href: "/ev-chargers",
    label: "EV Charging",
    copy: "AC and DC systems for homes, workplaces, fleets and public sites.",
  },
  {
    href: "/solar",
    label: "Solar",
    copy: "Systems sized to real consumption, property and long-term use.",
  },
  {
    href: "/generators",
    label: "Generators",
    copy: "Standby and industrial power with installation and support.",
  },
] as const;

const proof = [
  { value: "1975", label: "Founded in Lahore" },
  { value: "10,000+", label: "Generator installations" },
  { value: "4", label: "Energy divisions" },
  { value: "On-site", label: "Engineering support" },
] as const;

const propertyOptions = ["5 Marla", "10 Marla", "1 Kanal"] as const;

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const [units, setUnits] = useState(850);
  const [property, setProperty] =
    useState<(typeof propertyOptions)[number]>("10 Marla");
  const [hasEV, setHasEV] = useState(true);

  const solarHint = useMemo(() => {
    const base = Math.round(units / 120);
    const adjusted = hasEV ? base + 2 : base;
    return `${Math.max(3, adjusted)}–${Math.max(5, adjusted + 2)} kW`;
  }, [units, hasEV]);

  const fadeUp = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <main className="bg-paper text-ink">
      {/* =====================================================
          HERO — one composition, brand first, full-bleed image
      ===================================================== */}
      <section className="relative isolate min-h-[calc(100svh-var(--header-height))] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/products/charger-installation.png"
            alt="Multiline EV charging installation"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-inverse/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-inverse via-inverse/80 to-inverse/25" />
        </div>

        <div className="relative page-pad page-shell flex min-h-[calc(100svh-var(--header-height))] flex-col justify-end pb-14 pt-24 lg:pb-20 lg:pt-28">
          <motion.div {...fadeUp} className="max-w-[720px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
              Multiline
            </p>

            <h1 className="mt-5 font-display text-[52px] font-medium leading-[0.92] tracking-[-0.03em] text-inverse-foreground sm:text-[72px] lg:text-[88px]">
              Power engineered
              <br />
              for what comes next.
            </h1>

            <p className="mt-7 max-w-[420px] text-[16px] leading-[1.65] text-inverse-foreground/70 sm:text-[17px]">
              EV charging, solar and power generation — designed, supplied and
              supported since 1975.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href="/ev-chargers"
                variant="accent"
                size="lg"
                showArrow
                className="min-w-[220px] justify-between text-accent-foreground sm:min-w-[240px]"
              >
                Browse EV chargers
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                showArrow
                className="min-w-[220px] justify-between border-white bg-white text-black hover:border-accent hover:bg-accent hover:text-accent-foreground sm:min-w-[240px]"
              >
                Talk to an engineer
              </Button>
            </div>
          </motion.div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-16 text-[11px] font-medium uppercase tracking-[0.12em] text-inverse-foreground/45"
          >
            Lahore · Pakistan · Est. 1975
          </motion.p>
        </div>
      </section>

      {/* =====================================================
          SOLUTIONS — one job: choose a path
      ===================================================== */}
      <section id="solutions" className="scroll-mt-24 border-b border-line">
        <div className="page-pad page-shell py-16 lg:py-24">
          <div className="max-w-[640px]">
            <SectionEyebrow>What we build</SectionEyebrow>
            <h2 className="mt-4 text-[40px] font-medium leading-[0.95] tracking-[-0.045em] sm:text-[52px]">
              Three ways to power a site.
            </h2>
          </div>

          <ul className="mt-14 divide-y divide-line border-y border-line">
            {solutions.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group grid gap-4 py-8 transition-colors sm:grid-cols-[120px_1fr_auto] sm:items-center lg:py-10"
                >
                  <span className="font-mono text-[11px] text-ink-faint">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-[28px] font-medium tracking-[-0.035em] sm:text-[32px]">
                      {item.label}
                    </h3>
                    <p className="mt-2 max-w-[480px] text-[15px] leading-[1.6] text-ink-soft">
                      {item.copy}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="text-[22px] text-brand transition-transform duration-300 group-hover:translate-x-2"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =====================================================
          PROOF — quiet credibility
      ===================================================== */}
      <section className="border-b border-line bg-surface">
        <div className="page-pad page-shell grid grid-cols-2 lg:grid-cols-4">
          {proof.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                "border-b border-line px-0 py-10 lg:border-b-0",
                index % 2 === 0 && "pr-6 sm:pr-8",
                index % 2 === 1 && "pl-6 sm:pl-8",
                index < 2 && "lg:border-r lg:pr-10",
                index === 1 && "lg:px-10",
                index === 2 && "lg:border-r lg:px-10",
                index === 3 && "lg:pl-10 lg:pr-0"
              )}
            >
              <p className="text-[36px] font-medium tracking-[-0.04em] sm:text-[42px]">
                {item.value}
              </p>
              <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          EV FEATURE — product as visual anchor
      ===================================================== */}
      <section className="border-b border-line">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[420px] bg-image-well lg:min-h-[640px]">
            <Image
              src="/images/products/charger-front1.png"
              alt="11kW Multiline home EV charger"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center p-10 lg:p-16"
            />
          </div>

          <div className="flex flex-col justify-center page-pad py-14 lg:px-16 lg:py-20">
            <SectionEyebrow>EV Charging</SectionEyebrow>
            <h2 className="mt-4 max-w-[520px] text-[40px] font-medium leading-[0.95] tracking-[-0.045em] sm:text-[52px]">
              From the wall to the road.
            </h2>
            <p className="mt-6 max-w-[440px] text-[16px] leading-[1.65] text-ink-soft">
              Residential and commercial chargers with compatibility guidance
              and professional installation across Pakistan.
            </p>

            <dl className="mt-10 grid max-w-[440px] grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                  AC range
                </dt>
                <dd className="mt-2 text-[18px] font-medium">7–22 kW</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                  DC range
                </dt>
                <dd className="mt-2 text-[18px] font-medium">30–120+ kW</dd>
              </div>
            </dl>

            <div className="mt-10">
              <Button href="/ev-chargers" variant="primary" size="lg" showArrow>
                View EV chargers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOLAR — lean estimator
      ===================================================== */}
      <section className="border-b border-line bg-accent text-accent-foreground">
        <div className="page-pad page-shell grid gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
              Solar
            </p>
            <h2 className="mt-4 text-[40px] font-medium leading-[0.95] tracking-[-0.045em] text-brand sm:text-[52px]">
              Size the system before you buy panels.
            </h2>
            <p className="mt-6 max-w-[440px] text-[16px] leading-[1.65] text-brand/70">
              A quick estimate from monthly units, property size and whether
              you charge an EV at home.
            </p>
            <p className="mt-10 text-[13px] font-medium uppercase tracking-[0.08em] text-brand/55">
              Indicative size
            </p>
            <p className="mt-2 text-[48px] font-medium tracking-[-0.045em] text-brand">
              {solarHint}
            </p>
          </div>

          <div className="flex flex-col justify-center border-t border-brand/25 pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
            <label className="block">
              <span className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.08em] text-brand">
                Monthly units
                <span className="tabular-nums">{units}</span>
              </span>
              <input
                type="range"
                min={200}
                max={2500}
                step={50}
                value={units}
                onChange={(event) => setUnits(Number(event.target.value))}
                className="mt-4 w-full cursor-pointer"
                style={{ accentColor: "var(--brand)" }}
              />
            </label>

            <fieldset className="mt-8">
              <legend className="text-[12px] font-semibold uppercase tracking-[0.08em] text-brand">
                Property
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {propertyOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setProperty(option)}
                    className={cn(
                      "border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.07em] transition-colors",
                      property === option
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-brand/30 text-brand hover:border-brand"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 flex items-center justify-between border-t border-brand/25 pt-8">
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-brand">
                EV at home
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={hasEV}
                onClick={() => setHasEV((current) => !current)}
                className={cn(
                  "relative h-10 w-[72px] border border-brand/40 p-1 transition-colors",
                  hasEV && "bg-brand"
                )}
              >
                <span
                  className={cn(
                    "block h-full w-1/2 bg-accent transition-transform duration-300",
                    hasEV ? "translate-x-full" : "translate-x-0",
                    hasEV && "bg-accent"
                  )}
                />
                <span className="sr-only">{hasEV ? "Yes" : "No"}</span>
              </button>
            </div>

            <Button
              href="/solar"
              variant="primary"
              size="bar"
              showArrow
              className="mt-10"
            >
              Continue to solar
            </Button>
          </div>
        </div>
      </section>

      {/* =====================================================
          HERITAGE
      ===================================================== */}
      <section className="border-b border-line bg-inverse text-inverse-foreground">
        <div className="page-pad page-shell grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-24">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
              Since 1975
            </p>
            <h2 className="mt-5 font-display text-[44px] font-medium leading-[1.02] tracking-[-0.03em] sm:text-[56px]">
              Built on engineering, not trends.
            </h2>
          </div>
          <div>
            <p className="max-w-[420px] text-[16px] leading-[1.7] text-inverse-foreground/65">
              From generators to solar and EV charging, Multiline has grown
              with the technologies its customers depend on — with engineering
              still at the centre.
            </p>
            <Link
              href="/company"
              className="group mt-8 inline-flex items-center gap-3 border-b border-inverse-foreground/30 pb-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors hover:border-accent hover:text-accent"
            >
              Read our story
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}
      <section id="contact" className="bg-brand text-brand-foreground">
        <div className="page-pad page-shell py-16 lg:py-24">
          <h2 className="max-w-[900px] text-[44px] font-medium leading-[0.95] tracking-[-0.045em] sm:text-[64px] lg:text-[76px]">
            What are you looking to power?
          </h2>

          <div className="mt-14 grid gap-0 border-t border-brand-foreground/25 md:grid-cols-3">
            <ClosingLink
              href="/ev-chargers"
              label="EV Charging"
              copy="Find the right charger."
            />
            <ClosingLink
              href="/solar"
              label="Solar"
              copy="Estimate your system."
            />
            <ClosingLink
              href="/contact"
              label="Commercial"
              copy="Talk to engineering."
              last
            />
          </div>
        </div>
      </section>
    </main>
  );
}

type ClosingLinkProps = {
  href: string;
  label: string;
  copy: string;
  last?: boolean;
};

const ClosingLink = ({ href, label, copy, last = false }: ClosingLinkProps) => (
  <Link
    href={href}
    className={cn(
      "group flex flex-col justify-between gap-10 border-b border-brand-foreground/25 py-8 md:border-b-0 md:py-10",
      last ? "md:pl-8" : "md:border-r md:px-8 md:first:pl-0"
    )}
  >
    <div>
      <p className="text-[22px] font-medium tracking-[-0.03em]">{label}</p>
      <p className="mt-2 text-[14px] text-brand-foreground/60">{copy}</p>
    </div>
    <span
      aria-hidden
      className="text-[20px] text-accent transition-transform duration-300 group-hover:translate-x-2"
    >
      →
    </span>
  </Link>
);
