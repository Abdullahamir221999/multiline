import Image from "next/image";
import Link from "next/link";

import { createWhatsAppLink } from "@/lib/contact";
import { EV_PRODUCTS, type EVProduct } from "@/lib/evProducts";

const FEATURED_ID = "11kw-ac";

/** Top of the range — the power bar is scaled against this. */
const MAX_KW = 60;

const byOutput = (a: EVProduct, b: EVProduct) =>
  (a.outputKw ?? 0) - (b.outputKw ?? 0);

const featured = EV_PRODUCTS.find((product) => product.id === FEATURED_ID);

const homeChargers = EV_PRODUCTS.filter(
  (product) => product.category === "AC Chargers" && product.id !== FEATURED_ID
).sort(byOutput);

const siteChargers = EV_PRODUCTS.filter(
  (product) => product.category === "DC Chargers"
).sort(byOutput);

const accessories = EV_PRODUCTS.filter(
  (product) =>
    product.category === "PIB Boxes" || product.category === "Stands"
);

const enquiryLink = (title: string) =>
  createWhatsAppLink(
    `Hi Multiline, I'm interested in the ${title}. Please send me details and pricing.`
  );

export const EVProductCatalogue = () => {
  return (
    <section className="bg-[#F6F8FC]">
      <div className="page-pad page-shell py-14 lg:py-20">
        {/* HEADER */}

        <div className="max-w-[640px]">
          <h2 className="text-[32px] font-semibold tracking-[-0.035em] sm:text-[38px] lg:text-[44px]">
            EV charging products
          </h2>

          <p className="mt-4 text-[16px] leading-[1.6] text-ink-soft">
            Five chargers from 7 kW to 60 kW, plus the hardware to install them.
            Every unit is supplied with installation by our own electrical team.
          </p>
        </div>

        {/* FEATURED */}

        {featured && (
          <div className="mt-10 overflow-hidden rounded-[20px] border border-black/[0.07] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="relative aspect-[1.25/1] bg-[#F2F5FA] lg:aspect-auto lg:min-h-[440px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-10 lg:p-14"
                />
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                  Most installed
                </p>

                <h3 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-[-0.035em] sm:text-[36px]">
                  {featured.title}
                </h3>

                <p className="mt-4 max-w-[440px] text-[15px] leading-[1.65] text-ink-soft">
                  {featured.description}
                </p>

                <dl className="mt-8 grid max-w-[420px] grid-cols-2 gap-x-6 gap-y-5 border-t border-black/[0.07] pt-7 sm:grid-cols-4">
                  <Spec label="Output" value={featured.output} />
                  <Spec label="Connector" value={featured.connector} />
                  <Spec label="Supply" value={featured.supply} />
                  <Spec label="Rating" value={featured.protection} />
                </dl>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  {featured.href && (
                    <Link
                      href={featured.href}
                      className="flex h-[50px] items-center justify-center rounded-xl bg-brand px-7 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f3d7d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      View specifications
                    </Link>
                  )}

                  <a
                    href={enquiryLink(featured.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[50px] items-center justify-center rounded-xl border border-black/[0.14] px-7 text-[13px] font-semibold transition-colors hover:bg-black/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HOME & WORKPLACE */}

        <GroupHeading
          title="For homes and workplaces"
          note="AC charging on your existing connection. Charges overnight or through the working day."
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {homeChargers.map((product) => (
            <ChargerCard key={product.id} product={product} />
          ))}
        </div>

        {/* COMMERCIAL */}

        <GroupHeading
          title="For commercial and fleet sites"
          note="DC fast charging. Requires a dedicated three-phase supply and a site survey — not suitable for domestic connections."
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {siteChargers.map((product) => (
            <ChargerCard key={product.id} product={product} />
          ))}
        </div>

        {/* ACCESSORIES */}

        <GroupHeading
          title="Installation hardware"
          note="Supplied and fitted alongside any charger."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {accessories.map((product) => (
            <article
              key={product.id}
              className="flex items-center gap-5 rounded-2xl border border-black/[0.07] bg-white p-4 transition-colors hover:border-black/[0.14]"
            >
              <div className="relative h-[104px] w-[104px] shrink-0 rounded-xl bg-[#F2F5FA]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="104px"
                  className="object-contain p-3"
                />
              </div>

              <div className="min-w-0">
                <h4 className="text-[16px] font-semibold tracking-[-0.02em]">
                  {product.title}
                </h4>

                <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-soft">
                  {product.description}
                </p>

                <a
                  href={enquiryLink(product.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[12px] font-semibold text-brand hover:underline"
                >
                  Enquire →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

function GroupHeading({ title, note }: { title: string; note: string }) {
  return (
    <div className="mt-16 max-w-[560px]">
      <h3 className="text-[22px] font-semibold tracking-[-0.03em] sm:text-[25px]">
        {title}
      </h3>

      <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft">{note}</p>
    </div>
  );
}

function ChargerCard({ product }: { product: EVProduct }) {
  const kw = product.outputKw ?? 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]">
      <div className="relative aspect-[1.4/1] bg-[#F2F5FA]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-contain p-9 transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h4 className="text-[19px] font-semibold leading-[1.25] tracking-[-0.025em]">
          {product.title}
        </h4>

        <p className="mt-2 text-[13px] leading-[1.55] text-ink-soft">
          {product.description}
        </p>

        {/* OUTPUT — the axis these products actually differ on */}

        {kw > 0 && (
          <div className="mt-6">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[38px] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                {kw}
              </span>

              <span className="text-[14px] font-medium text-ink-soft">kW</span>
            </div>

            <div
              className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-black/[0.06]"
              role="presentation"
            >
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${Math.min((kw / MAX_KW) * 100, 100)}%` }}
              />
            </div>

            <p className="mt-2 text-[11px] text-ink-faint">
              of 60 kW top of range
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-ink-soft">
          {product.connector && <span>{product.connector}</span>}
          {product.supply && <span>{product.supply}</span>}
          {product.protection && <span>{product.protection}</span>}
        </div>

        <div className="mt-auto flex gap-2 pt-6">
          {product.href && (
            <Link
              href={product.href}
              className="flex h-[44px] flex-1 items-center justify-center rounded-xl border border-black/[0.12] text-[12px] font-semibold transition-colors hover:bg-black/[0.03]"
            >
              Details
            </Link>
          )}

          <a
            href={enquiryLink(product.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[44px] flex-1 items-center justify-center rounded-xl bg-brand px-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#0f3d7d]"
          >
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.1em] text-ink-faint">
        {label}
      </dt>

      <dd className="mt-1.5 text-[14px] font-semibold">{value}</dd>
    </div>
  );
}