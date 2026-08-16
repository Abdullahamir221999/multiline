"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import {
  formatChargeTime,
  formatHoursAsReadable,
} from "@/helpers/formatChargeTime";

const specs = [
  ["Rated Output", "11 kW"],
  ["Connector", "Type 2"],
  ["Supply", "3 Phase"],
  ["Protection", "IP65"],
  ["Input Voltage", "400 V AC"],
  ["Rated Current", "16 A"],
  ["Connectivity", "Wi-Fi / Smart Control"],
  ["Installation", "Wall Mounted"],
  ["Application", "Residential / Commercial"],
  ["Warranty", "2 Years"],
];

const faqItems = [
  {
    question: "Will this charger work with my EV?",
    answer:
      "Use the compatibility checker above to select your vehicle. The final production system will use verified vehicle and charger data to determine connector compatibility and supported AC charging speed.",
  },
  {
    question: "Do I need three-phase electricity?",
    answer:
      "This 11 kW configuration is designed around a three-phase electrical supply. Before installation, Multiline can assess the property's electrical infrastructure and confirm the appropriate charger configuration.",
  },
  {
    question: "Can this charger work with solar?",
    answer:
      "Yes, an EV charger can form part of a wider residential energy setup. Multiline can assess the home's electricity consumption, EV usage and solar system requirements together.",
  },
  {
    question: "Does Multiline provide installation?",
    answer:
      "The product experience can include an installation request alongside the charger purchase. The Multiline team can then review the property and provide the appropriate installation scope.",
  },
  {
    question: "What if my car only supports 7 kW AC charging?",
    answer:
      "A compatible vehicle controls how much AC power it accepts. If the vehicle accepts less than the charger's maximum output, charging takes place at the lower supported rate.",
  },
  {
    question: "Can I purchase the charger without installation?",
    answer:
      "The product and installation can be presented as separate options so customers can purchase the charger independently or request a complete installation package.",
  },
];

