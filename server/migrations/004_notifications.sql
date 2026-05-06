-- v0.3.x: notifications subsystem.
--
-- Operators define channels (where to send) and rules (what triggers a send).
-- Channels include webhook (POST JSON) + email (SMTP). Rules match audit-row
-- attributes — action LIKE pattern, min severity (ok/denied/error), cluster
-- filter — and route to one or more channels.

CREATE TABLE notification_channels (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL UNIQUE,
    type        TEXT    NOT NULL CHECK (type IN ('webhook','email')),
    enabled     INTEGER NOT NULL DEFAULT 1,
    config_json TEXT    NOT NULL,           -- JSON blob, schema by type
    created_at  INTEGER NOT NULL,
    updated_at  INTEGER NOT NULL
);

CREATE TABLE notification_rules (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT    NOT NULL UNIQUE,
    enabled         INTEGER NOT NULL DEFAULT 1,
    -- Match criteria. NULL = match anything.
    action_pattern  TEXT,                   -- SQL LIKE pattern (e.g. 'auth.%')
    min_severity    TEXT NOT NULL DEFAULT 'ok'
                    CHECK (min_severity IN ('ok','notice','warning','error')),
    cluster_filter  TEXT,                   -- exact match or NULL
    -- Routing. JSON list of channel ids.
    channel_ids_json TEXT NOT NULL DEFAULT '[]',
    created_at      INTEGER NOT NULL
);

CREATE INDEX idx_notif_channels_enabled ON notification_channels(enabled);
CREATE INDEX idx_notif_rules_enabled    ON notification_rules(enabled);

INSERT INTO schema_version (version, applied_at)
    VALUES (4, CAST(strftime('%s', 'now') AS INTEGER) * 1000);
