"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Phone, X } from "lucide-react";

/* =========================================================
    PRODUCT ENQUIRY MODAL

    Same pipeline as the EV page form — POSTs to
    /api/ev-enquiry, which writes to leads + Website Leads
    and returns an ML-EV-#### reference.

    Shorter than the full form: someone already on a product
    page has told us what they want by being here, so the
    product name is passed through rather than asked for.
========================================================= */

const UAN = "111-966-966";

export function ProductQuoteModal({
  open,
  onClose,
  productName,
}: {
  open: boolean;
  onClose: () => void;
  productName: string;
}) {
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    message: "",
    company: "",
  });

  const dialogRef = useRef<HTMLDivElement>(null);

  /* Close on Escape, and lock the page behind the modal. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

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

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (values.company) return; // bot
    if (!validate()) return;
    if (sending) return;

    setSending(true);
    setSendError("");

    try {
      const response = await fetch("/api/ev-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "quote",
          ...values,
          interest: productName,
          product: productName,
        }),
      });

      const result = await response
        .json()
        .catch(() => ({ ok: false }));

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Failed");
      }

      setReference(result.reference ?? "");
    } catch {
      setSendError(
        "Something went wrong sending that. Try again, or call us on " +
          UAN +
          "."
      );
    } finally {
      setSending(false);
    }
  };

  const close = () => {
    onClose();

    /* Reset after the exit animation, so the form doesn't
       visibly empty itself on the way out. */
    setTimeout(() => {
      setReference("");
      setSendError("");
      setErrors({});
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        message: "",
        company: "",
      });
    }, 250);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          {/* SCRIM */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="absolute inset-0 bg-black/45"
          />

          {/* PANEL */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Enquire about the ${productName}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-[28px] bg-white p-7 sm:max-w-[560px] sm:rounded-[28px] sm:p-9"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-[38px] w-[38px] items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-canvas hover:text-ink"
            >
              <X className="h-[19px] w-[19px]" strokeWidth={1.8} />
            </button>

            {reference ? (
              /* ===== CONFIRMATION ===== */
              <div className="py-6 text-center">
                <span className="mx-auto flex h-[56px] w-[56px] items-center justify-center rounded-full bg-brand-tint">
                  <Check
                    className="h-[26px] w-[26px] text-brand"
                    strokeWidth={2.4}
                  />
                </span>

                <h2 className="mt-7 text-[25px] font-semibold leading-[1.15] tracking-[-0.03em] text-ink">
                  Our representative will call you shortly.
                </h2>

                <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">
                  We&apos;ve got your enquiry about the {productName}.
                  If you&apos;d rather not wait, call us.
                </p>

                <a
                  href={`tel:${UAN.replace(/\D/g, "")}`}
                  className="mt-6 inline-flex h-[50px] items-center justify-center rounded-full bg-brand px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  <Phone className="mr-2.5 h-[16px] w-[16px]" />
                  {UAN}
                </a>

                <p className="mt-6 text-[14px] text-ink-soft">
                  Reference:{" "}
                  <span className="font-semibold text-ink">
                    {reference}
                  </span>
                </p>
              </div>
            ) : (
              /* ===== FORM ===== */
              <>
                <h2 className="max-w-[380px] text-[25px] font-semibold leading-[1.15] tracking-[-0.03em] text-ink">
                  Get a quote for the {productName}
                </h2>

                <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">
                  Final pricing is confirmed after a site
                  inspection — we&apos;ll arrange that when we call.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-7">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ModalField
                      label="First name"
                      error={errors.firstName}
                      required
                    >
                      <input
                        type="text"
                        value={values.firstName}
                        onChange={(e) =>
                          set("firstName")(e.target.value)
                        }
                        className={fieldClass(errors.firstName)}
                      />
                    </ModalField>

                    <ModalField
                      label="Last name"
                      error={errors.lastName}
                      required
                    >
                      <input
                        type="text"
                        value={values.lastName}
                        onChange={(e) =>
                          set("lastName")(e.target.value)
                        }
                        className={fieldClass(errors.lastName)}
                      />
                    </ModalField>

                    <ModalField
                      label="Email"
                      error={errors.email}
                      required
                    >
                      <input
                        type="email"
                        inputMode="email"
                        value={values.email}
                        onChange={(e) => set("email")(e.target.value)}
                        className={fieldClass(errors.email)}
                      />
                    </ModalField>

                    <ModalField
                      label="Phone number"
                      error={errors.phone}
                      required
                    >
                      <input
                        type="tel"
                        inputMode="tel"
                        placeholder="+92"
                        value={values.phone}
                        onChange={(e) => set("phone")(e.target.value)}
                        className={fieldClass(errors.phone)}
                      />
                    </ModalField>

                    <div className="sm:col-span-2">
                      <ModalField
                        label="City"
                        error={errors.city}
                        required
                      >
                        <input
                          type="text"
                          placeholder="e.g. Lahore"
                          value={values.city}
                          onChange={(e) => set("city")(e.target.value)}
                          className={fieldClass(errors.city)}
                        />
                      </ModalField>
                    </div>

                    <div className="sm:col-span-2">
                      <ModalField label="Anything we should know?">
                        <textarea
                          rows={3}
                          value={values.message}
                          onChange={(e) =>
                            set("message")(e.target.value)
                          }
                          placeholder="Your vehicle, where the charger would go, your supply."
                          className={`${fieldClass()} h-auto resize-y py-3.5`}
                        />
                      </ModalField>
                    </div>
                  </div>

                  {/* HONEYPOT — named off anything autofill
                      recognises, or Chrome fills it and the form
                      silently refuses to submit. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
                  >
                    <label>
                      Leave this blank
                      <input
                        type="text"
                        name="confirm-url"
                        tabIndex={-1}
                        autoComplete="new-password"
                        value={values.company}
                        onChange={(e) =>
                          set("company")(e.target.value)
                        }
                      />
                    </label>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex h-[52px] shrink-0 items-center justify-center rounded-full bg-brand px-7 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-brand/40"
                    >
                      {sending ? "Sending…" : "Send enquiry"}
                    </button>

                    <a
                      href={`tel:${UAN.replace(/\D/g, "")}`}
                      className="inline-flex h-[52px] items-center justify-center rounded-full border border-line px-6 text-[14px] font-semibold text-ink transition-colors hover:bg-canvas"
                    >
                      <Phone className="mr-2 h-[15px] w-[15px]" />
                      Call {UAN}
                    </a>
                  </div>

                  {sendError && (
                    <p
                      role="alert"
                      className="mt-4 text-[13px] leading-[1.5] text-[#C0392B]"
                    >
                      {sendError}
                    </p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
    FIELD
========================================================= */

function ModalField({
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
      <span className="mb-2 block text-[13px] font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </span>

      {children}

      {error && (
        <span className="mt-1.5 block text-[12px] font-medium text-[#C0392B]">
          {error}
        </span>
      )}
    </label>
  );
}

const fieldBase = `
  h-[52px]
  w-full
  rounded-2xl
  border
  bg-white
  px-4
  text-[15px]
  text-ink
  outline-none
  transition
  placeholder:text-ink-faint
  focus:border-brand
  focus:ring-2
  focus:ring-brand/15
`;

const fieldClass = (error?: string) =>
  `${fieldBase} ${
    error ? "border-[#C0392B]" : "border-line hover:border-line-strong"
  }`;