export default function ProductStory() {
  const [startCharge, setStartCharge] = useState(20);
  const [targetCharge, setTargetCharge] = useState(80);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const batteryCapacity = 88.1;
  const chargingPower = 11;
  const chargingEfficiency = 0.9;

  const chargingTime = useMemo(
    () =>
      formatChargeTime({
        batteryKwh: batteryCapacity,
        powerKw: chargingPower,
        startPercent: startCharge,
        targetPercent: targetCharge,
        efficiency: chargingEfficiency,
      }),
    [startCharge, targetCharge]
  );

  const chargingTimeLabel = formatHoursAsReadable(chargingTime);

  useEffect(() => {
    function handleScroll() {
      setShowStickyBar(window.scrollY > 850);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ======================================================
          03 / CHARGING ESTIMATOR
      ====================================================== */}

      <section className="bg-inverse text-white">
        <div className="border-b border-white/15 px-5 py-5 md:px-8 lg:px-12">
          <SectionLabel
            number="03"
            label="Charging Estimate"
            light
          />
        </div>

        <div className="grid min-h-[720px] lg:grid-cols-2">
          <div className="flex flex-col justify-between border-b border-white/15 px-5 py-12 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
                Example vehicle / KIA EV5
              </p>

              <h2 className="mt-8 max-w-[650px] text-[58px] font-medium leading-[0.9] tracking-[-0.06em] sm:text-[72px] lg:text-[82px]">
                Know before
                <br />
                you plug in.
              </h2>

              <p className="mt-8 max-w-[440px] text-[16px] leading-[1.6] text-white/50">
                Adjust the battery range to estimate how long a typical home
                charging session could take.
              </p>
            </motion.div>

            <div className="mt-16 border-t border-white/15 pt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/30">
                Demo calculation / final values will use verified vehicle data
              </p>
            </div>
          </div>

          <div className="flex items-center px-5 py-14 md:px-8 lg:px-12">
            <div className="w-full">
              <div className="flex items-end justify-between border-b border-white/20 pb-8">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/35">
                    Estimated time
                  </p>

                  <motion.p
                    key={chargingTimeLabel}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-[48px] font-medium leading-none tracking-[-0.06em] sm:text-[64px]"
                  >
                    {chargingTimeLabel}
                  </motion.p>
                </div>

                <div className="font-mono text-right text-[9px] uppercase leading-[1.8] tracking-[0.08em] text-white/30">
                  11 kW
                  <br />
                  AC Charging
                </div>
              </div>

              <ChargeSlider
                label="Starting charge"
                value={startCharge}
                min={5}
                max={Math.max(targetCharge - 5, 10)}
                onChange={(value) =>
                  setStartCharge(Math.min(value, targetCharge - 5))
                }
              />

              <ChargeSlider
                label="Target charge"
                value={targetCharge}
                min={Math.min(startCharge + 5, 100)}
                max={100}
                onChange={(value) =>
                  setTargetCharge(Math.max(value, startCharge + 5))
                }
              />

              <div className="mt-10 grid grid-cols-3 border-y border-white/20">
                <MiniStat
                  label="Battery"
                  value="88.1 kWh"
                />

                <MiniStat
                  label="Charging"
                  value="11 kW"
                />

                <MiniStat
                  label="Added"
                  value={`${targetCharge - startCharge}%`}
                  noBorder
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          04 / EV + SOLAR
      ====================================================== */}

      <section className="bg-paper">
        <div className="grid min-h-[720px] lg:grid-cols-2">
          <div className="flex flex-col justify-between border-b border-line px-5 py-12 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
            <SectionLabel number="04" label="EV + Solar" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h2 className="max-w-[680px] text-[58px] font-medium leading-[0.9] tracking-[-0.06em] sm:text-[74px] lg:text-[84px]">
                Power the car.
                <br />
                Power the home.
              </h2>

              <p className="mt-8 max-w-[440px] text-[16px] leading-[1.6] text-ink-soft">
                Combine household consumption and EV charging into one solar
                sizing journey.
              </p>

<button
  type="button"
  className="group mt-10 flex h-[64px] w-full max-w-[440px] items-center justify-between bg-brand px-6 text-white transition-colors duration-300 hover:brightness-110"
>
  <span className="text-[12px] font-semibold uppercase tracking-[0.09em]">
    Calculate My Solar System
  </span>

  <span className="text-[20px] text-accent transition-transform duration-300 group-hover:translate-x-2">
    →
  </span>
</button>
            </motion.div>

            <div className="font-mono mt-14 text-[9px] uppercase tracking-[0.1em] text-ink-faint">
              Home + EV / Combined Energy Planning
            </div>
          </div>

          <div className="grid grid-cols-2 bg-brand text-white">
            <SolarMetric
              value="01"
              title="Home usage"
              copy="Monthly household electricity consumption."
            />

            <SolarMetric
              value="+"
              title="EV usage"
              copy="Daily driving and expected charging requirement."
            />

            <SolarMetric
              value="="
              title="System size"
              copy="Solar sizing based around the complete energy profile."
            />

<SolarMetric
  value="→"
  title="Quote"
  copy="Pass the recommendation directly to Multiline sales."
/>
          </div>
        </div>
      </section>

      {/* ======================================================
          05 / SMART CHARGING — REDUCED
      ====================================================== */}

      <section className="bg-image-well">
        <div className="border-b border-line px-5 py-5 md:px-8 lg:px-12">
          <SectionLabel number="05" label="Smart Charging" />
        </div>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          {/* Intro */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-b border-line px-5 py-12 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14"
          >
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
              Connected charging
            </p>

            <h2 className="max-w-[620px] text-[52px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[64px] lg:text-[68px]">
              Charging that
              <br />
              works around you.
            </h2>

            <p className="mt-7 max-w-[440px] text-[15px] leading-[1.65] text-ink-soft">
              Connected controls help make everyday charging easier to plan,
              understand and manage.
            </p>
          </motion.div>

          {/* Features */}

          <div className="px-5 md:px-8 lg:px-12">
            <SmartFeatureRow
              number="01"
              title="Schedule"
              copy="Plan charging around your daily routine and preferred charging times."
            />

            <SmartFeatureRow
              number="02"
              title="Monitor"
              copy="Understand charging activity and keep track of energy usage."
            />

            <SmartFeatureRow
              number="03"
              title="Control"
              copy="Manage charger access and connected charging when needed."
              last
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          06 / ENGINEERING DATA
      ====================================================== */}

      <section className="bg-white">
        <div className="border-b border-line px-5 py-5 md:px-8 lg:px-12">
          <SectionLabel number="06" label="Engineering Data" />
        </div>

        <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-line px-5 py-12 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
            <h2 className="text-[50px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[64px]">
              Technical
              <br />
              specification.
            </h2>

            <p className="mt-7 max-w-[350px] text-[14px] leading-[1.6] text-ink-soft">
              Final production specifications should be populated from the
              exact Multiline charger datasheet.
            </p>
          </div>

          <div className="px-5 md:px-8 lg:px-12">
            {specs.map(([label, value], index) => (
              <DataRow
                key={label}
                number={String(index + 1).padStart(2, "0")}
                label={label}
                value={value}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          07 / INSTALLATION — PROCESS + REAL INSTALLATIONS
      ====================================================== */}

      <section className="bg-paper">
        <div className="border-b border-line px-5 py-5 md:px-8 lg:px-12">
          <SectionLabel number="07" label="Installation" />
        </div>

        {/* Main installation story */}

        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[560px] overflow-hidden border-b border-line lg:min-h-[720px] lg:border-b-0 lg:border-r">
            <Image
              src="/images/products/charger-installation.png"
              alt="Multiline EV charger installation"
              fill
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/[0.05]" />

            <div className="absolute bottom-7 left-7 text-[10px] font-semibold uppercase tracking-[0.08em] text-white drop-shadow">
              Residential Installation / Reference
            </div>
          </div>

          <div className="flex flex-col justify-between px-5 py-12 md:px-8 lg:px-12 lg:py-16">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-[560px] text-[58px] font-medium leading-[0.9] tracking-[-0.06em] sm:text-[70px]"
              >
                Installed by
                <br />
                Multiline.
              </motion.h2>

              <p className="mt-8 max-w-[460px] text-[16px] leading-[1.6] text-ink-soft">
                From the first electrical assessment to final commissioning,
                installation can be handled as part of the complete charging
                solution.
              </p>

              <div className="mt-12 border-t border-line-strong">
                <ProcessRow
                  number="01"
                  title="Site assessment"
                />

                <ProcessRow
                  number="02"
                  title="Electrical inspection"
                />

                <ProcessRow
                  number="03"
                  title="Charger installation"
                />

                <ProcessRow
                  number="04"
                  title="Testing & commissioning"
                />
              </div>
            </div>

            <button
              type="button"
              className="group mt-10 flex h-[64px] items-center justify-between border-y border-line-strong"
            >
              <span className="text-[12px] font-medium uppercase tracking-[0.09em]">
                Request Installation
              </span>

              <span className="text-[19px] text-brand transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Real installations */}

        <div className="border-t border-line px-5 py-12 md:px-8 lg:px-12 lg:py-14">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
                Real Installations
              </p>

              <h3 className="mt-4 text-[42px] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[52px]">
                In the real world.
              </h3>
            </div>

            <p className="max-w-[430px] text-[14px] leading-[1.65] text-ink-soft">
              See how Multiline charging systems sit within real residential
              and commercial environments.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <InstallationCard
              number="01"
              label="Residential"
              position="center"
            />

            <InstallationCard
              number="02"
              label="Home Charging"
              position="35% center"
            />

            <InstallationCard
              number="03"
              label="Installed System"
              position="65% center"
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          08 + 09 / INCLUDED + SUPPORT
      ====================================================== */}

      <section className="bg-white">
        <div className="grid lg:grid-cols-2">
          <div className="border-b border-line px-5 py-14 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
            <SectionLabel number="08" label="In The Box" />

            <h2 className="mt-20 text-[54px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[68px]">
              Everything
              <br />
              you need.
            </h2>

            <div className="mt-14 border-t border-line-strong">
              <SimpleRow number="01" text="11 kW EV charger" />
              <SimpleRow number="02" text="Charging cable" />
              <SimpleRow number="03" text="Wall mounting hardware" />
              <SimpleRow number="04" text="Product documentation" />
              <SimpleRow number="05" text="Warranty documentation" />
            </div>

            <p className="font-mono mt-6 text-[9px] uppercase tracking-[0.1em] text-ink-faint">
              Final package contents to be confirmed
            </p>
          </div>

          <div className="bg-brand px-5 py-14 text-white md:px-8 lg:px-12 lg:py-16">
            <SectionLabel
              number="09"
              label="Support"
              light
            />

            <h2 className="mt-20 text-[54px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[68px]">
              Built to be
              <br />
              supported.
            </h2>

            <div className="mt-14 border-t border-white/20">
              <SupportRow
                number="01"
                title="Technical Support"
                description="Direct support for charger and installation queries."
              />

              <SupportRow
                number="02"
                title="Installation"
                description="Professional assessment and installation services."
              />

              <SupportRow
                number="03"
                title="Warranty"
                description="Product warranty and after-sales support."
              />

              <SupportRow
                number="04"
                title="Service"
                description="Ongoing assistance from Multiline's engineering network."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          10 / COMPARE CHARGERS
      ====================================================== */}

      <section className="bg-inverse px-5 py-14 text-white md:px-8 lg:px-12 lg:py-20">
        <SectionLabel
          number="10"
          label="Compare"
          light
        />

        <div className="mt-16 flex flex-col justify-between gap-8 border-b border-white/20 pb-12 lg:flex-row lg:items-end">
          <h2 className="text-[56px] font-medium leading-[0.9] tracking-[-0.06em] sm:text-[72px]">
            Find your
            <br />
            charging level.
          </h2>

          <p className="max-w-[390px] text-[15px] leading-[1.6] text-white/45">
            Give customers context before they choose between residential AC
            charger configurations.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[850px]">
            <div className="grid grid-cols-[1.15fr_repeat(3,1fr)] border-b border-white/20">
              <div className="py-8" />

              <CompareHeading
                power="7 kW"
                label="Home"
              />

              <CompareHeading
                power="11 kW"
                label="Recommended"
                active
              />

              <CompareHeading
                power="22 kW"
                label="High Capacity"
              />
            </div>

            <CompareRow
              label="Rated output"
              values={["7 kW", "11 kW", "22 kW"]}
            />

            <CompareRow
              label="Positioning"
              values={[
                "Everyday AC",
                "Home AC",
                "High-output AC",
              ]}
            />

            <CompareRow
              label="Vehicle check"
              values={[
                "Required",
                "Required",
                "Required",
              ]}
            />

            <CompareRow
              label="Installation"
              values={[
                "Available",
                "Available",
                "Available",
              ]}
            />

            <div className="grid grid-cols-[1.15fr_repeat(3,1fr)] border-b border-white/20">
              <div className="py-7" />

              <CompareAction label="View 7 kW" />

              <div className="border-l border-white/20 bg-white/[0.05] px-6 py-7">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-accent">
                  Current Product
                </span>
              </div>

              <CompareAction label="View 22 kW" />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          11 / FAQ
      ====================================================== */}

      <section className="bg-white">
        <div className="grid lg:grid-cols-[0.68fr_1.32fr]">
          <div className="border-b border-line px-5 py-14 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
            <SectionLabel number="11" label="Questions" />

            <h2 className="mt-20 text-[54px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[68px]">
              Before
              <br />
              you buy.
            </h2>

            <p className="mt-7 max-w-[350px] text-[14px] leading-[1.6] text-ink-soft">
              Common questions around vehicle compatibility, installation and
              home charging.
            </p>
          </div>

          <div className="px-5 md:px-8 lg:px-12">
            {faqItems.map((item, index) => {
              const open = openFaq === index;

              return (
                <div
                  key={item.question}
                  className="border-b border-line-strong"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(open ? null : index)
                    }
                    className="grid w-full grid-cols-[42px_1fr_auto] items-center gap-4 py-7 text-left"
                  >
                    <span className="font-mono text-[8px] text-ink-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[17px] font-medium tracking-[-0.02em]">
                      {item.question}
                    </span>

                    <span
                      className={`text-[18px] font-light transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[680px] pb-8 pl-[58px] pr-8 text-[15px] leading-[1.7] text-ink-soft">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          12 / FINAL CTA
      ====================================================== */}

      <section className="bg-brand text-white">
        <div className="px-5 py-16 md:px-8 lg:px-12 lg:py-24">
          <SectionLabel
            number="12"
            label="11 kW Home Charger"
            light
          />

          <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-[900px] text-[62px] font-medium leading-[0.88] tracking-[-0.065em] sm:text-[82px] lg:text-[104px]">
                Ready when
                <br />
                you are.
              </h2>

              <p className="mt-8 text-[28px] font-medium tracking-[-0.035em]">
                PKR 185,000
              </p>
            </div>

            <button
              type="button"
              className="group flex h-[72px] min-w-[300px] items-center justify-between bg-accent px-7 text-ink"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em]">
                Add to Cart
              </span>

              <span className="text-[20px] transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================
          STICKY PURCHASE BAR
      ====================================================== */}

      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed bottom-0 left-0 right-0 z-[80] border-t border-line bg-paper/95 backdrop-blur-md"
          >
            <div className="flex h-[70px] items-center px-5 md:px-8 lg:px-12">
              <div>
                <p className="text-[13px] font-semibold tracking-[-0.02em]">
                  11kW Home Charger
                </p>

                <p className="font-mono mt-1 text-[8px] uppercase tracking-[0.1em] text-ink-faint">
                  AC / Residential
                </p>
              </div>

              <p className="ml-auto hidden text-[17px] font-medium sm:block">
                PKR 185,000
              </p>

              <button
                type="button"
                className="group ml-7 flex h-full min-w-[190px] items-center justify-between bg-accent px-6 text-ink"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">
                  Add to Cart
                </span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ==========================================================
   REUSABLE COMPONENTS
========================================================== */

function SectionLabel({
  number,
  label,
  light = false,
}: {
  number: string;
  label: string;
  light?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div
        className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.1em] ${
          light
            ? "text-accent"
            : "text-brand"
        }`}
      >
        <span>{number}</span>

        <span
          className={
            light
              ? "text-white/25"
              : "text-ink-faint/50"
          }
        >
          /
        </span>

        <span>{label}</span>
      </div>

      <span
        className={`h-[6px] w-[6px] ${
          light
            ? "bg-accent"
            : "bg-brand"
        }`}
      />
    </div>
  );
}

function ChargeSlider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="border-b border-white/20 py-7">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.075em] text-white/45">
          {label}
        </span>

        <span className="text-[24px] font-medium tracking-[-0.03em]">
          {value}%
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        className="mt-6 w-full cursor-pointer"
        style={{ accentColor: "var(--accent)" }}
      />
    </div>
  );
}

