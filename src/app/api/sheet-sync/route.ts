import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { complaints, leads } from '@/db/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LEAD_STATUSES = ['New', 'Contacted', 'Quotation Sent', 'Won', 'Lost'];
const COMPLAINT_STATUSES = ['Open', 'Assigned', 'In Progress', 'Resolved'];

function authorised(req: NextRequest) {
  const given = req.headers.get('x-sync-secret') ?? '';
  const expected = process.env.SHEET_SYNC_SECRET ?? '';
  if (!expected || given.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

/**
 * Called by the Apps Script bound to Multiline's spreadsheet whenever a staff
 * member changes a Status cell. Keyed on the reference number in the row, not
 * the row position, so sorting or reordering the sheet cannot mismatch tickets.
 */
export async function POST(req: NextRequest) {
  if (!authorised(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorised' }, { status: 401 });
  }

  let body: { ref?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const ref = (body.ref ?? '').trim();
  const status = (body.status ?? '').trim();

  if (!ref || !status) {
    return NextResponse.json({ ok: false, error: 'ref and status required' }, { status: 400 });
  }

  try {
    if (ref.startsWith('ML-EVC-')) {
      if (!COMPLAINT_STATUSES.includes(status)) {
        return NextResponse.json(
          { ok: false, error: `status must be one of: ${COMPLAINT_STATUSES.join(', ')}` },
          { status: 400 },
        );
      }
      const updated = await db.update(complaints)
        .set({ status, statusUpdatedAt: new Date() })
        .where(eq(complaints.ticketNumber, ref))
        .returning({ id: complaints.id });

      if (!updated.length) {
        return NextResponse.json({ ok: false, error: 'ticket not found' }, { status: 404 });
      }
      return NextResponse.json({ ok: true, ref, status });
    }

    if (ref.startsWith('ML-EV-')) {
      if (!LEAD_STATUSES.includes(status)) {
        return NextResponse.json(
          { ok: false, error: `status must be one of: ${LEAD_STATUSES.join(', ')}` },
          { status: 400 },
        );
      }
      const updated = await db.update(leads)
        .set({ status })
        .where(eq(leads.leadNumber, ref))
        .returning({ id: leads.id });

      if (!updated.length) {
        return NextResponse.json({ ok: false, error: 'lead not found' }, { status: 404 });
      }
      return NextResponse.json({ ok: true, ref, status });
    }

    return NextResponse.json({ ok: false, error: 'unrecognised reference' }, { status: 400 });
  } catch (e) {
    console.error('[sheet-sync]', e);
    return NextResponse.json({ ok: false, error: 'server error' }, { status: 500 });
  }
}