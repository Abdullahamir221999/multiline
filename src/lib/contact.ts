export const MULTILINE_WHATSAPP = "923164399843";

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${MULTILINE_WHATSAPP}?text=${encodeURIComponent(
    message
  )}`;
}