import Image from "next/image";
import Link from "next/link";

export const EVShowcase = () => {
  return (
    <section className="border-b border-line bg-white">
      <div className="page-shell grid lg:grid-cols-2">
        {/* =====================================================
            HOME CHARGING
        ===================================================== */}

        <Link
          href="/ev-chargers"
          className="group relative min-h-[430px] overflow-hidden border-b border-line lg:min-h-[520px] lg:border-b-0 lg:border-r"
        >
          <Image
            src="/images/ev-charging/residential-installation-clean.png"
            alt="Residential EV charging installation"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Cleaner overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5" />

          <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-9 lg:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent">
              Home Charging
            </p>

            <h2 className="mt-4 max-w-[520px] text-[38px] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-[44px] lg:text-[48px]">
              One less thing
              <br />
              to worry about.
            </h2>

            <div className="mt-7 inline-flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.035em] text-white">
              <span>Explore Home Chargers</span>

              <span className="text-accent transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </div>
          </div>
        </Link>

        {/* =====================================================
            COMMERCIAL CHARGING
        ===================================================== */}

        <Link
          href="/ev-chargers"
          className="group relative min-h-[430px] overflow-hidden lg:min-h-[520px]"
        >
          <Image
            src="/images/ev-charging/commercial-charger.jpeg"
            alt="Commercial EV charging installation"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5" />

          <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-9 lg:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent">
              Commercial Charging
            </p>

            <h2 className="mt-4 max-w-[520px] text-[38px] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-[44px] lg:text-[48px]">
              Charging infrastructure
              <br />
              built for daily use.
            </h2>

            <div className="mt-7 inline-flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.035em] text-white">
              <span>View Commercial Chargers</span>

              <span className="text-accent transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};