import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { conversations, messageLog } from '@/db/schema';
import { handleInbound, type Inbound } from '@/lib/conversation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  if (p.get('hub.mode') === 'subscribe' && p.get('hub.verify_token') === process.env.WA_VERIFY_TOKEN) {
    return new NextResponse(p.get('hub.challenge'), { status: 200 });
  }
  return new NextResponse('forbidden', { status: 403 });
}

function validSignature(raw: string, header: string | null) {
  if (!header) return false;
  const expected = 'sha256=' + crypto
    .createHmac('sha256', process.env.WA_APP_SECRET!).update(raw, 'utf8').digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!validSignature(raw, req.headers.get('x-hub-signature-256'))) {
    return new NextResponse('bad signature', { status: 401 });
  }
  // Process inline: Meta allows ~5s and the flow is a couple of queries plus one
  // send. If p95 approaches 5s, move this behind a queue — retries mean the
  // customer gets duplicate messages, not just a slow reply.
  try {
    await processPayload(JSON.parse(raw));
  } catch (e) {
    console.error('wa webhook', e);
  }
  return NextResponse.json({ ok: true });
}

async function processPayload(body: any) {
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value ?? {};

      // Coexistence: replies your staff send from the WhatsApp Business app come
      // back as echoes. Log them, mark the handoff, never respond.
      if (change.field === 'message_echoes' || change.field === 'smb_message_echoes') {
        for (const echo of value.message_echoes ?? []) {
          await db.insert(messageLog)
            .values({ whatsappNumber: echo.to, direction: 'outbound_human', messageId: echo.id, payload: echo })
            .onConflictDoNothing();
          await db.update(conversations)
            .set({ humanHandoff: 'true', updatedAt: new Date() })
            .where(eq(conversations.whatsappNumber, echo.to));
        }
        continue;
      }

      if (change.field !== 'messages') continue;

      for (const m of value.messages ?? []) {
        // Idempotency guard. Meta redelivers on timeout or any non-2xx.
        const [dupe] = await db.insert(messageLog)
          .values({ whatsappNumber: m.from, direction: 'inbound', messageId: m.id, payload: m })
          .onConflictDoNothing()
          .returning({ id: messageLog.id });
        if (!dupe) continue;

        const inbound: Inbound = {
          from: m.from,
          profileName: value.contacts?.[0]?.profile?.name,
        };

        switch (m.type) {
          case 'text':
            inbound.text = m.text?.body;
            break;
          case 'interactive':
            inbound.replyId =
              m.interactive?.button_reply?.id ?? m.interactive?.list_reply?.id;
            break;
          case 'image':
            inbound.media = { id: m.image.id, mime: m.image.mime_type };
            inbound.text = m.image.caption;
            break;
          case 'video':
            inbound.media = { id: m.video.id, mime: m.video.mime_type };
            inbound.text = m.video.caption;
            break;
          default:
            inbound.text = '';
        }

        await handleInbound(inbound);
      }
    }
  }
}