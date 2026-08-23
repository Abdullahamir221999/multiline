"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export type Option = {
  value: string;
  label: string;
};

export function SelectField({
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
      <label className="mb-2 block text-[13px] font-semibold text-ink">
        {label}
      </label>

      {/* `value` stays a string — passing undefined on reset would
          flip Radix to uncontrolled and keep the stale selection. */}
      <Select.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <Select.Trigger
          className="
            group
            flex
            h-[52px]
            w-full
            items-center
            justify-between
            bg-white
            px-4
            text-left
            text-[14px]
            text-ink
            shadow-[0_0_0_1px_rgba(0,0,0,0.10)]
            outline-none
            transition
            hover:shadow-[0_0_0_1px_rgba(0,0,0,0.18)]
            focus:shadow-[0_0_0_1px_rgba(18,72,151,0.45)]
            data-[disabled]:cursor-not-allowed
            data-[disabled]:bg-[#ECEFF3]
            data-[disabled]:text-black/35
            data-[disabled]:shadow-[0_0_0_1px_rgba(0,0,0,0.05)]
          "
        >
          <Select.Value placeholder={placeholder} />

          <Select.Icon asChild>
            <ChevronDown
              className="ml-4 h-[16px] w-[16px] shrink-0 text-black/45 transition-transform duration-200 group-data-[state=open]:rotate-180"
              strokeWidth={1.7}
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={6}
            align="start"
            className="
              z-[100]
              max-h-[320px]
              min-w-[var(--radix-select-trigger-width)]
              overflow-hidden
              bg-white
              py-1.5
              shadow-[0_12px_35px_rgba(0,0,0,0.14)]
              ring-1
              ring-black/[0.06]
              data-[state=closed]:animate-out
              data-[state=open]:animate-in
              data-[state=closed]:fade-out-0
              data-[state=open]:fade-in-0
              data-[state=closed]:zoom-out-95
              data-[state=open]:zoom-in-95
            "
          >
            <Select.ScrollUpButton className="flex h-6 items-center justify-center text-black/45">
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
                    h-[42px]
                    cursor-pointer
                    select-none
                    items-center
                    px-4
                    pr-10
                    text-[14px]
                    text-ink
                    outline-none
                    transition-colors
                    data-[highlighted]:bg-[#F2F4F7]
                    data-[state=checked]:font-semibold
                    data-[state=checked]:text-brand
                  "
                >
                  <Select.ItemText>{option.label}</Select.ItemText>

                  <Select.ItemIndicator className="absolute right-4 flex items-center">
                    <Check
                      className="h-[15px] w-[15px] text-brand"
                      strokeWidth={2}
                    />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex h-6 items-center justify-center text-black/45">
              <ChevronDown className="h-[14px] w-[14px]" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}