"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import {
  FileText,
  Home,
  PencilLine,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/* =========================================================
   SECTION 02 — INSTALLATION PROCESS
========================================================= */

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    number: "1",
    icon: PencilLine,
    title: "Enter your details",
    body: "Tell us about your vehicle, location and charging requirements. It only takes a minute.",
  },
  {
    number: "2",
    icon: Home,
    title: "Site visit and quote",
    body: "Our team will arrange a quick site visit or discuss your electrical setup with you over the phone.",
  },
  {
    number: "3",
    icon: FileText,
    title: "You get your quote and plan",
    body: "You'll receive a clear recommendation, quotation and proposed installation date.",
  },
  {
    number: "4",
    icon: Wrench,
    title: "Installation day",
    body: "Our engineers take care of the installation from start to finish and get your charger ready to use.",
  },
];

/*
 * Adjust these two values after we have the final
 * transparent charger image.
 */
const LED_POSITION = {
  top: "30.5%",
  left: "50%",
};

export const EVInstallSteps = () => {
  const desktopRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end end"],
  });

  /*
   * Turn the scroll progress into one of our four
   * installation stages.
   */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      STEPS.length - 1,
      Math.floor(latest * STEPS.length)
    );

    setActiveIndex(index);
  });

  /*
   * Very subtle movement on the charger.
   * It should feel alive, not like a floating animation.
   */
  const chargerScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.97, 1.015]
  );

  const chargerY = useTransform(
    scrollYProgress,
    [0, 1],
    [10, -8]
  );

  const activeStep = STEPS[activeIndex];

  return (
    <section
      id="how-it-works"
      className="bg-canvas"
    >
      {/* =====================================================
          MOBILE / TABLET
          Normal scrolling — sticky interaction is desktop only.
      ===================================================== */}

      <div className="page-pad page-shell py-16 lg:hidden">
        <div>
          <p className="text-[14px] font-semibold text-brand">
            Installation
          </p>

          <h2 className="mt-3 max-w-[520px] text-[36px] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[42px]">
            How your charger gets installed.
          </h2>

          <p className="mt-4 max-w-[520px] text-[15px] leading-[1.65] text-ink-soft">
            From your first enquiry to installation, everything
            is handled by Multiline&apos;s own team.
          </p>
        </div>

        {/* MOBILE CHARGER */}

        <div className="relative mx-auto mt-10 flex h-[420px] max-w-[380px] items-center justify-center">
          <div className="absolute h-[280px] w-[280px] rounded-full bg-brand/[0.06] blur-[70px]" />

          <div className="relative h-full w-full">
            <Image
              src="/images/ev-charging/charger-hero.png"
              alt="Multiline EV charger"
              fill
              sizes="380px"
              className="object-contain"
            />

            <motion.span
              aria-hidden="true"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0.2,
                      scale: 0.8,
                    }
              }
              whileInView={{
                opacity: [0.25, 1, 0.65, 1],
                scale: [0.85, 1.2, 1],
              }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 1.7,
                ease: "easeOut",
              }}
              style={LED_POSITION}
              className="absolute h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_18px_6px_rgba(242,202,48,0.75)]"
            />
          </div>
        </div>

        {/* MOBILE STEPS */}

        <div className="mt-12 space-y-12">
          {STEPS.map((step) => (
            <MobileStep
              key={step.number}
              step={step}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>
      </div>

      {/* =====================================================
          DESKTOP SCROLL STORY

          4 stages.
          Section is deliberately several viewports tall,
          while the inner layout stays sticky.
      ===================================================== */}

      <div
        ref={desktopRef}
        className="relative hidden h-[410svh] lg:block"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div className="page-pad mx-auto grid h-full max-w-[1340px] grid-cols-[1fr_1fr] items-center gap-14 xl:gap-20">

            {/* =================================================
                LEFT — COPY
            ================================================= */}

            <div className="max-w-[600px]">
              <p className="text-[14px] font-semibold text-brand">
                Installation
              </p>

              <h2 className="mt-3 text-[46px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink xl:text-[52px]">
                How your charger
                <br />
                gets installed.
              </h2>

              <p className="mt-5 max-w-[540px] text-[16px] leading-[1.65] text-ink-soft">
                From your first enquiry to installation,
                everything is handled by Multiline&apos;s own
                engineering team.
              </p>

              {/* =================================================
    STACKED STEPS
================================================= */}

<div className="mt-10 max-w-[560px]">
  {STEPS.map((step, index) => (
    <DesktopStep
      key={step.number}
      step={step}
      index={index}
      activeIndex={activeIndex}
      desktopRef={desktopRef}
      reduceMotion={Boolean(reduceMotion)}
    />
  ))}
</div>
            </div>

            {/* =================================================
                RIGHT — CHARGER
            ================================================= */}

            <div className="relative flex h-[72vh] max-h-[680px] min-h-[560px] items-center justify-center">
              {/* very subtle ambient backdrop */}

              <motion.div
                animate={{
                  scale: 1 + activeIndex * 0.025,
                  opacity: 0.35 + activeIndex * 0.08,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute h-[470px] w-[470px] rounded-full bg-brand/[0.08] blur-[80px]"
              />

              {/* CHARGER */}

              <motion.div
                style={{
                  scale: reduceMotion ? 1 : chargerScale,
                  y: reduceMotion ? 0 : chargerY,
                }}
                className="relative h-full w-full max-w-[560px]"
              >
                <Image
                  src="/images/ev-charging/charger-hero.png"
                  alt="Multiline EV charger"
                  fill
                  priority={false}
                  sizes="560px"
                  className="object-contain"
                />

                {/* =================================================
                    MAIN LED
                ================================================= */}

                <motion.span
                  aria-hidden="true"
                  animate={{
                    opacity:
                      activeIndex === 0
                        ? 0.25
                        : activeIndex === 1
                          ? 0.45
                          : activeIndex === 2
                            ? 0.7
                            : 1,

                    scale:
                      activeIndex === 3
                        ? [1, 1.25, 1]
                        : 1,
                  }}
                  transition={
                    activeIndex === 3 && !reduceMotion
                      ? {
                          opacity: {
                            duration: 0.5,
                          },
                          scale: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                      : {
                          duration: 0.5,
                          ease: "easeOut",
                        }
                  }
                  style={LED_POSITION}
                  className="absolute h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_7px_rgba(242,202,48,0.8)]"
                />

                {/* =================================================
                    AMBIENT LED GLOW
                ================================================= */}

                <motion.span
                  aria-hidden="true"
                  animate={{
                    opacity:
                      activeIndex === 0
                        ? 0
                        : activeIndex === 1
                          ? 0.12
                          : activeIndex === 2
                            ? 0.25
                            : 0.5,

                    scale:
                      activeIndex === 3
                        ? 1.15
                        : 1,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  style={LED_POSITION}
                  className="absolute h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/35 blur-[30px]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
/* =========================================================
   DESKTOP STACKED STEP
========================================================= */

function DesktopStep({
  step,
  index,
  activeIndex,
  desktopRef,
  reduceMotion,
}: {
  step: Step;
  index: number;
  activeIndex: number;
  desktopRef: React.RefObject<HTMLDivElement | null>;
  reduceMotion: boolean;
}) {
  const Icon = step.icon;

  const isActive = index === activeIndex;
  const isPast = index < activeIndex;

  const opacity = isActive
    ? 1
    : isPast
      ? 0.42
      : 0.24;

  const handleClick = () => {
    const el = desktopRef.current;

    if (!el) return;

    const band = el.offsetHeight / STEPS.length;

    window.scrollTo({
      top: el.offsetTop + band * (index + 0.45),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      animate={{
        opacity,
        y: isActive ? 0 : 2,
        scale: isActive ? 1 : 0.985,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        block
        w-full
        origin-left
        py-3
        text-left
        outline-none
        first:pt-0
      "
    >
      {/* STEP LABEL */}

      <div className="flex items-center gap-3">
        <motion.div
          animate={{
            scale: isActive ? 1 : 0.92,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Icon
            className="h-[19px] w-[19px] text-brand"
            strokeWidth={1.9}
          />
        </motion.div>

        <span className="text-[13px] font-medium text-ink-soft">
          Step {step.number}
        </span>
      </div>

      {/* TITLE */}

      <motion.h3
        animate={{
          x: isActive ? 0 : 2,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          mt-2
          font-semibold
          leading-[1.15]
          tracking-[-0.025em]
          text-ink
          transition-[font-size]
          duration-500
          ${
            isActive
              ? "text-[27px]"
              : "text-[21px]"
          }
        `}
      >
        {step.title}
      </motion.h3>

      {/* ACTIVE DESCRIPTION */}

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    height: 0,
                    y: 8,
                  }
            }
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    height: 0,
                    y: -5,
                  }
            }
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <p className="max-w-[510px] pt-3 text-[15px] leading-[1.65] text-ink-soft">
              {step.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
/* =========================================================
   MOBILE STEP
========================================================= */

function MobileStep({
  step,
  reduceMotion,
}: {
  step: Step;
  reduceMotion: boolean;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.35,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-[520px]"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-[20px] w-[20px] text-brand" />

        <span className="text-[13px] font-medium text-ink-soft">
          Step {step.number}
        </span>
      </div>

      <h3 className="mt-4 text-[24px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
        {step.title}
      </h3>

      <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">
        {step.body}
      </p>
    </motion.div>
  );
}