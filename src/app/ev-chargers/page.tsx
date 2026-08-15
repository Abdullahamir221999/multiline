import Image from "next/image";
import Link from "next/link";

type Product = {
  name: string;
  slug: string;
  category: "AC" | "DC";
  power: string;
  application: string;
  description: string;
  connector: string;
  price: string;
  image: string;
  tag?: string;
};

const acChargers: Product[] = [
  {
    name: "11kW Home Charger",
    slug: "11kw-home-charger",
    category: "AC",
    power: "11 kW",
    application: "Residential",
    description:
      "Balanced everyday home charging for compatible three-phase EVs.",
    connector: "Type 2",
    price: "PKR 185,000",
    image: "/images/products/charger-front1.png",
    tag: "Recommended",
  },
  {
    name: "7kW Home Charger",
    slug: "7kw-home-charger",
    category: "AC",
    power: "7 kW",
    application: "Residential",
    description:
      "Practical home charging for everyday overnight use.",
    connector: "Type 2",
    price: "PKR 135,000",
    image: "/images/products/7kw-jensonn-ac.png",
  },
  {
    name: "22kW Smart Charger",
    slug: "22kw-smart-charger",
    category: "AC",
    power: "22 kW",
    application: "Home / Commercial",
    description:
      "Higher-output AC charging for compatible vehicles and sites.",
    connector: "Type 2",
    price: "PKR 265,000",
    image: "/images/products/22kw-jensonn-ac.png",
  },
];

const dcChargers: Product[] = [
  {
    name: "60kW DC Fast Charger",
    slug: "60kw-dc-fast-charger",
    category: "DC",
    power: "60 kW",
    application: "Commercial",
    description:
      "Fast charging infrastructure for commercial and public locations.",
    connector: "CCS2",
    price: "Request Quote",
    image: "/images/products/60kw-dc.png",
    tag: "Commercial",
  },
  {
    name: "30kW DC Fast Charger",
    slug: "30kw-dc-fast-charger",
    category: "DC",
    power: "30 kW",
    application: "Commercial",
    description:
      "Compact DC charging for workplaces and lower-demand commercial sites.",
    connector: "CCS2",
    price: "Request Quote",
    image: "/images/products/22kw-smapee-ac.png",
  },
  {
    name: "120kW DC Fast Charger",
    slug: "120kw-dc-fast-charger",
    category: "DC",
    power: "120 kW",
    application: "Fleet / Public",
    description:
      "High-output infrastructure for fleets and public fast-charging networks.",
    connector: "CCS2",
    price: "Request Quote",
    image: "/images/products/20kw-dc.png",
  },
];

export default function EVChargersPage() {
  return (
    <main className="bg-[#f2f0e9] text-[#101010]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-black/15">
        {/* Breadcrumb */}
        <div className="border-b border-black/15 px-5 py-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/40">
              Multiline / Products / EV Charging
            </span>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.1em] text-black/30 md:block">
              Charging Systems
            </span>
          </div>
        </div>

        <div className="grid min-h-[500px] lg:grid-cols-[1.25fr_0.75fr]">
          {/* Left */}
          <div className="flex flex-col justify-between border-b border-black/15 px-5 py-12 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[7px] w-[7px] bg-[#f2ca30]" />

                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#124897]">
                  EV Charging Systems
                </span>
              </div>

              <h1 className="mt-8 max-w-[950px] text-[68px] font-medium leading-[0.9] tracking-[-0.065em] sm:text-[88px] lg:text-[104px] xl:text-[112px]">
                Charging,
                <br />
                engineered
                <br />
                for the site.
              </h1>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-end px-5 py-12 md:px-8 lg:px-12 lg:py-16">
            <p className="max-w-[430px] text-[18px] font-medium leading-[1.45] tracking-[-0.025em]">
              Charging systems for homes, workplaces, commercial sites and
              fleet infrastructure.
            </p>

            <div className="mt-12 border-t border-black/20">
              <ApplicationRow number="01" label="Residential" />
              <ApplicationRow number="02" label="Commercial" />
              <ApplicationRow number="03" label="Fleet & Public" />
            </div>

            <Link
              href="#choose-type"
              className="group mt-9 flex items-center justify-between border-b border-black/25 pb-5"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.11em]">
                Explore Chargers
              </span>

              <span className="text-[#124897] transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          AC / DC SELECTOR
      ===================================================== */}

      <section id="choose-type" className="scroll-mt-10">
        <div className="grid lg:grid-cols-2">
          {/* AC */}
          <Link
            href="#ac-chargers"
            className="group bg-[#f2ca30] px-5 py-9 text-[#124897] md:px-8 lg:border-r lg:border-[#124897]/20 lg:px-12 lg:py-10"
          >
            <div className="flex min-h-[155px] flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-[7px] w-[7px] bg-[#124897]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#124897]/60">
                    01
                  </span>
                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#124897]/60">
                  7 — 22 kW
                </span>
              </div>

              <div className="flex items-end justify-between gap-8">
                <div>
                  <h2 className="text-[44px] font-medium leading-none tracking-[-0.055em]">
                    AC Charging
                  </h2>

                  <p className="mt-4 text-[12px] text-[#124897]/65">
                    Home · Workplace · Destination
                  </p>
                </div>

                <span className="text-[25px] transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </div>
          </Link>

          {/* DC */}
          <Link
            href="#dc-chargers"
            className="group bg-[#124897] px-5 py-9 text-[#f2ca30] md:px-8 lg:px-12 lg:py-10"
          >
            <div className="flex min-h-[155px] flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-[7px] w-[7px] bg-[#f2ca30]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#f2ca30]/65">
                    02
                  </span>
                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#f2ca30]/65">
                  30 — 120+ kW
                </span>
              </div>

              <div className="flex items-end justify-between gap-8">
                <div>
                  <h2 className="text-[44px] font-medium leading-none tracking-[-0.055em]">
                    DC Fast Charging
                  </h2>

                  <p className="mt-4 text-[12px] text-[#f2ca30]/65">
                    Commercial · Fleet · Public
                  </p>
                </div>

                <span className="text-[25px] transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* =====================================================
          AC PRODUCTS
      ===================================================== */}

      <ProductSection
        id="ac-chargers"
        number="01"
        label="AC Charging"
        title="Everyday charging."
        description="Residential and destination charging systems for everyday EV use."
        range="7 — 22 kW"
        products={acChargers}
      />

      {/* =====================================================
          DC PRODUCTS
      ===================================================== */}

      <ProductSection
        id="dc-chargers"
        number="02"
        label="DC Fast Charging"
        title="Commercial fast charging."
        description="Higher-output systems for commercial sites, fleets and public charging infrastructure."
        range="30 — 120+ kW"
        products={dcChargers}
      />

      {/* =====================================================
          FIND MY CHARGER
      ===================================================== */}

      <section className="bg-[#124897] px-5 py-16 text-white md:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#f2ca30]">
              Charger Selection
            </span>

            <span className="hidden font-mono text-[9px] uppercase tracking-[0.1em] text-white/30 md:block">
              Multiline EV Assistant
            </span>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <h2 className="max-w-[760px] text-[54px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[68px] lg:text-[78px]">
              Not sure which charger fits your EV?
            </h2>

            <div>
              <p className="max-w-[450px] text-[15px] leading-[1.65] text-white/55">
                Select your vehicle or ask Multiline. We&apos;ll compare its
                charging capability with the available systems and recommend
                the right option.
              </p>

              <Link
                href="/products/11kw-home-charger#compatibility"
                className="group mt-8 flex items-center justify-between border-y border-white/30 py-5"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.11em]">
                  Find My Charger
                </span>

                <span className="text-[#f2ca30] transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   PRODUCT SECTION
