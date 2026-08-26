"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

/* =========================================================
    SECTION 07 — QUOTE

    Two exports:
      <EVQuoteBanner />  — the CTA band, place it anywhere
      <EVQuoteForm />    — the form it scrolls to

    NO BACKEND YET. handleSubmit is stubbed for the demo: it
    validates, logs, and shows the success state. Wire it to
    an API route before this goes live — see the TODO below.
========================================================= */

/* =========================================================
    BANNER
========================================================= */

export const EVQuoteBanner = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section ref={ref} className="bg-canvas py-20 lg:py-24">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={
          inView || reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 22 }
        }
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="page-pad page-shell text-center"
      >
        <h2 className="mx-auto max-w-[760px] text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[42px] lg:text-[48px]">
          Not sure which charger is right for you?
          <br className="hidden sm:block" /> Let us help you
          choose.
        </h2>

        <p className="mx-auto mt-5 max-w-[440px] text-[16px] leading-[1.6] text-ink-soft">
          Fill in your details and we&apos;ll take care of the rest.
        </p>

        <Link
          href="#quote"
          className="mt-9 inline-flex h-[54px] items-center justify-center rounded-full bg-ink px-8 text-[14px] font-semibold text-white transition-colors hover:bg-ink/85"
        >
          Get your quote
          <span aria-hidden="true" className="ml-2.5">
            ›
          </span>
        </Link>
      </motion.div>
    </section>
  );
};

/* =========================================================
    FORM
========================================================= */

type Mode = "quote" | "support";

const INTEREST_OPTIONS = [
  "Home charging",
  "Business or workplace",
  "Fleet or commercial site",
  "Not sure yet",
];

const ISSUE_OPTIONS = [
  "Charger not working",
  "Installation problem",
  "Billing or invoice",
  "Warranty or replacement",
  "Something else",
];

