-- v0.2.x: VM-pattern RBAC (Jason A2 decision).
--
-- A user can hold different roles for different VM patterns within the same
-- cluster. Examples:
--   (alice, cluster1, '*'      , viewer)    -- read everything
--   (alice, cluster1, 'web-*'  , operator)  -- can power web-* VMs
--   (alice, cluster1, 'tag:dev', admin)     -- full control over dev-tagged VMs
--
-- Pattern matching: fnmatch glob. Special prefix `tag:` matches against the
-- VM's tag list (any-of). All other patterns match against the VM name.
-- '*' matches any VM (the default for any pre-A2 role row).
--
-- SQLite can't drop UNIQUE constraints with ALTER TABLE, so we rebuild
-- the table.

CREATE TABLE roles_new (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cluster_id  TEXT NOT NULL,                           -- '*' = any cluster
    vm_pattern  TEXT NOT NULL DEFAULT '*',               -- '*' = any VM
    role        TEXT NOT NULL CHECK (role IN ('viewer','operator','admin')),
    created_at  INTEGER NOT NULL,
    UNIQUE (user_id, cluster_id, vm_pattern)
);

INSERT INTO roles_new (id, user_id, cluster_id, vm_pattern, role, created_at)
SELECT id, user_id, cluster_id, '*', role, created_at FROM roles;

DROP TABLE roles;
ALTER TABLE roles_new RENAME TO roles;
CREATE INDEX idx_roles_user ON roles(user_id);
CREATE INDEX idx_roles_cluster ON roles(cluster_id, vm_pattern);

INSERT INTO schema_version (version, applied_at)
    VALUES (3, CAST(strftime('%s', 'now') AS INTEGER) * 1000);