========================================================= */

function ProductSection({
  id,
  number,
  label,
  title,
  description,
  range,
  products,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  range: string;
  products: Product[];
}) {
  return (
    <section
      id={id}
      className="scroll-mt-10 border-t border-black/15 bg-[#f2f0e9]"
    >
      {/* Section intro */}
      <div className="grid border-b border-black/15 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-black/15 px-5 py-10 md:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#124897]">
              {number} / {label}
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/30 lg:hidden">
              {range}
            </span>
          </div>

          <h2 className="mt-8 text-[50px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[62px]">
            {title}
          </h2>
        </div>

        <div className="flex items-end justify-between gap-10 px-5 py-10 md:px-8 lg:px-12 lg:py-12">
          <p className="max-w-[530px] text-[15px] leading-[1.65] text-black/50">
            {description}
          </p>

          <span className="hidden whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] text-black/30 lg:block">
            {products.length} Systems / {range}
          </span>
        </div>
      </div>

      {/* Equal product grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            number={String(index + 1).padStart(2, "0")}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  number,
}: {
  product: Product;
  number: string;
}) {
  const isQuote = product.price === "Request Quote";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col border-b border-black/15 xl:border-r xl:last:border-r-0"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#d8dbd5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Meta */}
        <div className="absolute left-5 top-5 flex items-center gap-3">
          <span className="bg-[#f2f0e9]/90 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-black/55 backdrop-blur-sm">
            {number} / {product.category}
          </span>
        </div>

        {/* Optional recommendation */}
        {product.tag && (
          <div className="absolute right-5 top-5 bg-[#f2ca30] px-3 py-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#101010]">
              {product.tag}
            </span>
          </div>
        )}

        <div className="absolute bottom-5 right-5 flex h-[42px] w-[42px] items-center justify-center bg-[#124897] text-[#f2ca30] transition-transform duration-300 group-hover:translate-x-2">
          →
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 py-7 md:px-7 lg:px-8 lg:py-8">
        {/* Power / use */}
        <div className="flex items-start justify-between gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#124897]">
            {product.power}
          </span>

          <span className="text-right text-[9px] uppercase tracking-[0.08em] text-black/35">
            {product.application}
          </span>
        </div>

        {/* Name */}
        <h3 className="mt-5 text-[29px] font-medium leading-[1] tracking-[-0.045em]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-4 max-w-[390px] text-[13px] leading-[1.6] text-black/45">
          {product.description}
        </p>

        {/* Specs */}
        <div className="mt-8 border-t border-black/15">
          <CardSpec label="Connector" value={product.connector} />
          <CardSpec label="Output" value={product.power} />
        </div>

        {/* Price / CTA */}
        <div className="mt-auto flex items-end justify-between border-t border-black/15 pt-6">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-black/30">
              {isQuote ? "Commercial Enquiry" : "Price"}
            </p>

            <p className="mt-2 text-[16px] font-medium">
              {product.price}
            </p>
          </div>

          <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#124897]">
            {isQuote ? "View System →" : "View Product →"}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function ApplicationRow({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-black/20 py-4">
      <span className="font-mono text-[8px] text-black/30">
        {number}
      </span>

      <span className="text-[12px] uppercase tracking-[0.08em] text-black/50">
        {label}
      </span>
    </div>
  );
}

function CardSpec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-black/15 py-4">
      <span className="text-[9px] uppercase tracking-[0.08em] text-black/35">
        {label}
      </span>

      <span className="text-[11px] font-medium">
        {value}
      </span>
    </div>
  );
}