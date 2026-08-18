import { ABOUT_MULTILINE_PARAGRAPHS } from "@/lib/homeContent";

const SectionHeaderBar = ({
  title,
  id,
}: {
  title: string;
  id?: string;
}) => (
  <div className="relative bg-accent">
    <div className="page-pad page-shell py-4 text-center">
      <h2
        id={id}
        className="text-[15px] font-semibold uppercase tracking-[0.12em] text-accent-foreground sm:text-[16px]"
      >
        {title}
      </h2>
    </div>
    <span
      aria-hidden
      className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 translate-y-full border-x-[14px] border-t-[14px] border-x-transparent border-t-accent"
    />
  </div>
);

export const CorporateIdentity = () => (
  <section aria-labelledby="corporate-identity-heading" className="border-b border-line">
    <SectionHeaderBar title="Corporate Identity" id="corporate-identity-heading" />

    <div className="page-pad page-shell py-14 lg:py-20">
      <h3 className="font-display text-[32px] font-medium tracking-[-0.03em] sm:text-[40px]">
        About Multiline
      </h3>

      <div className="mt-8 max-w-[820px] space-y-6 text-[16px] leading-[1.75] text-ink-soft">
        {ABOUT_MULTILINE_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </div>
  </section>
);

export { SectionHeaderBar };