function MiniStat({
  label,
  value,
  noBorder = false,
}: {
  label: string;
  value: string;
  noBorder?: boolean;
}) {
  return (
    <div
      className={`py-6 ${
        noBorder ? "" : "border-r border-white/20"
      }`}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.075em] text-white/35">
        {label}
      </p>

      <p className="mt-3 text-[16px] font-medium">
        {value}
      </p>
    </div>
  );
}

function SmartFeatureRow({
  number,
  title,
  copy,
  last = false,
}: {
  number: string;
  title: string;
  copy: string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid gap-5 py-8 sm:grid-cols-[54px_150px_1fr] sm:items-center ${
        last ? "" : "border-b border-line"
      }`}
    >
      <span className="text-[10px] font-semibold tracking-[0.09em] text-ink-faint">
        {number}
      </span>

      <h3 className="text-[22px] font-medium tracking-[-0.035em]">
        {title}
      </h3>

      <p className="max-w-[430px] text-[13px] leading-[1.65] text-black/48">
        {copy}
      </p>
    </div>
  );
}

function ProcessRow({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="grid grid-cols-[50px_1fr_auto] items-center border-b border-line-strong py-5">
      <span className="text-[10px] font-semibold tracking-[0.09em] text-ink-faint">
        {number}
      </span>

      <span className="text-[15px] font-medium">
        {title}
      </span>

      <span className="text-[13px] text-brand">
        ↗
      </span>
    </div>
  );
}

function DataRow({
  number,
  label,
  value,
}: {
  number: string;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[46px_1fr_auto] items-center border-b border-line py-6">
      <span className="text-[10px] font-semibold tracking-[0.09em] text-ink-faint">
        {number}
      </span>

      <span className="text-[12px] uppercase tracking-[0.07em] text-ink-soft">
        {label}
      </span>

      <span className="text-right text-[14px] font-medium">
        {value}
      </span>
    </div>
  );
}

function SolarMetric({
  value,
  title,
  copy,
  highlight = false,
}: {
  value: string;
  title: string;
  copy: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[360px] flex-col justify-between border-b border-r border-white/20 p-7 md:p-9 ${
        highlight ? "bg-accent text-ink" : ""
      }`}
    >
      <span
        className={`text-[56px] font-medium tracking-[-0.06em] ${
          highlight ? "text-brand" : "text-accent"
        }`}
      >
        {value}
      </span>

      <div>
        <h3 className="text-[22px] font-medium tracking-[-0.035em]">
          {title}
        </h3>

        <p
          className={`mt-3 max-w-[220px] text-[13px] leading-[1.6] ${
            highlight ? "text-ink-soft" : "text-white/45"
          }`}
        >
          {copy}
        </p>
      </div>
    </div>
  );
}

