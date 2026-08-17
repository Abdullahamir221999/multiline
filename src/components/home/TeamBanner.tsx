import Image from "next/image";

export const TeamBanner = () => (
  <section aria-label="Multiline team" className="relative w-full overflow-hidden">
    <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
      <Image
        src="/images/team-banner-image.jpg"
        alt="Multiline team with generators and solar panels"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  </section>
);
