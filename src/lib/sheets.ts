import { JWT } from 'google-auth-library';

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
// const SIMULATE = process.env.WA_SIMULATE === '1';

/**
 * Module-level so the access token is cached across invocations rather than
 * re-minted on every lead. google-auth-library handles the refresh.
 */
let jwt: JWT | null = null;
function auth() {
  if (!jwt) {
    jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }
  return jwt;
}

function fmtDate(d: Date) {
  return d.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', timeZone: 'Asia/Karachi',
  });
}

async function append(tab: string, row: (string | null)[]) {
//   if (SIMULATE) {
//     console.log(`[sheets:${tab}]`, row);
//     return;
//   }

  const { token } = await auth().getAccessToken();
  const range = encodeURIComponent(`${tab}!A:Z`);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [row.map((c) => c ?? '')] }),
  });

  if (!res.ok) throw new Error(`Sheets append ${res.status}: ${await res.text()}`);
}


// ============================================================
// REPLACE appendLead and appendComplaint in src/lib/sheets.ts.
// The auth and append() helpers above them stay as they are.
// ============================================================

export function appendLead(l: {
  leadNumber: string; createdAt: Date; name: string | null; whatsappNumber: string;
  address: string | null; city: string | null; vehicle: string | null; status: string;
}) {
  return append('Sales Leads', [
    l.leadNumber, fmtDate(l.createdAt), l.name, `+${l.whatsappNumber}`,
    l.address, l.city, l.vehicle, l.status,
  ]);
}

export function appendComplaint(c: {
  ticketNumber: string; createdAt: Date; name: string | null; whatsappNumber: string;
  address: string | null; city: string | null; chargerModel: string | null;
  issueType: string | null; status: string;
}) {
  return append('Complaints', [
    c.ticketNumber, fmtDate(c.createdAt), c.name, `+${c.whatsappNumber}`,
    c.address, c.city, c.chargerModel, c.issueType, c.status,
  ]);
}