function SimpleRow({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="grid grid-cols-[50px_1fr] border-b border-line-strong py-5">
      <span className="font-mono text-[8px] text-ink-faint">
        {number}
      </span>

      <span className="text-[14px] font-medium">
        {text}
      </span>
    </div>
  );
}

function SupportRow({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-3 border-b border-white/20 py-6 sm:grid-cols-[50px_160px_1fr]">
      <span className="font-mono text-[8px] text-white/30">
        {number}
      </span>

      <span className="text-[14px] font-medium">
        {title}
      </span>

      <span className="max-w-[300px] text-[13px] leading-[1.6] text-white/45">
        {description}
      </span>
    </div>
  );
}

function CompareHeading({
  power,
  label,
  active = false,
}: {
  power: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`border-l border-white/20 px-6 py-8 ${
        active ? "bg-white/[0.05]" : ""
      }`}
    >
      <p className="text-[28px] font-medium tracking-[-0.04em]">
        {power}
      </p>

      <p
        className={`font-mono mt-2 text-[8px] uppercase tracking-[0.1em] ${
          active ? "text-accent" : "text-white/35"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function CompareRow({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  return (
    <div className="grid grid-cols-[1.15fr_repeat(3,1fr)] border-b border-white/20">
      <div className="py-6 pr-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/35">
          {label}
        </span>
      </div>

      {values.map((value, index) => (
        <div
          key={`${label}-${value}-${index}`}
          className={`border-l border-white/20 px-6 py-6 text-[13px] ${
            index === 1 ? "bg-white/[0.05]" : ""
          }`}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

function CompareAction({
  label,
}: {
  label: string;
}) {
  return (
    <button
      type="button"
      className="group flex items-center justify-between border-l border-white/20 px-6 py-7 text-left"
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/60">
        {label}
      </span>

      <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}

function InstallationCard({
  number,
  label,
  position,
}: {
  number: string;
  label: string;
  position: string;
}) {
  return (
    <div className="border border-line bg-paper">
      <div className="relative aspect-[4/3] overflow-hidden bg-image-well">
        <Image
          src="/images/products/charger-installation.png"
          alt={`Multiline EV charger ${label}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.015]"
          style={{
            objectPosition: position,
          }}
        />
      </div>

      <div className="flex items-center justify-between border-t border-line px-4 py-4">
        <span className="text-[10px] font-semibold tracking-[0.08em] text-ink-faint">
          {number}
        </span>

        <span className="text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-soft">
          {label}
        </span>
      </div>
    </div>
  );
}