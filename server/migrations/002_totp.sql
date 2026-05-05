-- v0.2.x: TOTP 2FA + backup codes.
--
-- TOTP secrets are stored as base32 strings (RFC 4226). We do NOT encrypt
-- them on disk — the threat model assumes the host filesystem is the
-- security boundary (root has the secret, and root can patch the binary
-- anyway). Operators who want at-rest encryption should use LUKS on
-- /var/lib/jt-proxense.

ALTER TABLE users ADD COLUMN totp_secret TEXT;
ALTER TABLE users ADD COLUMN totp_enabled INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN totp_enrolled_at INTEGER;

-- Backup codes: 8 single-use codes generated at enrollment. Hashed.
CREATE TABLE totp_backup_codes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code_hash   TEXT NOT NULL,
    used_at     INTEGER,
    created_at  INTEGER NOT NULL
);
CREATE INDEX idx_totp_backup_user ON totp_backup_codes(user_id, used_at);

INSERT INTO schema_version (version, applied_at)
    VALUES (2, CAST(strftime('%s', 'now') AS INTEGER) * 1000);
