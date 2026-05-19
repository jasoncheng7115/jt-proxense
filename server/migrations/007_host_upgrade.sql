-- 007_host_upgrade.sql — v0.6.0
--
-- Batch host upgrade orchestrator. One "job" is a rolling sweep across
-- N selected hosts; each host walks the steps below in order. Per-host
-- failure skips that host but does not abort the job.
--
-- We persist EVERY step transition + relevant payload because:
--   1. A jt-proxense daemon restart mid-upgrade must resume cleanly;
--   2. Operators want a full forensic log of "what migrated where, when".
--
-- Status vocabulary (per-host):
--   queued            — accepted, waiting for the rolling slot
--   evacuating        — migrating VMs/CTs off the host
--   updating          — apt update + dist-upgrade running over SSH
--   awaiting_reboot   — apt done; paused, waiting for admin reboot decision
--   rebooting         — node sent reboot, polling for "back online"
--   restoring         — migrating VMs/CTs back to the original host
--   done              — fully completed (or admin chose "no reboot" and "no migrate-back")
--   failed            — any step errored; job continues with next host
--   skipped           — admin explicitly skipped this host mid-job

CREATE TABLE IF NOT EXISTS host_upgrade_jobs (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    cluster_id      TEXT NOT NULL,
    created_by      TEXT NOT NULL,
    created_at      INTEGER NOT NULL,
    started_at      INTEGER,
    finished_at     INTEGER,
    -- Lifecycle states: pending → running → done | aborted
    status          TEXT NOT NULL DEFAULT 'pending',
    -- Wizard options snapshot (JSON):
    --   target_mode: "auto" | "manual"
    --   target_manual: { "<node>": "<target_node>", ... }   (manual mode)
    --   migrate_back: bool
    --   reboot_policy: "ask"   (room for "auto-if-required" later)
    --   apt_cmd: snapshot of the actual command issued
    options_json    TEXT NOT NULL DEFAULT '{}',
    -- Operator's selected node list (JSON array of names, in order).
    nodes_json      TEXT NOT NULL DEFAULT '[]'
);

CREATE INDEX IF NOT EXISTS idx_hu_jobs_cluster   ON host_upgrade_jobs(cluster_id);
CREATE INDEX IF NOT EXISTS idx_hu_jobs_created   ON host_upgrade_jobs(created_at DESC);

CREATE TABLE IF NOT EXISTS host_upgrade_nodes (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id          INTEGER NOT NULL,
    node            TEXT NOT NULL,
    -- Position in the rolling queue (1-based).
    ordinal         INTEGER NOT NULL,
    status          TEXT NOT NULL DEFAULT 'queued',
    target_node     TEXT,                  -- resolved at evacuation time
    started_at      INTEGER,
    finished_at     INTEGER,
    error           TEXT,                  -- last failure reason if status='failed'
    -- Resume metadata + summary (JSON):
    --   evacuated: [{vmid, type, target_node, upid, ok}]
    --   apt_out_head / apt_out_tail: short log snippets
    --   reboot_required: bool
    --   restored: [{vmid, type, ok}]
    detail_json     TEXT NOT NULL DEFAULT '{}',
    FOREIGN KEY (job_id) REFERENCES host_upgrade_jobs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_hu_nodes_job      ON host_upgrade_nodes(job_id, ordinal);

CREATE TABLE IF NOT EXISTS host_upgrade_events (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    node_id         INTEGER NOT NULL,
    ts              INTEGER NOT NULL,
    kind            TEXT NOT NULL,         -- "step", "info", "warn", "error"
    message         TEXT NOT NULL,
    FOREIGN KEY (node_id) REFERENCES host_upgrade_nodes(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_hu_events_node    ON host_upgrade_events(node_id, ts);

INSERT INTO schema_version (version, applied_at)
VALUES (7, strftime('%s','now'))
ON CONFLICT DO NOTHING;
