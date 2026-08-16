import { cn } from "@/helpers/cn";

type SectionEyebrowProps = {
  children: string;
  className?: string;
};

/** Small uppercase section label used across marketing pages. */
export const SectionEyebrow = ({ children, className }: SectionEyebrowProps) => (
  <p
    className={cn(
      "text-[11px] font-semibold uppercase tracking-[0.1em] text-brand",
      className
    )}
  >
    {children}
  </p>
);

type SectionHeaderProps = {
  number: string;
  label: string;
  right?: string;
  className?: string;
};

export const SectionHeader = ({
  number,
  label,
  right,
  className,
}: SectionHeaderProps) => (
  <div
    className={cn(
      "flex items-end justify-between gap-6 border-b border-line page-pad py-8",
      className
    )}
  >
    <div className="page-shell flex w-full items-end justify-between gap-6">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] text-ink-faint">{number}</span>
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em]">
          {label}
        </h2>
      </div>

      {right ? (
        <p className="hidden text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint sm:block">
          {right}
        </p>
      ) : null}
    </div>
  </div>
);
