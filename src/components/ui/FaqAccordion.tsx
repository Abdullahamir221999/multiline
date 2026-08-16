"use client";

import { useId, useState } from "react";

import { cn } from "@/helpers/cn";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
};

export const FaqAccordion = ({
  items,
  defaultOpenIndex = 0,
  className,
}: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[15px] font-medium tracking-[-0.02em]">
                  {item.question}
                </span>
                <span aria-hidden className="text-[18px] text-brand">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pr-10 text-[14px] leading-[1.65] text-ink-soft"
            >
              {isOpen ? item.answer : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};
