import { NextRequest, NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';

import { saveWebEnquiry, normalisePhone, type WebEnquiry } from '@/lib/webEnquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/ev-enquiry
 *
 * File goes at: src/app/api/ev-enquiry/route.ts
 *
 * Writes to the same leads/complaints tables the WhatsApp bot uses, then
 * appends to the spreadsheet in the background. The sheet append is not
 * awaited: a Sheets outage should not cost Multiline a lead, and the row
 * can be reconciled from the database.
 */

/* Crude in-memory throttle. Serverless instances are short-lived and not
   shared, so this stops a burst from one client rather than a distributed
   flood. Honeypot catches the rest. Revisit if real abuse appears. */
const seen = new Map<string, number[]>();
const WINDOW = 60_000;
const LIMIT = 3;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (seen.get(ip) ?? []).filter((t) => now - t < WINDOW);

  hits.push(now);
  seen.set(ip, hits);

  return hits.length > LIMIT;
}

type Payload = Partial<WebEnquiry> & { company?: string };

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests' },
      { status: 429 },
    );
  }

  let body: Payload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Bad request' },
      { status: 400 },
    );
  }

  // Honeypot — answer as though it worked so the bot doesn't retry.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const required = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'city',
    'message',
  ] as const;

  for (const field of required) {
    if (!body[field]?.trim()) {
      return NextResponse.json(
        { ok: false, error: `Missing ${field}` },
        { status: 400 },
      );
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email!)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid email' },
      { status: 400 },
    );
  }

  const phone = normalisePhone(body.phone!);

  if (phone.length < 11 || phone.length > 13) {
    return NextResponse.json(
      { ok: false, error: 'Invalid phone number' },
      { status: 400 },
    );
  }

  const mode = body.mode === 'support' ? 'support' : 'quote';

  try {
    const { reference, append } = await saveWebEnquiry({
      mode,
      firstName: body.firstName!.trim(),
      lastName: body.lastName!.trim(),
      email: body.email!.trim(),
      phone: body.phone!.trim(),
      city: body.city!.trim(),
      interest: body.interest?.trim(),
      issue: body.issue?.trim(),
      reference: body.reference?.trim(),
      message: body.message!.trim(),
      product: body.product?.trim(),
      vehicle: body.vehicle?.trim(),
    });

    /* The lead is saved. If the spreadsheet is unreachable the customer
       should still see a success state — the row is recoverable from
       the database. */
    waitUntil(
      append().catch((e) =>
        console.error('[ev-enquiry] sheet append failed', reference, e),
      ),
    );

    return NextResponse.json({ ok: true, reference });
  } catch (e) {
    console.error('[ev-enquiry]', e);

    return NextResponse.json(
      { ok: false, error: 'Could not save your enquiry' },
      { status: 500 },
    );
  }
}