-- Sequences drive ML-EV-0001 / ML-EVC-0001. Never generate these in app code:
-- concurrent webhooks will collide.
CREATE SEQUENCE IF NOT EXISTS lead_number_seq START 1;
CREATE SEQUENCE IF NOT EXISTS ticket_number_seq START 1;

CREATE TABLE IF NOT EXISTS customers (
  id                SERIAL PRIMARY KEY,
  whatsapp_number   TEXT NOT NULL,
  name              TEXT,
  city              TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS customers_whatsapp_number_key ON customers (whatsapp_number);

CREATE TABLE IF NOT EXISTS leads (
  id                SERIAL PRIMARY KEY,
  lead_number       TEXT NOT NULL,
  customer_id       INTEGER NOT NULL REFERENCES customers(id),
  vehicle           TEXT,
  vehicle_matched   TEXT,
  site_phase        TEXT,
  installation_type TEXT,
  charger_interest  TEXT,
  notes             TEXT,
  source            TEXT NOT NULL DEFAULT 'whatsapp',
  status            TEXT NOT NULL DEFAULT 'New',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS leads_lead_number_key ON leads (lead_number);
CREATE INDEX IF NOT EXISTS leads_customer_id_idx ON leads (customer_id);

CREATE TABLE IF NOT EXISTS complaints (
  id                SERIAL PRIMARY KEY,
  ticket_number     TEXT NOT NULL,
  customer_id       INTEGER NOT NULL REFERENCES customers(id),
  charger_model     TEXT,
  issue_type        TEXT,
  description       TEXT,
  attachment_url    TEXT,
  status            TEXT NOT NULL DEFAULT 'Open',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS complaints_ticket_number_key ON complaints (ticket_number);
CREATE INDEX IF NOT EXISTS complaints_customer_id_idx ON complaints (customer_id);

CREATE TABLE IF NOT EXISTS conversations (
  whatsapp_number          TEXT PRIMARY KEY,
  flow                     TEXT,
  current_step             TEXT,
  temporary_data           JSONB NOT NULL DEFAULT '{}'::jsonb,
  human_handoff            TEXT NOT NULL DEFAULT 'false',
  last_customer_message_at TIMESTAMPTZ,
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS message_log (
  id                SERIAL PRIMARY KEY,
  whatsapp_number   TEXT NOT NULL,
  direction         TEXT NOT NULL,
  message_id        TEXT,
  payload           JSONB NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS message_log_message_id_key ON message_log (message_id);