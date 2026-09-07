// /**
//  * The entire conversation script. Changing wording or options is an edit here,
//  * never a change to the engine.
//  *
//  * WhatsApp limits, enforced by assertions at the bottom:
//  *   buttons - max 3, title <= 20 chars
//  *   list    - max 10 rows, title <= 24 chars
//  *   flow    - form fields defined in /flows/*.json, up to 200 dropdown options
//  */

// export type InputKind = 'text' | 'buttons' | 'list' | 'media' | 'flow';

// export interface Step {
//   key: string;
//   prompt: string;
//   input: InputKind;
//   options?: { id: string; title: string }[];
//   listButton?: string;          // required when input === 'list'
//   flowIdEnv?: string;           // env var holding the Flow ID
//   flowCta?: string;             // button label on the flow message
//   flowScreen?: string;          // first screen id in the Flow JSON
//   optional?: boolean;
// }

// /** Greeting and menu in ONE message — the buttons render under the body text. */
// export const GREETING =
//   "Welcome to Multiline Engineering Co., Pakistan's largest EV installers.\n\n" +
//   'Please select an option below and we will respond with the information you need.';

// export const GREETING_BUTTONS = [
//   { id: 'flow_sales', title: 'Sales Enquiry' },
//   { id: 'flow_complaint', title: 'Complaint' },
// ];

// /**
//  * WhatsApp lists cap at 10 rows. The full brand list is 12, so Chery,
//  * Omoda/Jaecoo and Range Rover fall under "Other".
//  * Moving this question into the Flow form as a dropdown would allow all 12
//  * and save a message — worth revisiting.
//  */
// export const VEHICLE_OPTIONS = [
//   { id: 'car_haval', title: 'Haval' },
//   { id: 'car_byd', title: 'BYD' },
//   { id: 'car_deepal', title: 'Deepal' },
//   { id: 'car_kia', title: 'KIA' },
//   { id: 'car_mg', title: 'MG' },
//   { id: 'car_audi', title: 'Audi' },
//   { id: 'car_bmw', title: 'BMW' },
//   { id: 'car_porsche', title: 'Porsche' },
//   { id: 'car_gac', title: 'GAC' },
//   { id: 'car_other', title: 'Other' },
// ];

// export const SALES_STEPS: Step[] = [
//   {
//     key: 'vehicle',
//     prompt: 'Which car do you have?',
//     input: 'list',
//     listButton: 'Choose your car',
//     options: VEHICLE_OPTIONS,
//   },
//   {
//     key: 'details',
//     prompt: 'Kindly share the following details.',
//     input: 'flow',
//     flowIdEnv: 'WA_SALES_FLOW_ID',
//     flowCta: 'Enter details',
//     flowScreen: 'DETAILS',
//   },
// ];

// export const ISSUE_OPTIONS = [
//   { id: 'iss_not_charging', title: 'Not Charging' },
//   { id: 'iss_offline', title: 'Charger Offline' },
//   { id: 'iss_slow', title: 'Slow Charging' },
//   { id: 'iss_app', title: 'App / Connectivity' },
//   { id: 'iss_install', title: 'Installation Issue' },
//   { id: 'iss_other', title: 'Other' },
// ];

// export const COMPLAINT_STEPS: Step[] = [
//   {
//     key: 'details',
//     prompt: 'Kindly share the following details.',
//     input: 'flow',
//     flowIdEnv: 'WA_COMPLAINT_FLOW_ID',
//     flowCta: 'Enter details',
//     flowScreen: 'DETAILS',
//   },
//   {
//     key: 'issue_type',
//     prompt: 'What problem are you having with the charger?',
//     input: 'list',
//     listButton: 'Choose issue',
//     options: ISSUE_OPTIONS,
//   },
// ];

// export const SALES_DONE = (leadNumber: string) =>
//   `Thank you.\nYour enquiry has been registered.\nA Multiline representative will contact you shortly.\n\nLead ID: ${leadNumber}`;

// export const COMPLAINT_DONE = (ticket: string) =>
//   `Your complaint has been registered.\nTicket: ${ticket}\n\nOur support team will contact you shortly.`;

// export const FALLBACK_TEXT =
//   'Please use the options shown above. Reply "menu" to start again.';

