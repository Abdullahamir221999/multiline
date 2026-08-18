import Image from "next/image";

import { SectionHeaderBar } from "@/components/home/CorporateIdentity";
import { HOME_STORY_IMAGES } from "@/lib/homeContent";
import { cn } from "@/helpers/cn";

export const OurStoryCollage = () => (
  <section id="our-story" className="scroll-mt-24 border-b border-line">
    <SectionHeaderBar title="Our Story" />

    <div className="page-pad page-shell py-14 lg:py-20">
      <p className="mx-auto max-w-[640px] text-center text-[18px] leading-[1.65] ">
        Multiline&apos;s history, told through the archives.
      </p>

      <div className="mx-auto mt-12 grid max-w-[1400px] gap-8 lg:grid-cols-2 lg:gap-0">
        {HOME_STORY_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={cn(
              "relative overflow-hidden border border-line bg-surface-elevated shadow-[0_16px_48px_rgba(17,17,17,0.1)]",
              index === 0 && "lg:-rotate-1 lg:translate-x-4 lg:translate-y-2 lg:z-10",
              index === 1 && "lg:rotate-1 lg:-translate-x-4 lg:-translate-y-2"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);
