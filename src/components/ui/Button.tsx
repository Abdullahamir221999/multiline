import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/helpers/cn";

type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "inverse";
type ButtonSize = "md" | "lg" | "bar";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-brand bg-brand text-brand-foreground hover:brightness-110",
  accent:
    "border-accent bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary:
    "border-line-strong bg-transparent text-ink hover:border-brand hover:text-brand",
  ghost: "border-transparent bg-transparent text-ink hover:text-brand",
  inverse:
    "border-inverse-foreground/25 bg-transparent text-inverse-foreground hover:border-accent hover:text-accent",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-[11px]",
  lg: "h-14 px-6 text-[12px]",
  bar: "h-16 w-full justify-between px-6 text-[12px]",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof SharedProps> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof SharedProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = ({
  variant = "primary",
  size = "md",
  showArrow = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  const classes = cn(
    "group inline-flex items-center gap-3 border font-semibold uppercase tracking-[0.08em] transition-colors duration-300",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span
          aria-hidden
          className="text-[18px] transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {content}
    </button>
  );
};
