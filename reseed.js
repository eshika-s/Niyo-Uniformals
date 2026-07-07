// reseed.js - Re-seeds the database using the schema's UUID-based IDs
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ltvzifseaubefwyazzbr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0dnppZnNlYXViZWZ3eWF6emJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MzcyNTIsImV4cCI6MjA5NTUxMzI1Mn0.scQDEFwtPxvsWO01YzaQXabC3hBL-A8HQCkQCz1ki2s'
)

const CATEGORIES = [
  { id: '00000000-0000-0000-0000-000000000001', name: 'Healthcare & Hospital Uniforms',    slug: 'medical',     display_order: 1 },
  { id: '00000000-0000-0000-0000-000000000002', name: 'Hotel & Hospitality Uniforms',      slug: 'hospitality', display_order: 2 },
  { id: '00000000-0000-0000-0000-000000000003', name: 'Corporate (Suits, Blazers, Shirts)',slug: 'corporate',   display_order: 3 },
  { id: '00000000-0000-0000-0000-000000000004', name: 'Advocates & Legal (Coats & Gowns)', slug: 'advocate',    display_order: 4 },
  { id: '00000000-0000-0000-0000-000000000005', name: 'School Uniforms',                   slug: 'school',      display_order: 5 },
  { id: '00000000-0000-0000-0000-000000000006', name: 'Convocation (Gowns & Caps)',         slug: 'convocation', display_order: 6 },
  { id: '00000000-0000-0000-0000-000000000007', name: 'Security & Defence Uniforms',       slug: 'security',    display_order: 7 },
  { id: '00000000-0000-0000-0000-000000000008', name: 'Industrial & Factory Workwear',     slug: 'industrial',  display_order: 8 },
  { id: '00000000-0000-0000-0000-000000000009', name: 'Sports & PE Uniforms',              slug: 'sports',      display_order: 9 },
]

