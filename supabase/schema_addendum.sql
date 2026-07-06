-- ============================================================
-- Niyo Uniformals – Supabase Schema Addendum
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- (This extends the existing schema with new CMS + customer tables)
-- ============================================================

-- ─── TESTIMONIALS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  role          TEXT,
  quote         TEXT NOT NULL,
  rating        INT  DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar_url    TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  display_order INT     DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active testimonials"
  ON testimonials FOR SELECT USING (is_active = true);

CREATE POLICY "Admin full access testimonials"
  ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- Seed default testimonials
INSERT INTO testimonials (name, role, quote, rating, is_active, display_order) VALUES
  ('Rajesh Kumar',  'Principal, Delhi Public School',   'Niyo Uniformals delivered 500+ school uniforms on time with exceptional quality. The stitching is perfect and the fabric is durable. Highly recommended for bulk orders!', 5, true, 1),
  ('Priya Sharma',  'HR Manager, Star Hotels Group',    'We''ve been ordering hospitality uniforms from Niyo for 3 years. The consistency in quality and prompt delivery make them our go-to vendor.',                    5, true, 2),
  ('Dr. Amit Verma','Administrator, Max Healthcare',    'Professional medical uniforms at competitive prices. The customization options for our hospital logo were seamless. Great experience overall.',               4, true, 3)
ON CONFLICT DO NOTHING;

-- ─── BANNERS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banners (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  subtitle      TEXT,
  image_url     TEXT,
  cta_text      TEXT,
  cta_url       TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  display_order INT     DEFAULT 1,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active banners"
  ON banners FOR SELECT USING (is_active = true);

CREATE POLICY "Admin full access banners"
  ON banners FOR ALL USING (auth.role() = 'authenticated');

-- Seed default banners
INSERT INTO banners (title, subtitle, cta_text, cta_url, is_active, display_order) VALUES
  ('Dress Your Team in Excellence',  'Wholesale & retail uniforms for schools, corporates, hospitals and more — from Gandhi Nagar, East Delhi.',   'Browse Catalogue', '/catalogue',  true, 1),
  ('Bulk Orders Welcome',            'Minimum order of 50 pieces. Custom embroidery & printing available for all uniform types.',                   'Request a Quote',  '/bulk-order', true, 2)
ON CONFLICT DO NOTHING;

-- ─── CUSTOMER PROFILES ────────────────────────────────────────
-- Extends Supabase auth.users with customer-facing profile data
CREATE TABLE IF NOT EXISTS customer_profiles (
  id             UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name      TEXT,
  phone          TEXT,
  organization   TEXT,
  organization_type TEXT, -- school, hospital, corporate, etc.
  gst_number     TEXT,
  address        TEXT,
  city           TEXT,
  state          TEXT,
  pincode        TEXT,
  avatar_url     TEXT,
  is_verified    BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;

-- Customers can only read/edit their own profile
CREATE POLICY "Customer read own profile"
  ON customer_profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Customer update own profile"
  ON customer_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Customer insert own profile"
  ON customer_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admin read all profiles"
  ON customer_profiles FOR SELECT USING (auth.role() = 'authenticated');

-- Auto-create profile on signup via trigger
CREATE OR REPLACE FUNCTION handle_new_customer()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO customer_profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_customer_created ON auth.users;
CREATE TRIGGER on_customer_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_customer();

-- updated_at trigger for customer profiles
DROP TRIGGER IF EXISTS customer_profiles_updated_at ON customer_profiles;
CREATE TRIGGER customer_profiles_updated_at
  BEFORE UPDATE ON customer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── WISHLISTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlists (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id)   ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customer manage own wishlist"
  ON wishlists FOR ALL USING (auth.uid() = user_id);

-- ─── LINK ENQUIRIES TO CUSTOMERS ──────────────────────────────
-- Add user_id column to enquiries so logged-in customers' enquiries are tracked
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Logged-in customers can see their own enquiries
CREATE POLICY "Customer read own enquiries"
  ON enquiries FOR SELECT USING (auth.uid() = user_id);

-- ─── SETTINGS ADDENDUM ────────────────────────────────────────
-- Add new CMS page content keys to settings table
INSERT INTO settings (key, value) VALUES
  ('home_hero_badge',        'Trusted by 500+ Schools & Institutions'),
  ('home_hero_title',        'Dress Your Team in Excellence'),
  ('home_hero_subtitle',     'Wholesale & retail uniforms for schools, corporates, hospitals and more — from Gandhi Nagar, East Delhi.'),
  ('home_hero_cta_primary',  'Browse Catalogue'),
  ('home_hero_cta_secondary','Get a Bulk Quote'),
  ('why_us_title',           'Why Choose Niyo Uniformals?'),
  ('why_us_point_1',         '500+ Institutions Served'),
  ('why_us_point_2',         'MOQ of just 50 pieces'),
  ('why_us_point_3',         'Custom Embroidery & Printing'),
  ('why_us_point_4',         'Pan India Delivery'),
  ('about_story_title',      'Our Story'),
  ('about_story_content',    '<p>Started in 1994 at Gandhi Nagar, East Delhi, Niyo Uniformals has grown to become one of the most trusted wholesale uniform manufacturers in India.</p><p>We serve over 500 institutions across healthcare, education, hospitality, and corporate sectors.</p>'),
  ('about_founded_year',     '1994'),
  ('about_location',         'Gandhi Nagar, East Delhi'),
  ('stat_institutions',      '500+'),
  ('stat_years',             '30+'),
  ('stat_products',          '200+'),
  ('stat_cities',            '50+'),
  ('bulk_hero_title',        'Bulk & Wholesale Orders'),
  ('bulk_hero_subtitle',     'Minimum order of 50 pieces. Custom branding, embroidery, and printing available on all uniform types.'),
  ('bulk_moq',               '50 pieces'),
  ('bulk_lead_time',         '7-14 business days')
ON CONFLICT (key) DO NOTHING;

-- ─── STORAGE BUCKET POLICY ────────────────────────────────────
-- Run these in the Supabase dashboard → Storage → Policies
-- (or via CLI). The product-images bucket should be public.
-- 
-- Policy: Allow public to read any object in product-images
-- INSERT INTO storage.policies ...
-- Use the dashboard UI: Storage → product-images → Policies → Add Policy → "Select" for public.

-- ─── INDEXES (new tables) ─────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_testimonials_active  ON testimonials(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_order   ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_banners_active        ON banners(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_banners_order         ON banners(display_order);
CREATE INDEX IF NOT EXISTS idx_wishlists_user        ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_user        ON enquiries(user_id);
