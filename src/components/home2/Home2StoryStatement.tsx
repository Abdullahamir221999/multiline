import Link from "next/link";

export const Home2StoryStatement = () => {
  return (
    <section className="bg-[#111111] text-white">
      <div className="page-pad page-shell grid gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-14">
        {/* LEFT */}

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
            Since 1975
          </p>

          <h2 className="mt-5 max-w-[760px] text-[42px] font-medium leading-[0.96] tracking-[-0.045em] sm:text-[50px] lg:text-[58px]">
            Built on engineering,
            <br className="hidden sm:block" />
            not trends.
          </h2>
        </div>

        {/* RIGHT */}

        <div className="lg:pl-8">
          <p className="max-w-[470px] text-[15px] leading-[1.65] text-white/55">
            From generators to solar and EV charging, Multiline has grown with
            the technologies its customers depend on — with engineering still
            at the centre.
          </p>

          <Link
            href="/company"
            className="group mt-7 inline-flex items-center gap-3 border-b border-white/25 pb-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-white transition-colors hover:border-accent hover:text-accent"
          >
            Read Our Story

            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};