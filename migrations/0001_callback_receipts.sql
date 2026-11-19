CREATE TABLE callback_receipts (
  reference TEXT PRIMARY KEY,
  phone_key TEXT NOT NULL,
  client_key TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('pending', 'sent'))
);
CREATE INDEX callback_by_phone ON callback_receipts (phone_key, created_at DESC);
CREATE INDEX callback_by_client ON callback_receipts (client_key, created_at);
CREATE INDEX callback_by_time ON callback_receipts (created_at);