// /**
//  * Prefilled website links. Keep these EXACT — the lookup is an exact match,
//  * not fuzzy parsing, so a stray word silently breaks attribution.
//  */
// export const PREFILL_MAP: Record<string, { source: string; flow: 'sales' | 'complaint' }> = {
//   "hi, i'd like to enquire about an ev charger.": { source: 'website:enquiry', flow: 'sales' },
//   'hi, i need support with my multiline ev charger.': { source: 'website:support', flow: 'complaint' },
// };

// // --- limit checks: fail at import time, not in front of a customer
// for (const [label, steps] of [['sales', SALES_STEPS], ['complaint', COMPLAINT_STEPS]] as const) {
//   for (const s of steps) {
//     if (s.input === 'buttons') {
//       if (!s.options || s.options.length > 3) throw new Error(`${label}.${s.key}: max 3 reply buttons`);
//       for (const o of s.options) {
//         if (o.title.length > 20) throw new Error(`${label}.${s.key}: button title "${o.title}" exceeds 20 chars`);
//       }
//     }
//     if (s.input === 'list') {
//       if (!s.options || s.options.length > 10) throw new Error(`${label}.${s.key}: max 10 list rows`);
//       if (!s.listButton) throw new Error(`${label}.${s.key}: listButton required`);
//       for (const o of s.options) {
//         if (o.title.length > 24) throw new Error(`${label}.${s.key}: list title "${o.title}" exceeds 24 chars`);
//       }
//     }
//     if (s.input === 'flow') {
//       if (!s.flowIdEnv || !s.flowCta || !s.flowScreen) {
//         throw new Error(`${label}.${s.key}: flowIdEnv, flowCta and flowScreen are required`);
//       }
//       if (s.flowCta.length > 20) throw new Error(`${label}.${s.key}: flow CTA exceeds 20 chars`);
//     }
//   }
// }
// if (GREETING_BUTTONS.some((b) => b.title.length > 20)) {
//   throw new Error('greeting button title exceeds 20 chars');
// }
/**
 * The entire conversation script. Changing wording or options is an edit here,
 * never a change to the engine.
 *
 * WhatsApp limits, enforced by assertions at the bottom:
 *   buttons - max 3, title <= 20 chars
 *   list    - max 10 rows, title <= 24 chars
 *   flow    - form fields defined in /flows/*.json, up to 200 dropdown options
 *
 * NOTE: the Flow-based versions of the detail steps are kept below as
 * SALES_STEPS_FLOW / COMPLAINT_STEPS_FLOW. WhatsApp Flows are blocked until
 * Meta completes Business Verification (error 139000), so the sequential
 * versions are active. Swap the two exports back once verification clears.
 */

export type InputKind = 'text' | 'buttons' | 'list' | 'media' | 'flow';

export interface Step {
  key: string;
  prompt: string;
  input: InputKind;
  options?: { id: string; title: string }[];
  listButton?: string;          // required when input === 'list'
  flowIdEnv?: string;           // env var holding the Flow ID
  flowCta?: string;             // button label on the flow message
  flowScreen?: string;          // first screen id in the Flow JSON
  optional?: boolean;
}

/** Greeting and menu in ONE message — the buttons render under the body text. */
export const GREETING =
  "Welcome to Multiline Engineering Co., Pakistan's largest EV installers.\n\n" +
  'Please select an option below and we will respond with the information you need.';

export const GREETING_BUTTONS = [
  { id: 'flow_sales', title: 'Sales Enquiry' },
  { id: 'flow_complaint', title: 'Complaint' },
];

/**
 * WhatsApp lists cap at 10 rows. The full brand list is 12, so Chery,
 * Omoda/Jaecoo and Range Rover fall under "Other".
 * Moving this question into the Flow form as a dropdown would allow all 12
 * and save a message — worth revisiting once Flows are unblocked.
 */
export const VEHICLE_OPTIONS = [
  { id: 'car_haval', title: 'Haval' },
  { id: 'car_byd', title: 'BYD' },
  { id: 'car_deepal', title: 'Deepal' },
  { id: 'car_kia', title: 'KIA' },
  { id: 'car_mg', title: 'MG' },
  { id: 'car_audi', title: 'Audi' },
  { id: 'car_bmw', title: 'BMW' },
  { id: 'car_porsche', title: 'Porsche' },
  { id: 'car_gac', title: 'GAC' },
  { id: 'car_other', title: 'Other' },
];

