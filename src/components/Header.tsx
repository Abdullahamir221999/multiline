"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/helpers/cn";
import { CONTACT_HREF, PRIMARY_NAV } from "@/lib/navigation";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="page-pad flex h-[var(--header-height)] items-center">
<Link
  href="/"
  onClick={closeMenu}
  className="flex min-w-0 items-center sm:min-w-[180px]"
  aria-label="Multiline Home"
>
  <Image
    src="/images/multiline-logo.png"
    alt="Multiline"
    width={180}
    height={48}
    priority
    className="h-[38px] w-auto object-contain"
  />
</Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-8 xl:gap-9 lg:flex"
        >
          {PRIMARY_NAV.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative text-[14px] font-medium transition-colors",
                  isActive ? "text-brand" : "text-ink hover:text-brand"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 h-px bg-brand transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center justify-end gap-3 sm:gap-5 sm:min-w-[180px]">
          <ThemeToggle className="hidden sm:inline-flex" />

          <Link
            href={CONTACT_HREF}
            className="hidden text-[12px] font-medium uppercase tracking-[0.08em] text-ink transition-colors hover:text-brand md:block"
          >
            Contact
          </Link>

          <button
            type="button"
            className="group flex items-center gap-3 border-l border-line pl-4 text-[12px] font-medium uppercase tracking-[0.08em] sm:pl-5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
            <span
              aria-hidden
              className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] border border-line-strong"
            >
              <span
                className={cn(
                  "h-px w-3 bg-ink transition-transform duration-200",
                  menuOpen && "translate-y-[3px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-3 bg-ink transition-transform duration-200",
                  menuOpen && "-translate-y-[3px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        hidden={!menuOpen}
        className={cn(
          "border-t border-line bg-paper lg:hidden",
          menuOpen ? "block" : "hidden"
        )}
      >
        <nav aria-label="Mobile" className="page-pad flex flex-col py-4">
          {PRIMARY_NAV.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "border-b border-line py-4 text-[15px] font-medium",
                  isActive ? "text-brand" : "text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href={CONTACT_HREF}
            onClick={closeMenu}
            className="border-b border-line py-4 text-[15px] font-medium"
          >
            Contact
          </Link>

          <div className="flex items-center justify-between py-4">
            <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-faint">
              Appearance
            </span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