const PRODUCTS = [
  // ── MEDICAL ────────────────────────────────────────────────────────────────
  { id: '10000000-0000-0000-0000-000000000001', category_id: '00000000-0000-0000-0000-000000000001', name: "Premium Men's Professional Lab Coat", description: "Classic full-length men's professional lab coat featuring a tailored chest fit, side vent openings for pocket access, multiple utility pockets, and durable reinforced stitching. Anti-microbial treated.", fabric: "100% Cotton with Liquid Barrier Finish", price_range: "₹450 - ₹650", min_order_qty: 50, colors: "White, Light Blue, Navy Blue", tags: "doctor, medical, lab coat, male", images: ["/images/premium_mens_lab_coat_1781424925528.png"], is_featured: true, is_visible: true, display_order: 1, gender: "Men", price_min: 450, price_max: 650 },
  { id: '10000000-0000-0000-0000-000000000022', category_id: '00000000-0000-0000-0000-000000000001', name: "Premium Women's Tailored Lab Coat", description: "Princess-seamed women's professional lab coat featuring a slim, elegant tailored fit, side pocket access, chest utility pocket, and anti-wrinkle fabric.", fabric: "100% Cotton with Liquid Barrier Finish", price_range: "₹450 - ₹650", min_order_qty: 50, colors: "White, Light Blue, Soft Pink", tags: "doctor, medical, lab coat, female", images: ["/images/premium_womens_lab_coat_1781424937311.png"], is_featured: true, is_visible: true, display_order: 2, gender: "Women", price_min: 450, price_max: 650 },
  { id: '10000000-0000-0000-0000-000000000002', category_id: '00000000-0000-0000-0000-000000000001', name: "Premium Hospital Unisex OT Scrub Suit", description: "Classic medical scrubs set (top and cargo trousers) featuring double chest pockets and drawstring waist. Antimicrobial treated for surgical and general ward duty.", fabric: "Breathable Poly-Cotton Medical Weave", price_range: "₹480 - ₹690", min_order_qty: 100, colors: "Green, Teal, Navy Blue, Maroon", tags: "doctor, scrub, ot", images: ["/images/premium_hospital_ot_scrub_1781424949074.png"], is_featured: false, is_visible: true, display_order: 3, gender: "Unisex", price_min: 480, price_max: 690 },
  { id: '10000000-0000-0000-0000-000000000003', category_id: '00000000-0000-0000-0000-000000000001', name: "Premium Nurse Tunic Uniform (Zip Front)", description: "Professional nursing tunic featuring elegant contrast piping, zip front closure, dual deep side pockets, and back action pleats.", fabric: "Poly-Cotton Easy-Care Poplin", price_range: "₹420 - ₹580", min_order_qty: 100, colors: "Navy Blue, Burgundy, Teal", tags: "nurse, tunic, healthcare", images: ["/images/premium_nurse_tunic_1781424962870.png"], is_featured: true, is_visible: true, display_order: 4, gender: "Unisex", price_min: 420, price_max: 580 },
  { id: '10000000-0000-0000-0000-000000000004', category_id: '00000000-0000-0000-0000-000000000001', name: "Female V-Neck Patient Care Scrub Set", description: "Lightweight scrubs designed for nurses, dental assistants, and clinic care teams. Soft touch, fade-resistant fabric with 4-way stretch utility.", fabric: "Stretchable Poly-Rayon Blend", price_range: "₹450 - ₹600", min_order_qty: 80, colors: "Ceil Blue, Wine, Hunter Green", tags: "nurse, scrub, stretch", images: ["/images/female_vneck_scrub_1781425001237.png"], is_featured: false, is_visible: true, display_order: 5, gender: "Women", price_min: 450, price_max: 600 },
  { id: '10000000-0000-0000-0000-000000000005', category_id: '00000000-0000-0000-0000-000000000001', name: "Premium Patient Hospital Gown (Unisex)", description: "Comfortable and breathable patient gown featuring a classic back-tie closure and roomy sleeves.", fabric: "100% Breathable Soft Cotton", price_range: "₹180 - ₹280", min_order_qty: 100, colors: "Light Blue, White, Green", tags: "patient, gown, hospital", images: ["/images/patient_hospital_gown_1781425011177.png"], is_featured: true, is_visible: true, display_order: 6, gender: "Unisex", price_min: 180, price_max: 280 },
  { id: '10000000-0000-0000-0000-000000000006', category_id: '00000000-0000-0000-0000-000000000001', name: "Disposable Sterile SMS Patient Gown", description: "Single-use fluid-resistant sterile patient gown designed for surgical and diagnostic prep.", fabric: "Fluid-Resistant SMS Non-Woven", price_range: "₹90 - ₹140", min_order_qty: 250, colors: "Blue, Green", tags: "patient, disposable, sterile", images: ["/images/sterile_sms_gown_1781425025393.png"], is_featured: false, is_visible: true, display_order: 7, gender: "Unisex", price_min: 90, price_max: 140 },
  { id: '10000000-0000-0000-0000-000000000030', category_id: '00000000-0000-0000-0000-000000000001', name: "Surgical Disposable Wraparound Apron", description: "Fluid-proof wraparound surgical apron for theatre, autopsy, and clinical procedures.", fabric: "Waterproof PE Laminated Non-Woven", price_range: "₹45 - ₹80", min_order_qty: 500, colors: "Blue, White", tags: "apron, disposable, surgical", images: ["/images/surgical_apron_1781425037112.png"], is_featured: false, is_visible: true, display_order: 8, gender: "Unisex", price_min: 45, price_max: 80 },
  { id: '10000000-0000-0000-0000-000000000033', category_id: '00000000-0000-0000-0000-000000000001', name: "Unisex Premium Jogger Scrub Set", description: "Modern athletic fit scrub set featuring moisture-wicking 4-way stretch fabric and 6 functional utility pockets.", fabric: "4-Way Stretch Polyester-Spandex Blend", price_range: "₹750 - ₹950", min_order_qty: 80, colors: "Teal, Navy Blue, Ceil Blue, Charcoal Grey", tags: "scrub, jogger, medical, stretch", images: ["/images/scrub_jogger.png"], is_featured: true, is_visible: true, display_order: 10, gender: "Unisex", price_min: 750, price_max: 950 },
  { id: '10000000-0000-0000-0000-000000000034', category_id: '00000000-0000-0000-0000-000000000001', name: "Pediatric Specialist Printed Scrub Top", description: "Friendly, printed pediatric scrub top featuring cute cartoon characters and animal illustrations.", fabric: "Soft-Touch Breathable Cotton-Blend", price_range: "₹320 - ₹450", min_order_qty: 50, colors: "Light Blue Print, Pink Print, Mint Print", tags: "scrub, pediatric, doctor, printed", images: ["/images/scrub_pediatric.png"], is_featured: false, is_visible: true, display_order: 11, gender: "Unisex", price_min: 320, price_max: 450 },
  { id: '10000000-0000-0000-0000-000000000035', category_id: '00000000-0000-0000-0000-000000000001', name: "Dentist & Specialist Clinic Wrap Tunic", description: "Ergonomic wrap-style tunic for dentists, dermatologists, and aesthetic clinic staff.", fabric: "Stain-Resistant Cotton-Poly Drill", price_range: "₹490 - ₹690", min_order_qty: 50, colors: "Pristine White, Lilac, Mint Green", tags: "tunic, dentist, clinical", images: ["/images/tunic_dentist.png"], is_featured: true, is_visible: true, display_order: 12, gender: "Unisex", price_min: 490, price_max: 690 },
  { id: '10000000-0000-0000-0000-000000000036', category_id: '00000000-0000-0000-0000-000000000001', name: "Hospital Ward Attendant & Staff Uniform Set", description: "High-durability utility uniform for ward boys, hospital helper staff, and stretcher attendants.", fabric: "Heavy-Duty Industrial Poly-Cotton", price_range: "₹380 - ₹520", min_order_qty: 100, colors: "Navy Blue, Slate Grey, Olive Green", tags: "ward attendant, helper, staff", images: ["/images/staff_wardboy.png"], is_featured: false, is_visible: true, display_order: 13, gender: "Unisex", price_min: 380, price_max: 520 },
  { id: '10000000-0000-0000-0000-000000000037', category_id: '00000000-0000-0000-0000-000000000001', name: "Autoclavable Surgical Isolation Gown", description: "Reusable surgical isolation gown with full back overlap and stockinette cuffs.", fabric: "100% Cotton Canvas with Liquid Barrier", price_range: "₹280 - ₹380", min_order_qty: 100, colors: "Surgical Green, Sky Blue", tags: "gown, isolation, surgical", images: ["/images/gown_isolation.png"], is_featured: false, is_visible: true, display_order: 14, gender: "Unisex", price_min: 280, price_max: 380 },
  { id: '10000000-0000-0000-0000-000000000038', category_id: '00000000-0000-0000-0000-000000000001', name: "Premium Medical Consultation Blazer", description: "Tailored short consultation coat for senior doctors and medical consultants.", fabric: "Premium Tropical Poly-Viscose", price_range: "₹950 - ₹1,400", min_order_qty: 30, colors: "White, Charcoal Grey, Navy Blue", tags: "doctor, blazer, consultation", images: ["/images/doctor_blazer.png"], is_featured: true, is_visible: true, display_order: 15, gender: "Unisex", price_min: 950, price_max: 1400 },
  { id: '10000000-0000-0000-0000-000000000039', category_id: '00000000-0000-0000-0000-000000000001', name: "Maternity Comfort Scrub Top", description: "Specially tailored maternity scrub top with side-panel stretch panels.", fabric: "Super Soft Bamboo-Cotton Blend", price_range: "₹480 - ₹620", min_order_qty: 30, colors: "Royal Blue, Ceil Blue, Burgundy", tags: "scrub, maternity, comfort", images: ["/images/maternity_scrub.png"], is_featured: false, is_visible: true, display_order: 16, gender: "Women", price_min: 480, price_max: 620 },
  { id: '10000000-0000-0000-0000-000000000040', category_id: '00000000-0000-0000-0000-000000000001', name: "Premium Two-Piece Patient Suit", description: "Deluxe patient uniform including front-buttoned shirt and matching elastic waist trousers.", fabric: "100% Soft Combed Cotton (Hospital Grade)", price_range: "₹320 - ₹480", min_order_qty: 100, colors: "Blue Striped, Green Patterned, Solid White", tags: "patient, suit, cotton", images: ["/images/patient_pajama.png"], is_featured: false, is_visible: true, display_order: 17, gender: "Unisex", price_min: 320, price_max: 480 },
  { id: '10000000-0000-0000-0000-000000000041', category_id: '00000000-0000-0000-0000-000000000001', name: "Pharmacist Short Sleeve Lab Jacket", description: "Professional waist-length lab jacket for pharmacists and lab technicians.", fabric: "Durable Twill Poplin", price_range: "₹290 - ₹390", min_order_qty: 50, colors: "White, Light Grey", tags: "pharmacist, lab, jacket", images: ["/images/medical_lab_apron.png"], is_featured: false, is_visible: true, display_order: 18, gender: "Unisex", price_min: 290, price_max: 390 },
  { id: '10000000-0000-0000-0000-000000000042', category_id: '00000000-0000-0000-0000-000000000001', name: "Elite Stretch V-Neck Scrub Suit", description: "Designer-grade athletic scrub suit with yoga-style waistband and zip pockets.", fabric: "Elite Rayon-Poly-Spandex Blend", price_range: "₹890 - ₹1,190", min_order_qty: 50, colors: "Olive, Royal Blue, Steel Grey", tags: "scrub, stretch, elite", images: ["/images/scrub_premium_fit.png"], is_featured: true, is_visible: true, display_order: 19, gender: "Unisex", price_min: 890, price_max: 1190 },

  // ── HOSPITALITY ────────────────────────────────────────────────────────────
  { id: '10000000-0000-0000-0000-000000000018', category_id: '00000000-0000-0000-0000-000000000002', name: "Double-Breasted Master Chef Jacket", description: "Elite hospitality chef coat designed for hot kitchen environments with breathable mesh underarms.", fabric: "Heavy Duty Canvas Cotton with Breathable Mesh", price_range: "₹750 - ₹1,100", min_order_qty: 30, colors: "White, Black, Grey", tags: "chef, kitchen, jacket", images: ["/images/chef_jacket.png"], is_featured: true, is_visible: true, display_order: 1, gender: "Unisex", price_min: 750, price_max: 1100 },
  { id: '10000000-0000-0000-0000-000000000019', category_id: '00000000-0000-0000-0000-000000000002', name: "Premium Chef Kitchen Bib Apron", description: "Professional kitchen bib apron with dual deep pockets and adjustable neck straps.", fabric: "Stain-Resistant Cotton Canvas Twill", price_range: "₹180 - ₹260", min_order_qty: 100, colors: "Black, Brown, Navy, Denim Blue", tags: "chef, apron, pocket", images: ["/images/chef_apron.png"], is_featured: false, is_visible: true, display_order: 2, gender: "Unisex", price_min: 180, price_max: 260 },
  { id: '10000000-0000-0000-0000-000000000020', category_id: '00000000-0000-0000-0000-000000000002', name: "Waiter Formal Vest & Bow Tie Set", description: "Classic five-button waistcoat with adjustable back buckle and matching bow tie.", fabric: "Poly-Viscose Gabardine with Satin Back", price_range: "₹650 - ₹900", min_order_qty: 50, colors: "Black, Charcoal Grey, Maroon", tags: "waiter, vest, formal", images: ["/images/waiter_vest.png"], is_featured: true, is_visible: true, display_order: 3, gender: "Unisex", price_min: 650, price_max: 900 },
  { id: '10000000-0000-0000-0000-000000000055', category_id: '00000000-0000-0000-0000-000000000002', name: "Hospitality Housekeeping Coat", description: "Smart and durable housekeeping coat for hotel staff, featuring contrast trim and front button closure.", fabric: "Poly-Cotton Anti-Crease Twill", price_range: "₹380 - ₹520", min_order_qty: 50, colors: "White, Light Grey, Navy", tags: "housekeeping, hospitality, coat", images: ["/images/hospitality_coat.png"], is_featured: false, is_visible: true, display_order: 4, gender: "Unisex", price_min: 380, price_max: 520 },

  // ── CORPORATE ──────────────────────────────────────────────────────────────
  { id: '10000000-0000-0000-0000-000000000011', category_id: '00000000-0000-0000-0000-000000000003', name: "Slim Fit Corporate Men's Blazer", description: "Ultra-modern corporate wool-blend blazer with double vent and notch lapel.", fabric: "Premium Tropical Wool Blend", price_range: "₹1,800 - ₹2,400", min_order_qty: 50, colors: "Navy Blue, Charcoal, Black", tags: "corporate, blazer, executive", images: ["/images/mens_blazer.png"], is_featured: true, is_visible: true, display_order: 1, gender: "Men", price_min: 1800, price_max: 2400 },
  { id: '10000000-0000-0000-0000-000000000056', category_id: '00000000-0000-0000-0000-000000000003', name: "Women's Tailored Corporate Blazer", description: "Single-breasted feminine blazer with princess seam and functional pockets.", fabric: "Premium Poly-Viscose Suiting", price_range: "₹1,600 - ₹2,200", min_order_qty: 50, colors: "Navy Blue, Black, Charcoal", tags: "corporate, blazer, women", images: ["/images/womens_blazer.png"], is_featured: true, is_visible: true, display_order: 2, gender: "Women", price_min: 1600, price_max: 2200 },
  { id: '10000000-0000-0000-0000-000000000012', category_id: '00000000-0000-0000-0000-000000000003', name: "Tailored Poly-Wool Corporate Nehru Jacket", description: "Modern corporate sleeveless Modi waistcoat with mandarin collar.", fabric: "Premium Poly-Wool Tweed Weave", price_range: "₹850 - ₹1,200", min_order_qty: 50, colors: "Charcoal Grey, Black, Beige", tags: "corporate, nehru jacket, waistcoat", images: ["/images/nehru_jacket.png"], is_featured: false, is_visible: true, display_order: 3, gender: "Unisex", price_min: 850, price_max: 1200 },
  { id: '10000000-0000-0000-0000-000000000013', category_id: '00000000-0000-0000-0000-000000000003', name: "Premium Corporate Oxford Shirt", description: "Classic Oxford button-down shirt with wrinkle-free finish and reinforced collar stays.", fabric: "Egyptian Cotton Oxford Weave", price_range: "₹480 - ₹700", min_order_qty: 55, colors: "White, Light Blue, Grey, Sky Blue Stripe", tags: "corporate, shirt, oxford", images: ["/images/oxford_shirt.png"], is_featured: false, is_visible: true, display_order: 4, gender: "Unisex", price_min: 480, price_max: 700 },
  { id: '10000000-0000-0000-0000-000000000057', category_id: '00000000-0000-0000-0000-000000000003', name: "Corporate Branded Polo T-Shirt", description: "Relaxed-fit corporate polo with ribbed collar and custom logo embroidery included.", fabric: "Honeycomb Knit Lacoste Cotton", price_range: "₹280 - ₹420", min_order_qty: 100, colors: "Navy Blue, White, Black, Royal Blue", tags: "corporate, polo, branded", images: ["/images/corporate_shirt.png"], is_featured: true, is_visible: true, display_order: 5, gender: "Unisex", price_min: 280, price_max: 420 },

  // ── SCHOOL ─────────────────────────────────────────────────────────────────
  { id: '10000000-0000-0000-0000-000000000014', category_id: '00000000-0000-0000-0000-000000000005', name: "Premium Boys School Blazer", description: "High-durability navy blue school blazer tailored from premium terry-wool fabric.", fabric: "Terry-Wool Premium Blend", price_range: "₹850 - ₹1,200", min_order_qty: 100, colors: "Navy Blue, Black, Grey", tags: "school, blazer, boys", images: ["/images/school_blazer.png"], is_featured: true, is_visible: true, display_order: 1, gender: "Men", price_min: 850, price_max: 1200 },
  { id: '10000000-0000-0000-0000-000000000058', category_id: '00000000-0000-0000-0000-000000000005', name: "School Cotton Polo Shirt", description: "Comfortable school polo shirt with reinforced collar and embroidered school crest area.", fabric: "Combed Cotton Pique Knit", price_range: "₹180 - ₹280", min_order_qty: 100, colors: "White, Light Blue, Grey, Sky Blue", tags: "school, polo, shirt", images: ["/images/school_polo.png"], is_featured: false, is_visible: true, display_order: 2, gender: "Unisex", price_min: 180, price_max: 280 },
  { id: '10000000-0000-0000-0000-000000000059', category_id: '00000000-0000-0000-0000-000000000005', name: "School Sports PE Tracksuit", description: "High-performance school sports tracksuit with contrast panels and elastic waist.", fabric: "Super-Poly Brushed Tricot", price_range: "₹580 - ₹850", min_order_qty: 40, colors: "Navy & Gold, Black & Red, Green & White", tags: "school, tracksuit, sports, PE", images: ["/images/school_tracksuit.png"], is_featured: true, is_visible: true, display_order: 3, gender: "Unisex", price_min: 580, price_max: 850 },

  // ── SPORTS ─────────────────────────────────────────────────────────────────
  { id: '10000000-0000-0000-0000-000000000037b', category_id: '00000000-0000-0000-0000-000000000009', name: "Custom Dry-Fit Sublimated Sports Jersey", description: "Lightweight, sweat-wicking athletic jersey fully customizable with sublimation print.", fabric: "100% Interlock Dry-Fit Polyester", price_range: "₹250 - ₹390", min_order_qty: 50, colors: "Blue & White, Red & Black, Green & Yellow", tags: "sports, PE, jersey", images: ["/images/sports_jersey.png"], is_featured: true, is_visible: true, display_order: 1, gender: "Unisex", price_min: 250, price_max: 390 },

  // ── INDUSTRIAL ─────────────────────────────────────────────────────────────
  { id: '10000000-0000-0000-0000-000000000035b', category_id: '00000000-0000-0000-0000-000000000008', name: "Heavy Duty Cotton Boiler Suit (Coverall)", description: "Full-body industrial coverall boiler suit with brass double-zipper and multiple tool pockets.", fabric: "100% Heavy-Duty Cotton Drill", price_range: "₹650 - ₹950", min_order_qty: 30, colors: "Royal Blue, Orange, Navy Blue", tags: "industrial, coverall, boiler suit", images: ["/images/industrial_coverall.png"], is_featured: true, is_visible: true, display_order: 1, gender: "Unisex", price_min: 650, price_max: 950 },

  // ── ADVOCATES ──────────────────────────────────────────────────────────────
  { id: '10000000-0000-0000-0000-000000000007', category_id: '00000000-0000-0000-0000-000000000004', name: "Classic Black Advocate Coat & Gown Set", description: "Traditional legal uniform set featuring premium black advocate coat and lightweight advocate gown.", fabric: "Poly-Wool Wrinkle-Resistant Suiting", price_range: "₹1,250 - ₹1,850", min_order_qty: 30, colors: "Black", tags: "advocate, gown, lawyer, legal", images: ["/images/advocate_coat.png"], is_featured: true, is_visible: true, display_order: 1, gender: "Unisex", price_min: 1250, price_max: 1850 },

  // ── CONVOCATION ────────────────────────────────────────────────────────────
  { id: '10000000-0000-0000-0000-000000000016', category_id: '00000000-0000-0000-0000-000000000006', name: "Premium Convocation Gown & Hood Set", description: "Elegant traditional graduation gown set with standard color hoods.", fabric: "Deluxe Matte Polyester", price_range: "₹800 - ₹1,200", min_order_qty: 50, colors: "Black, Red, Gold", tags: "convocation, gown, graduation", images: ["/images/category_convocation.png"], is_featured: true, is_visible: true, display_order: 1, gender: "Unisex", price_min: 800, price_max: 1200 },
]

