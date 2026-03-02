-- ============================================================================
-- Migration 0002: Update app_role enum
-- Adds 'pro' and 'standard' values, migrates 'user' -> 'standard'
-- ============================================================================

-- Add new enum values (IF NOT EXISTS requires PostgreSQL 9.3+)
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'pro';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'standard';

-- Migrate existing 'user' rows to 'standard'
UPDATE users SET role = 'standard' WHERE role = 'user';

-- Update the default for new users
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'standard';
