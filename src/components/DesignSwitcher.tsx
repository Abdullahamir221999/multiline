"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/helpers/cn";

/**
 * Internal design comparison control for the two product page explorations.
 * Not part of customer-facing chrome.
 */
export default function DesignSwitcher() {
  const path = usePathname();

  const onProductPage =
    path === "/products/11kw-home-charger" ||
    path === "/products/11kw-home-charger-alt";

  if (!onProductPage) {
    return null;
  }

  const isAlt = path.endsWith("-alt");

  return (
    <div
      role="navigation"
      aria-label="Product design options"
      className="fixed bottom-5 right-5 z-[100] flex gap-1 border border-line bg-surface-elevated/95 p-1 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-md md:left-1/2 md:right-auto md:-translate-x-1/2"
    >
      <Link
        href="/products/11kw-home-charger"
        className={cn(
          "px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors",
          !isAlt
            ? "bg-brand text-brand-foreground"
            : "text-ink-soft hover:text-ink"
        )}
      >
        Editorial
      </Link>
      <Link
        href="/products/11kw-home-charger-alt"
        className={cn(
          "px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors",
          isAlt
            ? "bg-brand text-brand-foreground"
            : "text-ink-soft hover:text-ink"
        )}
      >
        Commerce
      </Link>
    </div>
  );
}
