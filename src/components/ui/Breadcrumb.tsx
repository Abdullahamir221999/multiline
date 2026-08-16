import Link from "next/link";

import { cn } from "@/helpers/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "border-b border-line page-pad py-[18px] text-[12px] font-medium uppercase tracking-[0.065em] text-ink-faint",
        className
      )}
    >
      <ol className="page-shell flex flex-wrap items-center gap-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-3">
              {index > 0 ? (
                <span aria-hidden className="text-ink-faint/60">
                  /
                </span>
              ) : null}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-ink" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
