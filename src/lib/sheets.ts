import { JWT } from 'google-auth-library';

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

/**
 * Module-level so the access token is cached across invocations rather than
 * re-minted on every lead. google-auth-library handles the refresh.
 */
let jwt: JWT | null = null;
function privateKey() {
  const raw = process.env.GOOGLE_PRIVATE_KEY!;
  // Vercel's UI may store real newlines; .env files store literal \n.
  // Also strip wrapping quotes if they were pasted in.
  return raw.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
}
function auth() {
  if (!jwt) {
    jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      key: privateKey(),
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
async function appendWithRetry(tab: string, row: (string | null)[], attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await append(tab, row);
    } catch (e) {
      if (i === attempts - 1) throw e;
      await new Promise((r) => setTimeout(r, 500 * 2 ** i));  // 0.5s, 1s
    }
  }
}

const mapLink = (lat: number | null, lng: number | null) =>
  lat != null && lng != null ? `https://maps.google.com/?q=${lat},${lng}` : '';
 
export function appendLead(l: {
  leadNumber: string; createdAt: Date; name: string | null; whatsappNumber: string;
  address: string | null; city: string | null; vehicle: string | null;
  latitude: number | null; longitude: number | null; status: string;
}) {
  return appendWithRetry('Sales Leads', [
    l.leadNumber, fmtDate(l.createdAt), l.name, `+${l.whatsappNumber}`,
    l.address, l.city, l.vehicle, mapLink(l.latitude, l.longitude), l.status,
  ]);
}

export function appendComplaint(c: {
  ticketNumber: string; createdAt: Date; name: string | null; whatsappNumber: string;
  address: string | null; city: string | null; chargerModel: string | null;
  issueType: string | null; status: string;
}) {
  return appendWithRetry('Complaints', [
    c.ticketNumber, fmtDate(c.createdAt), c.name, `+${c.whatsappNumber}`,
    c.address, c.city, c.chargerModel, c.issueType, c.status,
  ]);
}
