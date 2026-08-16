import type { ReactNode } from "react";

import { cn } from "@/helpers/cn";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export const EmptyState = ({
  title,
  description,
  action,
  className,
}: EmptyStateProps) => (
  <div
    className={cn(
      "flex flex-col items-start gap-4 border border-dashed border-line page-pad py-16",
      className
    )}
  >
    <h3 className="text-[22px] font-medium tracking-[-0.03em]">{title}</h3>
    {description ? (
      <p className="max-w-md text-[14px] leading-[1.6] text-ink-soft">
        {description}
      </p>
    ) : null}
    {action}
  </div>
);
