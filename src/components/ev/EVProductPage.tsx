"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import {
  ArrowUpRight,
  Building2,
  Cable,
  ChevronRight,
  Download,
  Gauge,
  Monitor,
  PlugZap,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

import { createWhatsAppLink } from "@/lib/contact";
import { scrollToSection } from "@/lib/scrollToSection";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { EV_VEHICLES } from "@/lib/evCompatibility";
import {
  getOtherPages,
  type ProductPage,
} from "@/lib/productContent";


/* Highlight labels vary per product — Display appears on the
   11kW and 22kW, Connector and Application on the DC page.
   Anything unmapped falls back to Zap rather than breaking. */
const HIGHLIGHT_ICONS: Record<string, LucideIcon> = {
  Output: Zap,
  Supply: PlugZap,
  Current: Gauge,
  Protection: ShieldCheck,
  Display: Monitor,
  Connector: Cable,
  Application: Building2,
  "Best for": Building2,
};
/* =========================================================
    PRODUCT PAGE

    One template, four pages. AC pages show a single charger
    and a "Get a quote" CTA; the DC page shows the whole
    range and asks people to enquire.
========================================================= */

export const EVProductPage = ({ page }: { page: ProductPage }) => {
  const isAC = page.category === "AC";

  const products = CATALOG_PRODUCTS.filter((product) =>
    page.productSlugs.includes(product.slug)
  );

  const hero = products[0];
  const others = getOtherPages(page.slug);

  const ctaLabel = isAC ? "Get a quote" : "Enquire";

  return (
    <main className="bg-canvas">
            {/* =====================================================
          01 — HERO

          Full height, header overlaid. The scrim is light —
          the photo's own gradient does most of the work, and
          anything heavier flattens the product shot.
      ===================================================== */}

      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
        {hero && (
          <Image
            src={hero.heroImage ?? hero.image}
            alt={hero.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

        {/* Darkens just the top band so the inverted logo and
            nav hold against a light photo. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-black/30 to-transparent" />

        {/* BREADCRUMB — sits under the fixed header */}

        <div className="absolute inset-x-0 top-[78px] z-10">
          <div className="page-pad page-shell pt-6">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[13px] text-white/60"
            >
              <Link
                href="/ev-chargers"
                className="transition-colors hover:text-white"
              >
                EV Charging
              </Link>

              <ChevronRight
                aria-hidden="true"
                className="h-[14px] w-[14px]"
                strokeWidth={1.8}
              />

              <span className="text-white/85">{page.title}</span>
            </nav>
          </div>
        </div>

        {/* CONTENT */}

        <div className="absolute inset-0 flex items-center">
          <div className="page-pad page-shell w-full">
            <div className="max-w-[560px]">
              <p className="text-[13px] font-semibold text-white/75">
                {page.eyebrow}
              </p>

              <h1 className="mt-4 text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-[52px] lg:text-[62px]">
                {page.title}
              </h1>

              <p className="mt-6 text-[16px] leading-[1.65] text-white/80 sm:text-[17px]">
                {page.lede}
              </p>

              {isAC && hero?.price && (
                <p className="mt-7 text-[20px] font-semibold text-white">
                  {hero.price}
                  <span className="ml-2 text-[13px] font-normal text-white/60">
                    excl. PIB, installation and tax
                  </span>
                </p>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => scrollToSection("product-quote")}
                  className="inline-flex h-[54px] items-center justify-center rounded-full bg-brand px-7 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  {ctaLabel}
                  <span aria-hidden="true" className="ml-2.5 text-accent">
                    →
                  </span>
                </button>

                {page.documents.length > 0 && (
                  <button
                    type="button"
                    onClick={() => scrollToSection("documents")}
                    className="inline-flex h-[54px] items-center justify-center rounded-full border border-white/35 px-7 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    Technical documents
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          02 — INTRO
      ===================================================== */}

      <Section>
        <Reveal>
          <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            <h2 className="max-w-[520px] text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[42px]">
              {page.introHeading}
            </h2>

            <p className="max-w-[520px] text-[17px] leading-[1.7] text-ink-soft">
              {page.introBody}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* =====================================================
          03 — FEATURES
      ===================================================== */}

      <Section className="pt-16 pb-10 lg:pt-20 lg:pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {page.features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white">
                <div className="relative aspect-[4/3] w-full bg-canvas-deep">
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-[19px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">
                    {feature.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      

      {/* =====================================================
          04 — HIGHLIGHTS
      ===================================================== */}

      <Section className="pt-0 pb-10 lg:pb-14">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
            {page.highlights.map((item) => {
              const Icon = HIGHLIGHT_ICONS[item.label] ?? Zap;

              return (
                <div key={item.label}>
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.6}
                    className="h-[22px] w-[22px] text-brand"
                  />

                  <dt className="mt-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                    {item.label}
                  </dt>

                  <dd className="mt-2 text-[24px] font-semibold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[28px]">
                    {item.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </Section>
      
      {/* =====================================================
          04b — SPECIFICATIONS
      ===================================================== */}

      {page.specs.length > 0 && (
        <Section className="pt-6 pb-16 lg:pt-8 lg:pb-20">
          <Reveal>
            <h2 className="text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[42px]">
              Specifications.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 overflow-hidden rounded-[24px] bg-white">
              <dl className="grid sm:grid-cols-2">
                {page.specs.map((spec, index) => {
                  const isLast = index === page.specs.length - 1;

                  /* An odd number of specs leaves the last row
                     with an empty cell beside it. Span it
                     instead of drawing a half-finished row. */
                  const orphan = isLast && page.specs.length % 2 === 1;

                  return (
                    <div
                      key={spec.label}
                      className={`flex items-baseline justify-between gap-6 border-b border-line px-6 py-4 last:border-b-0 sm:px-8 ${
                        orphan
                          ? "sm:col-span-2"
                          : index % 2 === 0
                            ? "sm:border-r sm:border-line"
                            : ""
                      }`}
                    >
                      <dt className="text-[14px] text-ink-soft">
                        {spec.label}
                      </dt>

                      <dd className="text-right text-[14px] font-semibold text-ink">
                        {spec.value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 text-[13px] leading-[1.6] text-ink-faint">
              Figures from the manufacturer&apos;s datasheet. Download
              the full specification below.
            </p>
          </Reveal>
        </Section>
      )}




      {/* =====================================================
          05 — CAPABILITIES
      ===================================================== */}

      <Section className="pt-6 pb-16 lg:pt-8 lg:pb-20">
        <Reveal>
          <h2 className="max-w-[620px] text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[42px]">
            {page.capabilitiesHeading}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {page.capabilities.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="border-t border-line pt-6">
                <h3 className="text-[19px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[460px] text-[14px] leading-[1.6] text-ink-soft">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* =====================================================
          06 — SUPPORTED VEHICLES
      ===================================================== */}

      {isAC && hero && (
        <SupportedVehicles
          chargerKw={Number(hero.power.replace(/[^\d.]/g, ""))}
          chargerName={hero.name}
        />
      )}

      {/* The DC page shows its range here instead — three
          units with different outputs is the useful comparison,
          not a vehicle list. */}
      {!isAC && (
        <Section className="pt-6 pb-16 lg:pt-8 lg:pb-20">
          <Reveal>
            <h2 className="text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[42px]">
              The range.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.08}>
                <div className="flex h-full flex-col rounded-[24px] bg-white p-6">
                  <div className="relative h-[160px] w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-contain"
                    />
                  </div>

                  <div className="mt-6 flex-1">
                    <h3 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.025em] text-ink">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-[13px] text-ink-soft">
                      {product.power} · {product.connector} ·{" "}
                      {product.application}
                    </p>

                    <p className="mt-3 text-[14px] leading-[1.55] text-ink-soft">
                      {product.description}
                    </p>
                  </div>

                  <a
                    href={createWhatsAppLink(
                      `Hi Multiline, I'd like to enquire about the ${product.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex h-[46px] w-full items-center justify-center rounded-full border border-line text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand"
                  >
                    <WhatsAppIcon className="mr-2 h-[15px] w-[15px]" />
                    Enquire
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* =====================================================
          07 — DOCUMENTS
      ===================================================== */}

      {page.documents.length > 0 && (
        <Section id="documents" className="pt-6 pb-16 lg:pt-8 lg:pb-20">
          <Reveal>
            <h2 className="text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[42px]">
              Technical documents.
            </h2>
          </Reveal>

          <div
            className={`mt-10 grid gap-4 ${
              page.documents.length === 1
                ? "max-w-[420px]"
                : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {page.documents.map((doc, index) => (
              <Reveal key={doc.file} delay={index * 0.06}>
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-[20px] bg-white px-6 py-5 transition-colors hover:bg-brand-tint"
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-ink">
                      {doc.label}
                    </span>

                    {doc.size && (
                      <span className="mt-1 block text-[12px] text-ink-faint">
                        {doc.size}
                      </span>
                    )}
                  </span>

                  <Download
                    className="ml-4 h-[18px] w-[18px] shrink-0 text-ink-faint transition-colors group-hover:text-brand"
                    strokeWidth={1.8}
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* =====================================================
          11 — OTHER SOLUTIONS
      ===================================================== */}

      <Section className="pt-6 pb-16 lg:pt-8 lg:pb-20">
        <Reveal>
          <h2 className="mx-auto max-w-[720px] text-center text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[42px]">
            Our other charging solutions.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other, index) => {
            const otherHero = CATALOG_PRODUCTS.find(
              (product) => product.slug === other.productSlugs[0]
            );

            return (
              <Reveal key={other.slug} delay={index * 0.08}>
                <Link
                  href={`/products/${other.slug}`}
                  className="group flex h-full flex-col items-center text-center"
                >
                  <h3 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.03em] text-ink">
                    {other.title}
                  </h3>

                  <p className="mt-2 max-w-[280px] text-[14px] leading-[1.5] text-ink-soft">
                    {other.eyebrow}
                  </p>

                  <div className="relative mt-10 h-[280px] w-full">
                    {otherHero && (
                      <Image
                        src={otherHero.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    )}
                  </div>

                  <span className="mt-8 inline-flex items-center text-[13px] font-semibold text-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    View details
                    <ArrowUpRight
                      className="ml-1.5 h-[15px] w-[15px]"
                      strokeWidth={2}
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        id="product-quote"
        className="scroll-mt-24 bg-canvas pb-24 pt-8 lg:pb-32"
      >
        <div className="page-pad page-shell">
          <Reveal>
            <div className="rounded-[28px] bg-white px-8 py-14 text-center sm:px-12">
              <h2 className="mx-auto max-w-[560px] text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[38px]">
                {isAC
                  ? "Ready for a quote?"
                  : "Planning a commercial site?"}
              </h2>

              <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-[1.6] text-ink-soft">
                {isAC
                  ? "Tell us where it's going and we'll confirm your supply, then quote the full installed price."
                  : "Send us the site details and our team will assess the supply and scope the project."}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/ev-charging#quote"
                  className="inline-flex h-[54px] items-center justify-center rounded-full bg-ink px-8 text-[14px] font-semibold text-white transition-colors hover:bg-ink/85"
                >
                  {ctaLabel}
                  <span aria-hidden="true" className="ml-2.5">
                    ›
                  </span>
                </Link>

                <a
                  href={createWhatsAppLink(
                    `Hi Multiline, I'd like to ${
                      isAC ? "get a quote for" : "enquire about"
                    } the ${page.title}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[54px] items-center justify-center rounded-full border border-line px-7 text-[14px] font-semibold text-ink transition-colors hover:bg-canvas"
                >
                  <WhatsAppIcon className="mr-2.5 h-[16px] w-[16px]" />
                  Message us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

/* =========================================================
    SUPPORTED VEHICLES

    Replaces Smappee's configurator. Derived from the same
    data the charger finder uses, so the two can't disagree.
========================================================= */

function SupportedVehicles({
  chargerKw,
  chargerName,
}: {
  chargerKw: number;
  chargerName: string;
}) {
  const rows = EV_VEHICLES.map((vehicle) => ({
    label: `${vehicle.brand} ${vehicle.model}`,
    maxAC: vehicle.maxAC,
    actual: Math.min(chargerKw, vehicle.maxAC),
  })).sort((a, b) => b.actual - a.actual || a.label.localeCompare(b.label));

  const full = rows.filter((row) => row.actual >= chargerKw).length;

  return (
    <Section>
      <Reveal>
        <h2 className="max-w-[620px] text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[42px]">
          Which cars this charger suits.
        </h2>

        <p className="mt-4 max-w-[560px] text-[15px] leading-[1.65] text-ink-soft">
          Every vehicle below works with the {chargerName}.{" "}
          {full === rows.length
            ? `All of them take the full ${chargerKw} kW.`
            : `A car only draws what its onboard charger accepts — ${full} of these take the full ${chargerKw} kW.`}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 overflow-hidden rounded-[24px] bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  Vehicle
                </th>
                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  Accepts
                </th>
                <th className="px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  Charges at
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-line last:border-b-0"
                >
                  <td className="px-6 py-4 text-[15px] font-medium text-ink">
                    {row.label}
                  </td>

                  <td className="px-6 py-4 text-[14px] text-ink-soft">
                    {row.maxAC} kW
                  </td>

                  <td className="px-6 py-4 text-[14px] font-semibold text-ink">
                    {row.actual} kW
                    {row.actual < chargerKw && (
                      <span className="ml-2 font-normal text-ink-faint">
                        (vehicle limit)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-5 text-[13px] leading-[1.6] text-ink-faint">
          Car not listed?{" "}
          <a
            href={createWhatsAppLink(
              "Hi Multiline, my EV isn't listed on your charger page. Can you confirm compatibility?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand underline underline-offset-4"
          >
            Ask us
          </a>
        </p>
      </Reveal>
    </Section>
  );
}

/* =========================================================
    LAYOUT HELPERS
========================================================= */

function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${className ?? "py-16 sm:py-20 lg:py-24"}`}
    >
      <div className="page-pad page-shell">{children}</div>
    </section>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      animate={
        inView || reduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 22 }
      }
      transition={{
        duration: 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}