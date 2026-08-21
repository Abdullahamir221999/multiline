import Link from "next/link";

export const EVHero = () => {
  return (
    <section className="bg-[#F5F7FB] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="page-shell overflow-hidden rounded-[24px] border border-black/[0.08] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
        <div className="grid lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
          {/* =====================================================
              CONTENT
          ===================================================== */}

          <div className="flex flex-col justify-center px-6 py-10 sm:px-8 lg:px-12 lg:py-12 xl:px-14">
            <p className="text-[15px] font-semibold text-brand">
              Multiline EV Charging
            </p>

            <h1 className="mt-4 max-w-[570px] text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[48px] lg:text-[52px] xl:text-[56px]">
              5,000+ AC chargers installed nationwide
            </h1>

            <p className="mt-5 max-w-[520px] text-[16px] leading-[1.65] text-ink-soft">
              EV charging solutions for homes, workplaces and commercial
              locations — supplied, installed and supported across Pakistan.
            </p>

            {/* SIMPLE BENEFITS */}

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <Benefit>Home charging</Benefit>
              <Benefit>Commercial charging</Benefit>
              <Benefit>Installation support</Benefit>
            </div>

            {/* ACTIONS */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ev-chargers"
                className="inline-flex h-[50px] items-center justify-center gap-3 rounded-xl bg-accent px-6 text-[14px] font-semibold text-black transition-colors hover:bg-accent-hover"
              >
                Browse EV chargers
                <span aria-hidden>→</span>
              </Link>

              <Link
                href="#vehicle-coverage"
                className="inline-flex h-[50px] items-center justify-center rounded-xl border border-black/15 bg-white px-6 text-[14px] font-semibold text-ink transition-colors hover:bg-black/[0.035]"
              >
                Check vehicle compatibility
              </Link>
            </div>
          </div>

          {/* =====================================================
              VIDEO
          ===================================================== */}

          <div className="p-3 pt-0 sm:p-4 sm:pt-0 lg:p-4 lg:pl-0">
            <div className="relative min-h-[300px] overflow-hidden rounded-[18px] bg-black sm:min-h-[390px] lg:h-full lg:min-h-[470px]">
              <video
                controls
                preload="metadata"
                poster="/images/ev-charging/hero-video-poster.png"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source
                  src="/videos/ev-charging-overview.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Benefit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-[13px] font-medium text-ink-soft">
      <span className="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#E8F0FF] text-[11px] font-bold text-brand">
        ✓
      </span>

      {children}
    </div>
  );
}