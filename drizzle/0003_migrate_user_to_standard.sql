-- ============================================================================
-- Migration 0003: Migrate existing 'user' rows to 'standard'
-- Runs in separate transaction after enum values exist
-- ============================================================================

UPDATE users SET role = 'standard' WHERE role = 'user';
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'standard';
