"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

/* =========================================================
   HOME
========================================================= */

export default function HomePage() {
  const [units, setUnits] = useState(850);
  const [property, setProperty] = useState("10 Marla");
  const [hasEV, setHasEV] = useState(true);

  return (
    <main className="overflow-hidden bg-paper text-ink">
      {/* =====================================================
          01 / HERO
      ===================================================== */}

      <section className="border-b border-line">
        <div className="grid min-h-[calc(100svh-78px)] lg:grid-cols-[0.93fr_1.07fr]">
          {/* LEFT */}
          <div className="flex flex-col justify-between border-b border-line px-5 py-10 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
                  Multiline Engineering
                </span>

                <span className="hidden text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint sm:block">
                  Lahore · Pakistan
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-16 lg:mt-20"
              >
                <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                  Engineering power since 1975
                </p>

                <h1 className="max-w-[820px] text-[66px] font-medium leading-[0.88] tracking-[-0.065em] sm:text-[84px] lg:text-[94px] xl:text-[108px]">
                  Powering
                  <br />
                  what comes
                  <br />
                  next.
                </h1>

                <p className="mt-9 max-w-[500px] text-[17px] leading-[1.65] text-ink-soft">
                  Engineering solutions across EV charging, solar, power
                  generation and energy infrastructure.
                </p>
              </motion.div>
            </div>

            <div className="mt-20 grid sm:grid-cols-2">
              <Link
                href="#solutions"
                className="group flex h-[68px] items-center justify-between border border-line-strong px-6 sm:border-r-0"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                  Explore Solutions
                </span>

                <span className="text-[19px] text-brand transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>

              <Link
                href="#contact"
                className="group flex h-[68px] items-center justify-between bg-brand px-6 text-white"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                  Talk to an Engineer
                </span>

                <span className="text-[19px] text-accent transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative min-h-[650px] overflow-hidden bg-image-well lg:min-h-full">
            <Image
              src="/images/products/charger-installation.png"
              alt="Multiline EV charging installation"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/[0.08]" />

            {/* technical grid */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-white/20" />
            <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-white/20" />

            <div className="absolute left-6 top-6 md:left-8 md:top-8">
              <span className="border border-white/30 bg-black/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.09em] text-white backdrop-blur-sm">
                Energy Infrastructure
              </span>
            </div>

            <div className="absolute bottom-7 left-7 max-w-[420px] md:bottom-9 md:left-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent">
                EV Charging / Installation
              </p>

              <p className="mt-3 text-[16px] leading-[1.55] text-white/70">
                Designed, supplied, installed and supported by Multiline.
              </p>
            </div>

            <div className="absolute bottom-8 right-8 text-[11px] font-semibold tracking-[0.08em] text-white/60">
              01 / 04
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          02 / SOLUTIONS
      ===================================================== */}

      <section id="solutions" className="scroll-mt-20">
        <SectionHeader
          number="02"
          label="What We Do"
          right="Energy / Infrastructure / Engineering"
        />

        <div className="grid lg:grid-cols-2">
          {/* EV */}
          <Link
            href="/ev-chargers"
            className="group relative min-h-[600px] overflow-hidden border-b border-line lg:border-r"
          >
            <Image
              src="/images/products/charger-front1.png"
              alt="EV charging"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.015]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

            <div className="absolute left-7 top-7">
              <span className="border border-white/25 bg-black/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                01 / EV Charging
              </span>
            </div>

            <div className="absolute bottom-8 left-7 right-7 text-white md:bottom-10 md:left-10 md:right-10">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">
                Home · Commercial · Fleet
              </p>

              <div className="mt-4 flex items-end justify-between gap-8">
                <h2 className="text-[52px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[66px]">
                  EV
                  <br />
                  Charging
                </h2>

                <span className="text-[27px] transition-transform duration-300 group-hover:translate-x-3">
                  →
                </span>
              </div>
            </div>
          </Link>

          {/* SOLAR */}
          <Link
            href="/solar"
            className="group relative flex min-h-[600px] flex-col justify-between overflow-hidden border-b border-line bg-accent px-7 py-7 text-brand md:px-10 md:py-10"
          >
            <div className="pointer-events-none absolute -right-[9%] top-[5%] h-[460px] w-[460px] rounded-full border border-brand/15" />
            <div className="pointer-events-none absolute -right-[2%] top-[12%] h-[350px] w-[350px] rounded-full border border-brand/15" />
            <div className="pointer-events-none absolute right-[6%] top-[20%] h-[230px] w-[230px] rounded-full border border-brand/15" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.09em]">
                02 / Solar
              </span>

              <span className="text-[11px] text-brand/55">
                Residential → Industrial
              </span>
            </div>

            <div className="relative z-10">
              <p className="max-w-[390px] text-[14px] leading-[1.6] text-brand/65">
                Solar systems designed around actual energy requirements,
                property conditions and long-term consumption.
              </p>

              <div className="mt-7 flex items-end justify-between">
                <h2 className="text-[55px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[70px]">
                  Solar
                  <br />
                  Energy
                </h2>

                <span className="text-[27px] transition-transform duration-300 group-hover:translate-x-3">
                  →
                </span>
              </div>
            </div>
          </Link>

          {/* GENERATORS */}
          <Link
            href="/generators"
            className="group flex min-h-[500px] flex-col justify-between border-b border-line bg-inverse px-7 py-7 text-white md:px-10 md:py-10 lg:border-b-0 lg:border-r"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-accent">
                03 / Power Generation
              </span>

              <span className="text-[11px] text-white/35">
                Standby → Industrial
              </span>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-3 border-y border-white/15">
                <SolutionMetric value="01" label="Standby" />
                <SolutionMetric value="02" label="Commercial" />
                <SolutionMetric value="03" label="Industrial" last />
              </div>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <h2 className="text-[52px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[66px]">
                    Generators
                  </h2>

                  <p className="mt-5 max-w-[430px] text-[14px] leading-[1.6] text-white/45">
                    Backup and primary power systems with engineering,
                    installation and after-sales support.
                  </p>
                </div>

                <span className="text-[27px] text-accent transition-transform duration-300 group-hover:translate-x-3">
                  →
                </span>
              </div>
            </div>
          </Link>

          {/* ENGINEERING */}
          <Link
            href="/company"
            className="group flex min-h-[500px] flex-col justify-between bg-image-well px-7 py-7 md:px-10 md:py-10"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-brand">
                04 / Engineering & Services
              </span>

              <span className="text-[11px] text-ink-faint">
                Design → Support
              </span>
            </div>

            <div>
              <div className="space-y-0 border-t border-line">
                <ServiceRow number="01" label="Site Assessment" />
                <ServiceRow number="02" label="Installation" />
                <ServiceRow number="03" label="Commissioning" />
                <ServiceRow number="04" label="After-Sales Support" />
              </div>

              <div className="mt-10 flex items-end justify-between">
                <h2 className="max-w-[570px] text-[50px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[64px]">
                  Engineering
                  <br />
                  beyond the product.
                </h2>

                <span className="text-[27px] text-brand transition-transform duration-300 group-hover:translate-x-3">
                  →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* =====================================================
          03 / PROOF
      ===================================================== */}

      <section className="bg-white">
        <SectionHeader
          number="03"
          label="Engineering Since 1975"
          right="Experience / Infrastructure / Support"
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4">
          <ProofStat
            eyebrow="Founded"
            value="1975"
            description="Engineering roots established in Lahore."
          />

          <ProofStat
            eyebrow="Generator Installations"
            value="10,000+"
            description="Power systems installed across Pakistan."
          />

          <ProofStat
            eyebrow="Capability"
            value="4"
            suffix=" Divisions"
            description="EV charging, solar, generators and engineering services."
          />

          <ProofStat
            eyebrow="Support"
            value="On-site"
            description="Engineering and after-sales support beyond delivery."
            last
          />
        </div>
      </section>

      {/* =====================================================
          04 / EV FEATURE
      ===================================================== */}

      <section className="bg-paper">
        <SectionHeader
          number="04"
          label="EV Charging"
          right="Residential / Commercial / Fleet"
        />

        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex flex-col justify-between border-b border-line px-5 py-12 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
            <div>
              <span className="inline-flex border border-brand/20 bg-brand/[0.035] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
                Multiline EV Charging
              </span>

              <h2 className="mt-10 max-w-[650px] text-[60px] font-medium leading-[0.9] tracking-[-0.06em] sm:text-[76px] lg:text-[88px]">
                From the wall
                <br />
                to the road.
              </h2>

              <p className="mt-8 max-w-[440px] text-[16px] leading-[1.65] text-ink-soft">
                Chargers for homes, workplaces, fleets and public
                infrastructure — supported by compatibility guidance and
                professional installation.
              </p>
            </div>

            <div className="mt-16">
              <FeatureLink
                label="Find the right charger for my EV"
                href="/ev-chargers"
              />

              <FeatureLink
                label="Browse all EV chargers"
                href="/ev-chargers"
              />

              <FeatureLink
                label="Commercial charging solutions"
                href="/ev-chargers"
              />
            </div>
          </div>

          <div className="relative min-h-[680px] overflow-hidden bg-image-well lg:min-h-[820px]">
            <Image
              src="/images/products/charger-front1.png"
              alt="Multiline home EV charger"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/[0.035]" />

            <div className="absolute bottom-7 left-7 right-7 grid grid-cols-3 bg-paper/95 backdrop-blur-sm md:bottom-9 md:left-9 md:right-9">
              <EVMetric value="7–22 kW" label="AC Charging" />
              <EVMetric value="30–120+" label="DC Charging" />
              <EVMetric value="Type 2 / CCS2" label="Connectors" last />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          05 / SOLAR CALCULATOR
      ===================================================== */}

      <section className="bg-accent text-brand">
        <SectionHeader
          number="05"
          label="Solar"
          right="Residential / Commercial / Industrial"
          yellow
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-brand/20 px-5 py-12 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
            <h2 className="max-w-[720px] text-[58px] font-medium leading-[0.9] tracking-[-0.06em] sm:text-[74px] lg:text-[86px]">
              How much solar
              <br />
              does your home
              <br />
              actually need?
            </h2>

            <p className="mt-8 max-w-[470px] text-[16px] leading-[1.65] text-brand/65">
              Start with your electricity consumption, property type and EV
              usage. We&apos;ll turn that into a practical system estimate.
            </p>
          </div>

          <div className="px-5 py-12 md:px-8 lg:px-12 lg:py-16">
            <div className="border-t border-brand/30">
              <CalculatorRow
                label="Monthly units"
                value={`${units} units`}
              >
                <input
                  type="range"
                  min="200"
                  max="2500"
                  step="50"
                  value={units}
                  onChange={(event) =>
                    setUnits(Number(event.target.value))
                  }
                  className="mt-5 w-full cursor-pointer"
                  style={{ accentColor: "var(--brand)" }}
                />
              </CalculatorRow>

              <CalculatorRow label="Property" value={property}>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["5 Marla", "10 Marla", "1 Kanal"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setProperty(item)}
                      className={`border px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.07em] ${
                        property === item
                          ? "border-brand bg-brand text-white"
                          : "border-brand/25"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </CalculatorRow>

              <CalculatorRow
                label="EV at home"
                value={hasEV ? "Yes" : "No"}
              >
                <button
                  type="button"
                  onClick={() => setHasEV((current) => !current)}
                  className="mt-5 flex h-[42px] w-[90px] items-center border border-brand/30 p-1"
                >
                  <span
                    className={`h-full w-1/2 bg-brand transition-transform duration-300 ${
                      hasEV ? "translate-x-full" : ""
                    }`}
                  />
                </button>
              </CalculatorRow>
            </div>

            <button
              type="button"
              className="group mt-10 flex h-[68px] w-full items-center justify-between bg-brand px-7 text-white"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.09em]">
                Calculate My Solar System
              </span>

              <span className="text-[20px] text-accent transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>

            <p className="mt-4 text-[11px] leading-[1.5] text-brand/50">
              Preliminary calculator preview. Final system recommendation will
              use verified Multiline sizing logic.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          06 / PROJECTS
      ===================================================== */}

      <section className="bg-paper">
        <SectionHeader
          number="06"
          label="Selected Work"
          right="Real Multiline Installations"
        />

        <div className="px-5 py-14 md:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1600px]">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <h2 className="text-[56px] font-medium leading-[0.9] tracking-[-0.06em] sm:text-[72px]">
                Engineering
                <br />
                in the real world.
              </h2>

              <p className="max-w-[430px] text-[15px] leading-[1.65] text-ink-soft">
                Products matter. What matters more is how they perform once
                they become part of a real home, business or infrastructure
                project.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <ProjectCard
                number="01"
                title="Residential EV Charging"
                location="Lahore"
                image="/images/products/charger-installation.png"
                large
              />

              <ProjectCard
                number="02"
                title="Home Charging System"
                location="Pakistan"
                image="/images/products/charger-front1.png"
              />

              <ProjectCard
                number="03"
                title="Commercial Fast Charging"
                location="Pakistan"
                image="/images/products/60kw-dc.png"
              />

              <ProjectGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          07 / HERITAGE
      ===================================================== */}

      <section className="bg-inverse text-white">
        <SectionHeader
          number="07"
          label="1975 — Today"
          right="Multiline Engineering"
          dark
        />

        <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
          <div className="border-b border-white/15 px-5 py-14 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-18">
            <p className="text-[12px] font-semibold uppercase tracking-[0.09em] text-accent">
              Our Story
            </p>

            <h2 className="mt-8 font-display max-w-[620px] text-[62px] font-medium leading-[0.95] tracking-[-0.035em] sm:text-[78px]">
              Built on engineering.
            </h2>

            <p className="mt-9 max-w-[470px] text-[16px] leading-[1.7] text-white/50">
              From power generation to renewable energy and EV charging,
              Multiline has evolved with the technologies its customers rely
              on — while keeping engineering at the centre of the business.
            </p>

            <Link
              href="/company"
              className="group mt-12 flex max-w-[420px] items-center justify-between border-y border-white/25 py-5"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                Read Our Story
              </span>

              <span className="text-accent transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>

          <div className="px-5 md:px-8 lg:px-12">
            <TimelineRow
              year="1975"
              title="Multiline founded"
              copy="Engineering foundations established in Lahore."
            />

            <TimelineRow
              year="1980s"
              title="Power generation"
              copy="Generator systems and engineering services become a core capability."
            />

            <TimelineRow
              year="2000s"
              title="Infrastructure"
              copy="Expanded power and electrical engineering capability."
            />

            <TimelineRow
              year="2010s"
              title="Solar"
              copy="Renewable energy becomes part of the Multiline portfolio."
            />

            <TimelineRow
              year="2020s"
              title="EV charging"
              copy="Charging infrastructure joins the next generation of Multiline energy systems."
              last
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          08 / PARTNERS
      ===================================================== */}

      <section className="bg-white">
        <SectionHeader
          number="08"
          label="Partners & Clients"
          right="Technology / Industry / Infrastructure"
        />

        <div className="px-5 py-16 md:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.09em] text-ink-faint">
              Technology Partners
            </p>

            <div className="mt-8 grid grid-cols-2 border-l border-t border-line md:grid-cols-3 lg:grid-cols-6">
              {[
                "PERKINS",
                "CUMMINS",
                "JENSONN",
                "SOLAR",
                "POWER",
                "ENERGY",
              ].map((partner) => (
                <div
                  key={partner}
                  className="flex min-h-[130px] items-center justify-center border-b border-r border-line px-5"
                >
                  <span className="text-[16px] font-semibold tracking-[0.04em] text-ink-faint">
                    {partner}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-col justify-between gap-8 border-t border-line pt-10 lg:flex-row lg:items-end">
              <h2 className="max-w-[700px] text-[48px] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[60px]">
                Trusted across
                <br />
                industries.
              </h2>

              <Link
                href="/company"
                className="group flex min-w-[250px] items-center justify-between border-y border-line-strong py-5"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                  View Company
                </span>

                <span className="text-brand transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          09 / FINAL ROUTING
      ===================================================== */}

      <section id="contact" className="bg-brand text-white">
        <SectionHeader
          number="09"
          label="Start Here"
          right="Multiline Engineering"
          dark
        />

        <div className="px-5 py-16 md:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="max-w-[1100px] text-[62px] font-medium leading-[0.88] tracking-[-0.065em] sm:text-[82px] lg:text-[104px]">
              What are you
              <br />
              looking to power?
            </h2>

            <div className="mt-16 grid border-t border-white/25 lg:grid-cols-3">
              <FinalRoute
                number="01"
                label="EV Charging"
                description="Find the right charger for your vehicle."
                href="/ev-chargers"
              />

              <FinalRoute
                number="02"
                label="Solar"
                description="Estimate the solar system your property needs."
                href="/solar"
              />

              <FinalRoute
                number="03"
                label="Commercial / Industrial"
                description="Talk directly to the Multiline engineering team."
                href="/contact"
                last
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   REUSABLE
========================================================= */

function SectionHeader({
  number,
  label,
  right,
  dark = false,
  yellow = false,
}: {
  number: string;
  label: string;
  right: string;
  dark?: boolean;
  yellow?: boolean;
}) {
  return (
    <div
      className={`border-b px-5 py-5 md:px-8 lg:px-12 ${
        dark
          ? "border-white/15"
          : yellow
            ? "border-brand/20"
            : "border-line"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.09em] ${
            dark
              ? "text-accent"
              : yellow
                ? "text-brand"
                : "text-brand"
          }`}
        >
          <span>{number}</span>

          <span
            className={
              dark
                ? "text-white/25"
                : yellow
                  ? "text-brand/30"
                  : "text-ink-faint/50"
            }
          >
            /
          </span>

          <span>{label}</span>
        </div>

        <span
          className={`hidden text-[10px] font-medium uppercase tracking-[0.07em] md:block ${
            dark
              ? "text-white/30"
              : yellow
                ? "text-brand/45"
                : "text-ink-faint"
          }`}
        >
          {right}
        </span>
      </div>
    </div>
  );
}

function SolutionMetric({
  value,
  label,
  last = false,
}: {
  value: string;
  label: string;
  last?: boolean;
}) {
  return (
    <div
      className={`px-4 py-6 ${
        last ? "" : "border-r border-white/15"
      }`}
    >
      <p className="text-[18px] font-medium text-accent">
        {value}
      </p>

      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.07em] text-white/35">
        {label}
      </p>
    </div>
  );
}

function ServiceRow({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="grid grid-cols-[45px_1fr_auto] items-center border-b border-line py-5">
      <span className="text-[10px] font-semibold tracking-[0.08em] text-ink-faint">
        {number}
      </span>

      <span className="text-[14px] font-medium">
        {label}
      </span>

      <span className="text-brand">↗</span>
    </div>
  );
}

function ProofStat({
  eyebrow,
  value,
  suffix,
  description,
  last = false,
}: {
  eyebrow: string;
  value: string;
  suffix?: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[330px] flex-col justify-between border-b border-line px-5 py-9 md:px-8 xl:border-b-0 xl:px-10 ${
        last ? "" : "xl:border-r"
      }`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
        {eyebrow}
      </span>

      <div>
        <p className="text-[55px] font-medium leading-none tracking-[-0.06em] sm:text-[66px]">
          {value}
          {suffix && (
            <span className="text-[20px] tracking-[-0.02em] text-brand">
              {suffix}
            </span>
          )}
        </p>

        <p className="mt-6 max-w-[280px] text-[13px] leading-[1.6] text-ink-soft">
          {description}
        </p>
      </div>
    </div>
  );
}

function FeatureLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between border-b border-line-strong py-5"
    >
      <span className="text-[13px] font-medium">{label}</span>

      <span className="text-[18px] text-brand transition-transform duration-300 group-hover:translate-x-2">
        →
      </span>
    </Link>
  );
}

function EVMetric({
  value,
  label,
  last = false,
}: {
  value: string;
  label: string;
  last?: boolean;
}) {
  return (
    <div
      className={`px-5 py-5 ${
        last ? "" : "border-r border-line"
      }`}
    >
      <p className="text-[16px] font-semibold tracking-[-0.02em]">
        {value}
      </p>

      <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.07em] text-ink-faint">
        {label}
      </p>
    </div>
  );
}

function CalculatorRow({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-brand/30 py-7">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
          {label}
        </span>

        <span className="text-[20px] font-medium tracking-[-0.03em]">
          {value}
        </span>
      </div>

      {children}
    </div>
  );
}

function ProjectCard({
  number,
  title,
  location,
  image,
  large = false,
}: {
  number: string;
  title: string;
  location: string;
  image: string;
  large?: boolean;
}) {
  return (
    <Link
      href="/projects"
      className={`group ${large ? "md:row-span-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-image-well ${
          large ? "aspect-[4/5]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.015]"
        />

        <div className="absolute left-5 top-5 border border-white/30 bg-black/15 px-3 py-2 text-[10px] font-semibold tracking-[0.08em] text-white backdrop-blur-sm">
          {number}
        </div>
      </div>

      <div className="flex items-start justify-between border-x border-b border-line px-5 py-5">
        <div>
          <h3 className="font-display text-[24px] font-medium tracking-[-0.025em]">
            {title}
          </h3>

          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.07em] text-ink-faint">
            {location}
          </p>
        </div>

        <span className="text-brand transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </div>
    </Link>
  );
}

function ProjectGraphic() {
  return (
    <Link
      href="/projects"
      className="group flex min-h-[360px] flex-col justify-between bg-brand p-7 text-white md:p-9"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
          04 / More Work
        </span>

        <span className="text-[10px] text-white/35">Project Archive</span>
      </div>

      <div>
        <p className="font-display max-w-[480px] text-[42px] font-medium leading-[0.95] tracking-[-0.03em]">
          See how Multiline systems perform beyond the specification sheet.
        </p>

        <div className="mt-9 flex items-center justify-between border-t border-white/25 pt-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
            View All Projects
          </span>

          <span className="text-[20px] text-accent transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function TimelineRow({
  year,
  title,
  copy,
  last = false,
}: {
  year: string;
  title: string;
  copy: string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid gap-6 py-8 md:grid-cols-[110px_220px_1fr] ${
        last ? "" : "border-b border-white/15"
      }`}
    >
      <span className="text-[18px] font-semibold text-accent">
        {year}
      </span>

      <span className="text-[16px] font-medium">
        {title}
      </span>

      <p className="max-w-[420px] text-[14px] leading-[1.65] text-white/45">
        {copy}
      </p>
    </div>
  );
}

function FinalRoute({
  number,
  label,
  description,
  href,
  last = false,
}: {
  number: string;
  label: string;
  description: string;
  href: string;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group min-h-[270px] px-0 py-8 lg:px-8 ${
        last
          ? ""
          : "border-b border-white/25 lg:border-b-0 lg:border-r"
      }`}
    >
      <span className="text-[10px] font-semibold tracking-[0.09em] text-accent">
        {number}
      </span>

      <h3 className="mt-14 text-[29px] font-medium tracking-[-0.04em]">
        {label}
      </h3>

      <div className="mt-5 flex items-end justify-between">
        <p className="max-w-[300px] text-[13px] leading-[1.6] text-white/45">
          {description}
        </p>

        <span className="text-[21px] text-accent transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </div>
    </Link>
  );
}