export const EVQuoteForm = () => {
  const [mode, setMode] = useState<Mode>("quote");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    interest: "",
    issue: "",
    reference: "",
    message: "",
    company: "", // honeypot — real people never fill this
  });

  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  const isSupport = mode === "support";

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};

    if (!values.firstName.trim()) next.firstName = "Required";
    if (!values.lastName.trim()) next.lastName = "Required";
    if (!values.city.trim()) next.city = "Required";

    if (!values.email.trim()) {
      next.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address";
    }

    if (!values.phone.trim()) {
      next.phone = "Required";
    } else if (values.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Enter a full phone number";
    }

    if (isSupport && !values.issue) next.issue = "Select one";
    if (!isSupport && !values.interest) next.interest = "Select one";

    if (!values.message.trim()) next.message = "Required";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (values.company) return; // bot
    if (!validate()) return;

    /* TODO — BACKEND
       Replace with:
         await fetch("/api/ev-enquiry", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ mode, ...values }),
         });
       The API route should send to Multiline's inbox (Resend or
       similar) and rate-limit by IP. Support requests need a
       separate destination from sales enquiries. */
    console.log("EV enquiry (demo — not sent):", { mode, ...values });

    setSubmitted(true);
  };

  /* =====================================================
      SUCCESS
  ===================================================== */

  if (submitted) {
    return (
      <section
        id="quote"
        className="scroll-mt-24 bg-canvas py-20 lg:py-28"
      >
        <div className="page-pad page-shell">
          <div className="mx-auto max-w-[520px] rounded-3xl bg-white px-8 py-14 text-center sm:px-12">
            <span className="mx-auto flex h-[56px] w-[56px] items-center justify-center rounded-full bg-brand-tint">
              <Check className="h-[26px] w-[26px] text-brand" strokeWidth={2.4} />
            </span>

            <h2 className="mt-7 text-[27px] font-semibold leading-[1.15] tracking-[-0.03em] text-ink">
              Thanks — we&apos;ve got your details.
            </h2>

            <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">
              {isSupport
                ? "Our support team will be in touch shortly to get this resolved."
                : "One of our engineers will contact you to arrange a site visit and quote."}
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setValues({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  city: "",
                  interest: "",
                  issue: "",
                  reference: "",
                  message: "",
                  company: "",
                });
              }}
              className="mt-8 text-[14px] font-semibold text-brand underline underline-offset-4"
            >
              Send another
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
      FORM
  ===================================================== */

  return (
    <section
      ref={ref}
      id="quote"
      className="scroll-mt-24 bg-canvas pb-24 lg:pb-32"
    >
      <div className="page-pad page-shell">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={
            inView || reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        >
          {/* ===== LEFT ===== */}

          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="max-w-[420px] text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[40px]">
              {isSupport
                ? "Something not working?"
                : "A charger for your home?"}
            </h2>

            <p className="mt-4 max-w-[380px] text-[16px] leading-[1.6] text-ink-soft">
              {isSupport
                ? "Tell us what's happening and we'll get someone on it."
                : "Fill in your details and get your quote."}
            </p>
          </div>

          {/* ===== RIGHT ===== */}

          <form onSubmit={handleSubmit} noValidate>
            {/* MODE */}

            <Field label="How can we help?">
              <select
                value={mode}
                onChange={(event) =>
                  setMode(event.target.value as Mode)
                }
                className={selectClass}
              >
                <option value="quote">
                  I want a charger installed
                </option>
                <option value="support">
                  I&apos;m an existing customer with an issue
                </option>
              </select>
            </Field>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="First name" error={errors.firstName} required>
                <input
                  type="text"
                  value={values.firstName}
                  onChange={(e) => set("firstName")(e.target.value)}
                  className={inputClass(errors.firstName)}
                />
              </Field>

              <Field label="Last name" error={errors.lastName} required>
                <input
                  type="text"
                  value={values.lastName}
                  onChange={(e) => set("lastName")(e.target.value)}
                  className={inputClass(errors.lastName)}
                />
              </Field>

              <Field label="Email" error={errors.email} required>
                <input
                  type="email"
                  inputMode="email"
                  value={values.email}
                  onChange={(e) => set("email")(e.target.value)}
                  className={inputClass(errors.email)}
                />
              </Field>

              <Field label="Phone number" error={errors.phone} required>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="+92"
                  value={values.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                  className={inputClass(errors.phone)}
                />
              </Field>

              <Field label="City" error={errors.city} required>
                <input
                  type="text"
                  placeholder="e.g. Lahore"
                  value={values.city}
                  onChange={(e) => set("city")(e.target.value)}
                  className={inputClass(errors.city)}
                />
              </Field>

              {isSupport ? (
                <Field
                  label="What's the problem?"
                  error={errors.issue}
                  required
                >
                  <select
                    value={values.issue}
                    onChange={(e) => set("issue")(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select one</option>
                    {ISSUE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              ) : (
                <Field
                  label="I'm interested in"
                  error={errors.interest}
                  required
                >
                  <select
                    value={values.interest}
                    onChange={(e) => set("interest")(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select one</option>
                    {INTEREST_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {isSupport && (
                <div className="sm:col-span-2">
                  <Field label="Invoice or installation reference">
                    <input
                      type="text"
                      placeholder="Optional — speeds things up"
                      value={values.reference}
                      onChange={(e) => set("reference")(e.target.value)}
                      className={inputClass()}
                    />
                  </Field>
                </div>
              )}

              <div className="sm:col-span-2">
                <Field
                  label="Message"
                  error={errors.message}
                  required
                >
                  <textarea
                    rows={4}
                    value={values.message}
                    onChange={(e) => set("message")(e.target.value)}
                    placeholder={
                      isSupport
                        ? "When it started, what the charger is doing, any error shown on the unit."
                        : "Your vehicle, where the charger would go, or anything you're unsure about."
                    }
                    className={`${inputClass(errors.message)} h-auto resize-y py-4`}
                  />
                </Field>
              </div>
            </div>

            {/* HONEYPOT — hidden from people, catches most bots
                without loading reCAPTCHA */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
            >
              <label>
                Company
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={(e) => set("company")(e.target.value)}
                />
              </label>
            </div>

            <p className="mt-8 max-w-[560px] text-[13px] leading-[1.6] text-ink-faint">
              By sending this, you agree that Multiline may contact
              you about your enquiry. Read how we handle your details
              in our{" "}
              <Link
                href="/privacy"
                className="text-ink-soft underline underline-offset-4"
              >
                privacy policy
              </Link>
              .
            </p>

            <button
              type="submit"
              className="mt-7 inline-flex h-[54px] items-center justify-center rounded-full bg-ink px-8 text-[14px] font-semibold text-white transition-colors hover:bg-ink/85"
            >
              {isSupport ? "Send to support" : "Get my quote"}
              <span aria-hidden="true" className="ml-2.5">
                ›
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================
    FIELD
========================================================= */

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2.5 block text-[13px] font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </span>

      {children}

      {error && (
        <span className="mt-2 block text-[12px] font-medium text-[#C0392B]">
          {error}
        </span>
      )}
    </label>
  );
}

/* =========================================================
    FIELD STYLES
========================================================= */

const base = `
  h-[58px]
  w-full
  rounded-2xl
  border
  bg-white
  px-5
  text-[15px]
  text-ink
  outline-none
  transition
  placeholder:text-ink-faint
  focus:border-brand
  focus:ring-2
  focus:ring-brand/15
`;

const inputClass = (error?: string) =>
  `${base} ${error ? "border-[#C0392B]" : "border-line hover:border-line-strong"}`;

const selectClass = `${base} border-line appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22rgba(17,17,17,0.4)%22 stroke-width=%221.8%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px_18px] bg-[right_1.25rem_center] bg-no-repeat pr-12 hover:border-line-strong`;