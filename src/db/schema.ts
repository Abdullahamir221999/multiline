import {
  pgTable, text, timestamp, jsonb, serial, integer, index, uniqueIndex,doublePrecision,
} from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  whatsappNumber: text('whatsapp_number').notNull(),
  name: text('name'),
  city: text('city'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  waUnique: uniqueIndex('customers_whatsapp_number_key').on(t.whatsappNumber),
}));

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  leadNumber: text('lead_number').notNull(),
  customerId: integer('customer_id').notNull().references(() => customers.id),
  vehicle: text('vehicle'),
  address: text('address'),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
  source: text('source').notNull().default('whatsapp'),
  status: text('status').notNull().default('New'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  numUnique: uniqueIndex('leads_lead_number_key').on(t.leadNumber),
  custIdx: index('leads_customer_id_idx').on(t.customerId),
}));

export const complaints = pgTable('complaints', {
  id: serial('id').primaryKey(),
  ticketNumber: text('ticket_number').notNull(),
  customerId: integer('customer_id').notNull().references(() => customers.id),
  address: text('address'),
  statusUpdatedAt: timestamp('status_updated_at', { withTimezone: true }),
  chargerModel: text('charger_model'),
  issueType: text('issue_type'),
  status: text('status').notNull().default('Open'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  numUnique: uniqueIndex('complaints_ticket_number_key').on(t.ticketNumber),
  custIdx: index('complaints_customer_id_idx').on(t.customerId),
}));

export const conversations = pgTable('conversations', {
  whatsappNumber: text('whatsapp_number').primaryKey(),
  flow: text('flow'),                        // 'sales' | 'complaint' | null
  currentStep: text('current_step'),         // step key, null = at greeting
  temporaryData: jsonb('temporary_data').$type<Record<string, string>>().notNull().default({}),
  humanHandoff: text('human_handoff').notNull().default('false'),
  lastCustomerMessageAt: timestamp('last_customer_message_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Idempotency + audit. Meta redelivers webhooks on any timeout or non-2xx. */
export const messageLog = pgTable('message_log', {
  id: serial('id').primaryKey(),
  whatsappNumber: text('whatsapp_number').notNull(),
  direction: text('direction').notNull(),    // inbound | outbound_bot | outbound_human
  messageId: text('message_id'),
  payload: jsonb('payload').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  msgUnique: uniqueIndex('message_log_message_id_key').on(t.messageId),
}));