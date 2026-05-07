-- v0.3.x — encrypted at-rest store for per-cluster secrets.
--
-- Used initially for the PVE password the noVNC console proxy needs (PVE
-- rejects API tokens at the WS Upgrade step, so we mint a PVEAuthCookie).
-- Anything else that's a per-cluster credential (PBS token, SDN signing
-- key, ...) can reuse this table by picking a new `kind` value.
--
-- The `payload` is a Fernet token (AES-128-CBC + HMAC-SHA256) produced
-- against /etc/jt-proxense/master.key. Losing master.key permanently
-- locks every row in here — keep a backup.

CREATE TABLE IF NOT EXISTS cluster_secrets (
    cluster_id  TEXT NOT NULL,
    kind        TEXT NOT NULL,    -- 'pve_password' | 'pbs_token' | ...
    payload     BLOB NOT NULL,    -- Fernet token (already encrypted+MACed)
    -- Identifies WHICH master key encrypted this row, so rotate-key can
    -- skip rows it just rewrote and operators can audit migrations.
    key_id      TEXT NOT NULL,
    created_at  INTEGER NOT NULL,
    updated_at  INTEGER NOT NULL,
    PRIMARY KEY (cluster_id, kind)
);

CREATE INDEX IF NOT EXISTS idx_cluster_secrets_cluster
    ON cluster_secrets(cluster_id);

-- Audit-log style trail for secret writes/rotations. Lets operators see
-- "who set what when" without exposing the value. Deliberately separate
-- from the main audit log: those rows are append-only with hash chains;
-- this one is just an event timeline for ops.
CREATE TABLE IF NOT EXISTS cluster_secret_events (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    cluster_id  TEXT NOT NULL,
    kind        TEXT NOT NULL,
    event       TEXT NOT NULL,    -- 'set' | 'rm' | 'rotate' | 'import' | 'migrate'
    actor       TEXT NOT NULL,    -- username or 'system' for migrations
    ts          INTEGER NOT NULL,
    note        TEXT
);

CREATE INDEX IF NOT EXISTS idx_cluster_secret_events_ts
    ON cluster_secret_events(ts DESC);

INSERT INTO schema_version (version, applied_at)
VALUES (5, CAST(strftime('%s', 'now') AS INTEGER) * 1000);
