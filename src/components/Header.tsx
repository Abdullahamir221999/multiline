import Link from "next/link";

const navItems = [
  {
    label: "EV Charging",
    href: "/ev-chargers",
  },
  {
    label: "Solar",
    href: "#",
  },
  {
    label: "Generators",
    href: "#",
  },
  {
    label: "Projects",
    href: "#",
  },
  {
    label: "Company",
    href: "#",
  },
];

export default function Header() {
  return (
    <header className="relative z-50 bg-[#f2f0e9]">
      <div className="flex h-[78px] items-center border-b border-black/15 px-5 md:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-[210px] items-center text-[21px] font-semibold tracking-[-0.04em] text-[#124897]"
        >
          MULTILINE

          <span className="ml-1 inline-block h-[6px] w-[6px] bg-[#f2ca30]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-9 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-[14px] font-medium"
            >
              {item.label}

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#124897] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="ml-auto flex min-w-[210px] items-center justify-end gap-6">
          <Link
            href="#"
            className="hidden text-[13px] font-medium uppercase tracking-[0.08em] md:block"
          >
            Contact
          </Link>

          <button
            type="button"
            className="group flex items-center gap-4 border-l border-black/15 pl-6 text-[13px] font-medium uppercase tracking-[0.08em]"
          >
            Menu

            <span className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] border border-black/30">
              <span className="h-px w-3 bg-black" />
              <span className="h-px w-3 bg-black" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}