import Image from "next/image";
import Link from "next/link";

export const EVShowcase = () => {
  return (
    <section className="w-full bg-white">
      <div className="grid w-full lg:grid-cols-[2fr_1fr]">
        {/* =====================================================
            RESIDENTIAL
        ===================================================== */}

        <Link
          href="/ev-chargers"
          className="block overflow-hidden border-b border-line lg:border-b-0 lg:border-r"
        >
          <Image
            src="/images/ev-charging/residential-installation-clean.png"
            alt="Residential EV charging installation"
            width={1367}
            height={677}
            priority
            sizes="(max-width: 1024px) 100vw, 66.666vw"
            className="block h-auto w-full"
          />
        </Link>

        {/* =====================================================
            COMMERCIAL
        ===================================================== */}

        <Link
          href="/ev-chargers"
          className="relative block min-h-[350px] overflow-hidden lg:min-h-0"
        >
          <Image
            src="/images/ev-charging/commercial-charger.jpeg"
            alt="Commercial EV charging installation"
            fill
            sizes="(max-width: 1024px) 100vw, 33.333vw"
            className="object-cover object-center"
          />
        </Link>
      </div>
    </section>
  );
};