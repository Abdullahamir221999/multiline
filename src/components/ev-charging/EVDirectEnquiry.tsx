import { createWhatsAppLink } from "@/lib/contact";

export const EVDirectEnquiry = () => {
  return (
    <section className="bg-white">
      <div className="page-pad page-shell py-12 lg:py-14">
        <div className="rounded-2xl bg-[#EEF4FF] px-6 py-8 sm:px-8 lg:flex lg:items-center lg:justify-between lg:px-10">
          <div>
            <h2 className="text-[27px] font-semibold tracking-[-0.03em] sm:text-[30px]">
              Not sure which charger you need?
            </h2>

            <p className="mt-2 max-w-[650px] text-[14px] leading-[1.6] text-ink-soft">
              Tell us your vehicle, city and charging requirements.
              Our EV team can recommend a suitable setup.
            </p>
          </div>

          <a
            href={createWhatsAppLink(
              "Hi Multiline, I need help choosing an EV charger. Please guide me."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-[50px] items-center justify-center rounded-xl bg-brand px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f3d7d] lg:mt-0"
          >
            Talk to us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};