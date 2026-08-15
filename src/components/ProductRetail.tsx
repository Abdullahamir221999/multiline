"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";

/* ============================================================
   OPTION B — "WARM / PREMIUM RETAIL"
   Soft, photographic, centered, rounded. The friendly-premium
   counterpart to the sharp editorial page.
   Brand rule: BLUE (#124897) = structure, MUSTARD (#f2ca30) = action.
   Drop at /products/11kw-home-charger-alt
============================================================ */

const BLUE = "#124897";
const MUSTARD = "#f2ca30";

export default function ProductRetail() {
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
    ["Do I need three-phase electricity?", "This 11 kW configuration is built around a three-phase supply. Multiline assesses your property's electrical setup before installation."],
    ["Can this work with solar?", "Yes. Your EV charger can form part of a wider home energy system, sized together with your household consumption."],
    ["Can I buy without installation?", "Absolutely. The charger and installation are separate — buy the unit alone, or add a complete installation package."],
  ];

  return (
    <main className="bg-[#faf8f3] text-[#1a1a1a]">
      {/* ============================================
          HERO — centered, photographic, soft
      ============================================ */}
      <section className="relative overflow-hidden px-5 pt-16 pb-10 md:px-8 lg:px-12 lg:pt-24">
        {/* soft ambient blobs */}
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-[0.07] blur-3xl" style={{ background: BLUE }} />
        <div className="pointer-events-none absolute -right-40 top-40 h-[440px] w-[440px] rounded-full opacity-[0.10] blur-3xl" style={{ background: MUSTARD }} />

        <div className="relative mx-auto max-w-[1100px] text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[12px] font-medium tracking-[0.02em] text-black/60 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: MUSTARD }} />
            Residential AC Charging
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-[820px] text-[46px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[62px] lg:text-[76px]"
          >
            The 11kW Home Charger,{" "}
            <span style={{ color: BLUE }}>engineered to just work.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-7 max-w-[560px] text-[18px] leading-[1.6] text-black/55"
          >
            Fast, intelligent home charging for your electric vehicle — installed and supported by Pakistan's power experts since 1975.
          </motion.p>

          {/* product image on soft rounded stage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-14 max-w-[880px]"
          >
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-white to-[#eceae2] px-6 pt-14 pb-0 shadow-[0_40px_80px_-30px_rgba(18,72,151,0.35)] ring-1 ring-black/5">
              <div className="mx-auto flex h-[420px] max-w-[520px] items-end justify-center sm:h-[480px]">
                <Image
                  src="/images/products/charger-front1.png"
                  alt="Multiline 11kW home EV charger"
                  width={800}
                  height={1100}
                  priority
                  className="h-full w-auto object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.18)]"
                />
              </div>
              {/* floating spec pills */}
              <div className="pointer-events-none absolute left-6 top-8 hidden rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur md:block">
                <p className="text-[10px] uppercase tracking-[0.08em] text-black/40">Output</p>
                <p className="text-[20px] font-semibold" style={{ color: BLUE }}>11 kW</p>
              </div>
              <div className="pointer-events-none absolute right-6 top-24 hidden rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur md:block">
                <p className="text-[10px] uppercase tracking-[0.08em] text-black/40">Connector</p>
                <p className="text-[20px] font-semibold" style={{ color: BLUE }}>Type 2</p>
              </div>
            </div>
          </motion.div>

          {/* price + CTA */}
          <div className="mx-auto mt-12 flex max-w-[520px] flex-col items-center gap-5">
            <div className="flex items-baseline gap-3">
              <span className="text-[34px] font-semibold tracking-[-0.02em]">PKR 185,000</span>
              <span className="text-[13px] text-black/40">tax inclusive</span>
            </div>
            <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <div className="flex items-center gap-4 rounded-full border border-black/12 bg-white px-5 py-3 shadow-sm">
                <button type="button" onClick={() => setQuantity((c) => Math.max(1, c - 1))} className="text-[20px] font-light text-black/50">−</button>
                <span className="w-6 text-center text-[15px] font-semibold">{quantity}</span>
                <button type="button" onClick={() => setQuantity((c) => c + 1)} className="text-[20px] font-light text-black/50">+</button>
              </div>
              <button type="button" className="group flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold text-[#101010] shadow-[0_12px_28px_-8px_rgba(242,202,48,0.7)] transition-all hover:brightness-95 sm:w-auto" style={{ background: MUSTARD }}>
                Add to Cart
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
            <button type="button" className="mt-1 text-[13px] font-medium text-black/50 underline-offset-4 hover:underline" style={{ color: BLUE }}>
              ◇ Check compatibility with your vehicle
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          TRUST STRIP
      ============================================ */}
      <section className="border-y border-black/8 bg-white/60 py-8">
        <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 text-center">
          {[["50+", "Years of experience"], ["10,000+", "Installations"], ["2 Yr", "Warranty"], ["AEDB", "Licensed installer"]].map(([n, l]) => (
            <div key={l}>
              <p className="text-[26px] font-semibold" style={{ color: BLUE }}>{n}</p>
              <p className="text-[12px] tracking-[0.02em] text-black/45">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          FEATURE CARDS — soft rounded, centered
      ============================================ */}
      <section className="px-5 py-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[46px]">
            Everything you need for effortless charging.
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-[1.6] text-black/50">
            Designed to make home charging a simple, predictable part of owning an electric car.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1080px] gap-6 md:grid-cols-3">
          {[
            ["Smart scheduling", "Charge overnight on cheaper rates and wake up to a full battery, automatically."],
            ["App control", "Monitor energy use, start and stop charging, and manage access from your phone."],
            ["Solar ready", "Pairs with a Multiline solar system so your car runs on your own clean energy."],
          ].map(([t, c]) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
              className="rounded-3xl border border-black/8 bg-white p-8 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.25)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "rgba(18,72,151,0.08)" }}>
                <span className="text-[20px]" style={{ color: BLUE }}>◆</span>
              </div>
              <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.02em]">{t}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-black/50">{c}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================
          SPEC BAND — soft blue rounded panel
      ============================================ */}
      <section className="px-5 pb-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1080px] overflow-hidden rounded-[32px] text-white shadow-[0_30px_60px_-30px_rgba(18,72,151,0.6)]" style={{ background: BLUE }}>
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(255,255,255,0.12)" }}>
            {[["11 kW", "Rated output"], ["Type 2", "Connector"], ["3 Phase", "Supply"], ["IP65", "Protection"]].map(([v, l]) => (
              <div key={l} className="px-8 py-12 text-center" style={{ background: BLUE }}>
                <p className="text-[38px] font-semibold tracking-[-0.03em]">{v}</p>
                <p className="mt-2 text-[13px] tracking-[0.02em] text-white/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CHARGING ESTIMATOR — soft card
      ============================================ */}
      <section className="px-5 pb-20 md:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1080px] items-center gap-10 rounded-[32px] border border-black/8 bg-white p-8 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.3)] lg:grid-cols-2 lg:p-14">
          <div>
            <span className="inline-block rounded-full px-3 py-1 text-[11px] font-medium" style={{ background: "rgba(242,202,48,0.2)", color: "#8a6d00" }}>
              Example / KIA EV5
            </span>
            <h2 className="mt-6 text-[34px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[42px]">
              Know before you plug in.
            </h2>
            <p className="mt-5 max-w-[420px] text-[16px] leading-[1.6] text-black/50">
              Adjust your battery range to estimate a typical home charging session. Final figures use verified vehicle data.
            </p>
            <div className="mt-8 flex items-baseline gap-3">
              <motion.span key={chargingTime.toFixed(1)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="text-[64px] font-semibold leading-none tracking-[-0.04em]" style={{ color: BLUE }}>
                {chargingTime.toFixed(1)}
              </motion.span>
              <span className="text-[18px] text-black/40">hours to charge</span>
            </div>
          </div>

          <div className="rounded-3xl bg-[#faf8f3] p-8">
            <RetailSlider label="Starting charge" value={startCharge} min={5} max={Math.max(targetCharge - 5, 10)} onChange={(v) => setStartCharge(Math.min(v, targetCharge - 5))} />
            <RetailSlider label="Target charge" value={targetCharge} min={Math.min(startCharge + 5, 100)} max={100} onChange={(v) => setTargetCharge(Math.max(v, startCharge + 5))} />
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[["Battery", "88.1"], ["kW", "11"], ["Added", `${targetCharge - startCharge}%`]].map(([l, v]) => (
                <div key={l} className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.06em] text-black/40">{l}</p>
                  <p className="mt-1 text-[18px] font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          INSTALLATION — image with soft overlay card
      ============================================ */}
      <section className="px-5 pb-20 md:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1080px] items-stretch gap-6 lg:grid-cols-2">
          <div className="relative min-h-[380px] overflow-hidden rounded-[32px] shadow-lg">
            <Image src="/images/products/charger-installation.png" alt="Installation" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center rounded-[32px] border border-black/8 bg-white p-10 shadow-sm lg:p-14">
            <h2 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[42px]">
              Installed by Multiline.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.6] text-black/50">
              From your first electrical assessment to final commissioning, our engineers handle everything.
            </p>
            <div className="mt-8 space-y-4">
              {["Site assessment", "Electrical inspection", "Charger installation", "Testing & commissioning"].map((t, i) => (
                <div key={t} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold text-white" style={{ background: BLUE }}>{i + 1}</span>
                  <span className="text-[15px] font-medium">{t}</span>
                </div>
              ))}
            </div>
            <button type="button" className="mt-9 inline-flex items-center gap-2 self-start rounded-full border-2 px-7 py-3 text-[14px] font-semibold transition-colors hover:bg-black/[0.03]" style={{ borderColor: BLUE, color: BLUE }}>
              Request Installation →
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ — soft accordion
      ============================================ */}
      <section className="px-5 pb-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[760px]">
          <h2 className="text-center text-[34px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[44px]">
            Questions, answered.
          </h2>
          <div className="mt-10 space-y-4">
            {faqItems.map(([q, a], i) => {
              const open = openFaq === i;
              return (
                <div key={q} className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-sm">
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left">
                    <span className="text-[17px] font-medium tracking-[-0.01em]">{q}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[18px] font-light transition-transform duration-300 ${open ? "rotate-45" : ""}`} style={{ background: "rgba(18,72,151,0.08)", color: BLUE }}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                        <p className="px-7 pb-7 text-[15px] leading-[1.7] text-black/55">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA — soft blue rounded band
      ============================================ */}
      <section className="px-5 pb-20 md:px-8 lg:px-12">
        <div className="relative mx-auto max-w-[1080px] overflow-hidden rounded-[40px] px-8 py-16 text-center text-white shadow-[0_30px_70px_-30px_rgba(18,72,151,0.7)] lg:py-24" style={{ background: BLUE }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: MUSTARD }} />
          <h2 className="relative mx-auto max-w-[680px] text-[38px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[54px]">
            Ready to charge at home?
          </h2>
          <p className="relative mx-auto mt-5 max-w-[440px] text-[17px] text-white/70">
            PKR 185,000 — tax inclusive, installation optional. Backed by 50 years of Multiline engineering.
          </p>
          <button type="button" className="group relative mt-10 inline-flex items-center gap-2 rounded-full px-10 py-4 text-[15px] font-semibold text-[#101010] shadow-lg transition-all hover:brightness-95" style={{ background: MUSTARD }}>
            Add to Cart
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </section>
    </main>
  );
}

/* ---------- shared ---------- */
function RetailSlider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[13px] font-medium text-black/50">{label}</span>
        <span className="text-[20px] font-semibold" style={{ color: BLUE }}>{value}%</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer" style={{ accentColor: MUSTARD }} />
    </div>
  );
}
