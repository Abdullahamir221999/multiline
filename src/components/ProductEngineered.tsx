"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";

/* ============================================================
   OPTION B — "ENGINEERED"
   Denser, corporate/technical counterpart to the editorial page.
   Same brand rule: BLUE (#124897) = structure, MUSTARD (#f2ca30) = action.
   Drop at /products/11kw-alt
============================================================ */

const BLUE = "#124897";
const MUSTARD = "#f2ca30";

const specGroups: { group: string; rows: [string, string][] }[] = [
  {
    group: "Electrical",
    rows: [
      ["Rated Output", "11 kW"],
      ["Input Voltage", "400 V AC"],
      ["Rated Current", "16 A"],
      ["Supply", "3 Phase"],
    ],
  },
  {
    group: "Physical",
    rows: [
      ["Connector", "Type 2"],
      ["Protection", "IP65"],
      ["Mounting", "Wall Mounted"],
      ["Cable", "5 m Tethered"],
    ],
  },
  {
    group: "Smart",
    rows: [
      ["Connectivity", "Wi-Fi"],
      ["Control", "App / Schedule"],
      ["Metering", "Built-in"],
      ["Warranty", "2 Years"],
    ],
  },
];

export default function ProductEngineered() {
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [startCharge, setStartCharge] = useState(20);
  const [targetCharge, setTargetCharge] = useState(80);
  const chargingTime = useMemo(() => {
    const pct = Math.max(targetCharge - startCharge, 1) / 100;
    return (88.1 * pct) / (11 * 0.9);
  }, [startCharge, targetCharge]);

  const faqItems = [
    ["Will this charger work with my EV?", "Use the compatibility checker to select your vehicle. Final production data verifies connector type and supported AC charging speed."],
    ["Do I need three-phase electricity?", "This 11 kW configuration is built around a three-phase supply. Multiline assesses the property's electrical infrastructure before installation."],
    ["Can this work with solar?", "Yes. An EV charger can form part of a wider residential energy setup, sized together with household consumption."],
    ["Can I buy without installation?", "The charger and installation are separate options — purchase the unit alone or request a complete installation package."],
  ];

  return (
    <main className="bg-[#f2f0e9] text-[#101010]">
      {/* ============================================
          TOP BAR / TECHNICAL HEADER
      ============================================ */}
      <div className="border-b border-black/15">
        <div className="flex items-center justify-between px-5 py-3 md:px-8 lg:px-12">
          <div className="font-mono flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-black/55">
            <span>EV Charging</span><span>/</span>
            <span>Residential</span><span>/</span>
            <span className="text-black">11kW AC</span>
          </div>
          <div className="font-mono hidden items-center gap-4 text-[10px] uppercase tracking-[0.1em] text-black/45 md:flex">
            <span>ML / EV / 001</span>
            <span className="flex items-center gap-2">
              <span className="h-[6px] w-[6px]" style={{ background: MUSTARD }} />
              In Stock
            </span>
          </div>
        </div>
      </div>

      {/* ============================================
          HERO — data-forward, product + specs together
      ============================================ */}
      <section className="grid border-b border-black/15 lg:grid-cols-[1.05fr_1fr]">
        {/* LEFT: identity + price + action */}
        <div className="flex flex-col justify-between border-b border-black/15 px-5 py-9 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-11">
          <div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white" style={{ background: BLUE }}>
                AC Home Charger
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-black/45">Residential Series</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[54px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[64px] lg:text-[72px]"
            >
              11kW Home<br />Charger
            </motion.h1>

            <p className="mt-6 max-w-[440px] text-[16px] leading-[1.55] text-black/60">
              Intelligent residential EV charging engineered for reliable everyday performance — installed and supported by Multiline.
            </p>

            {/* quick-glance key specs inline */}
            <div className="mt-9 grid grid-cols-4 border-y border-black/15">
              {[["Output", "11kW"], ["Connector", "Type 2"], ["Supply", "3-Ph"], ["Rating", "IP65"]].map(([l, v]) => (
                <div key={l} className="border-r border-black/15 py-4 pr-3 last:border-r-0">
                  <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-black/40">{l}</p>
                  <p className="mt-1 text-[17px] font-semibold tracking-[-0.02em]">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* price + purchase */}
          <div className="mt-10">
            <div className="flex items-end justify-between border-b border-black/20 pb-5">
              <div>
                <p className="font-mono mb-1 text-[9px] uppercase tracking-[0.12em] text-black/45">Price</p>
                <p className="text-[30px] font-semibold tracking-[-0.03em]">PKR 185,000</p>
              </div>
              <p className="font-mono text-right text-[9px] uppercase leading-[1.7] tracking-[0.08em] text-black/40">
                Tax inclusive<br />Installation optional
              </p>
            </div>

            <div className="mt-5 grid grid-cols-[120px_1fr] gap-3">
              <div className="flex h-[58px] items-center justify-between border border-black/20 px-4">
                <button type="button" onClick={() => setQuantity((c) => Math.max(1, c - 1))} className="text-[20px] font-light">−</button>
                <span className="font-mono text-[12px]">{String(quantity).padStart(2, "0")}</span>
                <button type="button" onClick={() => setQuantity((c) => c + 1)} className="text-[20px] font-light">+</button>
              </div>
              {/* MUSTARD action, dark text */}
              <button type="button" className="group flex h-[58px] items-center justify-between px-6 text-[#101010] transition-colors duration-300 hover:brightness-95" style={{ background: MUSTARD }}>
                <span className="text-[12px] font-semibold uppercase tracking-[0.08em]">Add to Cart</span>
                <span className="text-[18px] transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
            <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 border border-black/20 py-3 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors hover:bg-black/[0.03]">
              <span style={{ color: BLUE }}>◇</span> Check compatibility with your vehicle
            </button>
          </div>
        </div>

        {/* RIGHT: product visual with technical frame */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}
          className="relative min-h-[560px] overflow-hidden bg-[#e4e6e1] lg:min-h-full"
        >
          {/* blueprint grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{ backgroundImage: `linear-gradient(#0000000a 1px,transparent 1px),linear-gradient(90deg,#0000000a 1px,transparent 1px)`, backgroundSize: "44px 44px" }} />
          <div className="absolute left-6 top-6 z-20">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/45">Multiline Engineering</p>
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.06em]">AC Series / Unit 001</p>
          </div>
          <div className="absolute right-6 top-6 z-20 font-mono text-[10px] text-black/50">01 / 04</div>

          <div className="absolute inset-0 flex items-center justify-center px-10 pb-24 pt-20">
            <Image src="/images/products/charger-front1.png" alt="11kW home EV charger" width={800} height={1100} priority
              className="h-[76%] w-auto object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.16)]" />
          </div>

          {/* measurement ticks — technical flavor */}
          <div className="absolute bottom-[70px] left-8 right-8 z-10 flex items-center justify-between font-mono text-[8px] text-black/35">
            {["0", "100", "200", "300", "mm"].map((t) => (
              <span key={t} className="flex flex-col items-center gap-1"><span className="h-2 w-px bg-black/25" />{t}</span>
            ))}
          </div>

          {/* gallery nav */}
          <div className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-4 border-t border-black/15 bg-[#e4e6e1]/95 backdrop-blur-sm">
            {["Front", "Side", "Detail", "Installed"].map((item, i) => (
              <button key={item} type="button"
                className={`h-[56px] border-r border-black/15 px-4 text-left transition-colors last:border-r-0 ${i === 0 ? "bg-[#f2f0e9]" : "hover:bg-black/[0.035]"}`}>
                <span className="font-mono block text-[8px] text-black/35">0{i + 1}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.08em]">{item}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============================================
          02 — FULL SPECIFICATION (dense, grouped)
      ============================================ */}
      <SectionHead num="02" label="Specification" />
      <section className="border-b border-black/15 bg-white">
        <div className="grid lg:grid-cols-3">
          {specGroups.map((g, gi) => (
            <div key={g.group} className={`border-b border-black/15 px-5 py-8 md:px-8 lg:border-b-0 lg:px-10 ${gi < 2 ? "lg:border-r" : ""}`}>
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[13px] font-semibold uppercase tracking-[0.06em]" style={{ color: BLUE }}>{g.group}</span>
                <span className="font-mono text-[9px] text-black/35">0{gi + 1}</span>
              </div>
              {g.rows.map(([l, v]) => (
                <div key={l} className="grid grid-cols-[1fr_auto] items-center border-t border-black/12 py-3.5">
                  <span className="text-[12px] uppercase tracking-[0.05em] text-black/50">{l}</span>
                  <span className="text-[14px] font-semibold">{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          03 — PERFORMANCE STRIP (denser than A's)
      ============================================ */}
      <SectionHead num="03" label="Performance" />
      <section className="border-b border-black/15" style={{ background: BLUE }}>
        <div className="grid text-white sm:grid-cols-2 lg:grid-cols-4">
          {[["11", "kW", "Maximum AC output"], ["TYPE", "2", "Vehicle connector"], ["3", "PH", "Electrical supply"], ["IP", "65", "Ingress protection"]].map(([v, u, l], i) => (
            <div key={l} className={`border-b border-white/15 p-7 sm:border-b-0 md:p-9 ${i < 3 ? "lg:border-r lg:border-white/15" : ""} ${i === 0 || i === 1 ? "border-r border-white/15" : ""}`}>
              <div className="flex items-end gap-2">
                <span className="text-[52px] font-semibold leading-none tracking-[-0.06em] sm:text-[60px]">{v}</span>
                <span className="mb-2 text-[20px] font-semibold" style={{ color: MUSTARD }}>{u}</span>
              </div>
              <p className="mt-4 text-[11px] uppercase leading-[1.5] tracking-[0.08em] text-white/60">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          04 — CHARGING ESTIMATOR (light, corporate)
      ============================================ */}
      <SectionHead num="04" label="Charging Estimate" />
      <section className="grid border-b border-black/15 bg-white lg:grid-cols-2">
        <div className="flex flex-col justify-between border-b border-black/15 px-5 py-10 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: BLUE }}>Example vehicle / KIA EV5</p>
            <h2 className="mt-6 text-[46px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[56px]">Know before<br />you plug in.</h2>
            <p className="mt-6 max-w-[420px] text-[15px] leading-[1.6] text-black/55">Adjust the battery range to estimate a typical home charging session.</p>
          </div>
          <p className="font-mono mt-10 text-[9px] uppercase tracking-[0.1em] text-black/35">Demo calculation / final values use verified vehicle data</p>
        </div>
        <div className="flex items-center px-5 py-12 md:px-8 lg:px-12">
          <div className="w-full">
            <div className="flex items-end justify-between border-b border-black/20 pb-6">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/40">Estimated time</p>
                <motion.p key={chargingTime.toFixed(1)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-[56px] font-semibold leading-none tracking-[-0.06em]">
                  {chargingTime.toFixed(1)}<span className="ml-2 text-[18px] text-black/45">HRS</span>
                </motion.p>
              </div>
              <div className="font-mono text-right text-[9px] uppercase leading-[1.8] tracking-[0.08em] text-black/40">11 kW<br />AC Charging</div>
            </div>
            <EstSlider label="Starting charge" value={startCharge} min={5} max={Math.max(targetCharge - 5, 10)} onChange={(v) => setStartCharge(Math.min(v, targetCharge - 5))} />
            <EstSlider label="Target charge" value={targetCharge} min={Math.min(startCharge + 5, 100)} max={100} onChange={(v) => setTargetCharge(Math.max(v, startCharge + 5))} />
            <div className="mt-8 grid grid-cols-3 border-y border-black/20">
              {[["Battery", "88.1 kWh"], ["Charging", "11 kW"], ["Added", `${targetCharge - startCharge}%`]].map(([l, v], i) => (
                <div key={l} className={`py-5 ${i < 2 ? "border-r border-black/20" : ""}`}>
                  <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-black/35">{l}</p>
                  <p className="mt-2 text-[15px] font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          05 — INSTALLATION (image + process)
      ============================================ */}
      <SectionHead num="05" label="Installation" />
      <section className="grid border-b border-black/15 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[440px] overflow-hidden border-b border-black/15 lg:min-h-[560px] lg:border-b-0 lg:border-r">
          <Image src="/images/products/charger-installation.png" alt="Installation" fill sizes="(max-width:1024px) 100vw, 52vw" className="object-cover" />
          <div className="absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.12em] text-white drop-shadow">Residential installation / Reference</div>
        </div>
        <div className="flex flex-col px-5 py-10 md:px-8 lg:px-12 lg:py-14">
          <h2 className="text-[46px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[56px]">Installed by<br />Multiline.</h2>
          <p className="mt-6 max-w-[440px] text-[15px] leading-[1.6] text-black/55">From first electrical assessment to final commissioning, installation is handled as part of the complete solution.</p>
          <div className="mt-10 border-t border-black/20">
            {["Site assessment", "Electrical inspection", "Charger installation", "Testing & commissioning"].map((t, i) => (
              <div key={t} className="grid grid-cols-[46px_1fr_auto] items-center border-b border-black/20 py-4">
                <span className="font-mono text-[8px] text-black/35">0{i + 1}</span>
                <span className="text-[15px] font-medium">{t}</span>
                <span style={{ color: BLUE }}>↗</span>
              </div>
            ))}
          </div>
          <button type="button" className="group mt-9 flex items-center justify-between border-y border-black/30 py-4">
            <span className="text-[12px] font-semibold uppercase tracking-[0.09em]">Request Installation</span>
            <span className="text-[18px] transition-transform duration-300 group-hover:translate-x-2" style={{ color: BLUE }}>→</span>
          </button>
        </div>
      </section>

      {/* ============================================
          06 — EV + SOLAR (blue structural block)
      ============================================ */}
      <SectionHead num="06" label="EV + Solar" />
      <section className="grid border-b border-black/15 lg:grid-cols-2">
        <div className="flex flex-col justify-between border-b border-black/15 px-5 py-10 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <h2 className="max-w-[560px] text-[46px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[58px]">Power the car.<br />Power the home.</h2>
          <div>
            <p className="mt-6 max-w-[420px] text-[15px] leading-[1.6] text-black/55">Combine household consumption and EV charging into one solar sizing journey.</p>
            <button type="button" className="group mt-8 flex w-full max-w-[420px] items-center justify-between border-y border-black/30 py-4">
              <span className="text-[12px] font-semibold uppercase tracking-[0.09em]">Calculate My Solar System</span>
              <span style={{ color: BLUE }} className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 text-white" style={{ background: BLUE }}>
          {[["01", "Home usage", "Monthly household consumption."], ["+", "EV usage", "Daily driving requirement."], ["=", "System size", "Sized to the complete profile."], ["→", "Quote", "Sent directly to Multiline sales."]].map(([v, t, c], i) => {
            const highlight = i === 3;
            return (
              <div key={t} className="flex min-h-[260px] flex-col justify-between border-b border-r border-white/20 p-6 md:p-8"
                style={highlight ? { background: MUSTARD, color: "#101010" } : {}}>
                <span className="text-[44px] font-semibold tracking-[-0.05em]" style={{ color: highlight ? BLUE : MUSTARD }}>{v}</span>
                <div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.03em]">{t}</h3>
                  <p className={`mt-2 max-w-[200px] text-[12px] leading-[1.55] ${highlight ? "text-black/55" : "text-white/50"}`}>{c}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================
          07 — COMPARE (light table, denser)
      ============================================ */}
      <SectionHead num="07" label="Compare" />
      <section className="border-b border-black/15 bg-white px-5 py-12 md:px-8 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="text-[44px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[56px]">Find your<br />charging level.</h2>
          <p className="max-w-[380px] text-[14px] leading-[1.6] text-black/50">Context before choosing between residential AC charger configurations.</p>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[1.1fr_repeat(3,1fr)] border-b border-black/20">
              <div className="py-6" />
              {[["7 kW", "Home"], ["11 kW", "Recommended"], ["22 kW", "High Capacity"]].map(([p, l], i) => (
                <div key={p} className="border-l border-black/15 px-5 py-6" style={i === 1 ? { background: "#f2f0e9" } : {}}>
                  <p className="text-[24px] font-semibold tracking-[-0.03em]">{p}</p>
                  <p className="font-mono mt-1 text-[8px] uppercase tracking-[0.1em]" style={{ color: i === 1 ? BLUE : "rgba(0,0,0,0.4)" }}>{l}</p>
                </div>
              ))}
            </div>
            {[["Rated output", ["7 kW", "11 kW", "22 kW"]], ["Positioning", ["Everyday AC", "Home AC", "High-output AC"]], ["Vehicle check", ["Required", "Required", "Required"]], ["Installation", ["Available", "Available", "Available"]]].map(([label, vals]) => (
              <div key={label as string} className="grid grid-cols-[1.1fr_repeat(3,1fr)] border-b border-black/15">
                <div className="py-5 pr-5"><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/45">{label as string}</span></div>
                {(vals as string[]).map((v, i) => (
                  <div key={i} className="border-l border-black/15 px-5 py-5 text-[13px]" style={i === 1 ? { background: "#f2f0e9" } : {}}>{v}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          08 — FAQ
      ============================================ */}
      <SectionHead num="08" label="Questions" />
      <section className="grid bg-white lg:grid-cols-[0.7fr_1.3fr]">
        <div className="border-b border-black/15 px-5 py-12 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <h2 className="text-[44px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[54px]">Before<br />you buy.</h2>
          <p className="mt-6 max-w-[320px] text-[14px] leading-[1.6] text-black/45">Common questions on compatibility, installation and home charging.</p>
        </div>
        <div className="px-5 md:px-8 lg:px-12">
          {faqItems.map(([q, a], i) => {
            const open = openFaq === i;
            return (
              <div key={q} className="border-b border-black/20">
                <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="grid w-full grid-cols-[42px_1fr_auto] items-center gap-4 py-6 text-left">
                  <span className="font-mono text-[8px] text-black/35">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[16px] font-medium tracking-[-0.02em]">{q}</span>
                  <span className={`text-[18px] font-light transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="max-w-[660px] pb-7 pl-[58px] pr-8 text-[14px] leading-[1.7] text-black/50">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================
          09 — FINAL CTA (blue block, mustard action)
      ============================================ */}
      <section style={{ background: BLUE }} className="text-white">
        <div className="px-5 py-14 md:px-8 lg:px-12 lg:py-20">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: MUSTARD }}>09 / 11 kW Home Charger</span>
            <span className="h-[6px] w-[6px]" style={{ background: MUSTARD }} />
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-[820px] text-[54px] font-semibold leading-[0.9] tracking-[-0.055em] sm:text-[74px] lg:text-[92px]">Ready when<br />you are.</h2>
              <p className="mt-6 text-[26px] font-semibold tracking-[-0.03em]">PKR 185,000</p>
            </div>
            <button type="button" className="group flex h-[68px] min-w-[290px] items-center justify-between px-7 text-[#101010]" style={{ background: MUSTARD }}>
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em]">Add to Cart</span>
              <span className="text-[20px] transition-transform duration-300 group-hover:translate-x-2">→</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- shared bits ---------- */
function SectionHead({ num, label }: { num: string; label: string }) {
  return (
    <div className="border-b border-black/15 bg-[#f2f0e9] px-5 py-4 md:px-8 lg:px-12">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: BLUE }}>{num} / {label}</span>
        <span className="h-[6px] w-[6px]" style={{ background: BLUE }} />
      </div>
    </div>
  );
}

function EstSlider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="border-b border-black/20 py-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/45">{label}</span>
        <span className="text-[22px] font-semibold tracking-[-0.03em]">{value}%</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="mt-5 w-full cursor-pointer" style={{ accentColor: MUSTARD }} />
    </div>
  );
}
