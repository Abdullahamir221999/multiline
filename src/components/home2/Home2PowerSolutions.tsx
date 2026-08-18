"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

type Tab = "ev" | "solar" | "generators";

const tabs: {
  id: Tab;
  label: string;
}[] = [
  {
    id: "ev",
    label: "EV Charging",
  },
  {
    id: "solar",
    label: "Solar",
  },
  {
    id: "generators",
    label: "Generators",
  },
];

export const Home2PowerSolutions = () => {
  const [activeTab, setActiveTab] = useState<Tab>("ev");

  return (
    <section
      id="solutions"
      className="border-b border-line bg-paper"
    >
      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="page-pad page-shell py-8 text-center lg:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
          What we do
        </p>

        <h2 className="mt-2 text-[34px] font-semibold uppercase leading-none tracking-[-0.045em] sm:text-[40px] lg:text-[46px]">
          Our Power Solutions
        </h2>
      </div>

      {/* =====================================================
          TABS + CONTENT
      ===================================================== */}

      <div className="page-pad page-shell pb-10 lg:pb-12">
        {/* TABS */}

        <div
          role="tablist"
          aria-label="Power solutions"
          className="grid grid-cols-3"
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex h-[72px] items-center justify-center border border-line px-3 text-center text-[14px] font-semibold uppercase tracking-[-0.02em] transition-colors duration-300 sm:h-[82px] sm:text-[17px] lg:h-[88px] lg:text-[20px] ${
                  active
                    ? "z-10 bg-black text-white"
                    : "bg-[#E2E4E4] text-black hover:bg-[#D7DADB]"
                }`}
              >
                {tab.label}

                {active && (
                  <motion.span
                    layoutId="solution-tab"
                    className="absolute bottom-0 left-0 h-[4px] w-full bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}

        <AnimatePresence mode="wait">
          {activeTab === "ev" && (
            <EVPanel key="ev" />
          )}

          {activeTab === "solar" && (
            <SolarPanel key="solar" />
          )}

          {activeTab === "generators" && (
            <GeneratorPanel key="generators" />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ==========================================================
   SHARED MOTION WRAPPER
========================================================== */

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -8,
      }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================
   EV CHARGING
========================================================== */

function EVPanel() {
  return (
    <Panel className="grid overflow-hidden bg-[#EFF3FF] lg:min-h-[390px] lg:grid-cols-[0.9fr_1.1fr]">
      {/* CONTENT */}

      <div className="flex flex-col justify-center border-b border-line px-6 py-9 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand">
          EV Charging
        </p>

        <h3 className="mt-4 max-w-[520px] text-[38px] font-semibold leading-[0.94] tracking-[-0.045em] sm:text-[44px] lg:text-[48px]">
          Charge at home.
          <br />
          Drive fully powered.
        </h3>

        <p className="mt-5 max-w-[460px] text-[14px] leading-[1.65] text-ink-soft">
          Smart residential and commercial EV charging with vehicle
          compatibility guidance, installation and after-sales support.
        </p>

        {/* PRODUCT */}

        <div className="mt-7 flex max-w-[470px] items-center justify-between border-y border-line py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-faint">
              Featured Charger
            </p>

            <p className="mt-1 text-[18px] font-semibold tracking-[-0.03em]">
              11kW Home Charger
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.06em] text-ink-faint">
              Output
            </p>

            <p className="mt-1 text-[17px] font-semibold">
              11 kW
            </p>
          </div>
        </div>

        <Link
          href="/ev-chargers"
          className="group mt-6 flex h-[58px] max-w-[470px] items-center justify-between bg-brand px-6 text-white transition-colors hover:bg-[#0f3d7d]"
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.04em]">
            Explore EV Chargers
          </span>

          <span className="text-[19px] text-accent transition-transform group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>

      {/* PRODUCT IMAGE */}

      <div className="relative min-h-[340px] overflow-hidden lg:min-h-0">
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-brand/[0.07]" />

        <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-brand/[0.07]" />

        <Image
          src="/images/products/charger-front1.png"
          alt="Multiline 11kW home EV charger"
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-contain p-7 lg:p-8"
        />
      </div>
    </Panel>
  );
}

/* ==========================================================
   SOLAR
========================================================== */

function SolarPanel() {
  const [monthlyUnits, setMonthlyUnits] =
    useState(850);

  const [property, setProperty] =
    useState<"5 Marla" | "10 Marla" | "1 Kanal">(
      "10 Marla"
    );

  const [evAtHome, setEvAtHome] =
    useState(false);

  /*
    Indicative preview only.
    Replace with verified Multiline sizing logic later.
  */

  const indicativeSize = useMemo(() => {
    let size = monthlyUnits / 90;

    if (property === "5 Marla") {
      size *= 0.95;
    }

    if (property === "1 Kanal") {
      size *= 1.05;
    }

    if (evAtHome) {
      size += 2;
    }

    const low = Math.max(
      3,
      Math.round(size)
    );

    return `${low}–${low + 2} kW`;
  }, [
    monthlyUnits,
    property,
    evAtHome,
  ]);

  return (
    <Panel className="grid bg-accent lg:min-h-[390px] lg:grid-cols-[0.9fr_1.1fr]">
      {/* LEFT */}

      <div className="flex flex-col justify-center border-b border-black/15 px-6 py-9 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand">
          Solar
        </p>

        <h3 className="mt-4 max-w-[520px] text-[38px] font-semibold leading-[0.94] tracking-[-0.045em] text-brand sm:text-[44px] lg:text-[48px]">
          Size the system
          <br />
          before you buy panels.
        </h3>

        <p className="mt-5 max-w-[440px] text-[14px] leading-[1.65] text-brand/75">
          A quick estimate from monthly units, property size and whether you
          charge an EV at home.
        </p>

        <div className="mt-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-brand/60">
            Indicative Size
          </p>

          <p className="mt-2 text-[38px] font-semibold tracking-[-0.05em] text-brand">
            {indicativeSize}
          </p>
        </div>
      </div>

      {/* CALCULATOR */}

      <div className="flex items-center px-6 py-9 sm:px-8 lg:px-10 lg:py-10">
        <div className="w-full">
          {/* MONTHLY UNITS */}

          <div className="border-b border-brand/20 pb-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-brand">
                Monthly Units
              </p>

              <p className="text-[13px] font-semibold text-brand">
                {monthlyUnits}
              </p>
            </div>

            <input
              type="range"
              min={200}
              max={2500}
              step={50}
              value={monthlyUnits}
              onChange={(event) =>
                setMonthlyUnits(
                  Number(
                    event.target.value
                  )
                )
              }
              className="mt-4 w-full cursor-pointer"
              style={{
                accentColor: "#124897",
              }}
            />
          </div>

          {/* PROPERTY */}

          <div className="border-b border-brand/20 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-brand">
              Property
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "5 Marla",
                "10 Marla",
                "1 Kanal",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setProperty(
                      item as typeof property
                    )
                  }
                  className={`h-[44px] border border-brand/30 px-4 text-[12px] font-semibold uppercase tracking-[0.03em] transition-colors ${
                    property === item
                      ? "bg-brand text-white"
                      : "text-brand hover:bg-brand/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* EV TOGGLE */}

          <div className="flex items-center justify-between border-b border-brand/20 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-brand">
              EV at Home
            </p>

            <button
              type="button"
              role="switch"
              aria-checked={evAtHome}
              onClick={() =>
                setEvAtHome(
                  (current) => !current
                )
              }
              className={`relative h-[32px] w-[60px] border border-brand transition-colors ${
                evAtHome
                  ? "bg-brand"
                  : "bg-transparent"
              }`}
            >
              <span
                className={`absolute top-[3px] h-[24px] w-[24px] bg-brand transition-all ${
                  evAtHome
                    ? "left-[31px] bg-accent"
                    : "left-[3px]"
                }`}
              />
            </button>
          </div>

          {/* CTA */}

          <Link
            href="/solar"
            className="group mt-5 flex h-[58px] w-full items-center justify-between bg-brand px-6 text-white transition-colors hover:bg-[#0f3d7d]"
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.04em]">
              Continue to Solar
            </span>

            <span className="text-[19px] text-accent transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </Panel>
  );
}

