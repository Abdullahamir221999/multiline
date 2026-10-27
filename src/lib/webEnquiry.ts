import { sql } from 'drizzle-orm';
import { db } from '@/db';
import { customers, leads, complaints } from '@/db/schema';
import { appendLead, appendComplaint } from './sheets';

/**
 * Website form submissions, routed through the same pipeline as the
 * WhatsApp bot: one lead-number sequence, one set of tables, one
 * spreadsheet. Staff changing a Status cell syncs back to these rows
 * exactly as it does for bot leads.
 *
 * The only difference is `source`, which lets Multiline tell where a
 * lead came from.
 */

export type WebEnquiry = {
  mode: 'quote' | 'support';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  /** Quote only. */
  interest?: string;
  /** Support only. */
  issue?: string;
  /** Support only — invoice or installation reference. */
  reference?: string;
  message: string;
  /** Set when the enquiry came from a product page. */
  product?: string;
  /** Carried through from the charger finder when available. */
  vehicle?: string;
};

/**
 * Pakistani numbers arrive as +92 300…, 0300…, or 300…. The bot stores
 * them as bare digits with the country code, so match that or the same
 * person becomes two customers.
 */
export function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, '');

  if (digits.startsWith('92')) return digits;
  if (digits.startsWith('0')) return `92${digits.slice(1)}`;
  if (digits.length === 10) return `92${digits}`;

  return digits;
}

async function nextLeadNumber() {
  const r = await db.execute<{ n: string }>(
    sql`SELECT nextval('lead_number_seq') AS n`,
  );
  return `ML-EV-${String(r.rows[0].n).padStart(4, '0')}`;
}

async function nextTicketNumber() {
  const r = await db.execute<{ n: string }>(
    sql`SELECT nextval('ticket_number_seq') AS n`,
  );
  return `ML-EVC-${String(r.rows[0].n).padStart(4, '0')}`;
}

async function upsertCustomer(phone: string, name: string, city: string) {
  const [row] = await db
    .insert(customers)
    .values({ whatsappNumber: phone, name, city })
    .onConflictDoUpdate({
      target: customers.whatsappNumber,
      set: { name, city },
    })
    .returning();

  return row;
}

/**
 * Returns the reference number so the form can show it. Throws on a
 * database failure; the sheet append is deliberately not awaited by the
 * caller's critical path — see the route.
 */
export async function saveWebEnquiry(data: WebEnquiry) {
  const phone = normalisePhone(data.phone);
  const name = `${data.firstName} ${data.lastName}`.trim();

  const customer = await upsertCustomer(phone, name, data.city);

  /* The free-text message is where the form's extra context lives.
     Product and reference are folded in rather than given columns of
     their own — they're rare and only ever read by a human. */
  const notes = [
    data.message,
    data.product ? `Product: ${data.product}` : '',
    data.reference ? `Reference: ${data.reference}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  if (data.mode === 'support') {
    const ticketNumber = await nextTicketNumber();

    const [ticket] = await db
      .insert(complaints)
      .values({
        ticketNumber,
        customerId: customer.id,
        name,
        city: data.city,
        email: data.email,
        issueType: data.issue ?? null,
        message: notes,
        source: 'website:support',
      })
      .returning();

    return {
      reference: ticketNumber,
      append: () =>
        appendComplaint({ ...ticket, whatsappNumber: phone }),
    };
  }

  const leadNumber = await nextLeadNumber();

  const [lead] = await db
    .insert(leads)
    .values({
      leadNumber,
      customerId: customer.id,
      name,
      city: data.city,
      email: data.email,
      vehicle: data.vehicle ?? null,
      interest: data.interest ?? null,
      message: notes,
      source: 'website:enquiry',
    })
    .returning();

  return {
    reference: leadNumber,
    append: () => appendLead({ ...lead, whatsappNumber: phone }),
  };
}