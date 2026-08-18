import Image from "next/image";
import Link from "next/link";

export const Home2Hero = () => {
  return (
    <section className="relative min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-black text-white">
      {/* BACKGROUND */}

      <Image
        src="/images/home2/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}

      <div className="page-pad page-shell relative z-10 flex min-h-[calc(100svh-var(--header-height))] items-center">
        <div className="max-w-[900px] py-12 lg:py-16">
          <h1 className="text-[52px] font-medium uppercase leading-[0.92] tracking-[-0.055em] sm:text-[68px] md:text-[82px] lg:text-[94px] xl:text-[104px]">
            Power
            <br />
            Infrastructure
            <br />
            and Energy
            <br />
            Solutions
          </h1>

          <p className="mt-6 text-[16px] font-semibold uppercase tracking-[-0.015em] sm:text-[19px]">
            Power • Energy • Automation • EV
          </p>

          <Link
            href="#solutions"
            className="mt-9 inline-flex h-[64px] items-center border border-white/70 px-8 text-[15px] font-semibold uppercase transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Explore Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};