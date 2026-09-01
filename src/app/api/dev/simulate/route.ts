import { NextRequest, NextResponse } from 'next/server';
import { and, desc, eq, gt } from 'drizzle-orm';
import { db } from '@/db';
import { conversations, messageLog, customers, leads, complaints } from '@/db/schema';
import { handleInbound, type Inbound } from '@/lib/conversation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Only reachable when simulation is explicitly switched on. */
function enabled() {
  return process.env.WA_SIMULATE === '1';
}

async function latestLogId(waNumber: string) {
  const [row] = await db.select({ id: messageLog.id })
    .from(messageLog)
    .where(eq(messageLog.whatsappNumber, waNumber))
    .orderBy(desc(messageLog.id))
    .limit(1);
  return row?.id ?? 0;
}

export async function POST(req: NextRequest) {
  if (!enabled()) return new NextResponse('not found', { status: 404 });

  const body = await req.json() as {
    from?: string;
    text?: string;
    replyId?: string;
    media?: boolean;
    reset?: boolean;
    hardReset?: boolean;
  };

  const from = (body.from ?? '923001234567').replace(/\D/g, '');

  if (body.reset || body.hardReset) {
    await db.delete(conversations).where(eq(conversations.whatsappNumber, from));
    await db.delete(messageLog).where(eq(messageLog.whatsappNumber, from));
    if (body.hardReset) {
      const [cust] = await db.select().from(customers)
        .where(eq(customers.whatsappNumber, from)).limit(1);
      if (cust) {
        await db.delete(leads).where(eq(leads.customerId, cust.id));
        await db.delete(complaints).where(eq(complaints.customerId, cust.id));
        await db.delete(customers).where(eq(customers.id, cust.id));
      }
    }
    return NextResponse.json({ ok: true, reset: true, messages: [] });
  }

  const since = await latestLogId(from);

  const inbound: Inbound = { from, profileName: 'Simulator' };
  if (body.replyId) inbound.replyId = body.replyId;
  else if (body.media) inbound.media = { id: 'sim-media', mime: 'image/jpeg' };
  else inbound.text = body.text ?? '';

  // Log the inbound the way the real webhook would, so the transcript reads correctly.
  await db.insert(messageLog).values({
    whatsappNumber: from,
    direction: 'inbound',
    messageId: `siminb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    payload: inbound as unknown as Record<string, unknown>,
  });

  try {
    await handleInbound(inbound);
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }

  const out = await db.select().from(messageLog)
    .where(and(
      eq(messageLog.whatsappNumber, from),
      eq(messageLog.direction, 'outbound_bot'),
      gt(messageLog.id, since),
    ))
    .orderBy(messageLog.id);

  const [state] = await db.select().from(conversations)
    .where(eq(conversations.whatsappNumber, from)).limit(1);

  return NextResponse.json({
    ok: true,
    state: state
      ? { flow: state.flow, currentStep: state.currentStep, data: state.temporaryData, humanHandoff: state.humanHandoff }
      : null,
    messages: out.map((m) => m.payload),
  });
}