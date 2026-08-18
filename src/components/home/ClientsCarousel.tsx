"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { SectionHeaderBar } from "@/components/home/CorporateIdentity";
import { wrapIndex } from "@/helpers/wrapIndex";
import { cn } from "@/helpers/cn";
import { HOME_CLIENT_SLIDES } from "@/lib/homeContent";

const AUTO_ADVANCE_MS = 5000;

export const ClientsCarousel = () => {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const slideCount = HOME_CLIENT_SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(wrapIndex(index, slideCount));
    },
    [slideCount]
  );

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (reduceMotion || isPaused || slideCount <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, slideCount));
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion, isPaused, slideCount]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  return (
    <section aria-labelledby="clients-heading" className="border-b border-line pb-16 lg:pb-20">
      <SectionHeaderBar title="Our Clients" id="clients-heading" />

      <div
        ref={containerRef}
        className="page-pad page-shell mt-14"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsPaused(false);
          }
        }}
      >
        <div className="relative mx-auto max-w-[1100px]">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous client logos"
            className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-4 -translate-y-1/2 items-center justify-center border border-line bg-surface-elevated text-[20px] text-brand transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground sm:flex"
          >
            ‹
          </button>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="overflow-hidden border border-line bg-surface-elevated"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {HOME_CLIENT_SLIDES.map((slide, index) => (
                <div
                  key={slide.src}
                  className="relative min-w-full flex-shrink-0"
                  aria-hidden={index !== activeIndex}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={1100}
                    height={400}
                    sizes="(max-width: 1100px) 100vw, 1100px"
                    className="h-auto w-full object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next client logos"
            className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-4 -translate-y-1/2 items-center justify-center border border-line bg-surface-elevated text-[20px] text-brand transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground sm:flex"
          >
            ›
          </button>

          <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous client logos"
              className="h-11 flex-1 border border-line bg-surface-elevated text-brand"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next client logos"
              className="h-11 flex-1 border border-line bg-surface-elevated text-brand"
            >
              Next
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Client logo slides">
            {HOME_CLIENT_SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  index === activeIndex ? "bg-brand" : "bg-line-strong hover:bg-brand/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
