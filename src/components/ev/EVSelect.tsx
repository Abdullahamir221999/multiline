"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export type Option = {
  value: string;
  label: string;
};

/* =========================================================
    SELECT — EV page

    Same Radix behaviour as the old SelectField, restyled for
    the rounded, borderless-ish language of this page.
========================================================= */

export function EVSelect({
  label,
  value,
  placeholder,
  options,
  disabled = false,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: Option[];
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2.5 block text-[13px] font-semibold text-ink">
        {label}
      </label>

      {/* value stays a string — undefined flips Radix to
          uncontrolled and strands the previous selection */}
      <Select.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <Select.Trigger
          className="
            group
            flex
            h-[58px]
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-line
            bg-white
            px-5
            text-left
            text-[15px]
            text-ink
            outline-none
            transition
            hover:border-line-strong
            focus:border-brand
            focus:ring-2
            focus:ring-brand/15
            data-[disabled]:cursor-not-allowed
            data-[disabled]:border-line
            data-[disabled]:bg-canvas-deep/50
            data-[disabled]:text-ink-faint
            data-[placeholder]:text-ink-faint
          "
        >
          <Select.Value placeholder={placeholder} />

          <Select.Icon asChild>
            <ChevronDown
              className="ml-4 h-[17px] w-[17px] shrink-0 text-ink-faint transition-transform duration-200 group-data-[state=open]:rotate-180"
              strokeWidth={1.8}
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={8}
            align="start"
            className="
              z-[100]
              max-h-[300px]
              min-w-[var(--radix-select-trigger-width)]
              overflow-hidden
              rounded-2xl
              border
              border-line
              bg-white
              p-1.5
              shadow-[0_18px_50px_rgba(0,0,0,0.12)]
              data-[state=closed]:animate-out
              data-[state=open]:animate-in
              data-[state=closed]:fade-out-0
              data-[state=open]:fade-in-0
              data-[state=closed]:zoom-out-95
              data-[state=open]:zoom-in-95
            "
          >
            <Select.ScrollUpButton className="flex h-6 items-center justify-center text-ink-faint">
              <ChevronDown className="h-[14px] w-[14px] rotate-180" />
            </Select.ScrollUpButton>

            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="
                    relative
                    flex
                    h-[46px]
                    cursor-pointer
                    select-none
                    items-center
                    rounded-xl
                    px-4
                    pr-10
                    text-[15px]
                    text-ink
                    outline-none
                    transition-colors
                    data-[highlighted]:bg-canvas
                    data-[state=checked]:font-semibold
                    data-[state=checked]:text-brand
                  "
                >
                  <Select.ItemText>{option.label}</Select.ItemText>

                  <Select.ItemIndicator className="absolute right-4 flex items-center">
                    <Check
                      className="h-[16px] w-[16px] text-brand"
                      strokeWidth={2.2}
                    />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex h-6 items-center justify-center text-ink-faint">
              <ChevronDown className="h-[14px] w-[14px]" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}