-- ============================================================
-- Niyo Uniformals – Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── CATEGORIES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  display_order INT  DEFAULT 0,
  icon          TEXT DEFAULT 'Tag',        -- Lucide icon name
  color         TEXT DEFAULT '#162d6e',    -- Hex accent color
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PRODUCTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                    TEXT NOT NULL,
  description             TEXT,
  category_id             UUID REFERENCES categories(id) ON DELETE SET NULL,
  fabric                  TEXT,
  price_range             TEXT,
  min_order_qty           INT,
  colors                  TEXT,   -- comma-separated e.g. "Navy, White, Grey"
  tags                    TEXT,   -- comma-separated e.g. "school, winter"
  images                  TEXT[]  DEFAULT '{}',   -- array of public image URLs
  is_featured             BOOLEAN DEFAULT FALSE,
  is_visible              BOOLEAN DEFAULT TRUE,
  display_order           INT     DEFAULT 0,
  customization_available BOOLEAN DEFAULT TRUE,
  fabric_care             TEXT    DEFAULT 'Machine wash warm, tumble dry low. Do not iron on print.',
  bulk_discounts          JSONB   DEFAULT '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "10% Off"}, {"qty": 500, "discount": "20% Off"}]'::jsonb,
  delivery_timeline       TEXT    DEFAULT '7-10 working days',
  gender                  TEXT    DEFAULT 'Unisex',
  price_min               INT     DEFAULT 200,
  price_max               INT     DEFAULT 500,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at on product edits
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── ENQUIRIES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT,
  type          TEXT NOT NULL DEFAULT 'retail' CHECK (type IN ('retail', 'bulk')),
  status        TEXT NOT NULL DEFAULT 'new'    CHECK (status IN ('new', 'read', 'resolved')),
  message       TEXT,
  quantity      INT,
  product_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SETTINGS ────────────────────────────────────────────────
-- Key-value store for all admin-editable site settings
CREATE TABLE IF NOT EXISTS settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default settings (safe to re-run)
INSERT INTO settings (key, value) VALUES
  ('site_name',          'Niyo Uniformals'),
  ('tagline',            'Premium Uniforms for Every Profession'),
  ('hero_title',         'Dress Your Team in Excellence'),
  ('hero_subtitle',      'Wholesale & retail uniforms for schools, corporates, hospitals and more — from Gandhi Nagar, East Delhi.'),
  ('whatsapp_number',    '+919999999999'),
  ('phone',              '+919999999999'),
  ('email',              'info@niyouniforms.com'),
  ('address',            'IX/6202, Jain Mandir Gali, Ram Nagar, Gandhi Nagar, East Delhi, Delhi - 110031'),
  ('business_hours',     'Mon–Sat: 10 AM – 7 PM | Sunday: Closed'),
  ('google_maps_url',    ''),
  ('meta_title',         'Niyo Uniformals – Premium Wholesale Uniforms, Gandhi Nagar Delhi'),
  ('meta_description',   'Buy wholesale and retail uniforms for schools, hospitals, corporate and hospitality at Niyo Uniformals, Gandhi Nagar, Delhi. Bulk orders welcome.'),
  ('og_image_url',       ''),
  ('instagram_url',      ''),
  ('facebook_url',       ''),
  ('youtube_url',        ''),
  ('logo_url',           '')
ON CONFLICT (key) DO NOTHING;

-- ─── SEED CATEGORIES ─────────────────────────────────────────
-- Using fixed UUIDs for categories to allow easy seeding of products with correct category foreign keys
INSERT INTO categories (id, name, slug, display_order, icon, color) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Healthcare & Hospital Uniforms',     'medical',     1,  'Stethoscope',   '#0f766e'),
  ('00000000-0000-0000-0000-000000000002', 'Hotel & Hospitality Uniforms',      'hospitality', 2,  'ChefHat',       '#92400e'),
  ('00000000-0000-0000-0000-000000000003', 'Corporate (Suits, Blazers, Shirts)', 'corporate',   3,  'Briefcase',     '#1e3a8a'),
  ('00000000-0000-0000-0000-000000000004', 'Advocates & Legal (Coats & Gowns)',  'advocate',    4,  'Shield',        '#1e293b'),
  ('00000000-0000-0000-0000-000000000005', 'School Uniforms',                    'school',      5,  'GraduationCap', '#162d6e'),
  ('00000000-0000-0000-0000-000000000006', 'Convocation (Gowns & Caps)',         'convocation', 6,  'Award',         '#7c3aed'),
  ('00000000-0000-0000-0000-000000000007', 'Security & Defence Uniforms',        'security',    7,  'ShieldAlert',   '#7f1d1d'),
  ('00000000-0000-0000-0000-000000000008', 'Industrial & Factory Workwear',      'industrial',  8,  'HardHat',       '#c2410c'),
  ('00000000-0000-0000-0000-000000000009', 'Sports & PE Uniforms',               'sports',      9,  'Activity',      '#15803d'),
  ('00000000-0000-0000-0000-000000000010', 'Banking & Finance Formals',          'banking',     10, 'Coins',         '#0369a1'),
  ('00000000-0000-0000-0000-000000000011', 'Police & Paramilitary (Ceremonial)', 'police',      11, 'Award',         '#1e1b4b'),
  ('00000000-0000-0000-0000-000000000012', 'Fire & Safety Uniforms',             'fire',        12, 'Flame',         '#b91c1c'),
  ('00000000-0000-0000-0000-000000000013', 'Airline & Aviation Crew',            'airline',     13, 'Plane',         '#4338ca')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  display_order = EXCLUDED.display_order,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;

