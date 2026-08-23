export const EVHero = () => {
  return (
    <section className="bg-white">
      <div className="page-shell">
        <div className="grid overflow-hidden lg:grid-cols-[40%_60%]">
          {/* =====================================================
              CONTENT
          ===================================================== */}

          <div className="relative flex min-h-[360px] flex-col justify-between bg-[#124897] px-7 py-8 sm:px-10 sm:py-10 lg:min-h-[430px] lg:px-12 lg:py-11 xl:px-14">
            {/* Small label */}
            <div className="flex items-center gap-3">
              <span className="h-[7px] w-[7px] bg-[#F2CA30]" />

              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/65">
                EV Charging Network
              </p>
            </div>

            {/* Main statement */}
            <div className="py-10">
              <h1 className="max-w-[430px] text-[42px] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[48px] lg:text-[50px] xl:text-[54px]">
                Over{" "}
                <span className="text-[#F2CA30]">5,000</span>
                <br />
                AC chargers
                <br />
                installed
                <br />
                nationwide
              </h1>
            </div>

            {/* Bottom detail */}
            <div className="flex items-center gap-3 border-t border-white/15 pt-5">
              <p className="text-[13px] font-medium text-white/65">
                Supply
              </p>

              <span className="h-1 w-1 rounded-full bg-white/30" />

              <p className="text-[13px] font-medium text-white/65">
                Installation
              </p>

              <span className="h-1 w-1 rounded-full bg-white/30" />

              <p className="text-[13px] font-medium text-white/65">
                Support
              </p>
            </div>
          </div>

          {/* =====================================================
              VIDEO
          ===================================================== */}

          <div className="relative min-h-[300px] bg-[#111] sm:min-h-[380px] lg:min-h-[430px]">
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

            {/* Small brand marker */}
            <div className="pointer-events-none absolute right-0 top-0 hidden bg-[#F2CA30] px-4 py-2 lg:block">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#124897]">
                Multiline
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};