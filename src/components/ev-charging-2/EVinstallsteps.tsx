// "use client";

// import Image from "next/image";
// import { useRef } from "react";
// import { motion, useInView, useReducedMotion } from "motion/react";
// import {
//   FileText,
//   Home,
//   PencilLine,
//   Wrench,
//   type LucideIcon,
// } from "lucide-react";

// /* =========================================================
//     SECTION 02 — HOW INSTALLATION WORKS

//     Four steps, revealed in sequence on scroll. Copy rewritten
//     from the Smappee reference for a first-party installer —
//     Multiline fits with its own engineers, so "we" not
//     "your installer".
// ========================================================= */

// type Step = {
//   icon: LucideIcon;
//   title: string;
//   body: string;
// };

// const STEPS: Step[] = [
//   {
//     icon: PencilLine,
//     title: "Enter your details",
//     body: "Fill in your contact info and EV charging needs. It only takes a minute.",
//   },
//   {
//     icon: Home,
//     title: "Site visit and quote",
//     body: "Our team contacts you for a quick site visit, or talks through your setup over the phone.",
//   },
//   {
//     icon: FileText,
//     title: "You get your quote and plan",
//     body: "A personalised offer with a proposed installation date. No pressure, just clarity.",
//   },
//   {
//     icon: Wrench,
//     title: "Day of install: we've got you",
//     body: "Our engineers handle everything, start to finish. No stress, no mess.",
//   },
// ];

// /* The LED sits at these coordinates on the charger photo.
//    Nudge once the final product shot lands. */
// const LED_POSITION = {
//   top: "31%",
//   left: "46%",
// };

// export const EVInstallSteps = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const chargerRef = useRef<HTMLDivElement>(null);

//   const reduceMotion = useReducedMotion();

//   const stepsInView = useInView(sectionRef, {
//     once: true,
//     margin: "-15% 0px -15% 0px",
//   });

//   const chargerInView = useInView(chargerRef, {
//     once: true,
//     margin: "-20% 0px",
//   });

//   return (
//     <section
//       ref={sectionRef}
//       id="how-it-works"
//       className="bg-canvas py-20 lg:py-28"
//     >
//       <div className="page-pad page-shell">
//         {/* =====================================================
//             HEADER + CHARGER
//         ===================================================== */}

//         <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
//           <div>
//             <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
//               Installation
//             </p>

//             <h2 className="mt-5 max-w-[620px] text-[38px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[46px] lg:text-[52px]">
//               How your charger
//               <br />
//               gets installed.
//             </h2>

//             <p className="mt-6 max-w-[480px] text-[16px] leading-[1.65] text-ink-soft">
//               From the first message to the day it&apos;s live on
//               your wall — handled by our own engineers, not a
//               third-party contractor.
//             </p>
//           </div>

//           {/* =====================================================
//               CHARGER — LED lights up when the section arrives
//           ===================================================== */}

//           <div
//             ref={chargerRef}
//             className="relative mx-auto aspect-[4/5] w-full max-w-[300px] lg:max-w-[340px]"
//           >
//             <Image
//               src="/images/ev-charging/charger-hero.png"
//               alt="Multiline AC home charger"
//               fill
//               sizes="(min-width: 1024px) 340px, 300px"
//               className="object-contain"
//             />

//             {/* LED GLOW */}
//             <motion.span
//               aria-hidden="true"
//               initial={{ opacity: 0 }}
//               animate={
//                 chargerInView && !reduceMotion
//                   ? { opacity: [0, 1, 0.55, 1] }
//                   : { opacity: chargerInView ? 1 : 0 }
//               }
//               transition={{
//                 duration: 1.6,
//                 times: [0, 0.35, 0.6, 1],
//                 ease: "easeOut",
//               }}
//               style={LED_POSITION}
//               className="absolute h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_4px_rgba(242,202,48,0.65)]"
//             />

