"use client";

import { cn } from "@/helpers/cn";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export const QuantityStepper = ({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantityStepperProps) => {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        "flex h-16 items-center justify-between border border-line-strong px-5",
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={decrease}
        disabled={value <= min}
        className="text-[20px] font-light text-ink disabled:opacity-30"
      >
        −
      </button>

      <span className="text-[12px] font-semibold tabular-nums" aria-live="polite">
        {String(value).padStart(2, "0")}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={increase}
        disabled={value >= max}
        className="text-[20px] font-light text-ink disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
};
