-- v0.9.3 — PVE tasks whose outcome we still owe the audit log.
--
-- task_outcome watchers used to live only in memory, so a daemon restart threw
-- them away and the outcome row simply never arrived. That is indistinguishable
-- from a broken watcher (it cost real debugging time to tell them apart), and
-- more importantly it leaves a silent hole in the audit trail — the exact thing
-- the watcher exists to close.
--
-- One row per in-flight task. The watcher deletes its row once it has written
-- the outcome, so a non-empty table means "outcomes still owed": on startup we
-- re-attach a watcher to each, and any whose deadline already passed gets a
-- `timeout` outcome recorded immediately rather than being forgotten.

CREATE TABLE IF NOT EXISTS pending_tasks (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    cluster_id   TEXT    NOT NULL,
    node         TEXT    NOT NULL,
    upid         TEXT    NOT NULL,

    -- everything needed to write the outcome row without the original request
    action       TEXT    NOT NULL,
    actor        TEXT,
    source_ip    TEXT,
    request_id   TEXT,
    target       TEXT,
    params_json  TEXT,

    created_at   INTEGER NOT NULL,
    deadline_at  INTEGER NOT NULL,      -- unix seconds; past = record timeout

    UNIQUE (cluster_id, node, upid)
);

CREATE INDEX IF NOT EXISTS idx_pending_deadline ON pending_tasks (deadline_at);

INSERT INTO schema_version (version, applied_at)
VALUES (11, strftime('%s','now'))
ON CONFLICT DO NOTHING;