//             {/* AMBIENT HALO — slower, wider, sits under the LED */}
//             <motion.span
//               aria-hidden="true"
//               initial={{ opacity: 0, scale: 0.7 }}
//               animate={
//                 chargerInView && !reduceMotion
//                   ? { opacity: 0.45, scale: 1 }
//                   : { opacity: 0, scale: 0.7 }
//               }
//               transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
//               style={LED_POSITION}
//               className="absolute h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-2xl"
//             />
//           </div>
//         </div>

//         {/* =====================================================
//             STEPS
//         ===================================================== */}

//         <div className="relative mt-16 lg:mt-20">
//           {/* Connector — the line the icons sit on */}
//           <div
//             aria-hidden="true"
//             className="absolute left-0 right-0 top-[26px] hidden h-px bg-line lg:block"
//           />

//           <ol className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
//             {STEPS.map((step, index) => (
//               <StepItem
//                 key={step.title}
//                 step={step}
//                 index={index}
//                 inView={stepsInView}
//                 reduceMotion={Boolean(reduceMotion)}
//               />
//             ))}
//           </ol>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* =========================================================
//     STEP ITEM
// ========================================================= */

// function StepItem({
//   step,
//   index,
//   inView,
//   reduceMotion,
// }: {
//   step: Step;
//   index: number;
//   inView: boolean;
//   reduceMotion: boolean;
// }) {
//   const Icon = step.icon;

//   return (
//     <motion.li
//       initial={reduceMotion ? false : { opacity: 0, y: 24 }}
//       animate={
//         inView || reduceMotion
//           ? { opacity: 1, y: 0 }
//           : { opacity: 0, y: 24 }
//       }
//       transition={{
//         duration: 0.6,
//         delay: reduceMotion ? 0 : index * 0.14,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="relative"
//     >
//       {/* ICON + NUMBER */}

//       <div className="inline-flex items-center gap-3 rounded-2xl border border-line bg-canvas-deep/60 py-2.5 pl-3 pr-4">
//         <span className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-white">
//           <Icon
//             className="h-[15px] w-[15px] text-ink"
//             strokeWidth={1.9}
//           />
//         </span>

//         <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
//           Step {index + 1}
//         </span>
//       </div>

//       <h3 className="mt-5 text-[21px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
//         {step.title}
//       </h3>

//       <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">
//         {step.body}
//       </p>
//     </motion.li>
//   );
// }
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
          <div className="page-pad page-shell grid h-full grid-cols-[0.9fr_1.1fr] items-center gap-16 xl:gap-24">

            {/* =================================================
                LEFT — COPY
            ================================================= */}

            <div className="max-w-[560px]">
              <p className="text-[14px] font-semibold text-brand">
                Installation
              </p>

              <h2 className="mt-3 text-[46px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink xl:text-[52px]">
                How your charger
                <br />
                gets installed.
              </h2>

              <p className="mt-5 max-w-[470px] text-[16px] leading-[1.65] text-ink-soft">
                From your first enquiry to installation,
                everything is handled by Multiline&apos;s own
                engineering team.
              </p>

              {/* ACTIVE STEP */}

              <div className="mt-16 min-h-[245px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.number}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 26,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            y: -18,
                          }
                    }
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <activeStep.icon className="h-[21px] w-[21px] text-brand" />

                      <span className="text-[14px] font-medium text-ink-soft">
                        Step {activeStep.number}
                      </span>
                    </div>

                    <h3 className="mt-5 max-w-[470px] text-[30px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
                      {activeStep.title}
                    </h3>

                    <p className="mt-4 max-w-[460px] text-[16px] leading-[1.65] text-ink-soft">
                      {activeStep.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* SMALL PROGRESS INDICATOR */}

              <div className="mt-3 flex items-center gap-2">
                {STEPS.map((step, index) => (
                  <span
                    key={step.number}
                    className={`h-[6px] rounded-full transition-all duration-500 ${
                      activeIndex === index
                        ? "w-8 bg-brand"
                        : "w-[6px] bg-ink/15"
                    }`}
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