-- v0.2 initial schema: auth + audit foundation.
--
-- This file is run once when the DB is empty. Forward-only — never edit
-- after release; new changes go into 002_*.sql, 003_*.sql, etc.

CREATE TABLE schema_version (
    version     INTEGER PRIMARY KEY,
    applied_at  INTEGER NOT NULL
);

CREATE TABLE users (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    username        TEXT    NOT NULL UNIQUE COLLATE NOCASE,
    password_hash   TEXT    NOT NULL,
    enabled         INTEGER NOT NULL DEFAULT 1,
    created_at      INTEGER NOT NULL,
    last_login_at   INTEGER,
    must_change_pw  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE sessions (
    id              TEXT    PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at      INTEGER NOT NULL,
    expires_at      INTEGER NOT NULL,
    last_seen_at    INTEGER NOT NULL,
    source_ip       TEXT,
    user_agent      TEXT
);
CREATE INDEX idx_sessions_user    ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

CREATE TABLE roles (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cluster_id  TEXT NOT NULL,                 -- '*' = global default
    role        TEXT NOT NULL CHECK (role IN ('viewer','operator','admin')),
    created_at  INTEGER NOT NULL,
    UNIQUE (user_id, cluster_id)
);
CREATE INDEX idx_roles_user ON roles(user_id);

CREATE TABLE audit_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    ts          INTEGER NOT NULL,
    user        TEXT    NOT NULL,
    source_ip   TEXT    NOT NULL,
    cluster_id  TEXT,
    action      TEXT    NOT NULL,
    target      TEXT,
    params_hash TEXT,
    result      TEXT    NOT NULL,              -- 'ok'|'denied'|'error:<class>'|'pending'
    request_id  TEXT    NOT NULL
);
CREATE INDEX idx_audit_ts        ON audit_log(ts DESC);
CREATE INDEX idx_audit_user_ts   ON audit_log(user, ts DESC);
CREATE INDEX idx_audit_request   ON audit_log(request_id);

-- Triggers enforcing append-only at the DB layer. The retention CLI
-- explicitly drops and re-creates these around its purge operation
-- so it can DELETE on its own authority.
CREATE TRIGGER audit_no_update BEFORE UPDATE ON audit_log
    BEGIN SELECT RAISE(FAIL, 'audit_log is append-only'); END;
CREATE TRIGGER audit_no_delete BEFORE DELETE ON audit_log
    BEGIN SELECT RAISE(FAIL, 'audit_log is append-only'); END;

CREATE TABLE failed_logins (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    source_ip   TEXT NOT NULL,
    username    TEXT,
    ts          INTEGER NOT NULL
);
CREATE INDEX idx_failed_ip_ts ON failed_logins(source_ip, ts DESC);

INSERT INTO schema_version (version, applied_at)
    VALUES (1, CAST(strftime('%s', 'now') AS INTEGER) * 1000);
