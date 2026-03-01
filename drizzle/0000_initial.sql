-- ============================================================================
-- biztec-connect: Initial Migration
-- Consolidated from 11 Supabase migrations into a single Drizzle migration.
-- Creates 2 enums + 9 tables + indexes + triggers + default admin user.
-- ============================================================================

-- ─── Enums ──────────────────────────────────────────────────────────────────────

CREATE TYPE app_role AS ENUM ('admin', 'user');
CREATE TYPE template_sector AS ENUM ('general', 'restaurant', 'real-estate', 'construction', 'cleaning');

-- ─── 1. Users ───────────────────────────────────────────────────────────────────
-- Replaces Supabase auth.users + user_roles

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- ─── 2. Sessions ────────────────────────────────────────────────────────────────
-- Custom auth sessions (replaces Supabase auth sessions)

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_sessions_token ON sessions(token);

-- ─── 3. Templates ───────────────────────────────────────────────────────────────

CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sector template_sector NOT NULL DEFAULT 'general',
  description TEXT,
  html_content TEXT NOT NULL,
  thumbnail_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  editor_schema JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- ─── 4. Profiles ────────────────────────────────────────────────────────────────
-- Main card data table (~25 columns from accumulated Supabase migrations)

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  selected_template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
  slug TEXT UNIQUE,
  is_published BOOLEAN DEFAULT false,
  full_name TEXT,
  title TEXT,
  company TEXT,
  profile_image_url TEXT,
  cover_image_url TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  bio TEXT,
  video_url TEXT,
  cta_text TEXT,
  cta_url TEXT,
  booking_url TEXT,
  booking_type TEXT,
  website_url TEXT,
  review_url TEXT,
  background_image_url TEXT,
  section_title TEXT,
  services JSONB,
  cta_button_text TEXT,
  social_links JSONB,
  custom_styles JSONB,
  custom_data JSONB,
  sector TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_profiles_slug ON profiles(slug);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- ─── 5. Testimonials ────────────────────────────────────────────────────────────

CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  video_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_testimonials_profile_id ON testimonials(profile_id);

-- ─── 6. Certificates ────────────────────────────────────────────────────────────

CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image_url TEXT,
  license_number TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_certificates_profile_id ON certificates(profile_id);

-- ─── 7. Gallery Images ──────────────────────────────────────────────────────────

CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_gallery_images_profile_id ON gallery_images(profile_id);

-- ─── 8. Analytics Events ────────────────────────────────────────────────────────

CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'click')),
  button_name TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_analytics_events_profile_id ON analytics_events(profile_id);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);

-- ─── 9. Subscriptions ───────────────────────────────────────────────────────────

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'standard' CHECK (plan IN ('standard', 'pro')),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- ─── Triggers: auto-update updated_at ────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Seed: Default admin user ───────────────────────────────────────────────────
-- Password: admin123 (bcrypt, 12 rounds) - CHANGE IMMEDIATELY in production

INSERT INTO users (email, password_hash, role)
VALUES ('admin@biztec.com', '$2b$12$LJ3m4ys3Lk0TSwHIGBq3Y.5P7E7fLiQsSkm4TH8ohTBs5xgfBvEi2', 'admin')
ON CONFLICT (email) DO NOTHING;
