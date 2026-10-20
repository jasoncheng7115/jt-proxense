-- v1.2.0 — pinned TLS certificate / SSH host-key fingerprints (trust on first use).
--
-- verify_ssl defaults to false because PVE ships self-signed certificates, and
-- SSH connected with known_hosts=None — so a control plane holding root SSH and
-- API tokens accepted whatever answered on a node's address. Now the first
-- fingerprint seen for an endpoint is recorded, and a DIFFERENT one later is
-- refused until an admin accepts it (UI or CLI), which is what re-imaging a
-- node legitimately requires and what an interception would also look like.

CREATE TABLE IF NOT EXISTS trusted_endpoints (
    kind            TEXT    NOT NULL,          -- 'tls' | 'ssh'
    endpoint        TEXT    NOT NULL,          -- 'host:port'
    fingerprint     TEXT    NOT NULL,          -- sha256, lower-case hex (tls) / 'SHA256:…' (ssh)
    first_seen      INTEGER NOT NULL,
    last_seen       INTEGER NOT NULL,
    -- A different fingerprint that was presented and REFUSED. Cleared when an
    -- admin accepts it (it becomes `fingerprint`) or forgets the endpoint.
    pending         TEXT,
    pending_seen    INTEGER,
    PRIMARY KEY (kind, endpoint)
);

INSERT INTO schema_version (version, applied_at)
VALUES (12, strftime('%s','now'))
ON CONFLICT DO NOTHING;
