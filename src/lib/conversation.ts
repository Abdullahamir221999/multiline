import { eq, sql } from 'drizzle-orm';
import { db } from '@/db';
import { customers, leads, complaints, conversations } from '@/db/schema';
import { sendText, sendButtons, sendList, downloadMedia } from './whatsapp';
import { storeAttachment } from './storage';
import { appendLead, appendComplaint } from './sheets';
import { matchVehicle } from './vehicles';
import {
  GREETING, GREETING_BUTTONS, SALES_STEPS, COMPLAINT_STEPS,
  SALES_DONE, COMPLAINT_DONE, FALLBACK_TEXT, PREFILL_MAP, type Step,
} from './flow';

const WINDOW_MS = 24 * 60 * 60 * 1000;

export interface Inbound {
  from: string;
  profileName?: string;
  text?: string;
  replyId?: string;              // button_reply or list_reply id
  media?: { id: string; mime: string };
}

const stepsFor = (flow: string | null) =>
  flow === 'sales' ? SALES_STEPS : flow === 'complaint' ? COMPLAINT_STEPS : [];

const stepIndex = (flow: string | null, key: string | null) =>
  key === null ? -1 : stepsFor(flow).findIndex((s) => s.key === key);

async function ask(to: string, step: Step) {
  if (step.input === 'buttons') return sendButtons(to, step.prompt, step.options!);
  if (step.input === 'list') return sendList(to, step.prompt, step.listButton!, step.options!);
  return sendText(to, step.prompt);
}

async function saveState(
  to: string,
  patch: Partial<typeof conversations.$inferInsert>,
) {
  await db.update(conversations)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(conversations.whatsappNumber, to));
}

async function upsertCustomer(waNumber: string, name?: string, city?: string) {
  const [row] = await db.insert(customers)
    .values({ whatsappNumber: waNumber, name, city })
    .onConflictDoUpdate({
      target: customers.whatsappNumber,
      set: { name: name ?? sql`customers.name`, city: city ?? sql`customers.city` },
    })
    .returning();
  return row;
}

async function nextLeadNumber() {
  const r = await db.execute<{ n: string }>(sql`SELECT nextval('lead_number_seq') AS n`);
  return `ML-EV-${String(r.rows[0].n).padStart(4, '0')}`;
}

async function nextTicketNumber() {
  const r = await db.execute<{ n: string }>(sql`SELECT nextval('ticket_number_seq') AS n`);
  return `ML-EVC-${String(r.rows[0].n).padStart(4, '0')}`;
}

/** Turns a reply id back into the human-readable option title. */
function titleFor(step: Step, replyId: string) {
  return step.options?.find((o) => o.id === replyId)?.title ?? replyId;
}

async function startGreeting(to: string) {
  await sendButtons(to, GREETING, GREETING_BUTTONS);
  await saveState(to, { flow: null, currentStep: null, temporaryData: {} });
}

async function beginFlow(to: string, flow: 'sales' | 'complaint', seed: Record<string, string> = {}) {
  const steps = stepsFor(flow);
  // Skip any step the prefilled link already answered.
  let i = 0;
  while (i < steps.length && seed[steps[i].key] !== undefined) i++;
  if (i >= steps.length) return finish(to, flow, seed);
  await saveState(to, { flow, currentStep: steps[i].key, temporaryData: seed });
  return ask(to, steps[i]);
}

