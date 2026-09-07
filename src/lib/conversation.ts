import { eq, sql } from 'drizzle-orm';
import { db } from '@/db';
import { customers, leads, complaints, conversations } from '@/db/schema';
import { sendText, sendButtons, sendList, sendFlow } from './whatsapp';
import { appendLead, appendComplaint } from './sheets';
import {
  GREETING, GREETING_BUTTONS, SALES_STEPS, COMPLAINT_STEPS,
  SALES_DONE, COMPLAINT_DONE, FALLBACK_TEXT, PREFILL_MAP, type Step,
} from './flow';

const WINDOW_MS = 24 * 60 * 60 * 1000;

export interface Inbound {
  from: string;
  profileName?: string;
  text?: string;
  replyId?: string;                          // button_reply or list_reply id
  flowResponse?: Record<string, string>;     // parsed nfm_reply payload
  media?: { id: string; mime: string };
}

const stepsFor = (flow: string | null) =>
  flow === 'sales' ? SALES_STEPS : flow === 'complaint' ? COMPLAINT_STEPS : [];

const stepIndex = (flow: string | null, key: string | null) =>
  key === null ? -1 : stepsFor(flow).findIndex((s) => s.key === key);

async function ask(to: string, step: Step) {
  if (step.input === 'buttons') return sendButtons(to, step.prompt, step.options!);
  if (step.input === 'list') return sendList(to, step.prompt, step.listButton!, step.options!);
  if (step.input === 'flow') {
    return sendFlow({
      to,
      body: step.prompt,
      cta: step.flowCta!,
      flowId: process.env[step.flowIdEnv!]!,
      flowToken: `${step.key}_${to}_${Date.now()}`,
      screen: step.flowScreen!,
    });
  }
  return sendText(to, step.prompt);
}

async function saveState(to: string, patch: Partial<typeof conversations.$inferInsert>) {
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

function titleFor(step: Step, replyId: string) {
  return step.options?.find((o) => o.id === replyId)?.title ?? replyId;
}

async function startGreeting(to: string) {
  await sendButtons(to, GREETING, GREETING_BUTTONS);
  await saveState(to, { flow: null, currentStep: null, temporaryData: {} });
}

async function beginFlow(to: string, flow: 'sales' | 'complaint', seed: Record<string, string> = {}) {
  const steps = stepsFor(flow);
  let i = 0;
  while (i < steps.length && seed[steps[i].key] !== undefined) i++;
  if (i >= steps.length) return finish(to, flow, seed);
  await saveState(to, { flow, currentStep: steps[i].key, temporaryData: seed });
  return ask(to, steps[i]);
}

async function finish(to: string, flow: string, data: Record<string, string>) {
  const customer = await upsertCustomer(to, data.full_name, data.city);

  if (flow === 'sales') {
    const leadNumber = await nextLeadNumber();
    const [lead] = await db.insert(leads).values({
      leadNumber,
      customerId: customer.id,
      vehicle: data.vehicle ?? null,
      address: data.address ?? null,
      source: data.source ?? 'whatsapp',
    }).returning();

    await sendText(to, SALES_DONE(leadNumber));
    await saveState(to, { flow: null, currentStep: null, temporaryData: {} });
    void appendLead({
      ...lead, whatsappNumber: to, name: customer.name, city: customer.city,
    }).catch(console.error);
    return;
  }

  const ticketNumber = await nextTicketNumber();
  const [ticket] = await db.insert(complaints).values({
    ticketNumber,
    customerId: customer.id,
    address: data.address ?? null,
    chargerModel: data.charger_model ?? null,
    issueType: data.issue_type ?? null,
  }).returning();

  await sendText(to, COMPLAINT_DONE(ticketNumber));
  // A human owns the conversation from here.
  await saveState(to, { flow: null, currentStep: null, temporaryData: {}, humanHandoff: 'true' });
  void appendComplaint({
    ...ticket, whatsappNumber: to, name: customer.name, city: customer.city,
  }).catch(console.error);
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

  const convo = existing ?? {
    flow: null, currentStep: null, temporaryData: {},
    humanHandoff: 'false', lastCustomerMessageAt: null,
  };

  if (convo.humanHandoff === 'true') return;

  const typed = (msg.text ?? '').trim();
  const lower = typed.toLowerCase();

  if (lower === 'menu') return startGreeting(to);

  const lapsed = convo.lastCustomerMessageAt
    ? now.getTime() - convo.lastCustomerMessageAt.getTime() > WINDOW_MS
    : false;

  if (!convo.flow || lapsed) {
    const prefill = PREFILL_MAP[lower];
    if (prefill) return beginFlow(to, prefill.flow, { source: prefill.source });
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
    if (!msg.replyId) return ask(to, step);
    data[step.key] = titleFor(step, msg.replyId);
  } else if (step.input === 'flow') {
    if (!msg.flowResponse) {
      return sendText(to, 'Please tap the button above and fill in the form.');
    }
    // Merge every field the form returned. flow_token is metadata, not an answer.
    for (const [k, v] of Object.entries(msg.flowResponse)) {
      if (k === 'flow_token') continue;
      data[k] = String(v);
    }
    data[step.key] = 'submitted';
  } else {
    if (!typed) return sendText(to, FALLBACK_TEXT);
    data[step.key] = typed;
  }

  const next = steps[idx + 1];
  if (!next) return finish(to, convo.flow, data);

  await saveState(to, { currentStep: next.key, temporaryData: data });
  return ask(to, next);
}