-- Internal export jobs (VM → OVA / Hyper-V VHDX via jt_pve2ova /
-- jt_pve2hyperv on the PVE node). These are OUR jobs, not PVE tasks:
-- the conversion runs over SSH and must survive the browser window
-- being closed, so state lives here.
CREATE TABLE IF NOT EXISTS export_jobs (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    cluster_id    TEXT    NOT NULL,
    node          TEXT    NOT NULL,
    vmid          INTEGER NOT NULL,
    vm_name       TEXT    NOT NULL DEFAULT '',
    format        TEXT    NOT NULL,              -- 'ova' | 'hyperv'
    opts          TEXT    NOT NULL DEFAULT '{}', -- JSON: esxi_version / lang / mode
    status        TEXT    NOT NULL DEFAULT 'pending',
                  -- pending | running | done | failed | expired | deleted
    work_dir      TEXT    NOT NULL,              -- absolute dir on the node
    output_files  TEXT    NOT NULL DEFAULT '[]', -- JSON [{name, size}]
    log_tail      TEXT    NOT NULL DEFAULT '',
    error         TEXT,
    created_by    TEXT    NOT NULL,
    created_at    INTEGER NOT NULL,
    started_at    INTEGER,
    finished_at   INTEGER,
    expires_at    INTEGER                        -- outputs reaped after this
);

CREATE INDEX IF NOT EXISTS idx_export_jobs_cluster ON export_jobs(cluster_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_export_jobs_status  ON export_jobs(status);

INSERT INTO schema_version (version, applied_at)
VALUES (8, strftime('%s','now'))
ON CONFLICT DO NOTHING;
