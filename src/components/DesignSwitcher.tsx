"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesignSwitcher() {
  const path = usePathname();

  // only show the switcher on the two product design pages
  const onProductPage =
    path === "/products/11kw-home-charger" ||
    path === "/products/11kw-home-charger-alt";

  if (!onProductPage) return null;

  const isAlt = path.endsWith("-alt");

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 flex gap-1 rounded-full border border-black/15 bg-white/90 p-1 shadow-lg backdrop-blur-md">
      <Link
        href="/products/11kw-home-charger"
        className={`rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors ${
          !isAlt ? "bg-[#124897] text-white" : "text-black/60 hover:text-black"
        }`}
      >
        Option A · Editorial
      </Link>
      <Link
        href="/products/11kw-home-charger-alt"
        className={`rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors ${
          isAlt ? "bg-[#124897] text-white" : "text-black/60 hover:text-black"
        }`}
      >
        Option B · Retail
      </Link>
    </div>
  );
}
