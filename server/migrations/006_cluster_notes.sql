-- v0.3.19 — Per-cluster free-form ops notes.
--
-- Operators leave reminders like "PROD cluster — never reboot host-101 during
-- business hours" or "host-104 still on legacy SSDs, plan migration before
-- end of Q3". Plain text, no markdown rendering — kept simple on purpose.

CREATE TABLE IF NOT EXISTS cluster_notes (
    cluster_id   TEXT PRIMARY KEY,
    notes        TEXT NOT NULL DEFAULT '',
    updated_by   TEXT NOT NULL DEFAULT '',
    updated_at   INTEGER NOT NULL DEFAULT 0
);

INSERT INTO schema_version (version, applied_at)
VALUES (6, strftime('%s','now'))
ON CONFLICT DO NOTHING;
