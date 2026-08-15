"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

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
    ? (
        (selectedVehicle.batteryCapacity * 0.6) /
        (actualChargingPower * 0.9)
      ).toFixed(1)
    : "—";

  const isOptimal =
    selectedVehicle && selectedVehicle.maxAcPower >= chargerPower;

  function handleBrandChange(value: string) {
    const firstVehicle = vehicles.find((vehicle) => vehicle.brand === value);

    setBrand(value);

    if (firstVehicle) {
      setModel(firstVehicle.model);
      setYear(String(firstVehicle.years[firstVehicle.years.length - 1]));
    }

    setChecked(false);
  }

  function handleModelChange(value: string) {
    const selected = vehicles.find(
      (vehicle) => vehicle.brand === brand && vehicle.model === value
    );

    setModel(value);

    if (selected) {
      setYear(String(selected.years[selected.years.length - 1]));
    }

    setChecked(false);
  }

  return (
    <section className="bg-[#124897] text-white">
      <div className="grid min-h-[720px] lg:grid-cols-2">
        {/* LEFT */}
        <div className="flex flex-col justify-between border-b border-white/20 px-5 py-12 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#f2ca30]">
              02 / Compatibility
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/35">
              Vehicle Match
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
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

            <p className="mt-8 max-w-[430px] text-[16px] leading-[1.6] text-white/55">
              Select your vehicle to see whether this charger is compatible and
              the maximum charging rate your car can accept.
            </p>
          </motion.div>

          <div className="font-mono mt-16 flex max-w-[430px] justify-between border-t border-white/20 pt-4 text-[9px] uppercase tracking-[0.08em] text-white/35">
            <span>11 kW AC Charger</span>
            <span>Type 2</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center px-5 py-12 md:px-8 lg:px-12 lg:py-14">
          <div className="w-full">
            <div className="mb-10 flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
                Select your vehicle
              </p>

              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/30">
                Demo database
              </p>
            </div>

            {/* BRAND */}
            <SelectRow
              number="01"
              label="Brand"
              value={brand}
              onChange={handleBrandChange}
              options={brands}
            />

            {/* MODEL */}
            <SelectRow
              number="02"
              label="Model"
              value={model}
              onChange={handleModelChange}
              options={models.map((vehicle) => vehicle.model)}
            />

            {/* YEAR */}
            <SelectRow
              number="03"
              label="Year"
              value={year}
              onChange={(value) => {
                setYear(value);
                setChecked(false);
              }}
              options={availableYears.map(String)}
            />

            {/* CHECK */}
            <button
              type="button"
              onClick={() => setChecked(true)}
              className="group mt-10 flex h-[70px] w-full items-center justify-between border-y border-white/30 transition-colors duration-300 hover:bg-white hover:px-5 hover:text-[#124897]"
            >
              <span className="text-[12px] font-medium uppercase tracking-[0.1em]">
                Check Compatibility
              </span>

              <span className="text-[20px] text-[#f2ca30] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#124897]">
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
                    y: 24,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 12,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-12"
                >
                  {/* Status */}
                  <div className="flex items-center justify-between border-b border-white/20 pb-5">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
                        Compatibility
                      </p>

                      <p className="mt-2 text-[22px] font-medium tracking-[-0.035em]">
                        {brand} {model}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="h-[8px] w-[8px] bg-[#f2ca30]" />

                      <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
                        Compatible
                      </span>
                    </div>
                  </div>

                  {/* Result data */}
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
                      value={`~${estimatedChargeTime} hrs`}
                    />
                  </div>

                  {/* Explanation */}
                  <div className="pt-7">
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#f2ca30]">
                      {isOptimal ? "Optimized Match" : "Compatible"}
                    </p>

                    <p className="mt-4 max-w-[570px] text-[17px] leading-[1.55] text-white/70">
                      {isOptimal
                        ? `Your ${brand} ${model} can accept the full 11 kW output of this charger, making it an ideal match for maximum supported home AC charging.`
                        : `This charger is compatible with your ${brand} ${model}, but the vehicle limits AC charging to ${selectedVehicle.maxAcPower} kW. The charger will automatically operate within your vehicle's supported rate.`}
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
  return (
    <div className="grid grid-cols-[42px_95px_1fr] items-center border-t border-white/20 last:border-b">
      <span className="font-mono text-[8px] text-white/25">{number}</span>

      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/40">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-[76px] w-full cursor-pointer appearance-none border-0 bg-transparent pr-10 text-[24px] font-medium tracking-[-0.035em] text-white outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[14px] text-[#f2ca30]">
          ↓
        </span>
      </div>
    </div>
  );
}

function ResultStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-r border-t border-white/20 py-6 odd:pr-5 even:border-r-0 even:pl-7">
      <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/35">
        {label}
      </p>

      <p className="mt-3 text-[27px] font-medium tracking-[-0.045em]">
        {value}
      </p>
    </div>
  );
}