/* ==========================================================
   GENERATORS
========================================================== */

function GeneratorPanel() {
  return (
    <Panel className="grid bg-brand text-white lg:min-h-[390px] lg:grid-cols-[0.9fr_1.1fr]">
      {/* LEFT */}

      <div className="flex flex-col justify-center border-b border-white/20 px-6 py-9 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
          Generators
        </p>

        <h3 className="mt-4 max-w-[520px] text-[38px] font-semibold leading-[0.94] tracking-[-0.045em] sm:text-[44px] lg:text-[48px]">
          Power that stays
          <br />
          when the grid does not.
        </h3>

        <p className="mt-5 max-w-[450px] text-[14px] leading-[1.65] text-white/65">
          Generator systems engineered for homes, businesses and critical
          infrastructure with supply, installation and ongoing technical
          support.
        </p>

        <Link
          href="/generators"
          className="group mt-7 flex h-[58px] max-w-[470px] items-center justify-between bg-accent px-6 text-black transition-colors hover:bg-accent-hover"
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.04em]">
            Explore Generators
          </span>

          <span className="text-[19px] transition-transform group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>

      {/* GENERATOR INFO */}

      <div className="grid grid-cols-2">
        <GeneratorStat
          value="10,000+"
          label="Generator Installations"
        />

        <GeneratorStat
          value="50+"
          label="Years of Experience"
        />

        <GeneratorStat
          value="On-site"
          label="Engineering Support"
        />

        <GeneratorStat
          value="24/7"
          label="Power Reliability"
        />
      </div>
    </Panel>
  );
}

function GeneratorStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex min-h-[160px] flex-col justify-between border-b border-r border-white/20 p-6 lg:min-h-[195px] lg:p-7">
      <span className="text-[30px] font-semibold tracking-[-0.05em] text-accent lg:text-[38px]">
        {value}
      </span>

      <span className="max-w-[170px] text-[10px] font-semibold uppercase leading-[1.4] tracking-[0.06em] text-white/55">
        {label}
      </span>
    </div>
  );
}