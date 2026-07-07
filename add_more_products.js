// add_more_products.js — Adds extra products to each category using different images
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ltvzifseaubefwyazzbr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0dnppZnNlYXViZWZ3eWF6emJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MzcyNTIsImV4cCI6MjA5NTUxMzI1Mn0.scQDEFwtPxvsWO01YzaQXabC3hBL-A8HQCkQCz1ki2s'
)

// Category UUIDs
const CAT = {
  medical:      '00000000-0000-0000-0000-000000000001',
  hospitality:  '00000000-0000-0000-0000-000000000002',
  corporate:    '00000000-0000-0000-0000-000000000003',
  advocate:     '00000000-0000-0000-0000-000000000004',
  school:       '00000000-0000-0000-0000-000000000005',
  convocation:  '00000000-0000-0000-0000-000000000006',
  security:     '00000000-0000-0000-0000-000000000007',
  industrial:   '00000000-0000-0000-0000-000000000008',
  sports:       '00000000-0000-0000-0000-000000000009',
}

const NEW_PRODUCTS = [
  // ══════════════════════════════════════════════════════════════
  // MEDICAL — extra items using different images
  // ══════════════════════════════════════════════════════════════
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    category_id: CAT.medical,
    name: 'General Hospital Scrub Set',
    description: 'Classic unisex hospital scrub set with V-neck top and straight-leg trousers. Breathable, easy-care fabric suitable for general ward, ICU, and OPD duty.',
    fabric: 'Breathable Poly-Cotton Medical Weave',
    price_range: '₹380 - ₹520', price_min: 380, price_max: 520,
    min_order_qty: 100, colors: 'Navy Blue, Ceil Blue, Olive Green',
    tags: 'scrub, hospital, unisex, general', gender: 'Unisex',
    images: ['/images/medical_scrubs.png'],
    is_featured: true, is_visible: true, display_order: 20,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000002',
    category_id: CAT.medical,
    name: "Senior Physician's Long Lab Coat",
    description: 'Prestigious full-length lab coat for senior doctors and consultants. Features a structured collar, reinforced button placket, and multiple interior pockets.',
    fabric: '100% Premium Egyptian Cotton', price_range: '₹650 - ₹900', price_min: 650, price_max: 900,
    min_order_qty: 30, colors: 'White, Off-White',
    tags: 'doctor, physician, lab coat', gender: 'Men',
    images: ['/images/mens_lab_coat.png'],
    is_featured: false, is_visible: true, display_order: 21,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000003',
    category_id: CAT.medical,
    name: 'Nursing Staff Button-Front Tunic',
    description: 'Practical front-button nursing tunic with pen pocket, ID card holder loop, and ergonomic back pleats. Easy to don and doff for shift changes.',
    fabric: 'Poly-Cotton Easy-Care Poplin', price_range: '₹350 - ₹490', price_min: 350, price_max: 490,
    min_order_qty: 100, colors: 'White, Light Blue, Pink',
    tags: 'nurse, tunic, button, shift', gender: 'Women',
    images: ['/images/nurse_tunic.png'],
    is_featured: true, is_visible: true, display_order: 22,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000004',
    category_id: CAT.medical,
    name: 'Surgical OT Suit with Bouffant Cap',
    description: 'Complete OT suit set including top, drawstring trousers, and matching bouffant cap. Lightweight fluid-resistant fabric designed for operating theatres.',
    fabric: 'Fluid-Resistant Non-Woven Poly', price_range: '₹520 - ₹750', price_min: 520, price_max: 750,
    min_order_qty: 100, colors: 'Surgical Green, Sky Blue, White',
    tags: 'OT, surgical, suit, cap', gender: 'Unisex',
    images: ['/images/ot_scrub_suit.png'],
    is_featured: false, is_visible: true, display_order: 23,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000005',
    category_id: CAT.medical,
    name: "Women's Clinical Fitted Lab Coat",
    description: 'Tailored short-length lab coat for women clinicians. Princess-seam cut for a professional, flattering fit with pockets on both sides.',
    fabric: '100% Cotton with Anti-Wrinkle Finish', price_range: '₹480 - ₹680', price_min: 480, price_max: 680,
    min_order_qty: 50, colors: 'White, Light Blue, Soft Lavender',
    tags: 'doctor, women, lab coat, clinical', gender: 'Women',
    images: ['/images/womens_lab_coat.png'],
    is_featured: true, is_visible: true, display_order: 24,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000006',
    category_id: CAT.medical,
    name: "Women's Colour-Block Scrub Set",
    description: 'Stylish two-tone colour-block scrub set for female healthcare professionals. Fitted top with contrast yoke and matching pull-on trousers.',
    fabric: 'Stretchable Poly-Rayon Blend', price_range: '₹490 - ₹660', price_min: 490, price_max: 660,
    min_order_qty: 80, colors: 'Teal & White, Navy & Ceil, Maroon & Grey',
    tags: 'scrub, women, colour block, style', gender: 'Women',
    images: ['/images/female_scrub_set.png'],
    is_featured: false, is_visible: true, display_order: 25,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000007',
    category_id: CAT.medical,
    name: 'Disposable Non-Woven Patient Gown',
    description: 'Economical disposable patient gown for high-turnover wards and day-care procedures. Individually packed for hygiene. Snap-button back closure.',
    fabric: 'Soft Non-Woven SMS Fabric', price_range: '₹55 - ₹95', price_min: 55, price_max: 95,
    min_order_qty: 500, colors: 'Light Blue, Green',
    tags: 'patient, disposable, gown, ward', gender: 'Unisex',
    images: ['/images/disposable_patient_gown.png'],
    is_featured: false, is_visible: true, display_order: 26,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000008',
    category_id: CAT.medical,
    name: 'Premium Reusable Hospital Patient Gown',
    description: 'High-quality reusable patient gown with full back wrap and tie closure. Soft cotton ensures patient comfort during extended stays.',
    fabric: '100% Combed Cotton (Hospital Grade)', price_range: '₹190 - ₹290', price_min: 190, price_max: 290,
    min_order_qty: 100, colors: 'Light Blue, White, Striped',
    tags: 'patient, gown, reusable, cotton', gender: 'Unisex',
    images: ['/images/unisex_hospital_gown.png'],
    is_featured: true, is_visible: true, display_order: 27,
  },

  // ══════════════════════════════════════════════════════════════
  // HOSPITALITY — extra items
  // ══════════════════════════════════════════════════════════════
  {
    id: 'b0000000-0000-0000-0000-000000000020',
    category_id: CAT.hospitality,
    name: 'Hotel Front Desk Reception Uniform Set',
    description: 'Smart two-piece front desk reception set with fitted blazer and matching trousers/skirt. Ideal for hotel lobbies, airlines, and premium hospitality environments.',
    fabric: 'Premium Poly-Viscose Gabardine', price_range: '₹1,200 - ₹1,800', price_min: 1200, price_max: 1800,
    min_order_qty: 30, colors: 'Navy & Gold, Black & Burgundy, Royal Blue & Silver',
    tags: 'reception, hotel, front desk, hospitality', gender: 'Unisex',
    images: ['/images/category_hospitality.png'],
    is_featured: true, is_visible: true, display_order: 5,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000021',
    category_id: CAT.hospitality,
    name: 'Restaurant Sommelier & Captain Uniform',
    description: 'Elegant sommelier jacket with satin lapels and matching trousers for fine-dining captains and restaurant managers. Includes bow-tie and pocket square.',
    fabric: 'Poly-Wool Super 120s Suiting', price_range: '₹1,400 - ₹2,200', price_min: 1400, price_max: 2200,
    min_order_qty: 20, colors: 'Black, Midnight Blue, Ivory',
    tags: 'sommelier, captain, fine dining, restaurant', gender: 'Unisex',
    images: ['/images/waiter_vest.png'],
    is_featured: false, is_visible: true, display_order: 6,
  },

  // ══════════════════════════════════════════════════════════════
  // CORPORATE — extra items using different images
  // ══════════════════════════════════════════════════════════════
  {
    id: 'b0000000-0000-0000-0000-000000000030',
    category_id: CAT.corporate,
    name: "Corporate Identity Men's Blazer",
    description: 'Classic single-breasted corporate blazer with notch lapel, dual vent, and interior branding pocket. Available with custom logo embroidery on breast pocket.',
    fabric: 'Premium Tropical Wool-Polyester Blend', price_range: '₹1,900 - ₹2,600', price_min: 1900, price_max: 2600,
    min_order_qty: 25, colors: 'Charcoal Grey, Navy Blue, Dark Brown',
    tags: 'blazer, corporate, identity, branding', gender: 'Men',
    images: ['/images/corporate_mens_blazer.png'],
    is_featured: true, is_visible: true, display_order: 6,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000031',
    category_id: CAT.corporate,
    name: "Corporate Identity Women's Blazer",
    description: "Power dressing redefined — women's corporate blazer with structured shoulders, slim-fit cut, and matching contrast lining. Custom logo embroidery available.",
    fabric: 'Premium Poly-Viscose Suiting Fabric', price_range: '₹1,700 - ₹2,400', price_min: 1700, price_max: 2400,
    min_order_qty: 25, colors: 'Navy Blue, Charcoal, Burgundy',
    tags: 'blazer, corporate, women, branded', gender: 'Women',
    images: ['/images/corporate_womens_blazer.png'],
    is_featured: false, is_visible: true, display_order: 7,
  },

  // ══════════════════════════════════════════════════════════════
  // SCHOOL — extra items using SVG icons + unused PNGs
  // ══════════════════════════════════════════════════════════════
  {
    id: 'b0000000-0000-0000-0000-000000000040',
    category_id: CAT.school,
    name: "Girls' School Pinafore Dress",
    description: "Smart navy blue school pinafore with adjustable shoulder straps, box pleats, and a large front pocket. Durable poly-wool blend resists daily wear and tear.",
    fabric: 'Poly-Wool Anti-Crease Blend', price_range: '₹320 - ₹480', price_min: 320, price_max: 480,
    min_order_qty: 100, colors: 'Navy Blue, Dark Green, Maroon',
    tags: 'school, pinafore, girls, uniform', gender: 'Women',
    images: ['/images/school_pinafore.svg'],
    is_featured: false, is_visible: true, display_order: 4,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000041',
    category_id: CAT.school,
    name: 'School Formal Uniform Shirt',
    description: 'Classic school formal shirt with stiff collar, reinforced buttons, and wrinkle-resistant finish. Easy-iron fabric saves time for parents.',
    fabric: '65% Polyester 35% Cotton Easy-Iron', price_range: '₹150 - ₹240', price_min: 150, price_max: 240,
    min_order_qty: 100, colors: 'White, Light Blue, Grey',
    tags: 'school, shirt, formal, easy-iron', gender: 'Unisex',
    images: ['/images/school_shirt.svg'],
    is_featured: false, is_visible: true, display_order: 5,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000042',
    category_id: CAT.school,
    name: "Girls' School Pleated Skirt",
    description: "Neatly knife-pleated school skirt with hidden waistband elastic and secure zip. Fade-resistant colour stays fresh throughout the academic year.",
    fabric: 'Fade-Resistant Terry-Poly Blend', price_range: '₹200 - ₹320', price_min: 200, price_max: 320,
    min_order_qty: 100, colors: 'Navy Blue, Dark Green, Grey',
    tags: 'school, skirt, girls, pleated', gender: 'Women',
    images: ['/images/school_skirt.svg'],
    is_featured: false, is_visible: true, display_order: 6,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000043',
    category_id: CAT.school,
    name: 'School V-Neck Winter Sweater',
    description: 'Warm V-neck school sweater with ribbed cuffs and hemline. School crest embroidery area included. Machine washable for easy care.',
    fabric: 'Acrylic Wool Blend (Anti-Pill)', price_range: '₹380 - ₹580', price_min: 380, price_max: 580,
    min_order_qty: 100, colors: 'Navy Blue, Maroon, Dark Green',
    tags: 'school, sweater, winter, V-neck', gender: 'Unisex',
    images: ['/images/school_sweater.svg'],
    is_featured: true, is_visible: true, display_order: 7,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000044',
    category_id: CAT.school,
    name: 'School Uniform House Tie',
    description: 'Classic school diagonal-stripe house tie with clip-on or standard knot option. Available in school house colours — minimum 50 pieces per colour.',
    fabric: 'Woven Polyester Satin', price_range: '₹80 - ₹140', price_min: 80, price_max: 140,
    min_order_qty: 50, colors: 'Red & Gold, Blue & Silver, Green & Yellow, Maroon & Cream',
    tags: 'school, tie, house colours, formal', gender: 'Unisex',
    images: ['/images/school_tie.svg'],
    is_featured: false, is_visible: true, display_order: 8,
  },

  // ══════════════════════════════════════════════════════════════
  // SECURITY — products (category had none)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'b0000000-0000-0000-0000-000000000050',
    category_id: CAT.security,
    name: 'Security Guard Full Uniform Set',
    description: 'Complete security guard uniform set including blazer-style jacket with shoulder epaulettes, formal trousers, and cap. Available with name badge and company logo embroidery.',
    fabric: 'Heavy-Duty Poly-Wool Suiting', price_range: '₹1,200 - ₹1,800', price_min: 1200, price_max: 1800,
    min_order_qty: 30, colors: 'Navy Blue, Khaki, Black, Olive Green',
    tags: 'security, guard, uniform, epaulette', gender: 'Unisex',
    images: ['/images/category_advocate.png'],
    is_featured: true, is_visible: true, display_order: 1,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000051',
    category_id: CAT.security,
    name: 'Security Hi-Vis Reflective Jacket',
    description: 'High-visibility security jacket with 3M reflective tape strips for night-duty and traffic management personnel. Meets EN ISO 20471 safety standards.',
    fabric: 'Fluorescent Poly Shell with 3M Tape', price_range: '₹480 - ₹680', price_min: 480, price_max: 680,
    min_order_qty: 50, colors: 'Fluorescent Yellow, Fluorescent Orange',
    tags: 'security, hi-vis, reflective, night duty', gender: 'Unisex',
    images: ['/images/industrial_coverall.png'],
    is_featured: false, is_visible: true, display_order: 2,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000052',
    category_id: CAT.security,
    name: 'Corporate Security Blazer',
    description: 'Smart navy blazer for corporate security and concierge staff. Double-breasted with brass buttons, shoulder boards, and company logo option.',
    fabric: 'Premium Poly-Viscose Suiting', price_range: '₹1,500 - ₹2,200', price_min: 1500, price_max: 2200,
    min_order_qty: 20, colors: 'Navy Blue, Black, Charcoal',
    tags: 'security, blazer, corporate, concierge', gender: 'Unisex',
    images: ['/images/mens_blazer.png'],
    is_featured: true, is_visible: true, display_order: 3,
  },

  // ══════════════════════════════════════════════════════════════
  // INDUSTRIAL — extra items
  // ══════════════════════════════════════════════════════════════
  {
    id: 'b0000000-0000-0000-0000-000000000060',
    category_id: CAT.industrial,
    name: 'FR Cotton Anti-Static Safety Shirt',
    description: 'Flame-retardant anti-static long-sleeve work shirt for oil, gas, and electrical industry workers. Meets EN ISO 11612 standard with permanent FR treatment.',
    fabric: 'FR-Treated 100% Cotton Drill', price_range: '₹850 - ₹1,200', price_min: 850, price_max: 1200,
    min_order_qty: 50, colors: 'Navy Blue, Royal Blue, Orange',
    tags: 'industrial, FR, flame retardant, safety', gender: 'Men',
    images: ['/images/staff_wardboy.png'],
    is_featured: false, is_visible: true, display_order: 2,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000061',
    category_id: CAT.industrial,
    name: 'Industrial Bib Dungaree Overalls',
    description: 'Heavy-duty bib dungarees for factory, workshop, and automotive workers. Reinforced knee panels, triple-stitched seams, and multiple utility pockets.',
    fabric: '100% Cotton Canvas Duck Weave', price_range: '₹580 - ₹820', price_min: 580, price_max: 820,
    min_order_qty: 50, colors: 'Royal Blue, Navy Blue, Dark Green',
    tags: 'industrial, dungaree, overalls, factory', gender: 'Men',
    images: ['/images/medical_lab_apron.png'],
    is_featured: true, is_visible: true, display_order: 3,
  },

  // ══════════════════════════════════════════════════════════════
  // ADVOCATE — extra items
  // ══════════════════════════════════════════════════════════════
  {
    id: 'b0000000-0000-0000-0000-000000000070',
    category_id: CAT.advocate,
    name: "Women Advocate's Court Coat",
    description: "Tailored women's advocate court coat with structured lapels, hook-and-bar closure, and smart back vent. Lightweight suiting fabric for long court sessions.",
    fabric: 'Wrinkle-Resistant Poly-Wool Suiting', price_range: '₹1,100 - ₹1,600', price_min: 1100, price_max: 1600,
    min_order_qty: 20, colors: 'Black',
    tags: 'advocate, court, women, legal', gender: 'Women',
    images: ['/images/category_advocate.png'],
    is_featured: true, is_visible: true, display_order: 2,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000071',
    category_id: CAT.advocate,
    name: 'Advocate Gown (Full Length)',
    description: 'Traditional full-length black advocate gown with wide sleeves and open front. Made from lightweight matte polyester for comfort during long hearings.',
    fabric: 'Lightweight Matte Polyester Satin', price_range: '₹850 - ₹1,200', price_min: 850, price_max: 1200,
    min_order_qty: 20, colors: 'Black',
    tags: 'advocate, gown, court, full length', gender: 'Unisex',
    images: ['/images/advocate_coat.png'],
    is_featured: false, is_visible: true, display_order: 3,
  },

  // ══════════════════════════════════════════════════════════════
  // CONVOCATION — extra items
  // ══════════════════════════════════════════════════════════════
  {
    id: 'b0000000-0000-0000-0000-000000000080',
    category_id: CAT.convocation,
    name: 'Doctoral Convocation Robe with Hood',
    description: 'Distinguished doctoral graduation robe with wide velvet-trimmed sleeves, matching satin-lined hood in faculty colour, and mortarboard cap.',
    fabric: 'Premium Matte Polyester with Velvet Trim', price_range: '₹1,400 - ₹2,200', price_min: 1400, price_max: 2200,
    min_order_qty: 20, colors: 'Black with custom hood colour',
    tags: 'convocation, doctoral, robe, PhD', gender: 'Unisex',
    images: ['/images/gown_isolation.png'],
    is_featured: true, is_visible: true, display_order: 2,
  },

  // ══════════════════════════════════════════════════════════════
  // SPORTS — extra items
  // ══════════════════════════════════════════════════════════════
  {
    id: 'b0000000-0000-0000-0000-000000000090',
    category_id: CAT.sports,
    name: 'Cricket Team Playing Kit',
    description: 'Full sublimation-printed cricket kit including half-sleeve jersey and matching trousers. Moisture-wicking, lightweight, and fully customisable with player name, number, and sponsor logos.',
    fabric: '100% Interlock Dry-Fit Polyester', price_range: '₹380 - ₹580', price_min: 380, price_max: 580,
    min_order_qty: 11, colors: 'White, Blue, Yellow, Green',
    tags: 'cricket, sports, jersey, sublimation', gender: 'Men',
    images: ['/images/sports_jersey.png'],
    is_featured: true, is_visible: true, display_order: 2,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000091',
    category_id: CAT.sports,
    name: 'Football Sublimated Team Jersey Set',
    description: 'Lightweight breathable football jersey with mesh side panels and matching shorts. Full sublimation for club colours, player number, and sponsor branding.',
    fabric: 'Moisture-Wicking Mesh Interlock Polyester', price_range: '₹290 - ₹450', price_min: 290, price_max: 450,
    min_order_qty: 11, colors: 'Any custom colour via sublimation',
    tags: 'football, jersey, sports, sublimation', gender: 'Unisex',
    images: ['/images/category_school.png'],
    is_featured: false, is_visible: true, display_order: 3,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000092',
    category_id: CAT.sports,
    name: 'School Athletic PE Shorts',
    description: 'Lightweight school PE shorts with elasticated waist and inner brief lining. Quick-dry fabric ideal for sports day, athletics, and daily PE classes.',
    fabric: 'Quick-Dry Polyester Interlock', price_range: '₹120 - ₹190', price_min: 120, price_max: 190,
    min_order_qty: 100, colors: 'Navy Blue, Black, Royal Blue',
    tags: 'sports, PE, shorts, school', gender: 'Unisex',
    images: ['/images/school_pe_tracksuit.svg'],
    is_featured: false, is_visible: true, display_order: 4,
  },
]

async function addProducts() {
  console.log(`\n🚀 Adding ${NEW_PRODUCTS.length} new products...\n`)
  let ok = 0, fail = 0

  for (const p of NEW_PRODUCTS) {
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
      console.error(`  ✗ [${p.name.substring(0, 45)}]: ${error.message}`)
      fail++
    } else {
      console.log(`  ✅ ${p.name.substring(0, 55)}`)
      ok++
    }
  }

  console.log(`\n📊 Done! Added: ${ok} products, Errors: ${fail}`)
  console.log('✨ Refresh your catalogue to see the new items!\n')
}

addProducts()
