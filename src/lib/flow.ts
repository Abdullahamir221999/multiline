/**
 * The entire conversation script. Changing wording or options is an edit here,
 * never a change to the engine.
 *
 * WhatsApp limits, enforced by assertions at the bottom:
 *   buttons  - max 3, title <= 20 chars
 *   list     - max 10 rows, title <= 24 chars
 */

export type InputKind = 'text' | 'buttons' | 'list' | 'media';

export interface Step {
  key: string;
  prompt: string;
  input: InputKind;
  options?: { id: string; title: string }[];
  listButton?: string;       // required when input === 'list'
  optional?: boolean;        // allows "skip"
}

export const GREETING =
  'Welcome to Multiline EV Charging.\nHow can we help you today?';

export const GREETING_BUTTONS = [
  { id: 'flow_sales', title: 'Sales Enquiry' },
  { id: 'flow_complaint', title: 'Complaint / Support' },
];

export const SALES_STEPS: Step[] = [
  { key: 'name', prompt: 'What is your name?', input: 'text' },
  { key: 'city', prompt: 'Which city are you located in?', input: 'text' },
  { key: 'vehicle', prompt: 'What vehicle do you have?', input: 'text' },
  {
    key: 'site_phase',
    prompt: 'What electrical connection is available at your site?',
    input: 'buttons',
    options: [
      { id: 'phase_single', title: 'Single Phase' },
      { id: 'phase_three', title: 'Three Phase' },
      { id: 'phase_unknown', title: 'Not Sure' },
    ],
  },
  {
    key: 'installation_type',
    prompt: 'Where will the charger be installed?',
    input: 'list',
    listButton: 'Choose location',
    options: [
      { id: 'inst_home', title: 'Home' },
      { id: 'inst_office', title: 'Office' },
      { id: 'inst_commercial', title: 'Commercial' },
      { id: 'inst_other', title: 'Other' },
    ],
  },
  {
    key: 'charger_interest',
    prompt: 'Which charger are you interested in?',
    input: 'list',
    listButton: 'Choose charger',
    options: [
      { id: 'chg_7', title: '7kW' },
      { id: 'chg_11', title: '11kW' },
      { id: 'chg_22', title: '22kW' },
      { id: 'chg_dc', title: 'DC Charger' },
      { id: 'chg_unknown', title: 'Not Sure' },
    ],
  },
  { key: 'notes', prompt: 'Any additional information? (or reply: skip)', input: 'text', optional: true },
];

export const COMPLAINT_STEPS: Step[] = [
  { key: 'name', prompt: 'What is your name?', input: 'text' },
  { key: 'city', prompt: 'Which city?', input: 'text' },
  { key: 'charger_model', prompt: 'Which charger do you have?', input: 'text' },
  {
    key: 'issue_type',
    prompt: 'What issue are you experiencing?',
    input: 'list',
    listButton: 'Choose issue',
    options: [
      { id: 'iss_not_charging', title: 'Not Charging' },
      { id: 'iss_offline', title: 'Charger Offline' },
      { id: 'iss_slow', title: 'Slow Charging' },
      { id: 'iss_app', title: 'App / Connectivity' },
      { id: 'iss_install', title: 'Installation Issue' },
      { id: 'iss_other', title: 'Other' },
    ],
  },
  { key: 'description', prompt: 'Please describe the issue.', input: 'text' },
  {
    key: 'attachment',
    prompt: 'Please send a photo or video of the issue if available (or reply: skip).',
    input: 'media',
    optional: true,
  },
];

export const SALES_DONE = (leadNumber: string) =>
  `Thank you.\nYour enquiry has been registered.\nA Multiline representative will contact you shortly.\n\nLead ID: ${leadNumber}`;

export const COMPLAINT_DONE = (ticket: string) =>
  `Your complaint has been registered.\nTicket: ${ticket}\n\nOur support team will contact you shortly.`;

export const FALLBACK_TEXT =
  'Please use the options shown above. Reply "menu" to start again.';

/**
 * Prefilled website links. Keep these EXACT — the source lookup is an exact
 * match, not fuzzy parsing, so a stray word silently breaks attribution.
 * e.g. https://wa.me/92XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20the%20Multiline%2011kW%20EV%20charger.
 */
export const PREFILL_MAP: Record<string, { source: string; charger?: string; flow: 'sales' | 'complaint' }> = {
  "hi, i'm interested in the multiline 7kw ev charger.":  { source: 'website:7kw',  charger: '7kW',  flow: 'sales' },
  "hi, i'm interested in the multiline 11kw ev charger.": { source: 'website:11kw', charger: '11kW', flow: 'sales' },
  "hi, i'm interested in the multiline 22kw ev charger.": { source: 'website:22kw', charger: '22kW', flow: 'sales' },
  "hi, i'm interested in a multiline dc ev charger.":     { source: 'website:dc',   charger: 'DC Charger', flow: 'sales' },
  "hi, i need support with my multiline ev charger.":     { source: 'website:support', flow: 'complaint' },
};

// --- limit checks: throw at import time rather than at runtime in front of a customer
for (const [label, steps] of [['sales', SALES_STEPS], ['complaint', COMPLAINT_STEPS]] as const) {
  for (const s of steps) {
    if (s.input === 'buttons') {
      if (!s.options || s.options.length > 3) throw new Error(`${label}.${s.key}: max 3 reply buttons`);
      for (const o of s.options) {
        if (o.title.length > 20) throw new Error(`${label}.${s.key}: button title "${o.title}" exceeds 20 chars`);
      }
    }
    if (s.input === 'list') {
      if (!s.options || s.options.length > 10) throw new Error(`${label}.${s.key}: max 10 list rows`);
      if (!s.listButton) throw new Error(`${label}.${s.key}: listButton required`);
      for (const o of s.options) {
        if (o.title.length > 24) throw new Error(`${label}.${s.key}: list title "${o.title}" exceeds 24 chars`);
      }
    }
  }
}
if (GREETING_BUTTONS.some((b) => b.title.length > 20)) {
  throw new Error('greeting button title exceeds 20 chars');
}