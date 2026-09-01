import { db } from '@/db';
import { messageLog } from '@/db/schema';

const GRAPH = 'https://graph.facebook.com/v21.0';
const PHONE_ID = process.env.WA_PHONE_NUMBER_ID!;
const TOKEN = process.env.WA_ACCESS_TOKEN!;

/** When set, nothing is sent to Meta — payloads are only logged. */
const SIMULATE = process.env.WA_SIMULATE === '1';

async function logOutbound(to: string, payload: Record<string, unknown>, messageId?: string) {
  await db.insert(messageLog).values({
    whatsappNumber: to,
    direction: 'outbound_bot',
    messageId: messageId ?? null,
    payload,
  }).onConflictDoNothing();
}

async function send(payload: Record<string, unknown>) {
  const to = payload.to as string;

  if (SIMULATE) {
    const id = `sim_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    await logOutbound(to, payload, id);
    return { messages: [{ id }] };
  }

  const res = await fetch(`${GRAPH}/${PHONE_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', ...payload }),
  });
  if (!res.ok) throw new Error(`WA send ${res.status}: ${await res.text()}`);

  const json = (await res.json()) as { messages: { id: string }[] };
  // Logged for debugging and for reconciling Meta's monthly message billing.
  await logOutbound(to, payload, json.messages?.[0]?.id);
  return json;
}

export function sendText(to: string, body: string) {
  return send({ to, type: 'text', text: { body, preview_url: false } });
}

export function sendButtons(to: string, body: string, buttons: { id: string; title: string }[]) {
  return send({
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: body },
      action: { buttons: buttons.map((b) => ({ type: 'reply', reply: { id: b.id, title: b.title } })) },
    },
  });
}

export function sendList(
  to: string,
  body: string,
  buttonText: string,
  rows: { id: string; title: string }[],
) {
  return send({
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      body: { text: body },
      action: {
        button: buttonText.slice(0, 20),
        sections: [{ title: 'Options', rows: rows.map((r) => ({ id: r.id, title: r.title })) }],
      },
    },
  });
}

export function sendTemplate(to: string, name: string, lang: string, params: string[] = []) {
  return send({
    to,
    type: 'template',
    template: {
      name,
      language: { code: lang },
      components: params.length
        ? [{ type: 'body', parameters: params.map((t) => ({ type: 'text', text: t })) }]
        : undefined,
    },
  });
}

/**
 * WhatsApp media URLs are short-lived and need the bearer token. Download the
 * bytes now and put them in your own storage — never persist Meta's URL.
 */
export async function downloadMedia(mediaId: string): Promise<{ buffer: Buffer; mimeType: string }> {
  if (SIMULATE) {
    return { buffer: Buffer.from('simulated-media'), mimeType: 'image/jpeg' };
  }
  const metaRes = await fetch(`${GRAPH}/${mediaId}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (!metaRes.ok) throw new Error(`media lookup ${metaRes.status}`);
  const meta = (await metaRes.json()) as { url: string; mime_type: string };

  const binRes = await fetch(meta.url, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (!binRes.ok) throw new Error(`media fetch ${binRes.status}`);

  return { buffer: Buffer.from(await binRes.arrayBuffer()), mimeType: meta.mime_type };
}