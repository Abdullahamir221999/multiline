"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/helpers/cn";
import {
  CONTACT_HREF,
  PRIMARY_NAV,
  getDropdown,
  isExternal,
  type DropdownColumn,
} from "@/lib/navigation";

/* =========================================================
   HEADER

   Fixed, and transparent while sitting over a page's hero.
   Goes solid once scrolled, once a mega menu opens, or once
   the mobile menu opens — anywhere white text would land on
   a white surface.

   Because it's fixed rather than sticky it no longer takes
   up space in the flow. Every page here opens with a
   full-height hero, so that's correct — but a page without
   one needs its own top padding. See HEADER_HEIGHT below.
========================================================= */

const HEADER_HEIGHT = 78;

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(
    null
  );
  const [scrolled, setScrolled] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  /** White background and dark text. */
  const solid = scrolled || Boolean(openItem) || menuOpen;

  const openDropdown = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenItem(label);
  };

  const closeDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenItem(null), 120);
  };

  const closeAll = () => {
    setMenuOpen(false);
    setOpenItem(null);
    setMobileSection(null);
  };

  useEffect(() => {
    closeAll();
  }, [pathname]);

  /* 40px is far enough that a stray trackpad nudge doesn't
     flip it, close enough that it feels immediate. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{ height: HEADER_HEIGHT }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 w-full transition-colors duration-300",
          solid
            ? "border-b border-black/[0.07] bg-white/95 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
        onMouseLeave={closeDropdown}
      >
        <div className="page-pad page-shell flex h-full items-center">
          {/* LOGO

              The brand mark is dark blue, invisible on a dark
              hero. brightness-0 invert flattens it to white
              while transparent. A proper white asset would be
              cleaner — worth asking Multiline for one. */}

          <Link
            href="/ev-chargers"
            aria-label="Multiline home"
            onClick={closeAll}
            className="relative z-10 flex shrink-0 items-center"
          >
            <Image
              src="/images/multiline-logo.png"
              alt="Multiline"
              width={180}
              height={48}
              priority
              className={cn(
                "h-[37px] w-auto object-contain transition-all duration-300 sm:h-[39px]",
                !solid && "brightness-0 invert"
              )}
            />
          </Link>

          {/* DESKTOP NAV */}

          <nav
            aria-label="Primary navigation"
            className="ml-12 hidden flex-1 items-center gap-1 lg:flex xl:ml-16"
          >
            {PRIMARY_NAV.map((item) => {
              const external = isExternal(item.href);

              const isActive =
                !external &&
                (pathname === item.href ||
                  pathname.startsWith(`${item.href}/`));

              const dropdown = getDropdown(item.label);
              const hasDropdown = dropdown.length > 0;

              const className = cn(
                "flex h-[46px] items-center gap-1.5 px-4 text-[14px] font-medium transition-colors duration-200",
                solid
                  ? isActive || openItem === item.label
                    ? "text-brand"
                    : "text-[#222] hover:text-brand"
                  : "text-white/90 hover:text-white"
              );

              const content = (
                <>
                  {item.label}

                  {hasDropdown && (
                    <ChevronDown
                      strokeWidth={1.8}
                      className={cn(
                        "h-[14px] w-[14px] transition-transform duration-200",
                        openItem === item.label && "rotate-180"
                      )}
                    />
                  )}
                </>
              );

              return (
                <div
                  key={item.href}
                  onMouseEnter={() => {
                    if (hasDropdown) openDropdown(item.label);
                    else closeDropdown();
                  }}
                  onFocus={() => {
                    if (hasDropdown) openDropdown(item.label);
                  }}
                >
                  {external ? (
                    <a href={item.href} className={className}>
                      {content}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={className}
                      aria-current={isActive ? "page" : undefined}
                      aria-expanded={
                        hasDropdown
                          ? openItem === item.label
                          : undefined
                      }
                    >
                      {content}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* RIGHT */}

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              href={CONTACT_HREF}
              className="hidden h-[46px] items-center justify-center rounded-full bg-brand px-6 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-brand-dark md:inline-flex"
            >
              Get a quote
              <span aria-hidden="true" className="ml-2 text-[16px]">
                →
              </span>
            </Link>

            <button
              type="button"
              aria-label={
                menuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className={cn(
                "flex h-[44px] w-[44px] items-center justify-center rounded-full transition-colors lg:hidden",
                solid
                  ? "text-ink hover:bg-black/[0.05]"
                  : "text-white hover:bg-white/10"
              )}
            >
              {menuOpen ? (
                <X className="h-[22px] w-[22px]" strokeWidth={1.8} />
              ) : (
                <Menu
                  className="h-[22px] w-[22px]"
                  strokeWidth={1.8}
                />
              )}
            </button>
          </div>
        </div>

        {/* MEGA MENU */}

        {PRIMARY_NAV.map((item) => {
          const dropdown = getDropdown(item.label);
          if (dropdown.length === 0) return null;

          return (
            <MegaMenu
              key={item.label}
              columns={dropdown}
              open={openItem === item.label}
              onMouseEnter={() => openDropdown(item.label)}
              onMouseLeave={closeDropdown}
              onNavigate={closeAll}
            />
          );
        })}
      </header>

      {/* SCRIM */}

      <div
        aria-hidden="true"
        onMouseEnter={closeDropdown}
        className={cn(
          "fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 lg:block",
          openItem
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transition-all duration-300 lg:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div style={{ height: HEADER_HEIGHT }} />

        <div
          className="flex flex-col overflow-y-auto"
          style={{ height: `calc(100svh - ${HEADER_HEIGHT}px)` }}
        >
          <nav
            aria-label="Mobile navigation"
            className="page-pad page-shell flex flex-col py-7"
          >
            {PRIMARY_NAV.map((item) => {
              const external = isExternal(item.href);
              const dropdown = getDropdown(item.label);
              const hasDropdown = dropdown.length > 0;
              const expanded = mobileSection === item.label;

              const isActive =
                !external &&
                (pathname === item.href ||
                  pathname.startsWith(`${item.href}/`));

              if (hasDropdown) {
                return (
                  <div
                    key={item.href}
                    className="border-b border-black/[0.07]"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSection(
                          expanded ? null : item.label
                        )
                      }
                      aria-expanded={expanded}
                      className={cn(
                        "flex w-full items-center justify-between py-[15px] text-left text-[25px] font-medium leading-none tracking-[-0.025em]",
                        isActive ? "text-brand" : "text-ink"
                      )}
                    >
                      {item.label}

                      <ChevronDown
                        strokeWidth={1.8}
                        className={cn(
                          "h-[20px] w-[20px] text-ink-faint transition-transform duration-200",
                          expanded && "rotate-180"
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "grid transition-all duration-300",
                        expanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-5">
                          <Link
                            href={item.href}
                            onClick={closeAll}
                            className="block py-2.5 text-[16px] font-medium text-brand"
                          >
                            EV charging overview
                          </Link>

                          {dropdown.map((column) => (
                            <div
                              key={column.heading}
                              className="mt-4"
                            >
                              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                                {column.heading}
                              </p>

                              {column.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={closeAll}
                                  className="block py-2.5 text-[16px] text-ink"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              const className = cn(
                "flex items-center justify-between border-b border-black/[0.07] py-[15px] text-[25px] font-medium leading-none tracking-[-0.025em]",
                isActive ? "text-brand" : "text-ink"
              );

              return external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className={className}
                >
                  {item.label}
                  <span className="text-[19px] font-normal text-ink-faint">
                    ↗
                  </span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className={className}
                >
                  {item.label}
                  <span className="text-[19px] font-normal text-ink-faint">
                    →
                  </span>
                </Link>
              );
            })}

            <Link
              href={CONTACT_HREF}
              onClick={closeAll}
              className="mt-8 flex h-[52px] w-full items-center justify-center rounded-full bg-brand px-6 text-[14px] font-semibold text-white sm:w-fit"
            >
              Get a quote
              <span aria-hidden="true" className="ml-2.5">
                →
              </span>
            </Link>
          </nav>

          <div className="page-pad page-shell mt-auto pb-8">
            <div className="border-t border-black/[0.08] pt-5">
              <p className="text-[13px] leading-[1.6] text-ink-soft">
                EV charging, solar and power solutions across
                Pakistan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   MEGA MENU
========================================================= */

function MegaMenu({
  columns,
  open,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}: {
  columns: DropdownColumn[];
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigate: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "absolute left-0 right-0 top-full hidden border-b border-black/[0.07] bg-white transition-all duration-200 lg:block",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      )}
    >
      <div className="page-pad page-shell grid gap-12 py-10 lg:grid-cols-3 lg:gap-16 lg:py-12">
        {columns.map((column) => (
          <div key={column.heading}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-ink-faint">
              {column.heading}
            </p>

            <div className="mt-5 flex flex-col gap-1">
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onNavigate}
                  className="group -mx-3 rounded-[14px] px-3 py-2.5 transition-colors hover:bg-canvas"
                >
                  <span className="flex items-center text-[15px] font-semibold text-ink transition-colors group-hover:text-brand">
                    {link.label}

                    <span
                      aria-hidden="true"
                      className="ml-1.5 text-[14px] text-ink-faint opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </span>

                  {link.description && (
                    <span className="mt-0.5 block text-[13px] leading-[1.5] text-ink-soft">
                      {link.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}