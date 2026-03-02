-- ============================================================================
-- Migration 0002: Add new enum values to app_role
-- Must be separate from usage (Postgres limitation)
-- ============================================================================

ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'pro';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'standard';