-- ─── SEED PRODUCTS ───────────────────────────────────────────
-- Inserts default professional uniform items for each category
INSERT INTO products (id, name, description, category_id, fabric, price_range, min_order_qty, colors, tags, images, is_featured, is_visible, display_order) VALUES
  -- Medical & Healthcare (combines doctor, nurse, patient gowns)
  ('10000000-0000-0000-0000-000000000001', 'Premium Men''s Professional Lab Coat', 'Classic full-length men''s professional lab coat featuring a tailored chest fit, side vent openings for pocket access, multiple utility pockets, and durable reinforced stitching. Anti-microbial treated.', '00000000-0000-0000-0000-000000000001', '100% Cotton with Liquid Barrier Finish', '₹450 - ₹650', 50, 'White, Light Blue, Navy Blue', 'doctor, medical, lab coat, male', '{"/images/mens_lab_coat.png"}', TRUE, TRUE, 1),
  ('10000000-0000-0000-0000-000000000022', 'Premium Women''s Tailored Lab Coat', 'Princess-seamed women''s professional lab coat featuring a slim, elegant tailored fit, side pocket access, chest utility pocket, and anti-wrinkle fabric. Liquid-barrier and anti-bacterial treated.', '00000000-0000-0000-0000-000000000001', '100% Cotton with Liquid Barrier Finish', '₹450 - ₹650', 50, 'White, Light Blue, Soft Pink', 'doctor, medical, lab coat, female', '{"/images/womens_lab_coat.png"}', TRUE, TRUE, 2),
  ('10000000-0000-0000-0000-000000000002', 'Premium Hospital Unisex OT Scrub Suit', 'Classic medical scrubs set (top and cargo trousers) featuring double chest pockets and drawstring waist. Antimicrobial treated for surgical and general ward duty.', '00000000-0000-0000-0000-000000000001', 'Breathable Poly-Cotton Medical Weave', '₹480 - ₹690', 100, 'Blue, Green, Teal', 'doctor, scrub, ot', '{"/images/ot_scrub_suit.png"}', FALSE, TRUE, 2),
  ('10000000-0000-0000-0000-000000000003', 'Premium Nurse Tunic Uniform (Zip Front)', 'Professional nursing tunic featuring elegant contrast piping, zip front closure, dual deep side pockets, and back action pleats for high flexibility during duty.', '00000000-0000-0000-0000-000000000001', 'Poly-Cotton Easy-Care Poplin', '₹420 - ₹580', 100, 'Light Blue, Pink, White', 'nurse, tunic, healthcare', '{"/images/nurse_tunic.png"}', TRUE, TRUE, 3),
  ('10000000-0000-0000-0000-000000000004', 'Female V-Neck Patient Care Scrub Set', 'Lightweight scrubs designed for nurses, dental assistants, and clinic care teams. Soft touch, fade-resistant fabric with 4-way stretch utility.', '00000000-0000-0000-0000-000000000001', 'Stretchable Poly-Rayon Blend', '₹450 - ₹600', 80, 'Navy, Teal, Lilac', 'nurse, scrub, stretch', '{"/images/female_scrub_set.png"}', FALSE, TRUE, 4),
  ('10000000-0000-0000-0000-000000000005', 'Premium Patient Hospital Gown (Unisex)', 'Comfortable and breathable patient gown featuring a classic back-tie closure and roomy sleeves. Lightweight fabric ensures maximum comfort during extended hospital stays.', '00000000-0000-0000-0000-000000000001', '100% Breathable Soft Cotton', '₹180 - ₹280', 100, 'Light Blue, Patterned', 'patient, gown, hospital', '{"/images/unisex_hospital_gown.png"}', TRUE, TRUE, 5),
  ('10000000-0000-0000-0000-000000000006', 'Disposable Sterile SMS Patient Gown', 'Single-use fluid-resistant sterile patient gown designed for surgical and diagnostic prep. Lightweight SMS barrier fabric provides hygienic protection.', '00000000-0000-0000-0000-000000000001', 'Fluid-Resistant SMS Non-Woven', '₹90 - ₹140', 250, 'Blue', 'patient, disposable, sterile', '{"/images/disposable_patient_gown.png"}', FALSE, TRUE, 6),
  ('10000000-0000-0000-0000-000000000030', 'Surgical Disposable Wraparound Apron', 'Fluid-proof wraparound surgical apron for theatre, autopsy, and clinical procedures. Neck-tie and waist-tie adjustable fit with full torso coverage.', '00000000-0000-0000-0000-000000000001', 'Waterproof PE Laminated Non-Woven', '₹45 - ₹80', 500, 'Blue, White', 'apron, disposable, surgical', '{"/images/disposable_patient_gown.png"}', FALSE, TRUE, 7),
  ('10000000-0000-0000-0000-000000000031', 'Disposable Surgeon Bouffant Cap (Pack of 100)', 'Breathable non-woven bouffant caps with elastic band. Ideal for operation theatres, pharmaceutical labs, and food processing units.', '00000000-0000-0000-0000-000000000001', 'Spunbond Polypropylene Non-Woven', '₹250 - ₹350', 100, 'Blue, Green, White', 'cap, disposable, surgeon', '{"/images/disposable_patient_gown.png"}', FALSE, TRUE, 8),
  ('10000000-0000-0000-0000-000000000032', 'Disposable Anti-Skid Shoe Cover (Pack of 50)', 'Fluid-resistant shoe covers with anti-skid sole grip. Essential for OT, ICU, pharmaceutical clean rooms, and lab environments.', '00000000-0000-0000-0000-000000000001', 'CPE Waterproof Film', '₹180 - ₹250', 200, 'Blue, White', 'shoe cover, disposable, hygiene', '{"/images/disposable_patient_gown.png"}', FALSE, TRUE, 9),
  ('10000000-0000-0000-0000-000000000033', 'Unisex Premium Jogger Scrub Set', 'Modern athletic fit scrub set featuring moisture-wicking 4-way stretch fabric, ribbed knit collar, jogger pants with elastic ankle cuffs, and 6 functional utility pockets.', '00000000-0000-0000-0000-000000000001', '4-Way Stretch Polyester-Spandex Blend', '₹750 - ₹950', 80, 'Teal, Navy Blue, Ceil Blue, Charcoal Grey', 'scrub, jogger, medical, stretch', '{"/images/scrub_jogger.png"}', TRUE, TRUE, 10),
  ('10000000-0000-0000-0000-000000000034', 'Pediatric Specialist Printed Scrub Top', 'Friendly, printed pediatric scrub top featuring cute cartoon characters, stethoscopes, and animal illustrations. Helps put young patients at ease during clinical visits.', '00000000-0000-0000-0000-000000000001', 'Soft-Touch Breathable Cotton-Blend', '₹320 - ₹450', 50, 'Light Blue Print, Pink Print, Mint Print', 'scrub, pediatric, doctor, printed', '{"/images/scrub_pediatric.png"}', FALSE, TRUE, 11),
  ('10000000-0000-0000-0000-000000000035', 'Dentist & Specialist Clinic Wrap Tunic', 'Ergonomic wrap-style tunic with asymmetrical side button closure, mock neck, and twin hip pockets. Designed for dentists, dermatologists, and aesthetic clinic staff.', '00000000-0000-0000-0000-000000000001', 'Stain-Resistant Cotton-Poly Drill', '₹490 - ₹690', 50, 'Pristine White, Lilac, Mint Green', 'tunic, dentist, clinical, specialist', '{"/images/tunic_dentist.png"}', TRUE, TRUE, 12),
  ('10000000-0000-0000-0000-000000000036', 'Hospital Ward Attendant & Staff Uniform Set', 'High-durability utility uniform consisting of a short-sleeve comfort tunic and straight-fit cargo pants. Designed for ward boys, hospital helper staff, and stretcher attendants.', '00000000-0000-0000-0000-000000000001', 'Heavy-Duty Industrial Poly-Cotton', '₹380 - ₹520', 100, 'Navy Blue, Slate Grey, Olive Green', 'ward attendant, helper, staff, cargo', '{"/images/staff_wardboy.png"}', FALSE, TRUE, 13),
  ('10000000-0000-0000-0000-000000000037', 'Autoclavable Surgical Isolation Gown', 'Reusable surgical isolation gown with full back overlap, stockinette cuffs, and tie closures. Constructed to withstand frequent autoclave sterilization cycles.', '00000000-0000-0000-0000-000000000001', '100% Cotton Canvas with Liquid Barrier', '₹280 - ₹380', 100, 'Surgical Green, Sky Blue', 'gown, isolation, surgical, autoclave', '{"/images/gown_isolation.png"}', FALSE, TRUE, 14),
  ('10000000-0000-0000-0000-000000000038', 'Premium Medical Consultation Blazer', 'Tailored short consultation coat for senior doctors and medical consultants. Features elegant notch lapels, structured shoulders, and clean lining.', '00000000-0000-0000-0000-000000000001', 'Premium Tropical Poly-Viscose', '₹950 - ₹1,400', 30, 'White, Charcoal Grey, Navy Blue', 'doctor, blazer, consultation, executive', '{"/images/doctor_blazer.png"}', TRUE, TRUE, 15),
  ('10000000-0000-0000-0000-000000000039', 'Maternity Comfort Scrub Top', 'Specially tailored maternity scrub top with side-panel stretch panels and adjustable drawstrings, allowing comfort and room to grow throughout pregnancy.', '00000000-0000-0000-0000-000000000001', 'Super Soft Bamboo-Cotton Blend', '₹480 - ₹620', 30, 'Royal Blue, Ceil Blue, Burgundy', 'scrub, maternity, comfort, stretch', '{"/images/maternity_scrub.png"}', FALSE, TRUE, 16),
  ('10000000-0000-0000-0000-000000000040', 'Premium Two-Piece Patient Suit', 'Deluxe patient uniform including a front-buttoned short-sleeve shirt and matching elastic waist trousers. Offers dignity and comfort for long-term recovery stays.', '00000000-0000-0000-0000-000000000001', '100% Soft Combed Cotton (Hospital Grade)', '₹320 - ₹480', 100, 'Blue Striped, Green Patterned, Solid White', 'patient, suit, cotton, hospital', '{"/images/patient_pajama.png"}', FALSE, TRUE, 17),
  ('10000000-0000-0000-0000-000000000041', 'Pharmacist Short Sleeve Lab Jacket', 'Professional waist-length lab jacket featuring short sleeves, three patch pockets, and snap-button front. Perfect for pharmacists, lab technicians, and lab assistants.', '00000000-0000-0000-0000-000000000001', 'Durable Twill Poplin', '₹290 - ₹390', 50, 'White, Light Grey', 'pharmacist, lab, short sleeve, jacket', '{"/images/medical_lab_apron.png"}', FALSE, TRUE, 18),
  ('10000000-0000-0000-0000-000000000042', 'Elite Stretch V-Neck Scrub Suit', 'Designer-grade athletic scrub suit with yoga-style waistband, clean V-neck, mesh lining for breathability, and zip pockets. Antimicrobial and wrinkle-free.', '00000000-0000-0000-0000-000000000001', 'Elite Rayon-Poly-Spandex Blend', '₹890 - ₹1,190', 50, 'Olive, Royal Blue, Steel Grey', 'scrub, stretch, elite, V-neck', '{"/images/scrub_premium_fit.png"}', TRUE, TRUE, 19),

  -- Hospitality & Housekeeping (combines chef, waiter, housekeeping)
  ('10000000-0000-0000-0000-000000000009', 'Housekeeping Unisex Premium Tunic & Trouser Set', 'Durable and professional helper uniform. Features contrast collar lining, front buttons, side utility pockets, and match-dyed comfort waist trousers.', '00000000-0000-0000-0000-000000000002', 'Stain-Resistant Poly-Cotton Twill', '₹390 - ₹550', 50, 'Grey, Blue', 'housekeeping, tunic, staff', '{"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600"}', TRUE, TRUE, 1),
  ('10000000-0000-0000-0000-000000000010', 'Heavy-Duty Utility Cleaner Apron', 'Multi-pocket helper utility apron with adjustable neck strap. Perfect for janitorial staff, facility cleaners, and maintenance operators.', '00000000-0000-0000-0000-000000000002', 'Waterproof Canvas Cotton', '₹120 - ₹190', 100, 'Black, Navy', 'housekeeping, apron, utility', '{"https://images.unsplash.com/photo-1603796846097-bee99e4a60c9?auto=format&fit=crop&q=80&w=600"}', FALSE, TRUE, 2),
  ('10000000-0000-0000-0000-000000000018', 'Double-Breasted Master Chef Jacket', 'Elite hospitality chef coat designed for hot kitchen environments. Features breathable mesh underarms, a thermometer arm pocket, and reversible front closure.', '00000000-0000-0000-0000-000000000002', 'Heavy duty Canvas Cotton with Breathable Mesh', '₹750 - ₹1,100', 30, 'White, Black', 'chef, kitchen, jacket', '{"/images/chef_jacket.png"}', TRUE, TRUE, 3),
  ('10000000-0000-0000-0000-000000000019', 'Premium Chef Kitchen Bib Apron', 'Professional kitchen bib apron tailored from stain-resistant canvas twill. Features dual deep pockets, reinforced loops, and adjustable neck straps.', '00000000-0000-0000-0000-000000000002', 'Stain-Resistant Cotton Canvas Twill', '₹180 - ₹260', 100, 'Black, Red, Green', 'chef, apron, pocket', '{"/images/chef_apron.png"}', FALSE, TRUE, 4),
  ('10000000-0000-0000-0000-000000000020', 'Waiter Formal Vest & Bow Tie Set', 'Classic five-button waistcoat with adjustable back buckle and matching bow tie. Designed for dining banquets and executive bar staff.', '00000000-0000-0000-0000-000000000002', 'Poly-Viscose Gabardine with Satin Back', '₹650 - ₹900', 50, 'Black, Navy', 'waiter, vest, formal', '{"https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600"}', TRUE, TRUE, 5),
  ('10000000-0000-0000-0000-000000000021', 'Classic Server Half Apron', 'Short half-length server apron with triple front utility pockets to hold order pads and pens. Elegant, durable, and easy-wash design.', '00000000-0000-0000-0000-000000000002', 'Durable Poly-Cotton Poplin', '₹90 - ₹150', 100, 'Black, Maroon', 'waiter, apron, half', '{"https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=600"}', FALSE, TRUE, 6),

  -- Corporate Wear
  ('10000000-0000-0000-0000-000000000011', 'Slim Fit Corporate Men''s Blazer', 'Ultra-modern corporate wool-blend blazer with double vent, notch lapel, and customized satin lining. Ideal for corporate office environments.', '00000000-0000-0000-0000-000000000003', 'Premium Tropical Wool Blend', '₹1,800 - ₹2,400', 50, 'Black, Navy, Grey', 'corporate, blazer, executive', '{"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=600"}', TRUE, TRUE, 1),
  ('10000000-0000-0000-0000-000000000012', 'Tailored Poly-Wool Corporate Nehru Jacket', 'Modern corporate sleeveless Modi waistcoat featuring traditional mandarin collar and high-quality button closures. Gives security or front office teams a premium identity.', '00000000-0000-0000-0000-000000000003', 'Premium Poly-Wool Tweed Weave', '₹850 - ₹1,200', 50, 'Grey, Navy, Black', 'corporate, nehru jacket, waistcoat', '{"https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&q=80&w=600"}', FALSE, TRUE, 2),
  ('10000000-0000-0000-0000-000000000013', 'Premium Corporate Oxford Shirt Pack (Set of 3)', 'Classic Oxford button-down shirts in white, light blue, and grey. Wrinkle-free finish with reinforced collar stays.', '00000000-0000-0000-0000-000000000003', 'Egyptian Cotton Oxford Weave', '₹1,500 - ₹2,100', 55, 'White, Light Blue, Grey', 'corporate, shirt, oxford', '{"https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600"}', FALSE, TRUE, 3),

  -- Advocates & Legal
  ('10000000-0000-0000-0000-000000000007', 'Classic Black Advocate Coat & Gown Set', 'Traditional legal uniform set featuring a premium black advocate coat and lightweight advocate gown. Tailored with neat neckband hooks and a structured shoulder drape.', '00000000-0000-0000-0000-000000000004', 'Poly-Wool Wrinkle-Resistant Suiting', '₹1,250 - ₹1,850', 30, 'Black', 'advocate, gown, lawyer, legal', '{"https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=600"}', TRUE, TRUE, 1),
  ('10000000-0000-0000-0000-000000000008', 'Lady Advocate Formal Black Jacket', 'Elegant structured single-breasted black jacket designed for legal practitioners in district and High Courts. Features inner pockets and comfortable back vents.', '00000000-0000-0000-0000-000000000004', 'Premium Tropical Wool Blend', '₹950 - ₹1,400', 30, 'Black', 'advocate, jacket, court', '{"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"}', FALSE, TRUE, 2),

  -- School Uniforms
  ('10000000-0000-0000-0000-000000000014', 'Premium Boys School Blazer & Trouser Set', 'High-durability navy blue school blazer tailored from premium terry-wool fabric. Resists fading and pilling over daily wash.', '00000000-0000-0000-0000-000000000005', 'Terry-Wool Premium Blend', '₹850 - ₹1,200', 100, 'Navy Blue', 'school, blazer, boys', '{"https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=600"}', TRUE, TRUE, 1),
  ('10000000-0000-0000-0000-000000000015', 'Classic Girls Pleated Pinafore', 'Standard school pinafore featuring elegant box pleats and a side button closure. Tailored from sweat-wicking twill.', '00000000-0000-0000-0000-000000000005', 'Premium Polyester-Cotton Twill', '₹350 - ₹500', 150, 'Grey, Navy, Maroon', 'school, pinafore, girls', '{"https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600"}', TRUE, TRUE, 2),

  -- Convocation & Academic
  ('10000000-0000-0000-0000-000000000016', 'Premium Convocation Gown & Hood Set', 'Elegant traditional graduation gown set with standard color hoods denoting major academic streams. High-quality back zipper and pleated sleeve details.', '00000000-0000-0000-0000-000000000006', 'Deluxe Matte Polyester', '₹800 - ₹1,200', 50, 'Black, Red, Gold', 'convocation, gown, graduation', '{"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600"}', TRUE, TRUE, 1),
  ('10000000-0000-0000-0000-000000000017', 'Deluxe Academic Mortarboard Cap', 'Standard square academic cap featuring a sturdy elastic interior headband and custom-matched hanging tassel.', '00000000-0000-0000-0000-000000000006', 'Matte Polyester with Reinforced Board', '₹150 - ₹220', 100, 'Black', 'convocation, cap, mortarboard', '{"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600"}', FALSE, TRUE, 2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  fabric = EXCLUDED.fabric,
  price_range = EXCLUDED.price_range,
  min_order_qty = EXCLUDED.min_order_qty,
  colors = EXCLUDED.colors,
  tags = EXCLUDED.tags,
  images = EXCLUDED.images,
  is_featured = EXCLUDED.is_featured,
  is_visible = EXCLUDED.is_visible,
  display_order = EXCLUDED.display_order,
  customization_available = EXCLUDED.customization_available,
  fabric_care = EXCLUDED.fabric_care,
  bulk_discounts = EXCLUDED.bulk_discounts,
  delivery_timeline = EXCLUDED.delivery_timeline,
  gender = EXCLUDED.gender,
  price_min = EXCLUDED.price_min,
  price_max = EXCLUDED.price_max;

-- Backfill default values for existing products to populate new schema columns
UPDATE products SET
  customization_available = TRUE,
  fabric_care = CASE 
    WHEN category_id IN ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004') THEN 'Dry clean only. Iron on low heat.'
    ELSE 'Machine wash warm, tumble dry low. Do not iron on print.'
  END,
  bulk_discounts = '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "10% Off"}, {"qty": 500, "discount": "20% Off"}]'::jsonb,
  delivery_timeline = '7-10 working days',
  gender = CASE 
    WHEN name ILIKE '%women%' OR name ILIKE '%female%' OR name ILIKE '%girls%' OR name ILIKE '%lady%' THEN 'Women'
    WHEN name ILIKE '%men%' OR name ILIKE '%boys%' THEN 'Men'
    WHEN name ILIKE '%school%' OR name ILIKE '%pe %' OR name ILIKE '%sports%' THEN 'Kids'
    ELSE 'Unisex'
  END,
  price_min = CASE 
    WHEN price_range = '₹450 - ₹650' THEN 450
    WHEN price_range = '₹480 - ₹690' THEN 480
    WHEN price_range = '₹420 - ₹580' THEN 420
    WHEN price_range = '₹450 - ₹600' THEN 450
    WHEN price_range = '₹180 - ₹280' THEN 180
    WHEN price_range = '₹90 - ₹140' THEN 90
    WHEN price_range = '₹45 - ₹80' THEN 45
    WHEN price_range = '₹250 - ₹350' THEN 250
    WHEN price_range = '₹180 - ₹250' THEN 180
    WHEN price_range = '₹750 - ₹1,100' THEN 750
    WHEN price_range = '₹180 - ₹260' THEN 180
    WHEN price_range = '₹320 - ₹480' THEN 320
    WHEN price_range = '₹120 - ₹200' THEN 120
    WHEN price_range = '₹650 - ₹900' THEN 650
    WHEN price_range = '₹350 - ₹500' THEN 350
    WHEN price_range = '₹90 - ₹150' THEN 90
    WHEN price_range = '₹390 - ₹550' THEN 390
    WHEN price_range = '₹120 - ₹190' THEN 120
    WHEN price_range = '₹1,200 - ₹1,800' THEN 1200
    WHEN price_range = '₹1,800 - ₹2,400' THEN 1800
    WHEN price_range = '₹1,600 - ₹2,200' THEN 1600
    WHEN price_range = '₹850 - ₹1,200' THEN 850
    WHEN price_range = '₹480 - ₹700' THEN 480
    WHEN price_range = '₹550 - ₹850' THEN 550
    WHEN price_range = '₹350 - ₹600' THEN 350
    WHEN price_range = '₹280 - ₹420' THEN 280
    WHEN price_range = '₹3,500 - ₹5,500' THEN 3500
    WHEN price_range = '₹1,250 - ₹1,850' THEN 1250
    WHEN price_range = '₹950 - ₹1,400' THEN 950
    WHEN price_range = '₹1,800 - ₹2,500' THEN 1800
    WHEN price_range = '₹120 - ₹180' THEN 120
    WHEN price_range = '₹650 - ₹950' THEN 650
    WHEN price_range = '₹380 - ₹550' THEN 380
    WHEN price_range = '₹220 - ₹350' THEN 220
    WHEN price_range = '₹450 - ₹700' THEN 450
    WHEN price_range = '₹120 - ₹220' THEN 120
    WHEN price_range = '₹90 - ₹150' THEN 90
    WHEN price_range = '₹600 - ₹900' THEN 600
    WHEN price_range = '₹250 - ₹400' THEN 250
    WHEN price_range = '₹200 - ₹350' THEN 200
    WHEN price_range = '₹2,500 - ₹4,000' THEN 2500
    WHEN price_range = '₹800 - ₹1,200' THEN 800
    ELSE 200
  END,
  price_max = CASE 
    WHEN price_range = '₹450 - ₹650' THEN 650
    WHEN price_range = '₹480 - ₹690' THEN 690
    WHEN price_range = '₹420 - ₹580' THEN 580
    WHEN price_range = '₹450 - ₹600' THEN 600
    WHEN price_range = '₹180 - ₹280' THEN 280
    WHEN price_range = '₹90 - ₹140' THEN 140
    WHEN price_range = '₹45 - ₹80' THEN 80
    WHEN price_range = '₹250 - ₹350' THEN 350
    WHEN price_range = '₹180 - ₹250' THEN 250
    WHEN price_range = '₹750 - ₹1,100' THEN 1100
    WHEN price_range = '₹180 - ₹260' THEN 260
    WHEN price_range = '₹320 - ₹480' THEN 480
    WHEN price_range = '₹120 - ₹200' THEN 200
    WHEN price_range = '₹650 - ₹900' THEN 900
    WHEN price_range = '₹350 - ₹500' THEN 500
    WHEN price_range = '₹90 - ₹150' THEN 150
    WHEN price_range = '₹390 - ₹550' THEN 550
    WHEN price_range = '₹120 - ₹190' THEN 190
    WHEN price_range = '₹1,200 - ₹1,800' THEN 1800
    WHEN price_range = '₹1,800 - ₹2,400' THEN 2400
    WHEN price_range = '₹1,600 - ₹2,200' THEN 2200
    WHEN price_range = '₹850 - ₹1,200' THEN 1200
    WHEN price_range = '₹480 - ₹700' THEN 700
    WHEN price_range = '₹550 - ₹850' THEN 850
    WHEN price_range = '₹350 - ₹600' THEN 600
    WHEN price_range = '₹280 - ₹420' THEN 420
    WHEN price_range = '₹3,500 - ₹5,500' THEN 5500
    WHEN price_range = '₹1,250 - ₹1,850' THEN 1850
    WHEN price_range = '₹950 - ₹1,400' THEN 1400
    WHEN price_range = '₹1,800 - ₹2,500' THEN 2500
    WHEN price_range = '₹120 - ₹180' THEN 180
    WHEN price_range = '₹650 - ₹950' THEN 950
    WHEN price_range = '₹380 - ₹550' THEN 550
    WHEN price_range = '₹220 - ₹350' THEN 350
    WHEN price_range = '₹450 - ₹700' THEN 700
    WHEN price_range = '₹120 - ₹220' THEN 220
    WHEN price_range = '₹90 - ₹150' THEN 150
    WHEN price_range = '₹600 - ₹900' THEN 900
    WHEN price_range = '₹250 - ₹400' THEN 400
    WHEN price_range = '₹200 - ₹350' THEN 350
    WHEN price_range = '₹2,500 - ₹4,000' THEN 4000
    WHEN price_range = '₹800 - ₹1,200' THEN 1200
    ELSE 1000
  END
WHERE price_min IS NULL;

-- Seed new products representing safety, corporate, aviation, industrial, sports, etc.
INSERT INTO products (
  id, name, description, category_id, fabric, price_range, min_order_qty, 
  colors, tags, images, is_featured, is_visible, display_order, 
  customization_available, fabric_care, bulk_discounts, delivery_timeline, gender, price_min, price_max
) VALUES
  ('10000000-0000-0000-0000-000000000033', 'Classic Security Guard Uniform Shirt', 'Professional security officer shirt featuring button-down epaulettes, reinforced collar, and dual buttoned chest pockets. Breathable and comfortable for long watch shifts.', '00000000-0000-0000-0000-000000000007', 'Premium Poly-Cotton Twill Weave', '₹320 - ₹450', 50, 'Light Blue, Navy Blue, Khaki', 'security, shirt, guard', '{"/images/category_school.png"}', TRUE, TRUE, 1, TRUE, 'Machine wash warm, tumble dry low, warm iron.', '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "10% Off"}, {"qty": 500, "discount": "20% Off"}]'::jsonb, '7-10 working days', 'Unisex', 320, 450),
  ('10000000-0000-0000-0000-000000000034', 'Tactical Security Officer Cargo Pants', 'Heavy-duty tactical cargo trousers designed for security personnel. Features six spacious utility pockets, reinforced knees, and double-stitched belt loops.', '00000000-0000-0000-0000-000000000007', 'Heavy Duty Ripstop Cotton-Poly', '₹480 - ₹690', 50, 'Black, Navy Blue, Olive Drab', 'security, trousers, tactical', '{"/images/category_school.png"}', FALSE, TRUE, 2, TRUE, 'Machine wash cold, air dry recommended.', '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "12% Off"}, {"qty": 500, "discount": "22% Off"}]'::jsonb, '8-12 working days', 'Unisex', 480, 690),
  ('10000000-0000-0000-0000-000000000035', 'Heavy Duty Cotton Boiler Suit (Coverall)', 'Full-body industrial coverall boiler suit featuring heavy-duty brass double-zipper front, action back for flexibility, and multiple pockets for tools.', '00000000-0000-0000-0000-000000000008', '100% Heavy-Duty Cotton Drill', '₹650 - ₹950', 30, 'Royal Blue, Orange, Navy Blue', 'industrial, coverall, boiler suit', '{"/images/category_corporate.png"}', TRUE, TRUE, 1, TRUE, 'Hot wash safe, machine dry medium, heavy iron.', '[{"qty": 50, "discount": "8% Off"}, {"qty": 100, "discount": "15% Off"}, {"qty": 500, "discount": "25% Off"}]'::jsonb, '10-15 working days', 'Unisex', 650, 950),
  ('10000000-0000-0000-0000-000000000036', 'Reflective High-Visibility Work Jacket', 'Two-tone industrial work jacket with 3M reflective safety stripes. Designed for road construction, airport crew, and warehouse safety.', '00000000-0000-0000-0000-000000000008', 'Durable Polyester with PU Lamination', '₹420 - ₹580', 50, 'Neon Yellow, Neon Orange', 'industrial, reflective, jacket', '{"/images/category_corporate.png"}', FALSE, TRUE, 2, TRUE, 'Wash cold inside out, do not iron on reflective tape.', '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "10% Off"}, {"qty": 500, "discount": "20% Off"}]'::jsonb, '7-10 working days', 'Unisex', 420, 580),
  ('10000000-0000-0000-0000-000000000037', 'Custom Dry-Fit Sublimated Sports Jersey', 'Lightweight, sweat-wicking athletic PE and team jersey. Fully customizable with sublimation print for team names, logos, and numbers.', '00000000-0000-0000-0000-000000000009', '100% Interlock Dry-Fit Polyester', '₹250 - ₹390', 50, 'Blue & White, Red & Black, Green & Yellow', 'sports, PE, jersey', '{"/images/school_pe_tracksuit.svg"}', TRUE, TRUE, 1, TRUE, 'Machine wash cold, do not fabric soften, do not iron.', '[{"qty": 50, "discount": "10% Off"}, {"qty": 100, "discount": "18% Off"}, {"qty": 500, "discount": "30% Off"}]'::jsonb, '10-12 working days', 'Kids', 250, 390),
  ('10000000-0000-0000-0000-000000000038', 'School / Team Sports Tracksuit Set', 'High-performance team track jacket and matching athletic pants set. Contrast panel details, zip pockets, and elastic waist for comfort.', '00000000-0000-0000-0000-000000000009', 'Super-Poly Brushed Tricot', '₹580 - ₹850', 40, 'Navy & Gold, Black & Red, Green & White', 'sports, tracksuit, team', '{"/images/school_pe_tracksuit.svg"}', FALSE, TRUE, 2, TRUE, 'Wash warm, tumble dry low, do not iron logo.', '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "12% Off"}, {"qty": 500, "discount": "22% Off"}]'::jsonb, '8-14 working days', 'Kids', 580, 850),
  ('10000000-0000-0000-0000-000000000043', 'Formal Banking Micro-Stripe Shirt', 'Crisp formal office shirt designed for banking and financial service teams. Wrinkle-resistant finish ensures a neat corporate appearance all day.', '00000000-0000-0000-0000-000000000010', '60% Egyptian Cotton / 40% Polyester Poplin', '₹450 - ₹650', 50, 'Sky Blue Stripe, Grey Stripe, Pink Stripe', 'banking, shirt, formal', '{"/images/category_corporate.png"}', TRUE, TRUE, 1, TRUE, 'Machine wash warm, iron medium, dry-cleanable.', '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "10% Off"}, {"qty": 500, "discount": "20% Off"}]'::jsonb, '7-10 working days', 'Unisex', 450, 650),
  ('10000000-0000-0000-0000-000000000044', 'Womens Classic Formal Pencil Skirt', 'Elegant tailored formal pencil skirt featuring a neat back kick pleat and comfortable stretch panels. Ideal for front office and bank tellers.', '00000000-0000-0000-0000-000000000010', 'Poly-Viscose Stretch Gabardine', '₹480 - ₹680', 50, 'Charcoal Grey, Navy Blue, Black', 'banking, skirt, formal', '{"/images/category_corporate.png"}', FALSE, TRUE, 2, TRUE, 'Dry clean recommended, or machine wash cold on delicate.', '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "10% Off"}, {"qty": 500, "discount": "20% Off"}]'::jsonb, '7-12 working days', 'Women', 480, 680),
  ('10000000-0000-0000-0000-000000000045', 'Paramilitary Ceremonial Khaki Tunic', 'Traditional police and paramilitary tunic featuring structured shoulders, golden button closures, and chest epaulettes.', '00000000-0000-0000-0000-000000000011', 'Heavy Poly-Wool Suiting', '₹1,500 - ₹2,200', 20, 'Khaki, Dark Blue', 'police, tunic, ceremonial', '{"/images/category_advocate.png"}', TRUE, TRUE, 1, TRUE, 'Dry clean only. Do not wash at home.', '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "10% Off"}, {"qty": 500, "discount": "18% Off"}]'::jsonb, '15-20 working days', 'Men', 1500, 2200),
  ('10000000-0000-0000-0000-000000000046', 'Ceremonial Braided Whistle Lanyard', 'High-quality braided ceremonial police and security whistle lanyard. Features brass clasp and durable woven silk-thread braids.', '00000000-0000-0000-0000-000000000011', '100% Mercerized Braided Cord', '₹120 - ₹180', 100, 'Red & Gold, Blue & Silver, All Gold', 'police, lanyard, ceremonial', '{"/images/category_advocate.png"}', FALSE, TRUE, 2, FALSE, 'Hand wash cold, air dry.', '[{"qty": 100, "discount": "5% Off"}, {"qty": 500, "discount": "15% Off"}]'::jsonb, '5-7 working days', 'Unisex', 120, 180),
  ('10000000-0000-0000-0000-000000000047', 'Flame-Retardant Nomex Safety Suit', 'Certified flame-resistant safety suit (jacket and trousers) designed for firefighters and industrial safety teams. Heavy-duty heat barrier protection.', '00000000-0000-0000-0000-000000000012', '93% Nomex / 5% Kevlar / 2% Antistatic Blend', '₹3,500 - ₹5,500', 10, 'Dark Navy, Saffron Orange, Fire Red', 'fire, safety, flame-retardant', '{"/images/category_corporate.png"}', TRUE, TRUE, 1, TRUE, 'Industrial laundering recommended, do not use chlorine bleach.', '[{"qty": 20, "discount": "5% Off"}, {"qty": 50, "discount": "10% Off"}, {"qty": 100, "discount": "15% Off"}]'::jsonb, '12-18 working days', 'Unisex', 3500, 5500),
  ('10000000-0000-0000-0000-000000000048', 'Fluorescent Reflective Safety Vest (Class 2)', 'Lightweight safety vest featuring high-visibility neon color with double vertical and horizontal 3M reflective tape bands. Features front zip closure.', '00000000-0000-0000-0000-000000000012', 'Breathable Polyester Warp Knit Mesh', '₹90 - ₹150', 100, 'Neon Lime, Neon Orange', 'safety, vest, reflective', '{"/images/category_corporate.png"}', FALSE, TRUE, 2, TRUE, 'Machine wash cold, do not iron reflective panels.', '[{"qty": 100, "discount": "5% Off"}, {"qty": 500, "discount": "15% Off"}, {"qty": 1000, "discount": "25% Off"}]'::jsonb, '5-7 working days', 'Unisex', 90, 150),
  ('10000000-0000-0000-0000-000000000049', 'Aviation Pilot Epaulette Shirt', 'Crisp, high-performance pilot shirt. Features shoulder loops for epaulettes, dual mitred chest pockets with pencil slot, and durable interlined collars.', '00000000-0000-0000-0000-000000000013', '65% Polyester / 35% Combed Cotton Twill', '₹550 - ₹750', 30, 'Pristine White, Sky Blue', 'airline, pilot, shirt', '{"/images/category_corporate.png"}', TRUE, TRUE, 1, TRUE, 'Machine wash warm, bleach safe for white, warm iron.', '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "10% Off"}, {"qty": 500, "discount": "20% Off"}]'::jsonb, '7-10 working days', 'Men', 550, 750),
  ('10000000-0000-0000-0000-000000000050', 'Aviation Cabin Crew Blazer & Scarf Set', 'Elegant tailored crew blazer matching structured corporate pants/skirt, accessorized with a custom silk scarf. Professional, sleek look.', '00000000-0000-0000-0000-000000000013', 'Superfine Poly-Viscose Gabardine with Silk Scarf', '₹2,200 - ₹3,500', 30, 'Aviation Blue, Deep Burgundy, Classic Black', 'airline, cabin crew, uniform', '{"/images/category_corporate.png"}', TRUE, TRUE, 2, TRUE, 'Dry clean only, iron on low temperature.', '[{"qty": 50, "discount": "5% Off"}, {"qty": 100, "discount": "12% Off"}, {"qty": 500, "discount": "22% Off"}]'::jsonb, '10-15 working days', 'Women', 2200, 3500)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  fabric = EXCLUDED.fabric,
  price_range = EXCLUDED.price_range,
  min_order_qty = EXCLUDED.min_order_qty,
  colors = EXCLUDED.colors,
  tags = EXCLUDED.tags,
  images = EXCLUDED.images,
  is_featured = EXCLUDED.is_featured,
  is_visible = EXCLUDED.is_visible,
  display_order = EXCLUDED.display_order,
  customization_available = EXCLUDED.customization_available,
  fabric_care = EXCLUDED.fabric_care,
  bulk_discounts = EXCLUDED.bulk_discounts,
  delivery_timeline = EXCLUDED.delivery_timeline,
  gender = EXCLUDED.gender,
  price_min = EXCLUDED.price_min,
  price_max = EXCLUDED.price_max;

-- ─── ROW LEVEL SECURITY (RLS) ────────────────────────────────
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries   ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings    ENABLE ROW LEVEL SECURITY;

-- Public can read categories (for catalogue)
CREATE POLICY "Public read categories"
  ON categories FOR SELECT USING (true);

-- Public can read visible products (for catalogue)
CREATE POLICY "Public read visible products"
  ON products FOR SELECT USING (is_visible = true);

-- Public can read all settings
CREATE POLICY "Public read settings"
  ON settings FOR SELECT USING (true);

-- Public can insert enquiries (for contact/enquiry forms)
CREATE POLICY "Public insert enquiries"
  ON enquiries FOR INSERT WITH CHECK (true);

-- Authenticated admins have full access to all tables
CREATE POLICY "Admin full access categories"
  ON categories FOR ALL USING (auth.role() = 'authenticated');

-- CREATE POLICY "Admin full access products"
CREATE POLICY "Admin full access products"
  ON products FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin read all enquiries"
  ON enquiries FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update enquiries"
  ON enquiries FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete enquiries"
  ON enquiries FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access settings"
  ON settings FOR ALL USING (auth.role() = 'authenticated');

-- ─── INDEXES for performance ──────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured  ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_visible   ON products(is_visible)  WHERE is_visible  = true;
CREATE INDEX IF NOT EXISTS idx_enquiries_status   ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created  ON enquiries(created_at DESC);
