"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

const PRODUCT_IMAGE = "/images/products/charger-front1.png";

const gallery = [
  { label: "Product", image: PRODUCT_IMAGE, position: "center" },
  { label: "Detail", image: PRODUCT_IMAGE, position: "45% center" },
  { label: "System", image: PRODUCT_IMAGE, position: "60% center" },
  { label: "Installed", image: PRODUCT_IMAGE, position: "center" },
];

const faq = [
  {
    question: "Will this charger work with my EV?",
    answer:
      "Use the compatibility checker to compare your vehicle's AC charging capability, connector and electrical requirements with this charger.",
  },
  {
    question: "Do I need three-phase power?",
    answer:
      "This 11kW configuration is designed around a three-phase electrical supply. Multiline can assess your property before installation.",
  },
  {
    question: "Can Multiline install the charger?",
    answer:
      "Yes. Installation can include site assessment, electrical inspection, installation, testing and commissioning.",
  },
  {
    question: "Can I use this with solar?",
    answer:
      "Yes. Your EV charging requirement can be considered together with your household consumption when sizing a solar system.",
  },
];

export default function ProductOptionTwo() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [compatibilityMode, setCompatibilityMode] = useState<"vehicle" | "ai">(
    "vehicle"
  );
  const [compatibilityChecked, setCompatibilityChecked] = useState(false);
  const [installation, setInstallation] = useState<"charger" | "installation">(
    "charger"
  );

  const [startCharge, setStartCharge] = useState(20);
  const [targetCharge, setTargetCharge] = useState(80);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const chargingTime = useMemo(() => {
    const battery = 88.1;
    const power = 11;
    const efficiency = 0.9;
    const energy = battery * (Math.max(targetCharge - startCharge, 1) / 100);
    return energy / (power * efficiency);
  }, [startCharge, targetCharge]);

  return (
    <main className="bg-[#f7f6f1] text-[#111]">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="bg-[#f7f6f1]">
        <div className="mx-auto flex h-[82px] max-w-[1600px] items-center px-6 md:px-10 lg:px-14">
          <Link
            href="/"
            className="flex items-center text-[21px] font-semibold tracking-[-0.045em] text-[#124897]"
          >
            MULTILINE
            <span className="ml-1.5 h-[6px] w-[6px] bg-[#f2ca30]" />
          </Link>

          <nav className="ml-auto hidden items-center gap-9 text-[13px] font-medium lg:flex">
            <Link href="/ev-chargers">EV Charging</Link>
            <Link href="#">Solar</Link>
            <Link href="#">Generators</Link>
            <Link href="#">Projects</Link>
            <Link href="#">Company</Link>
          </nav>

          <div className="ml-auto flex items-center gap-6 lg:ml-10">
            <button className="hidden text-[12px] uppercase tracking-[0.1em] md:block">
              Search
            </button>
            <button className="hidden text-[12px] uppercase tracking-[0.1em] md:block">
              Account
            </button>
            <button className="text-[12px] uppercase tracking-[0.1em]">
              Cart <span className="ml-1 text-black/40">(0)</span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          PRODUCT HERO — LUXURY COMMERCE
      ===================================================== */}
      <section className="bg-[#f7f6f1] px-6 pb-8 pt-8 md:px-10 lg:px-14 lg:pb-12">
        <div className="mx-auto max-w-[1600px]">
          {/* Breadcrumb / product meta */}
          <div className="flex items-center justify-between pb-7">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-black/35">
              <Link href="/ev-chargers">EV Charging</Link>
              <span>/</span>
              <span>AC Chargers</span>
              <span>/</span>
              <span className="text-black/70">11kW Home Charger</span>
            </div>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-black/30 sm:block">
              ML / AC11
            </span>
          </div>

          {/* Main showroom */}
          <div className="relative min-h-[620px] overflow-hidden bg-[#dedfd9] sm:min-h-[720px] lg:min-h-[820px]">
            {/* PRODUCT IMAGE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={gallery[activeImage].image}
                  alt={`11kW Home Charger ${gallery[activeImage].label}`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: gallery[activeImage].position }}
                />
              </motion.div>
            </AnimatePresence>

            {/* LEGIBILITY SCRIM — darkens left + top-right + bottom so text reads on any photo */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />

            {/* TOP LEFT PRODUCT INFORMATION */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-6 top-6 z-20 max-w-[560px] md:left-9 md:top-9 lg:left-12 lg:top-11"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#f2ca30]">
                AC Home Charging
              </p>
              <h1 className="mt-4 text-[48px] font-medium leading-[0.92] tracking-[-0.06em] text-white sm:text-[62px] lg:text-[72px]">
                11kW
                <br />
                Home Charger
              </h1>
              <p className="mt-5 max-w-[360px] text-[14px] leading-[1.6] text-white/80">
                Intelligent everyday EV charging, engineered and supported by
                Multiline.
              </p>
            </motion.div>

            {/* TOP RIGHT PRICE — solid dark panel for contrast */}
            <div className="absolute right-6 top-6 z-20 bg-[#111]/85 px-5 py-4 text-right backdrop-blur-md md:right-9 md:top-9 lg:right-12 lg:top-11">
              <p className="text-[9px] uppercase tracking-[0.12em] text-white/50">
                Price
              </p>
              <p className="mt-1 text-[22px] font-medium tracking-[-0.04em] text-white">
                PKR 185,000
              </p>
              <p className="mt-1 text-[9px] text-white/45">
                Installation available
              </p>
            </div>

            {/* QUICK SPECS — floating, now white on scrim */}
            <div className="absolute bottom-[104px] left-6 z-20 hidden items-center gap-9 md:flex md:left-9 lg:left-12">
              <HeroSpec value="11 kW" label="Output" />
              <HeroSpec value="Type 2" label="Connector" />
              <HeroSpec value="3 Phase" label="Supply" />
              <HeroSpec value="IP65" label="Protection" />
            </div>

            {/* VIEW COUNTER */}
            <div className="absolute bottom-[112px] right-6 z-20 hidden md:block md:right-9 lg:right-12">
              <span className="font-mono text-[9px] text-white/60">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(gallery.length).padStart(2, "0")}
              </span>
            </div>

            {/* GALLERY NAV */}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex h-[76px] bg-[#f7f6f1]/94 backdrop-blur-md">
              {gallery.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => setActiveImage(index)}
                  className={`group flex flex-1 items-center justify-center gap-3 transition-colors ${
                    activeImage === index
                      ? "bg-[#124897] text-white"
                      : "text-black/50 hover:bg-white"
                  }`}
                >
                  <span
                    className={`font-mono text-[8px] ${
                      activeImage === index ? "text-[#f2ca30]" : "text-black/25"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-[9px] font-medium uppercase tracking-[0.11em] sm:text-[10px]">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* BUY BAR */}
          <div className="mt-3 flex flex-col bg-white sm:flex-row sm:items-stretch">
            <div className="flex flex-1 items-center px-6 py-5 lg:px-8">
              <div>
                <p className="text-[15px] font-medium tracking-[-0.025em]">
                  11kW Home Charger
                </p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="h-[6px] w-[6px] bg-[#f2ca30]" />
                  <span className="text-[10px] text-black/40">
                    Type 2 · Three Phase · IP65
                  </span>
                </div>
              </div>
              <button className="ml-auto hidden text-[10px] font-semibold uppercase tracking-[0.1em] text-[#124897] lg:block">
                Check my EV →
              </button>
            </div>

            <div className="flex min-w-[190px] items-center border-t border-black/10 px-6 py-5 sm:border-l sm:border-t-0">
              <div>
                <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">
                  Price
                </p>
                <p className="mt-1 text-[17px] font-medium">PKR 185,000</p>
              </div>
            </div>

            <div className="flex min-w-[150px] items-center justify-between border-t border-black/10 px-5 sm:border-l sm:border-t-0">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="text-[19px] text-black/50 transition hover:text-black"
              >
                −
              </button>
              <span className="font-mono text-[11px]">
                {String(quantity).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="text-[19px] text-black/50 transition hover:text-black"
              >
                +
              </button>
            </div>

            <button className="group flex min-h-[72px] min-w-[270px] items-center justify-between bg-[#124897] px-7 text-white transition-colors hover:bg-[#0e3b7d]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                Add to Cart
              </span>
              <span className="text-[20px] text-[#f2ca30] transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>

          {/* MOBILE SPECS */}
          <div className="grid grid-cols-2 border-b border-black/10 md:hidden">
            <MobileHeroSpec label="Output" value="11 kW" />
            <MobileHeroSpec label="Connector" value="Type 2" />
            <MobileHeroSpec label="Supply" value="3 Phase" />
            <MobileHeroSpec label="Protection" value="IP65" />
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT CONFIGURATOR
      ===================================================== */}
      <section className="mx-auto max-w-[1260px] px-6 py-24 md:px-10 lg:py-32">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] text-black/40">
            Your charger
          </p>
          <h2 className="mt-5 text-[44px] font-medium tracking-[-0.05em] sm:text-[56px]">
            Configure your order.
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-[900px]">
          <ConfigRow
            label="Charger"
            title="11kW Home Charger"
            meta="Type 2 · Three Phase"
            right="PKR 185,000"
          />

          <div className="border-b border-black/15 py-8">
            <p className="text-[10px] uppercase tracking-[0.12em] text-black/35">
              Installation
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Choice
                active={installation === "charger"}
                title="Charger only"
                description="Purchase without installation."
                onClick={() => setInstallation("charger")}
              />
              <Choice
                active={installation === "installation"}
                title="Charger + installation"
                description="Multiline installation assessment."
                onClick={() => setInstallation("installation")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 border-b border-black/15 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-black/35">
                Your vehicle
              </p>
              <p className="mt-2 text-[19px] font-medium">KIA EV5</p>
            </div>
            <button className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.11em] text-[#124897]">
              <span className="h-[6px] w-[6px] bg-[#f2ca30]" />
              Compatible
            </button>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <div className="flex h-[66px] min-w-[150px] items-center justify-between border border-black/20 px-5">
              <button
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="text-[20px]"
              >
                −
              </button>
              <span className="font-mono text-[11px]">
                {String(quantity).padStart(2, "0")}
              </span>
              <button
                onClick={() => setQuantity((value) => value + 1)}
                className="text-[20px]"
              >
                +
              </button>
            </div>
            <button className="group flex h-[66px] flex-1 items-center justify-between bg-[#124897] px-7 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-[0.11em]">
                Add to Cart — PKR 185,000
              </span>
              <span className="text-[20px] text-[#f2ca30] transition-transform group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT SELLING STATEMENT
      ===================================================== */}
      <section className="bg-white px-6 py-24 text-center md:px-10 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-[1100px]"
        >
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#124897]">
            Why 11kW?
          </p>
          <h2 className="mt-8 text-[47px] font-medium leading-[1] tracking-[-0.055em] sm:text-[62px] lg:text-[78px]">
            Enough power for tomorrow.
            <br />
            Every night.
          </h2>
          <p className="mx-auto mt-8 max-w-[570px] text-[16px] leading-[1.7] text-black/45">
            11kW AC charging delivers a practical balance between home
            electrical infrastructure and everyday EV charging performance.
          </p>
        </motion.div>

        <div className="mx-auto mt-20 flex max-w-[1000px] flex-wrap justify-center gap-x-16 gap-y-10">
          <Metric value="11 kW" label="Charging output" />
          <Metric value="Type 2" label="Connector" />
          <Metric value="3 Phase" label="Supply" />
          <Metric value="IP65" label="Protection" />
        </div>
      </section>

      {/* =====================================================
          COMPATIBILITY
      ===================================================== */}
      <section className="bg-[#edece6] px-6 py-24 md:px-10 lg:py-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#124897]">
              Vehicle compatibility
            </p>
            <h2 className="mt-6 text-[50px] font-medium leading-[0.95] tracking-[-0.055em] sm:text-[68px]">
              Does it work with your EV?
            </h2>
            <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-[1.65] text-black/45">
              Choose your car or ask the Multiline assistant naturally.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-[820px]">
            <div className="flex justify-center gap-8">
              <ModeButton
                active={compatibilityMode === "vehicle"}
                onClick={() => {
                  setCompatibilityMode("vehicle");
                  setCompatibilityChecked(false);
                }}
              >
                Select vehicle
              </ModeButton>
              <ModeButton
                active={compatibilityMode === "ai"}
                onClick={() => {
                  setCompatibilityMode("ai");
                  setCompatibilityChecked(false);
                }}
              >
                Ask Multiline AI
              </ModeButton>
            </div>

            <AnimatePresence mode="wait">
              {compatibilityMode === "vehicle" ? (
                <motion.div
                  key="vehicle"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-12"
                >
                  <div className="grid gap-8 md:grid-cols-3">
                    <VehicleField label="Brand" value="KIA" />
                    <VehicleField label="Model" value="EV5" />
                    <VehicleField label="Year" value="2026" />
                  </div>
                  <button
                    onClick={() => setCompatibilityChecked(true)}
                    className="mt-10 h-[62px] w-full bg-[#111] text-[11px] font-semibold uppercase tracking-[0.11em] text-white"
                  >
                    Check compatibility
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-12"
                >
                  <textarea
                    placeholder="Will this charge my BYD Sealion 7?"
                    className="min-h-[140px] w-full resize-none border-b border-black/25 bg-transparent py-5 text-[28px] font-medium tracking-[-0.035em] outline-none placeholder:text-black/20"
                  />
                  <button
                    onClick={() => setCompatibilityChecked(true)}
                    className="mt-8 h-[62px] w-full bg-[#111] text-[11px] font-semibold uppercase tracking-[0.11em] text-white"
                  >
                    Ask Multiline
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {compatibilityChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 bg-white p-7 md:p-9"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-[8px] w-[8px] bg-[#f2ca30]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#124897]">
                      Compatible
                    </span>
                  </div>
                  <h3 className="mt-5 text-[28px] font-medium tracking-[-0.04em]">
                    Your KIA EV5 is a strong match.
                  </h3>
                  <p className="mt-4 max-w-[650px] text-[15px] leading-[1.65] text-black/50">
                    Your vehicle can accept up to 11kW AC charging, allowing this
                    charger to deliver its full supported home charging rate.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-8">
                    <Result value="11 kW" label="Vehicle AC limit" />
                    <Result value="11 kW" label="Charging rate" />
                    <Result value="Type 2" label="Connector" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHARGING ESTIMATOR
      ===================================================== */}
      <section className="bg-[#111] px-6 py-24 text-white md:px-10 lg:py-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#f2ca30]">
              Charging estimate
            </p>
            <h2 className="mt-6 text-[50px] font-medium tracking-[-0.055em] sm:text-[68px]">
              Plan your charge.
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-[750px]">
            <div className="text-center">
              <motion.p
                key={chargingTime.toFixed(1)}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[80px] font-medium leading-none tracking-[-0.075em]"
              >
                {chargingTime.toFixed(1)}
                <span className="ml-3 text-[17px] tracking-normal text-white/40">
                  hrs
                </span>
              </motion.p>
              <p className="mt-4 text-[12px] text-white/35">
                Estimated KIA EV5 charging time
              </p>
            </div>

            <BatterySlider
              label="Starting charge"
              value={startCharge}
              min={5}
              max={Math.max(targetCharge - 5, 10)}
              onChange={(v) => setStartCharge(Math.min(v, targetCharge - 5))}
            />
            <BatterySlider
              label="Target charge"
              value={targetCharge}
              min={Math.min(startCharge + 5, 100)}
              max={100}
              onChange={(v) => setTargetCharge(Math.max(v, startCharge + 5))}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          INSTALLATION
      ===================================================== */}
      <section className="bg-white px-6 py-24 md:px-10 lg:py-32">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#ddd]">
              <Image
                src="/images/products/charger-installation.png"
                alt="Multiline charger installation"
                fill
                sizes="(max-width:1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#124897]">
                Professional installation
              </p>
              <h2 className="mt-7 text-[49px] font-medium leading-[0.95] tracking-[-0.055em] sm:text-[62px]">
                We take care
                <br />
                of the wall too.
              </h2>
              <p className="mt-7 max-w-[430px] text-[15px] leading-[1.7] text-black/45">
                Multiline can assess the electrical supply, prepare the
                installation, commission the charger and make sure everything is
                ready before your first charge.
              </p>
              <div className="mt-10 space-y-5">
                <SimplePoint number="01" text="Site assessment" />
                <SimplePoint number="02" text="Electrical inspection" />
                <SimplePoint number="03" text="Professional installation" />
                <SimplePoint number="04" text="Testing & commissioning" />
              </div>
              <button className="mt-10 flex h-[60px] w-full max-w-[420px] items-center justify-between bg-[#124897] px-6 text-white">
                <span className="text-[10px] font-semibold uppercase tracking-[0.11em]">
                  Request Installation
                </span>
                <span className="text-[#f2ca30]">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNICAL SPECIFICATIONS
      ===================================================== */}
      <section className="bg-[#f7f6f1] px-6 py-24 md:px-10 lg:py-32">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#124897]">
              Specifications
            </p>
            <h2 className="mt-6 text-[50px] font-medium tracking-[-0.055em] sm:text-[66px]">
              Technical details.
            </h2>
          </div>
          <div className="mt-16">
            <Spec label="Rated output" value="11 kW" />
            <Spec label="Input voltage" value="400 V AC" />
            <Spec label="Rated current" value="16 A" />
            <Spec label="Electrical supply" value="Three Phase" />
            <Spec label="Connector" value="Type 2" />
            <Spec label="Protection" value="IP65" />
            <Spec label="Connectivity" value="Wi-Fi / Smart Control" />
            <Spec label="Warranty" value="2 Years" />
          </div>
        </div>
      </section>

      {/* =====================================================
          SOLAR
      ===================================================== */}
      <section className="bg-[#dbe4d2] px-6 py-24 md:px-10 lg:py-32">
        <div className="mx-auto max-w-[1250px] text-center">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#124897]">
            Multiline Solar + EV
          </p>
          <h2 className="mt-7 text-[58px] font-medium leading-[0.91] tracking-[-0.06em] sm:text-[78px] lg:text-[90px]">
            Charge your car
            <br />
            with your home.
          </h2>
          <p className="mx-auto mt-8 max-w-[580px] text-[16px] leading-[1.7] text-black/50">
            Add EV consumption to your household electricity usage and calculate
            a solar system around the complete energy requirement.
          </p>
          <button className="mt-10 bg-[#124897] px-8 py-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            Calculate My Solar System →
          </button>
        </div>
      </section>

      {/* =====================================================
          COMPARE
      ===================================================== */}
      <section className="bg-white px-6 py-24 md:px-10 lg:py-32">
        <div className="mx-auto max-w-[1350px]">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#124897]">
              Compare chargers
            </p>
            <h2 className="mt-6 text-[50px] font-medium tracking-[-0.055em] sm:text-[68px]">
              Find your fit.
            </h2>
          </div>
          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            <ChargerCard power="7kW" description="Simple everyday home charging." action="View 7kW" />
            <ChargerCard power="11kW" description="The balance of speed and home practicality." active action="Current charger" />
            <ChargerCard power="22kW" description="Higher capacity for compatible vehicles and sites." action="View 22kW" />
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}
      <section className="bg-[#f7f6f1] px-6 py-24 md:px-10 lg:py-32">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#124897]">
              Help
            </p>
            <h2 className="mt-6 text-[50px] font-medium tracking-[-0.055em] sm:text-[66px]">
              Before you buy.
            </h2>
          </div>
          <div className="mt-14">
            {faq.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.question} className="border-b border-black/15">
                  <button
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-8 py-7 text-left"
                  >
                    <span className="text-[17px] font-medium tracking-[-0.02em]">
                      {item.question}
                    </span>
                    <span className={`text-[18px] transition-transform ${open ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[680px] pb-8 text-[15px] leading-[1.7] text-black/45">
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

      {/* =====================================================
          FINAL PURCHASE
      ===================================================== */}
      <section className="bg-[#124897] px-6 py-20 text-white md:px-10 lg:py-24">
        <div className="mx-auto flex max-w-[1250px] flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#f2ca30]">
              11kW Home Charger
            </p>
            <h2 className="mt-7 text-[58px] font-medium leading-[0.9] tracking-[-0.06em] sm:text-[76px]">
              Ready to charge?
            </h2>
            <p className="mt-7 text-[25px] font-medium">PKR 185,000</p>
          </div>
          <button className="flex h-[72px] min-w-[320px] items-center justify-between bg-[#f2ca30] px-7 text-[#111]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.11em]">
              Add to Cart
            </span>
            <span className="text-[20px]">→</span>
          </button>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */
function ConfigRow({ label, title, meta, right }: { label: string; title: string; meta: string; right: string }) {
  return (
    <div className="flex flex-col gap-5 border-b border-black/15 py-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.12em] text-black/35">{label}</p>
        <p className="mt-2 text-[20px] font-medium">{title}</p>
        <p className="mt-1 text-[12px] text-black/40">{meta}</p>
      </div>
      <p className="text-[17px] font-medium">{right}</p>
    </div>
  );
}

function Choice({ active, title, description, onClick }: { active: boolean; title: string; description: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`p-5 text-left transition ${active ? "bg-[#124897] text-white" : "border border-black/15 bg-transparent"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium">{title}</span>
        <span className={`h-[7px] w-[7px] ${active ? "bg-[#f2ca30]" : "border border-black/40"}`} />
      </div>
      <p className={`mt-3 text-[12px] leading-[1.5] ${active ? "text-white/50" : "text-black/40"}`}>
        {description}
      </p>
    </button>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[150px] text-center">
      <p className="text-[27px] font-medium tracking-[-0.04em]">{value}</p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-black/35">{label}</p>
    </div>
  );
}

function ModeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 text-[10px] uppercase tracking-[0.11em] ${active ? "border-b-2 border-[#124897] font-semibold text-[#124897]" : "text-black/35"}`}
    >
      {children}
    </button>
  );
}

function VehicleField({ label, value }: { label: string; value: string }) {
  return (
    <button className="text-left">
      <span className="text-[10px] uppercase tracking-[0.1em] text-black/35">{label}</span>
      <div className="mt-3 flex items-center justify-between border-b border-black/20 pb-4">
        <span className="text-[24px] font-medium tracking-[-0.035em]">{value}</span>
        <span className="text-[#124897]">↓</span>
      </div>
    </button>
  );
}

function Result({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-[20px] font-medium">{value}</p>
      <p className="mt-1 text-[9px] uppercase tracking-[0.09em] text-black/35">{label}</p>
    </div>
  );
}

function BatterySlider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <div className="mt-10 border-b border-white/15 pb-8">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-white/40">{label}</span>
        <span className="text-[20px] font-medium">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-6 w-full cursor-pointer"
        style={{ accentColor: "#f2ca30" }}
      />
    </div>
  );
}

function SimplePoint({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-5 border-b border-black/15 pb-4">
      <span className="font-mono text-[8px] text-black/30">{number}</span>
      <span className="text-[14px]">{text}</span>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-8 border-b border-black/15 py-6">
      <span className="text-[13px] text-black/40">{label}</span>
      <span className="text-right text-[19px] font-medium tracking-[-0.03em]">{value}</span>
    </div>
  );
}

function ChargerCard({ power, description, action, active = false }: { power: string; description: string; action: string; active?: boolean }) {
  return (
    <div className={`flex min-h-[360px] flex-col justify-between p-8 ${active ? "bg-[#124897] text-white" : "bg-[#f4f3ee]"}`}>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[40px] font-medium tracking-[-0.055em]">{power}</p>
          {active && <span className="h-[7px] w-[7px] bg-[#f2ca30]" />}
        </div>
        <p className={`mt-5 max-w-[240px] text-[14px] leading-[1.6] ${active ? "text-white/50" : "text-black/40"}`}>
          {description}
        </p>
      </div>
      <button className={`flex items-center justify-between border-t pt-5 text-[10px] uppercase tracking-[0.1em] ${active ? "border-white/20 text-[#f2ca30]" : "border-black/15"}`}>
        {action}
        {!active && <span>→</span>}
      </button>
    </div>
  );
}

function HeroSpec({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-[15px] font-medium tracking-[-0.025em] text-white">{value}</p>
      <p className="mt-1 text-[8px] uppercase tracking-[0.11em] text-white/60">{label}</p>
    </div>
  );
}

function MobileHeroSpec({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-r border-t border-black/10 px-5 py-5 even:border-r-0">
      <p className="text-[9px] uppercase tracking-[0.1em] text-black/30">{label}</p>
      <p className="mt-2 text-[16px] font-medium">{value}</p>
    </div>
  );
}