const DEFAULT_BULK_DISCOUNTS = [
  { qty: 50, discount: "5% Off" },
  { qty: 100, discount: "10% Off" },
  { qty: 500, discount: "20% Off" }
]

async function reseed() {
  console.log('🌱 Starting database re-seed...\n')

  // 1. Upsert categories
  console.log('📁 Seeding categories...')
  const { error: catErr } = await supabase
    .from('categories')
    .upsert(CATEGORIES, { onConflict: 'id' })
  if (catErr) {
    console.error('❌ Category error:', catErr.message)
    return
  }
  console.log(`✅ ${CATEGORIES.length} categories seeded\n`)

  // 2. Upsert products
  console.log('📦 Seeding products...')
  let ok = 0, fail = 0

  for (const p of PRODUCTS) {
    // Only use columns that exist in the actual table
    const row = {
      id: p.id,
      name: p.name,
      description: p.description,
      category_id: p.category_id,
      images: p.images,
      fabric: p.fabric,
      is_featured: p.is_featured,
      is_visible: p.is_visible,
      price_range: p.price_range,
      min_order_qty: p.min_order_qty,
    }

    const { error } = await supabase
      .from('products')
      .upsert(row, { onConflict: 'id' })

    if (error) {
      console.error(`  ✗ ${p.id} [${p.name.substring(0, 40)}]: ${error.message}`)
      fail++
    } else {
      console.log(`  ✅ ${p.name.substring(0, 50)}`)
      ok++
    }
  }

  console.log(`\n📊 Done! Seeded: ${ok} products, Errors: ${fail}`)
  console.log('\n✨ Refresh your browser — images should be back!')
}

reseed()
