-- v0.9.0 — ZFS pool maintenance jobs.
--
-- A resilver or scrub outlives the browser tab that started it (and often the
-- daemon too), so long-running zpool operations get a row here the same way
-- vm_export (008) and host_upgrade (007) do. `status='running'` rows found at
-- startup are marked 'orphaned' rather than resumed: the pool carries on by
-- itself, but we can no longer claim to be watching it.

CREATE TABLE IF NOT EXISTS zfs_jobs (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    cluster_id   TEXT    NOT NULL,
    node         TEXT    NOT NULL,
    pool         TEXT    NOT NULL,
    -- replace | scrub | attach | expand
    kind         TEXT    NOT NULL,
    -- running | done | warning | failed | orphaned
    status       TEXT    NOT NULL DEFAULT 'running',
    progress     REAL    NOT NULL DEFAULT 0,
    created_by   TEXT,
    created_at   INTEGER NOT NULL,
    finished_at  INTEGER,
    -- the exact shell command we ran, for the audit trail and for operators
    -- who want to re-run it by hand
    command      TEXT,
    detail_json  TEXT
);

CREATE INDEX IF NOT EXISTS idx_zfs_jobs_cluster ON zfs_jobs (cluster_id, id DESC);
CREATE INDEX IF NOT EXISTS idx_zfs_jobs_status  ON zfs_jobs (status);

-- Record the version. Every migration file is responsible for stamping itself:
-- apply_migrations() decides what to run from MAX(version), so a file that
-- omits this re-runs on every single startup (silently, since the DDL above is
-- all IF NOT EXISTS) and schema_version never advances.
INSERT INTO schema_version (version, applied_at)
VALUES (9, strftime('%s','now'))
ON CONFLICT DO NOTHING;
