-- ============================================================================
-- biztec-connect: Seed Migration (stub)
-- ============================================================================
-- The actual seed data (admin user + HTML templates) is inserted by
-- drizzle/seed.mjs which runs after all SQL migrations.
--
-- This SQL file adds a UNIQUE constraint on templates(name, sector) so that
-- future template inserts can use ON CONFLICT safely.
-- ============================================================================

-- Add unique constraint for idempotent template seeding
ALTER TABLE templates
  ADD CONSTRAINT uq_templates_name_sector UNIQUE (name, sector);

-- Admin user is inserted by seed.mjs with bcrypt-hashed password.
-- Templates are inserted by seed.mjs reading HTML files from disk.
