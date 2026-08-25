// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useId, useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/Button";
// import { ThemeToggle } from "@/components/ui/ThemeToggle";
// import { cn } from "@/helpers/cn";
// import { CONTACT_HREF, PRIMARY_NAV } from "@/lib/navigation";

// export default function Header() {
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuId = useId();

//   const closeMenu = () => setMenuOpen(false);

//   useEffect(() => {
//     if (!menuOpen) {
//       return;
//     }

//     const onKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener("keydown", onKeyDown);
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown", onKeyDown);
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   return (
//     <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
//       <div className="page-pad flex h-[var(--header-height)] items-center">
// <Link
//   href="/"
//   onClick={closeMenu}
//   className="flex min-w-0 items-center sm:min-w-[180px]"
//   aria-label="Multiline Home"
// >
//   <Image
//     src="/images/multiline-logo.png"
//     alt="Multiline"
//     width={180}
//     height={48}
//     priority
//     className="h-[38px] w-auto object-contain"
//   />
// </Link>

//         <nav
//           aria-label="Primary"
//           className="hidden flex-1 items-center justify-center gap-8 xl:gap-9 lg:flex"
//         >
//           {PRIMARY_NAV.map((item) => {
//             const isActive =
//               pathname === item.href || pathname.startsWith(`${item.href}/`);

//             return (
// <Link
//   key={item.href}
//   href={item.href}
//   className={cn(
//     "group relative text-[14px] font-medium transition-colors duration-200",
//     isActive
//       ? "text-brand"
//       : "text-ink hover:text-brand"
//   )}
//   aria-current={isActive ? "page" : undefined}
// >
//   {item.label}

//   <span
//     className={cn(
//       "absolute -bottom-2 left-0 h-[2px] bg-accent transition-all duration-300",
//       isActive
//         ? "w-full"
//         : "w-0 group-hover:w-full"
//     )}
//   />
// </Link>
//             );
//           })}
//         </nav>

//         <div className="ml-auto flex items-center justify-end gap-3 sm:gap-5 sm:min-w-[180px]">
//           <ThemeToggle className="hidden sm:inline-flex" />

//           <Button
//             href={CONTACT_HREF}
//             variant="accent"
//             size="md"
//             className="hidden md:inline-flex"
//           >
//             Get a Quote
//           </Button>

//           <button
//             type="button"
//             className="group flex items-center gap-3 border-l border-line pl-4 text-[12px] font-medium uppercase tracking-[0.08em] sm:pl-5 lg:hidden"
//             aria-expanded={menuOpen}
//             aria-controls={menuId}
//             onClick={() => setMenuOpen((open) => !open)}
//           >
//             {menuOpen ? "Close" : "Menu"}
//             <span
//               aria-hidden
//               className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] border border-line-strong"
//             >
//               <span
//                 className={cn(
//                   "h-px w-3 bg-ink transition-transform duration-200",
//                   menuOpen && "translate-y-[3px] rotate-45"
//                 )}
//               />
//               <span
//                 className={cn(
//                   "h-px w-3 bg-ink transition-transform duration-200",
//                   menuOpen && "-translate-y-[3px] -rotate-45"
//                 )}
//               />
//             </span>
//           </button>
//         </div>
//       </div>

//       <div
//         id={menuId}
//         hidden={!menuOpen}
//         className={cn(
//           "border-t border-line bg-paper lg:hidden",
//           menuOpen ? "block" : "hidden"
//         )}
//       >
//         <nav aria-label="Mobile" className="page-pad flex flex-col py-4">
//           {PRIMARY_NAV.map((item) => {
//             const isActive =
//               pathname === item.href || pathname.startsWith(`${item.href}/`);

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={closeMenu}
//                 className={cn(
//                   "border-b border-line py-4 text-[15px] font-medium",
//                   isActive ? "text-brand" : "text-ink"
//                 )}
//               >
//                 {item.label}
//               </Link>
//             );
//           })}

//           <div className="flex items-center justify-between border-b border-line py-4">
//             <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-faint">
//               Appearance
//             </span>
//             <ThemeToggle />
//           </div>

//           <Button
//             href={CONTACT_HREF}
//             onClick={closeMenu}
//             variant="accent"
//             size="lg"
//             className="mt-4 w-full justify-center"
//           >
//             Get a Quote
//           </Button>
//         </nav>
//       </div>
//     </header>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/helpers/cn";
import {
  CONTACT_HREF,
  PRIMARY_NAV,
} from "@/lib/navigation";

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDesktopItem, setOpenDesktopItem] =
    useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  /* =======================================================
     ESCAPE + MOBILE SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setOpenDesktopItem(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full border-b border-black/[0.07] bg-white/95 backdrop-blur-xl"
      >
        <div className="page-pad page-shell flex h-[78px] items-center">
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/"
            aria-label="Multiline home"
            onClick={closeMobileMenu}
            className="relative z-10 flex shrink-0 items-center"
          >
            <Image
              src="/images/multiline-logo.png"
              alt="Multiline"
              width={180}
              height={48}
              priority
              className="h-[37px] w-auto object-contain sm:h-[39px]"
            />
          </Link>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <nav
            aria-label="Primary navigation"
            className="ml-12 hidden flex-1 items-center gap-1 lg:flex xl:ml-16"
          >
            {PRIMARY_NAV.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              /*
               * Only show the chevron for pages we eventually
               * want dropdowns underneath.
               */
              const hasDropdown =
                item.label === "EV Charging" ||
                item.label === "Solar" ||
                item.label === "Generators" ||
                item.label === "Company";

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasDropdown) {
                      setOpenDesktopItem(item.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (hasDropdown) {
                      setOpenDesktopItem(null);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-[46px] items-center gap-1.5 rounded-full px-4 text-[14px] font-medium transition-colors duration-200",
                      isActive
                        ? "text-brand"
                        : "text-[#222] hover:text-brand"
                    )}
                    aria-current={
                      isActive ? "page" : undefined
                    }
                  >
                    {item.label}

                    {hasDropdown && (
                      <ChevronDown
                        strokeWidth={1.8}
                        className={cn(
                          "h-[14px] w-[14px] transition-transform duration-200",
                          openDesktopItem === item.label &&
                            "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* =============================================
                      DROPDOWN
                  ============================================= */}

                  {hasDropdown && (
                    <DesktopDropdown
                      label={item.label}
                      open={
                        openDesktopItem === item.label
                      }
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              href={CONTACT_HREF}
              className="
                hidden
                h-[46px]
                items-center
                justify-center
                rounded-full
                bg-brand
                px-6
                text-[14px]
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-brand-dark
                md:inline-flex
              "
            >
              Get a quote

              <span
                aria-hidden="true"
                className="ml-2 text-[16px]"
              >
                →
              </span>
            </Link>

            {/* =============================================
                MOBILE MENU BUTTON
            ============================================= */}

            <button
              type="button"
              aria-label={
                menuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen((current) => !current)
              }
              className="
                flex
                h-[44px]
                w-[44px]
                items-center
                justify-center
                rounded-full
                text-ink
                transition-colors
                hover:bg-black/[0.05]
                lg:hidden
              "
            >
              {menuOpen ? (
                <X
                  className="h-[22px] w-[22px]"
                  strokeWidth={1.8}
                />
              ) : (
                <Menu
                  className="h-[22px] w-[22px]"
                  strokeWidth={1.8}
                />
              )}
            </button>
          </div>
        </div>
      </header>

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
        {/* account for sticky header */}

        <div className="h-[78px]" />

        <div className="flex h-[calc(100svh-78px)] flex-col overflow-y-auto">
          {/* NAV */}

          <nav
            aria-label="Mobile navigation"
            className="page-pad page-shell flex flex-col py-7"
          >
            {PRIMARY_NAV.map((item, index) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex items-center justify-between py-[15px] text-[25px] font-medium leading-none tracking-[-0.025em]",
                    isActive
                      ? "text-brand"
                      : "text-ink"
                  )}
                  style={{
                    transitionDelay: menuOpen
                      ? `${index * 35}ms`
                      : "0ms",
                  }}
                >
                  {item.label}

                  <span className="text-[19px] font-normal text-ink-faint">
                    →
                  </span>
                </Link>
              );
            })}

            {/* MOBILE CTA */}

            <Link
              href={CONTACT_HREF}
              onClick={closeMobileMenu}
              className="
                mt-8
                flex
                h-[52px]
                w-full
                items-center
                justify-center
                rounded-full
                bg-brand
                px-6
                text-[14px]
                font-semibold
                text-white
                sm:w-fit
              "
            >
              Get a quote

              <span
                aria-hidden="true"
                className="ml-2.5"
              >
                →
              </span>
            </Link>
          </nav>

          {/* MOBILE BOTTOM */}

          <div className="page-pad page-shell mt-auto pb-8">
            <div className="border-t border-black/[0.08] pt-5">
              <p className="text-[13px] leading-[1.6] text-ink-soft">
                EV charging, solar and power solutions
                across Pakistan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   DESKTOP DROPDOWN
========================================================= */

function DesktopDropdown({
  label,
  open,
}: {
  label: string;
  open: boolean;
}) {
  const links = getDropdownLinks(label);

  if (!links.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute left-0 top-full pt-2 transition-all duration-200",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      )}
    >
      <div
        className="
          min-w-[250px]
          rounded-[18px]
          border
          border-black/[0.08]
          bg-white
          p-2
          shadow-[0_16px_45px_rgba(0,0,0,0.10)]
        "
      >
        {links.map((link) => (
          <Link
            key={`${link.label}-${link.href}`}
            href={link.href}
            className="
              flex
              items-center
              justify-between
              rounded-[12px]
              px-4
              py-3
              text-[14px]
              font-medium
              text-ink
              transition-colors
              hover:bg-[#F4F6F8]
              hover:text-brand
            "
          >
            {link.label}

            <span
              aria-hidden="true"
              className="text-[14px] text-ink-faint"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   DROPDOWN CONTENT

   Change these routes when the final page structure is set.
========================================================= */

function getDropdownLinks(label: string) {
  switch (label) {
    case "EV Charging":
      return [
        {
          label: "EV charging",
          href: "/ev-chargers",
        },
        {
          label: "Home charging",
          href: "/ev-chargers#how-it-works",
        },
        {
          label: "Find your charger",
          href: "/ev-chargers#compatibility",
        },
        {
          label: "EV products",
          href: "/ev-chargers#products",
        },
      ];

    case "Solar":
      return [
        {
          label: "Solar solutions",
          href: "/solar",
        },
        {
          label: "Residential solar",
          href: "/solar",
        },
        {
          label: "Commercial solar",
          href: "/solar",
        },
      ];

    case "Generators":
      return [
        {
          label: "Generators",
          href: "/generators",
        },
        {
          label: "Diesel generators",
          href: "/generators",
        },
        {
          label: "Generator support",
          href: "/generators",
        },
      ];

    case "Company":
      return [
        {
          label: "About Multiline",
          href: "/company",
        },
        {
          label: "Our projects",
          href: "/projects",
        },
        {
          label: "Contact",
          href: CONTACT_HREF,
        },
      ];

    default:
      return [];
  }
}