async function finish(to: string, flow: string, data: Record<string, string>) {
  const customer = await upsertCustomer(to, data.name, data.city);

  if (flow === 'sales') {
    const leadNumber = await nextLeadNumber();
    const [lead] = await db.insert(leads).values({
      leadNumber,
      customerId: customer.id,
      vehicle: data.vehicle ?? null,
      vehicleMatched: data.vehicle ? matchVehicle(data.vehicle) : null,
      sitePhase: data.site_phase ?? null,
      installationType: data.installation_type ?? null,
      chargerInterest: data.charger_interest ?? null,
      notes: data.notes ?? null,
      source: data.source ?? 'whatsapp',
    }).returning();

    await sendText(to, SALES_DONE(leadNumber));
    await saveState(to, { flow: null, currentStep: null, temporaryData: {} });
    // Sheets is a mirror, not the source of truth — never fail the conversation on it.
    void appendLead({ ...lead, whatsappNumber: to, name: customer.name, city: customer.city })
      .catch(console.error);
    return;
  }

  const ticketNumber = await nextTicketNumber();
  const [ticket] = await db.insert(complaints).values({
    ticketNumber,
    customerId: customer.id,
    chargerModel: data.charger_model ?? null,
    issueType: data.issue_type ?? null,
    description: data.description ?? null,
    attachmentUrl: data.attachment ?? null,
  }).returning();

  await sendText(to, COMPLAINT_DONE(ticketNumber));
  // A human owns the conversation from here. The bot stays silent.
  await saveState(to, { flow: null, currentStep: null, temporaryData: {}, humanHandoff: 'true' });
  void appendComplaint({ ...ticket, whatsappNumber: to, name: customer.name, city: customer.city })
    .catch(console.error);
}

export async function handleInbound(msg: Inbound) {
  const to = msg.from;
  const now = new Date();

  const [existing] = await db.select().from(conversations)
    .where(eq(conversations.whatsappNumber, to)).limit(1);

  if (!existing) {
    await db.insert(conversations).values({ whatsappNumber: to, lastCustomerMessageAt: now });
  } else {
    await saveState(to, { lastCustomerMessageAt: now });
  }

  const convo = existing ?? { flow: null, currentStep: null, temporaryData: {}, humanHandoff: 'false', lastCustomerMessageAt: null };

  // A staff member is handling this number. Say nothing.
  if (convo.humanHandoff === 'true') return;

  const typed = (msg.text ?? '').trim();
  const lower = typed.toLowerCase();

  if (lower === 'menu') return startGreeting(to);

  // Abandoned mid-flow and came back after the window lapsed — start clean.
  const lapsed = convo.lastCustomerMessageAt
    ? now.getTime() - convo.lastCustomerMessageAt.getTime() > WINDOW_MS
    : false;

  if (!convo.flow || lapsed) {
    const prefill = PREFILL_MAP[lower];
    if (prefill) {
      const seed: Record<string, string> = { source: prefill.source };
      if (prefill.charger) seed.charger_interest = prefill.charger;
      return beginFlow(to, prefill.flow, seed);
    }
    if (msg.replyId === 'flow_sales') return beginFlow(to, 'sales');
    if (msg.replyId === 'flow_complaint') return beginFlow(to, 'complaint');
    return startGreeting(to);
  }

  const steps = stepsFor(convo.flow);
  const idx = stepIndex(convo.flow, convo.currentStep);
  if (idx < 0) return startGreeting(to);

  const step = steps[idx];
  const data = { ...(convo.temporaryData ?? {}) };

  // --- capture the answer for the current step
  if (step.input === 'buttons' || step.input === 'list') {
    if (!msg.replyId) return ask(to, step);           // re-ask rather than fall through
    data[step.key] = titleFor(step, msg.replyId);
  } else if (step.input === 'media') {
    if (msg.media) {
      const { buffer, mimeType } = await downloadMedia(msg.media.id);
      data[step.key] = await storeAttachment(to, buffer, mimeType);
    } else if (step.optional && lower === 'skip') {
      // leave unset
    } else {
      return sendText(to, step.prompt);
    }
  } else {
    if (!typed) return sendText(to, FALLBACK_TEXT);
    if (!(step.optional && lower === 'skip')) data[step.key] = typed;
  }

  // --- advance
  const next = steps[idx + 1];
  if (!next) return finish(to, convo.flow, data);

  await saveState(to, { currentStep: next.key, temporaryData: data });
  return ask(to, next);
}