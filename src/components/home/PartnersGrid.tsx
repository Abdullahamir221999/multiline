import Image from "next/image";

import { HOME_PARTNERS } from "@/lib/homeContent";

export const PartnersGrid = () => (
  <section aria-labelledby="partners-heading" className="border-b border-line bg-surface">
    <div className="page-pad page-shell py-14 lg:py-20">
      <h2
        id="partners-heading"
        className="text-center text-[28px] font-medium tracking-[-0.03em] sm:text-[32px]"
      >
        Our Partners
      </h2>

      <ul className="mx-auto mt-12 grid max-w-[960px] grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
        {HOME_PARTNERS.map((partner) => (
          <li key={partner.name} className="flex items-center justify-center">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={48}
              className="h-12 w-auto max-w-[120px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
