-- v0.9.1 — root-pool (boot) mirror operations.
--
-- Replacing a disk in rpool is the highest-risk thing this product can do: the
-- pool holds the bootloader, /etc/pve AND (by PVE default) every VM disk on
-- local-zfs. A resilver runs for hours, so the operator WILL navigate away and
-- come back — the whole point of this table is that the job survives that, and
-- a daemon restart, and still shows where it got to.
--
-- Distinct from zfs_jobs (which tracks a single command) because this is a
-- staged workflow: preflight -> clone partition table -> install bootloader ->
-- attach -> resilver -> [operator confirms] -> detach -> clean. Each stage is
-- recorded so the UI can rebuild the whole timeline on a revisit.

CREATE TABLE IF NOT EXISTS boot_mirror_jobs (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    cluster_id    TEXT    NOT NULL,
    node          TEXT    NOT NULL,
    pool          TEXT    NOT NULL,

    -- add_mirror   : single-disk rpool -> mirror (nothing removed)
    -- replace_live : old disk still healthy; attach then detach it
    -- replace_dead : old disk FAULTED/REMOVED; zpool replace
    scenario      TEXT    NOT NULL,

    -- by-id names (never /dev/sdX)
    source_disk   TEXT,              -- whose partition table we clone
    old_disk      TEXT,              -- the member being replaced (NULL for add_mirror)
    new_disk      TEXT    NOT NULL,

    -- preflight -> cloning -> bootloader -> attaching -> resilvering
    -- -> awaiting_detach -> detaching -> cleaning -> done | failed | aborted
    stage         TEXT    NOT NULL DEFAULT 'preflight',
    status        TEXT    NOT NULL DEFAULT 'running',   -- running|done|failed|aborted
    progress      REAL    NOT NULL DEFAULT 0,           -- resilver %

    created_by    TEXT,
    created_at    INTEGER NOT NULL,
    updated_at    INTEGER NOT NULL,
    finished_at   INTEGER,

    -- preflight results, the planned commands, GPT backup path, scan snapshots
    detail_json   TEXT
);

-- Per-stage log so a returning operator sees the whole story, not just "running".
CREATE TABLE IF NOT EXISTS boot_mirror_events (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id    INTEGER NOT NULL REFERENCES boot_mirror_jobs(id) ON DELETE CASCADE,
    ts        INTEGER NOT NULL,
    kind      TEXT    NOT NULL,      -- info | warn | error | command | stage
    message   TEXT    NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bmj_cluster ON boot_mirror_jobs (cluster_id, id DESC);
CREATE INDEX IF NOT EXISTS idx_bmj_active  ON boot_mirror_jobs (status, stage);
CREATE INDEX IF NOT EXISTS idx_bme_job     ON boot_mirror_events (job_id, id);

INSERT INTO schema_version (version, applied_at)
VALUES (10, strftime('%s','now'))
ON CONFLICT DO NOTHING;