export const ISSUE_OPTIONS = [
  { id: 'iss_not_charging', title: 'Not Charging' },
  { id: 'iss_offline', title: 'Charger Offline' },
  { id: 'iss_slow', title: 'Slow Charging' },
  { id: 'iss_app', title: 'App / Connectivity' },
  { id: 'iss_install', title: 'Installation Issue' },
  { id: 'iss_other', title: 'Other' },
];

// ---------------------------------------------------------------------------
// ACTIVE — sequential questions. Works without Business Verification.
// ---------------------------------------------------------------------------

export const SALES_STEPS: Step[] = [
  {
    key: 'vehicle',
    prompt: 'Which car do you have?',
    input: 'list',
    listButton: 'Choose your car',
    options: VEHICLE_OPTIONS,
  },
  { key: 'full_name', prompt: 'What is your full name?', input: 'text' },
  { key: 'address', prompt: 'What is the installation address?', input: 'text' },
  { key: 'city', prompt: 'Which city?', input: 'text' },
];

export const COMPLAINT_STEPS: Step[] = [
  { key: 'full_name', prompt: 'What is your full name?', input: 'text' },
  { key: 'address', prompt: 'What is your address?', input: 'text' },
  { key: 'city', prompt: 'Which city?', input: 'text' },
  { key: 'charger_model', prompt: 'Which car charger do you have?', input: 'text' },
  {
    key: 'issue_type',
    prompt: 'What problem are you having with the charger?',
    input: 'list',
    listButton: 'Choose issue',
    options: ISSUE_OPTIONS,
  },
];

// ---------------------------------------------------------------------------
// PARKED — single-form versions. Swap these in once Meta verifies the business
// and the two Flow IDs are set in .env.local.
// ---------------------------------------------------------------------------

export const SALES_STEPS_FLOW: Step[] = [
  {
    key: 'vehicle',
    prompt: 'Which car do you have?',
    input: 'list',
    listButton: 'Choose your car',
    options: VEHICLE_OPTIONS,
  },
  {
    key: 'details',
    prompt: 'Kindly share the following details.',
    input: 'flow',
    flowIdEnv: 'WA_SALES_FLOW_ID',
    flowCta: 'Enter details',
    flowScreen: 'DETAILS',
  },
];

export const COMPLAINT_STEPS_FLOW: Step[] = [
  {
    key: 'details',
    prompt: 'Kindly share the following details.',
    input: 'flow',
    flowIdEnv: 'WA_COMPLAINT_FLOW_ID',
    flowCta: 'Enter details',
    flowScreen: 'DETAILS',
  },
  {
    key: 'issue_type',
    prompt: 'What problem are you having with the charger?',
    input: 'list',
    listButton: 'Choose issue',
    options: ISSUE_OPTIONS,
  },
];

export const SALES_DONE = (leadNumber: string) =>
  `Thank you.\nYour enquiry has been registered.\nA Multiline representative will contact you shortly.\n\nLead ID: ${leadNumber}`;

export const COMPLAINT_DONE = (ticket: string) =>
  `Your complaint has been registered.\nTicket: ${ticket}\n\nOur support team will contact you shortly.`;

export const FALLBACK_TEXT =
  'Please use the options shown above. Reply "menu" to start again.';

/**
 * Prefilled website links. Keep these EXACT — the lookup is an exact match,
 * not fuzzy parsing, so a stray word silently breaks attribution.
 */
export const PREFILL_MAP: Record<string, { source: string; flow: 'sales' | 'complaint' }> = {
  "hi, i'd like to enquire about an ev charger.": { source: 'website:enquiry', flow: 'sales' },
  'hi, i need support with my multiline ev charger.': { source: 'website:support', flow: 'complaint' },
};

// --- limit checks: fail at import time, not in front of a customer
const ALL_STEP_SETS = [
  ['sales', SALES_STEPS],
  ['complaint', COMPLAINT_STEPS],
  ['sales(flow)', SALES_STEPS_FLOW],
  ['complaint(flow)', COMPLAINT_STEPS_FLOW],
] as const;

for (const [label, steps] of ALL_STEP_SETS) {
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
    if (s.input === 'flow') {
      if (!s.flowIdEnv || !s.flowCta || !s.flowScreen) {
        throw new Error(`${label}.${s.key}: flowIdEnv, flowCta and flowScreen are required`);
      }
      if (s.flowCta.length > 20) throw new Error(`${label}.${s.key}: flow CTA exceeds 20 chars`);
    }
  }
}
if (GREETING_BUTTONS.some((b) => b.title.length > 20)) {
  throw new Error('greeting button title exceeds 20 chars');
}