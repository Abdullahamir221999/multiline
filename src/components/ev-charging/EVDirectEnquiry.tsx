"use client";

import { useState } from "react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { createWhatsAppLink } from "@/lib/contact";

type Mode = "enquiry" | "support";

const NEED_OPTIONS = [
  "Home charging",
  "Business or fleet site",
  "Not sure yet",
];

const ISSUE_OPTIONS = [
  "Charger not working",
  "Installation problem",
  "Billing or invoice",
  "Warranty or replacement",
  "Something else",
];

// TODO: confirm all four with Multiline before launch.
const CONTACT = {
  phone: "+92 300 0000000",
  phoneHref: "tel:+923000000000",
  hours: "Monday – Saturday, 9:00 AM – 6:00 PM",
  office: "Lahore",
};

export const EVDirectEnquiry = () => {
  const [mode, setMode] = useState<Mode>("enquiry");

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [need, setNeed] = useState("");
  const [issue, setIssue] = useState("");
  const [reference, setReference] = useState("");
  const [details, setDetails] = useState("");

  const isSupport = mode === "support";

  const line = (label: string, value: string) =>
    value.trim() ? `${label}: ${value.trim()}` : null;

  const filled = (
    isSupport
      ? [
          line("Name", name),
          line("City", city),
          line("Issue", issue),
          line("Invoice / installation ref", reference),
          line("Details", details),
        ]
      : [
          line("Name", name),
          line("City", city),
          line("Looking for", need),
          line("Details", details),
        ]
  ).filter(Boolean);

  // Nothing filled in — send a plain opener rather than a list of blanks.
  const message = filled.length
    ? [isSupport ? "SUPPORT REQUEST" : "NEW ENQUIRY", ...filled].join("\n")
    : isSupport
      ? "Hi Multiline, I have a problem with an EV charger you supplied."
      : "Hi Multiline, I'd like to ask about EV charging.";

  return (
    <section className="border-b border-line bg-white">
      <div className="page-shell">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid border-b border-line lg:grid-cols-[1.15fr_0.85fr]">
          <div className="px-5 py-8 md:px-8 lg:px-10 lg:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-brand">
              Talk To Us
            </p>

            <h2 className="mt-3 max-w-[620px] text-[36px] font-semibold leading-[1] tracking-[-0.04em] text-ink sm:text-[42px] lg:text-[48px]">
              Speak to the
              <br />
              EV team directly.
            </h2>
          </div>

          <div className="flex items-end px-5 pb-8 md:px-8 lg:border-l lg:px-10 lg:pb-10">
            <p className="max-w-[470px] text-[14px] leading-[1.65] text-ink-soft">
              New to EV charging, or already a Multiline customer with
              a problem — send us the details and the right person will
              pick it up.
            </p>
          </div>
        </div>

        {/* =====================================================
            BODY — form left, direct contact right
        ===================================================== */}

        <div className="grid lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            {/* MODE SWITCH */}

            <div className="grid border-b border-line sm:grid-cols-2">
              <ModeTab
                active={!isSupport}
                label="New enquiry"
                hint="Choosing or quoting a charger"
                onClick={() => setMode("enquiry")}
              />

              <ModeTab
                active={isSupport}
                label="Existing customer support"
                hint="A problem with a charger we supplied"
                onClick={() => setMode("support")}
                className="border-t border-line sm:border-l sm:border-t-0"
              />
            </div>

            {/* FORM */}

            <div className="px-5 py-8 md:px-8 lg:px-10 lg:py-10">
              <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                <TextField
                  label="Your name"
                  value={name}
                  onChange={setName}
                  placeholder="e.g. Abdul Rehman"
                />

                <TextField
                  label="City"
                  value={city}
                  onChange={setCity}
                  placeholder="e.g. Lahore"
                />

                {isSupport ? (
                  <>
                    <NativeSelect
                      label="What's the problem?"
                      value={issue}
                      options={ISSUE_OPTIONS}
                      placeholder="Select one"
                      onChange={setIssue}
                    />

                    <TextField
                      label="Invoice or installation reference"
                      value={reference}
                      onChange={setReference}
                      placeholder="Optional, but speeds things up"
                    />
                  </>
                ) : (
                  <NativeSelect
                    label="What are you looking for?"
                    value={need}
                    options={NEED_OPTIONS}
                    placeholder="Select one"
                    onChange={setNeed}
                  />
                )}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[13px] font-semibold text-ink">
                    {isSupport
                      ? "Describe the issue"
                      : "Anything else we should know?"}
                  </label>

                  <textarea
                    rows={3}
                    value={details}
                    onChange={(event) => setDetails(event.target.value)}
                    placeholder={
                      isSupport
                        ? "When it started, what the charger is doing, any error shown on the unit."
                        : "Your vehicle, the supply at your site, or anything you're unsure about."
                    }
                    className="
                      w-full
                      resize-y
                      bg-white
                      px-4
                      py-3
                      text-[14px]
                      leading-[1.55]
                      text-ink
                      shadow-[0_0_0_1px_rgba(0,0,0,0.10)]
                      outline-none
                      transition
                      placeholder:text-black/35
                      hover:shadow-[0_0_0_1px_rgba(0,0,0,0.18)]
                      focus:shadow-[0_0_0_1px_rgba(18,72,151,0.45)]
                    "
                  />
                </div>
              </div>

              {/* ACTION */}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={createWhatsAppLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    h-[50px]
                    w-full
                    shrink-0
                    items-center
                    justify-center
                    bg-brand
                    px-6
                    text-[13px]
                    font-semibold
                    text-white
                    transition-colors
                    hover:bg-[#0f3d7d]
                    sm:w-[268px]
                  "
                >
                  <WhatsAppIcon className="mr-2.5 h-[17px] w-[17px] text-[#25D366]" />

                  {isSupport
                    ? "Send to support on WhatsApp"
                    : "Send enquiry on WhatsApp"}
                </a>

                <p className="text-[12px] leading-[1.5] text-ink-faint">
                  {filled.length
                    ? "Opens WhatsApp with your details filled in — you can edit before sending."
                    : "Opens WhatsApp. Fill anything in above and we'll include it."}
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              DIRECT CONTACT
          ===================================================== */}

          <aside className="border-t border-line bg-[#F7F8FA] px-5 py-8 md:px-8 lg:border-l lg:border-t-0 lg:px-8 lg:py-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-brand">
              Rather not type?
            </p>

            <h3 className="mt-2 text-[20px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
              Call the EV desk
            </h3>

            <a
              href={CONTACT.phoneHref}
              className="mt-3 block text-[19px] font-semibold tracking-[-0.02em] text-brand"
            >
              {CONTACT.phone}
            </a>

            <dl className="mt-6 space-y-4 border-t border-line pt-5">
              <ContactRow label="Hours" value={CONTACT.hours} />
              <ContactRow label="Office" value={CONTACT.office} />
            </dl>

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-faint">
                Have this ready
              </p>

              <ul className="mt-3 space-y-2 text-[13px] leading-[1.5] text-ink-soft">
                {(isSupport
                  ? [
                      "Your invoice or installation reference",
                      "What the charger is doing now",
                      "Roughly when it was installed",
                    ]
                  : [
                      "Your vehicle make and model",
                      "Whether your site is single or three-phase",
                      "Where the charger will be mounted",
                    ]
                ).map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-accent">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
    MODE TAB
========================================================= */

function ModeTab({
  active,
  label,
  hint,
  onClick,
  className = "",
}: {
  active: boolean;
  label: string;
  hint: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        px-5
        py-5
        text-left
        transition-colors
        md:px-8
        lg:px-10
        ${active ? "bg-[#EEF4FF]" : "bg-white hover:bg-black/[0.02]"}
        ${className}
      `}
    >
      <span
        className={`block text-[15px] font-semibold tracking-[-0.02em] ${
          active ? "text-brand" : "text-ink"
        }`}
      >
        {label}
      </span>

      <span className="mt-1 block text-[13px] leading-[1.5] text-ink-soft">
        {hint}
      </span>
    </button>
  );
}

/* =========================================================
    TEXT FIELD
========================================================= */

function TextField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-[13px] font-semibold text-ink">
        {label}
      </label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="
          h-[52px]
          w-full
          bg-white
          px-4
          text-[14px]
          text-ink
          shadow-[0_0_0_1px_rgba(0,0,0,0.10)]
          outline-none
          transition
          placeholder:text-black/35
          hover:shadow-[0_0_0_1px_rgba(0,0,0,0.18)]
          focus:shadow-[0_0_0_1px_rgba(18,72,151,0.45)]
        "
      />
    </div>
  );
}

/* =========================================================
    NATIVE SELECT

    Deliberately native, not Radix: this form has no dependent
    fields, and the OS picker is faster on mobile.
========================================================= */

function NativeSelect({
  label,
  value,
  options,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-[13px] font-semibold text-ink">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="
          h-[52px]
          w-full
          appearance-none
          bg-white
          bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22rgba(0,0,0,0.45)%22 stroke-width=%221.7%22><path d=%22M6 9l6 6 6-6%22/></svg>')]
          bg-[length:18px_18px]
          bg-[right_1rem_center]
          bg-no-repeat
          px-4
          pr-12
          text-[14px]
          text-ink
          shadow-[0_0_0_1px_rgba(0,0,0,0.10)]
          outline-none
          transition
          hover:shadow-[0_0_0_1px_rgba(0,0,0,0.18)]
          focus:shadow-[0_0_0_1px_rgba(18,72,151,0.45)]
        "
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
    CONTACT ROW
========================================================= */

function ContactRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-faint">
        {label}
      </dt>

      <dd className="mt-1 text-[13px] leading-[1.5] text-ink">
        {value}
      </dd>
    </div>
  );
}