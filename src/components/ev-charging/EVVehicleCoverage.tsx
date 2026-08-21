import Image from "next/image";
import Link from "next/link";

import {
  EV_BRANDS,
  EV_VEHICLE_GROUPS,
} from "@/lib/evChargingContent";

export const EVVehicleCoverage = () => {
  return (
    <section
      id="vehicle-coverage"
      className="scroll-mt-24 border-b border-line bg-[#F3F6FF]"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="page-pad page-shell border-b border-line py-8 lg:py-10">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-brand">
              Nationwide EV Charging
            </p>

            <h2 className="mt-3 text-[36px] font-semibold leading-[0.96] tracking-[-0.04em] sm:text-[42px] lg:text-[48px]">
              Supporting the EVs
              <br />
              Pakistan drives.
            </h2>
          </div>

          <p className="max-w-[500px] text-[14px] leading-[1.65] text-ink-soft">
            Multiline has supported Pakistan&apos;s electric vehicle ecosystem
            since 2017, with thousands of AC charging installations and
            experience across leading automotive brands.
          </p>
        </div>
      </div>

      {/* =====================================================
          VEHICLES + MAP
      ===================================================== */}

      <div className="page-shell grid lg:grid-cols-[0.82fr_1.18fr]">
        {/* LEFT */}

        <div className="border-b border-line px-5 py-8 md:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
          {/* MAIN STAT */}

          <div className="border-b border-line pb-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-brand">
              AC Charging Network
            </p>

            <div className="mt-3 flex items-end gap-3">
              <p className="text-[48px] font-semibold leading-none tracking-[-0.055em] text-brand">
                5,000+
              </p>

              <p className="max-w-[170px] pb-1 text-[13px] font-medium leading-[1.35] text-ink-soft">
                AC chargers installed nationwide
              </p>
            </div>
          </div>

          {/* VEHICLE LIST */}

          <div className="mt-7">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-faint">
              Experience across
            </p>

            <div className="border-t border-line">
              {EV_VEHICLE_GROUPS.map((vehicle) => (
                <div
                  key={vehicle.brand}
                  className="grid grid-cols-[145px_1fr] items-center gap-4 border-b border-line py-3.5"
                >
                  <p className="text-[13px] font-semibold">
                    {vehicle.brand}
                  </p>

                  <p className="text-[12px] leading-[1.45] text-ink-soft">
                    {vehicle.models}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/ev-chargers"
            className="group mt-6 flex h-[52px] w-full items-center justify-between bg-brand px-5 text-white transition-colors hover:bg-[#0f3d7d]"
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.04em]">
              Find Your Charger
            </span>

            <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* =====================================================
            MAP
        ===================================================== */}

        <div className="flex items-center justify-center bg-white px-5 py-8 md:px-8 lg:px-10 lg:py-10">
          <div className="relative aspect-[4/3] w-full max-w-[720px]">
            <Image
              src="/images/ev-charging/ac-chargers-map.jpg"
              alt="Multiline AC charger installations across Pakistan"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          BRAND LOGOS
      ===================================================== */}

      <div className="border-t border-line bg-white">
        <div className="page-pad page-shell">
          <div className="flex min-h-[108px] flex-wrap items-center justify-center gap-x-10 gap-y-6 py-6 lg:gap-x-14">
            {EV_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="flex h-[42px] min-w-[80px] items-center justify-center"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={110}
                  height={42}
                  className="max-h-[34px] w-auto max-w-[90px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};