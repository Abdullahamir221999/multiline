import Image from "next/image";

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

/* All four steps show at once and the charger stays lit —
   the client didn't want steps popping in and out on scroll. */

export const EVInstallSteps = () => {
  return (
    <section id="how-it-works" className="bg-canvas">
      <div className="page-pad mx-auto grid max-w-[1340px] items-center gap-12 py-16 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:py-24 xl:gap-20">
        {/* LEFT — COPY + STEPS */}

        <div className="max-w-[600px]">
          <p className="text-[14px] font-semibold text-brand">
            Installation
          </p>

          <h2 className="mt-3 text-[36px] font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[42px] lg:text-[46px] xl:text-[52px]">
            How your charger
            <br className="hidden lg:block" /> gets installed.
          </h2>

          <p className="mt-5 max-w-[540px] text-[15px] leading-[1.65] text-ink-soft sm:text-[16px]">
            From your first enquiry to installation, everything
            is handled by Multiline&apos;s own engineering team.
          </p>

          <ol className="mt-10 max-w-[560px] space-y-8">
            {STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <li key={step.number}>
                  <div className="flex items-center gap-3">
                    <Icon
                      aria-hidden="true"
                      className="h-[19px] w-[19px] text-brand"
                      strokeWidth={1.9}
                    />

                    <span className="text-[13px] font-medium text-ink-soft">
                      Step {step.number}
                    </span>
                  </div>

                  <h3 className="mt-2 text-[22px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[24px]">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-[510px] text-[15px] leading-[1.65] text-ink-soft">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* RIGHT — CHARGER, LED ON */}

        <div className="relative mx-auto flex h-[420px] w-full max-w-[380px] items-center justify-center lg:h-[72vh] lg:max-h-[680px] lg:min-h-[560px] lg:max-w-[560px]">
          <div className="absolute h-[280px] w-[280px] rounded-full bg-brand/[0.08] blur-[70px] lg:h-[470px] lg:w-[470px] lg:blur-[80px]" />

          <div className="relative h-full w-full">
            <Image
              src="/images/ev-charging/charger-hero.png"
              alt="Multiline EV charger"
              fill
              sizes="(min-width: 1024px) 560px, 380px"
              className="object-contain"
            />

            <span
              aria-hidden="true"
              style={LED_POSITION}
              className="absolute h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/35 opacity-50 blur-[30px]"
            />

            <span
              aria-hidden="true"
              style={LED_POSITION}
              className="absolute h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_7px_rgba(242,202,48,0.8)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
