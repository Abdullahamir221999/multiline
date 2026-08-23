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
      className="scroll-mt-24 border-b border-line bg-[#F4F6FA]"
    >
      <div className="page-shell">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid border-b border-line lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div className="flex flex-col justify-center px-5 py-7 md:px-8 lg:px-10 lg:py-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-brand">
              Vehicle Coverage
            </p>

            <h2 className="mt-2 max-w-[600px] text-[34px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[38px] lg:text-[42px]">
              Supporting the EVs
              <br />
              Pakistan drives.
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex items-center border-t border-line px-5 py-6 md:px-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-8">
            <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[470px] text-[13px] leading-[1.6] text-ink-soft">
                Charging experience across leading electric vehicles, backed
                by nationwide installation and support since 2017.
              </p>

              <div className="shrink-0 sm:text-right">
                <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-faint">
                  Experience since
                </p>

                <p className="mt-1 text-[26px] font-semibold leading-none tracking-[-0.03em] text-brand">
                  2017
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            VEHICLES + MAP
        ===================================================== */}

        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          {/* VEHICLE LIST */}
          
          <div className="flex flex-col justify-center border-b border-line px-5 py-6 md:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-6">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-faint">
                Experience across
              </p>

              <p className="text-[11px] font-medium text-ink-soft">
                AC charging
              </p>
            </div>

            <div className="mt-4 border-t border-line">
              {EV_VEHICLE_GROUPS.map((vehicle) => (
                <div
                  key={vehicle.brand}
                  className="grid grid-cols-[120px_1fr] items-center gap-4 border-b border-line py-[10px] sm:grid-cols-[140px_1fr]"
                >
                  <p className="text-[13px] font-semibold leading-[1.4] text-ink">
                    {vehicle.brand}
                  </p>

                  <p className="text-[12px] leading-[1.45] text-ink-soft">
                    {vehicle.models}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/ev-chargers"
              className="group mt-5 flex h-[46px] w-full items-center justify-between bg-brand px-5 text-white transition-colors hover:bg-[#0f3d7d]"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.045em]">
                Find your charger
              </span>

              <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* MAP */}
          <div className="flex items-center justify-center bg-white px-5 py-6 md:px-8 lg:px-10 lg:py-6">
            <div className="relative mx-auto aspect-[16/11] w-full max-w-[900px]">
              <Image
                src="/images/ev-charging/ac-chargers-map.jpg"
                alt="Multiline AC charger installations across Pakistan"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            BRAND LOGOS
        ===================================================== */}

        <div className="border-t border-line bg-white">
          <div className="flex min-h-[92px] flex-wrap items-center justify-center gap-x-10 gap-y-5 px-5 py-5 md:px-8 lg:gap-x-14 lg:px-10">
            {EV_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="flex h-[44px] min-w-[88px] items-center justify-center"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={130}
                  height={44}
                  className="max-h-[36px] w-auto max-w-[110px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};