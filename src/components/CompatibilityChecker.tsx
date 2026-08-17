"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  formatChargeTime,
  formatHoursAsReadable,
} from "@/helpers/formatChargeTime";

type Vehicle = {
  brand: string;
  model: string;
  years: number[];
  maxAcPower: number;
  connector: string;
  batteryCapacity: number;
};

const vehicles: Vehicle[] = [
  {
    brand: "KIA",
    model: "EV5",
    years: [2025, 2026],
    maxAcPower: 11,
    connector: "Type 2",
    batteryCapacity: 88.1,
  },
  {
    brand: "KIA",
    model: "EV9",
    years: [2024, 2025, 2026],
    maxAcPower: 11,
    connector: "Type 2",
    batteryCapacity: 99.8,
  },
  {
    brand: "Hyundai",
    model: "IONIQ 5",
    years: [2024, 2025, 2026],
    maxAcPower: 11,
    connector: "Type 2",
    batteryCapacity: 84,
  },
  {
    brand: "BYD",
    model: "Atto 3",
    years: [2024, 2025, 2026],
    maxAcPower: 7,
    connector: "Type 2",
    batteryCapacity: 60.5,
  },
];

const chargerPower = 11;

export default function CompatibilityChecker() {
  const brands = [...new Set(vehicles.map((vehicle) => vehicle.brand))];

  const [brand, setBrand] = useState("KIA");
  const [model, setModel] = useState("EV5");
  const [year, setYear] = useState("2026");
  const [checked, setChecked] = useState(false);

  const models = useMemo(
    () => vehicles.filter((vehicle) => vehicle.brand === brand),
    [brand]
  );

  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle.brand === brand && vehicle.model === model
  );

  const availableYears = selectedVehicle?.years ?? [];

  const actualChargingPower = selectedVehicle
    ? Math.min(chargerPower, selectedVehicle.maxAcPower)
    : 0;

  const estimatedChargeTime = selectedVehicle
    ? formatHoursAsReadable(
        formatChargeTime({
          batteryKwh: selectedVehicle.batteryCapacity,
          powerKw: actualChargingPower,
          startPercent: 20,
          targetPercent: 80,
        })
      )
    : "—";

  const isOptimal =
    selectedVehicle && selectedVehicle.maxAcPower >= chargerPower;

  const canCheck =
    selectedVehicle && availableYears.includes(Number(year));

  function handleBrandChange(value: string) {
    const firstVehicle = vehicles.find(
      (vehicle) => vehicle.brand === value
    );

    setBrand(value);

    if (firstVehicle) {
      setModel(firstVehicle.model);
      setYear(
        String(firstVehicle.years[firstVehicle.years.length - 1])
      );
    }

    setChecked(false);
  }

  function handleModelChange(value: string) {
    const selected = vehicles.find(
      (vehicle) =>
        vehicle.brand === brand && vehicle.model === value
    );

    setModel(value);

    if (selected) {
      setYear(
        String(selected.years[selected.years.length - 1])
      );
    }

    setChecked(false);
  }

  function handleYearChange(value: string) {
    setYear(value);
    setChecked(false);
  }

  function handleCheck() {
    if (!canCheck) {
      return;
    }

    setChecked(true);
  }

  return (
    <section
      id="compatibility"
      className="bg-brand text-white"
    >
      <div className="grid min-h-[720px] lg:grid-cols-2">
        {/* =====================================================
            LEFT
        ===================================================== */}

        <div className="flex flex-col justify-between border-b border-white/20 px-5 py-12 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-accent">
              02 / Compatibility
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/40">
              Vehicle Match
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="max-w-[650px] text-[56px] font-medium leading-[0.9] tracking-[-0.06em] sm:text-[72px] lg:text-[86px]">
              Built for
              <br />
              your EV.
            </h2>

            <p className="mt-8 max-w-[450px] text-[17px] leading-[1.65] text-white/65">
              Select your vehicle to see whether this charger is compatible
              and the maximum charging rate your car can accept.
            </p>
          </motion.div>

          <div className="mt-16 flex max-w-[430px] justify-between border-t border-white/20 pt-4 text-[10px] font-semibold uppercase tracking-[0.07em] text-white/40">
            <span>11 kW AC Charger</span>
            <span>Type 2</span>
          </div>
        </div>

        {/* =====================================================
            RIGHT
        ===================================================== */}

        <div className="flex items-center px-5 py-12 md:px-8 lg:px-12 lg:py-14">
          <div className="w-full">
            {/* Heading */}

            <div className="mb-7 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-white/60">
                Select your vehicle
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/30">
                Demo database
              </p>
            </div>

            {/* SELECTORS */}

            <div className="space-y-3">
              <SelectRow
                number="01"
                label="Brand"
                value={brand}
                onChange={handleBrandChange}
                options={brands}
              />

              <SelectRow
                number="02"
                label="Model"
                value={model}
                onChange={handleModelChange}
                options={models.map((vehicle) => vehicle.model)}
              />

              <SelectRow
                number="03"
                label="Year"
                value={year}
                onChange={handleYearChange}
                options={availableYears.map(String)}
              />
            </div>

            {/* CTA */}

            <button
              type="button"
              disabled={!canCheck}
              onClick={handleCheck}
              className="group mt-7 flex h-[66px] w-full items-center justify-between bg-accent px-6 text-brand transition-colors duration-300 hover:bg-[#ffd83d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.09em]">
                Check Compatibility
              </span>

              <span
                aria-hidden
                className="text-[21px] transition-transform duration-300 group-hover:translate-x-2"
              >
                →
              </span>
            </button>

            {/* RESULT */}

            <AnimatePresence mode="wait">
              {checked && selectedVehicle && (
                <motion.div
                  key={`${brand}-${model}-${year}`}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-10 border-t border-white/25 pt-8"
                >
                  {/* STATUS */}

                  <div className="flex flex-col justify-between gap-5 border-b border-white/20 pb-6 sm:flex-row sm:items-end">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-white/40">
                        Compatibility result
                      </p>

                      <p className="mt-2 text-[25px] font-medium tracking-[-0.035em]">
                        {brand} {model} · {year}
                      </p>
                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3.5 py-2 text-brand">
                      <span className="h-[6px] w-[6px] rounded-full bg-brand" />

                      <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                        Compatible
                      </span>
                    </div>
                  </div>

                  {/* DATA */}

                  <div className="grid grid-cols-2 border-b border-white/20">
                    <ResultStat
                      label="Vehicle AC Limit"
                      value={`${selectedVehicle.maxAcPower} kW`}
                    />

                    <ResultStat
                      label="Charging Rate"
                      value={`${actualChargingPower} kW`}
                    />

                    <ResultStat
                      label="Connector"
                      value={selectedVehicle.connector}
                    />

                    <ResultStat
                      label="20–80% Estimate"
                      value={`~${estimatedChargeTime}`}
                    />
                  </div>

                  {/* EXPLANATION */}

                  <div className="pt-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-accent">
                      {isOptimal
                        ? "Optimized Match"
                        : "Compatible Match"}
                    </p>

                    <p className="mt-4 max-w-[600px] text-[16px] leading-[1.65] text-white/70">
                      {isOptimal
                        ? `Your ${brand} ${model} can accept the full 11 kW output of this charger, making it an ideal match for maximum supported home AC charging.`
                        : `This charger is compatible with your ${brand} ${model}, but your vehicle limits AC charging to ${selectedVehicle.maxAcPower} kW. The charger will automatically operate within the vehicle's supported rate.`}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   SELECT ROW
========================================================== */

type SelectRowProps = {
  number: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectRow({
  number,
  label,
  value,
  options,
  onChange,
}: SelectRowProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative grid min-h-[82px] grid-cols-[48px_100px_1fr] items-stretch border transition-colors duration-300 ${
        open
          ? "z-40 border-white/45 bg-white/[0.07]"
          : "border-white/20 bg-white/[0.035] hover:border-white/35 hover:bg-white/[0.055]"
      }`}
    >
      {/* NUMBER */}

      <div className="flex items-center pl-4">
        <span className="text-[10px] font-semibold tracking-[0.08em] text-white/35">
          {number}
        </span>
      </div>

      {/* LABEL */}

      <div className="flex items-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/55">
          {label}
        </span>
      </div>

      {/* CUSTOM SELECT */}

      <div className="relative border-l border-white/15">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="group flex h-full min-h-[80px] w-full items-center justify-between px-5 text-left"
        >
          <span className="text-[20px] font-semibold tracking-[-0.025em] text-white sm:text-[21px]">
            {value}
          </span>

          <span
            aria-hidden
            className={`flex h-8 w-8 items-center justify-center text-[#f2ca30] transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7L13 1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </button>

        {/* DROPDOWN MENU */}

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -6,
              }}
              transition={{
                duration: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              role="listbox"
              className="absolute left-[-1px] right-[-1px] top-[calc(100%+1px)] z-50 border border-white/25 bg-brand shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
            >
              {options.map((option) => {
                const selected = option === value;

                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between border-b border-white/10 px-5 py-4 text-left transition-colors last:border-b-0 ${
                      selected
                        ? "bg-white/[0.1]"
                        : "hover:bg-white/[0.07]"
                    }`}
                  >
                    <span
                      className={`text-[16px] font-medium ${
                        selected
                          ? "text-white"
                          : "text-white/75"
                      }`}
                    >
                      {option}
                    </span>

                    {selected && (
                      <span className="text-[13px] text-[#f2ca30]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ==========================================================
   RESULT STAT
========================================================== */

function ResultStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-r border-t border-white/20 py-6 odd:pr-5 even:border-r-0 even:pl-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/40">
        {label}
      </p>

      <p className="mt-3 text-[26px] font-medium tracking-[-0.04em]">
        {value}
      </p>
    </div>
  );
}