import { supabase } from '@/lib/supabase'

const MOCK_CATEGORIES = [
  { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical', display_order: 1 },
  { id: 'cat-hospitality', name: 'Hotel & Hospitality Uniforms', slug: 'hospitality', display_order: 2 },
  { id: 'cat-corporate', name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate', display_order: 3 },
  { id: 'cat-advocate', name: 'Advocates & Legal (Coats & Gowns)', slug: 'advocate', display_order: 4 },
  { id: 'cat-school', name: 'School Uniforms', slug: 'school', display_order: 5 },
  { id: 'cat-convocation', name: 'Convocation (Gowns & Caps)', slug: 'convocation', display_order: 6 },
  { id: 'cat-security', name: 'Security & Defence Uniforms', slug: 'security', display_order: 7 },
  { id: 'cat-industrial', name: 'Industrial & Factory Workwear', slug: 'industrial', display_order: 8 },
  { id: 'cat-sports', name: 'Sports & PE Uniforms', slug: 'sports', display_order: 9 },
  { id: 'cat-banking', name: 'Banking & Finance Formals', slug: 'banking', display_order: 10 },
  { id: 'cat-police', name: 'Police & Paramilitary (Ceremonial)', slug: 'police', display_order: 11 },
  { id: 'cat-fire', name: 'Fire & Safety Uniforms', slug: 'fire', display_order: 12 },
  { id: 'cat-airline', name: 'Airline & Aviation Crew', slug: 'airline', display_order: 13 }
]

const MOCK_PRODUCTS = [
  // ═══════════════════════════════════════════
  // ── MEDICAL & HEALTHCARE (10 products) ──
  // ═══════════════════════════════════════════
  {
    id: 'prod-doctor-male',
    name: "Premium Men's Professional Lab Coat",
    description: "Classic full-length men's professional lab coat featuring a tailored chest fit, side vent openings for pocket access, multiple utility pockets, and durable reinforced stitching. Anti-microbial treated.",
    category_id: 'cat-medical',
    images: ['/images/mens_lab_coat.png'],
    fabric: '100% Cotton with Liquid Barrier Finish',
    is_featured: true,
    is_visible: true,
    price_range: '₹450 - ₹650',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Navy Blue'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 100000).toISOString(),
  },
  {
    id: 'prod-doctor-female',
    name: "Premium Women's Tailored Lab Coat",
    description: "Princess-seamed women's professional lab coat featuring a slim, elegant tailored fit, side pocket access, chest utility pocket, and anti-wrinkle fabric.",
    category_id: 'cat-medical',
    images: ['/images/womens_lab_coat.png'],
    fabric: '100% Cotton with Liquid Barrier Finish',
    is_featured: true,
    is_visible: true,
    price_range: '₹450 - ₹650',
    min_order_qty: 50,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Soft Pink'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 150000).toISOString(),
  },
  {
    id: 'prod-doctor-2',
    name: 'Premium Hospital Unisex OT Scrub Suit',
    description: 'Classic medical scrubs set (top and cargo trousers) featuring double chest pockets and drawstring waist. Antimicrobial treated for surgical and general ward duty.',
    category_id: 'cat-medical',
    images: ['/images/ot_scrub_suit.png'],
    fabric: 'Breathable Poly-Cotton Medical Weave',
    is_featured: false,
    is_visible: true,
    price_range: '₹480 - ₹690',
    min_order_qty: 100,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Green', 'Teal', 'Navy Blue', 'Maroon'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 200000).toISOString(),
  },
  {
    id: 'prod-nurse-1',
    name: 'Premium Nurse Tunic Uniform (Zip Front)',
    description: 'Professional nursing tunic featuring elegant contrast piping, zip front closure, dual deep side pockets, and back action pleats for high flexibility during duty.',
    category_id: 'cat-medical',
    images: ['/images/nurse_tunic.png'],
    fabric: 'Poly-Cotton Easy-Care Poplin',
    is_featured: true,
    is_visible: true,
    price_range: '₹420 - ₹580',
    min_order_qty: 100,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Burgundy', 'Teal'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 400000).toISOString(),
  },
  {
    id: 'prod-nurse-2',
    name: 'Female V-Neck Patient Care Scrub Set',
    description: 'Lightweight scrubs designed for nurses, dental assistants, and clinic care teams. Soft touch, fade-resistant fabric with 4-way stretch utility.',
    category_id: 'cat-medical',
    images: ['/images/female_scrub_set.png'],
    fabric: 'Stretchable Poly-Rayon Blend',
    is_featured: false,
    is_visible: true,
    price_range: '₹450 - ₹600',
    min_order_qty: 80,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ceil Blue', 'Wine', 'Hunter Green'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 550000).toISOString(),
  },
  {
    id: 'prod-patient-1',
    name: 'Premium Patient Hospital Gown (Unisex)',
    description: 'Comfortable and breathable patient gown featuring a classic back-tie closure and roomy sleeves. Lightweight fabric ensures maximum comfort during extended hospital stays.',
    category_id: 'cat-medical',
    images: ['/images/unisex_hospital_gown.png'],
    fabric: '100% Breathable Soft Cotton',
    is_featured: true,
    is_visible: true,
    price_range: '₹180 - ₹280',
    min_order_qty: 100,
    sizes: ['Free Size', 'L', 'XL'],
    colors: ['Light Blue', 'White', 'Green'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 550000).toISOString(),
  },
  {
    id: 'prod-patient-2',
    name: 'Disposable Sterile SMS Patient Gown',
    description: 'Single-use fluid-resistant sterile patient gown designed for surgical and diagnostic prep. Lightweight SMS barrier fabric provides hygienic protection.',
    category_id: 'cat-medical',
    images: ['/images/disposable_patient_gown.png'],
    fabric: 'Fluid-Resistant SMS Non-Woven',
    is_featured: false,
    is_visible: true,
    price_range: '₹90 - ₹140',
    min_order_qty: 250,
    sizes: ['Free Size'],
    colors: ['Blue', 'Green'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 580000).toISOString(),
  },
  {
    id: 'prod-medical-apron',
    name: 'Surgical Disposable Wraparound Apron',
    description: 'Fluid-proof wraparound surgical apron for theatre, autopsy, and clinical procedures. Neck-tie and waist-tie adjustable fit with full torso coverage.',
    category_id: 'cat-medical',
    images: ['/images/disposable_patient_gown.png'],
    fabric: 'Waterproof PE Laminated Non-Woven',
    is_featured: false,
    is_visible: true,
    price_range: '₹45 - ₹80',
    min_order_qty: 500,
    sizes: ['Free Size'],
    colors: ['Blue', 'White'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 610000).toISOString(),
  },
  {
    id: 'prod-medical-cap',
    name: 'Disposable Surgeon Bouffant Cap (Pack of 100)',
    description: 'Breathable non-woven bouffant caps with elastic band. Ideal for operation theatres, pharmaceutical labs, and food processing units.',
    category_id: 'cat-medical',
    images: ['/images/disposable_patient_gown.png'],
    fabric: 'Spunbond Polypropylene Non-Woven',
    is_featured: false,
    is_visible: true,
    price_range: '₹250 - ₹350',
    min_order_qty: 100,
    sizes: ['Free Size'],
    colors: ['Blue', 'Green', 'White'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 620000).toISOString(),
  },
  {
    id: 'prod-medical-shoe',
    name: 'Disposable Anti-Skid Shoe Cover (Pack of 50)',
    description: 'Fluid-resistant shoe covers with anti-skid sole grip. Essential for OT, ICU, pharmaceutical clean rooms, and lab environments.',
    category_id: 'cat-medical',
    images: ['/images/disposable_patient_gown.png'],
    fabric: 'CPE Waterproof Film',
    is_featured: false,
    is_visible: true,
    price_range: '₹180 - ₹250',
    min_order_qty: 200,
    sizes: ['Free Size'],
    colors: ['Blue', 'White'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 630000).toISOString(),
  },
  {
    id: 'prod-scrub-jogger',
    name: 'Unisex Premium Jogger Scrub Set',
    description: 'Modern athletic fit scrub set featuring moisture-wicking 4-way stretch fabric, ribbed knit collar, jogger pants with elastic ankle cuffs, and 6 functional utility pockets.',
    category_id: 'cat-medical',
    images: ['/images/scrub_jogger.png'],
    fabric: '4-Way Stretch Polyester-Spandex Blend',
    is_featured: true,
    is_visible: true,
    price_range: '₹750 - ₹950',
    min_order_qty: 80,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Teal', 'Navy Blue', 'Ceil Blue', 'Charcoal Grey'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 635000).toISOString(),
  },
  {
    id: 'prod-scrub-pediatric',
    name: 'Pediatric Specialist Printed Scrub Top',
    description: 'Friendly, printed pediatric scrub top featuring cute cartoon characters, stethoscopes, and animal illustrations. Helps put young patients at ease during clinical visits.',
    category_id: 'cat-medical',
    images: ['/images/scrub_pediatric.png'],
    fabric: 'Soft-Touch Breathable Cotton-Blend',
    is_featured: false,
    is_visible: true,
    price_range: '₹320 - ₹450',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Light Blue Print', 'Pink Print', 'Mint Print'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 640000).toISOString(),
  },
  {
    id: 'prod-tunic-dentist',
    name: 'Dentist & Specialist Clinic Wrap Tunic',
    description: 'Ergonomic wrap-style tunic with asymmetrical side button closure, mock neck, and twin hip pockets. Designed for dentists, dermatologists, and aesthetic clinic staff.',
    category_id: 'cat-medical',
    images: ['/images/tunic_dentist.png'],
    fabric: 'Stain-Resistant Cotton-Poly Drill',
    is_featured: true,
    is_visible: true,
    price_range: '₹490 - ₹690',
    min_order_qty: 50,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pristine White', 'Lilac', 'Mint Green'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 645000).toISOString(),
  },
  {
    id: 'prod-staff-wardboy',
    name: 'Hospital Ward Attendant & Staff Uniform Set',
    description: 'High-durability utility uniform consisting of a short-sleeve comfort tunic and straight-fit cargo pants. Designed for ward boys, hospital helper staff, and stretcher attendants.',
    category_id: 'cat-medical',
    images: ['/images/staff_wardboy.png'],
    fabric: 'Heavy-Duty Industrial Poly-Cotton',
    is_featured: false,
    is_visible: true,
    price_range: '₹380 - ₹520',
    min_order_qty: 100,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy Blue', 'Slate Grey', 'Olive Green'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 650000).toISOString(),
  },
  {
    id: 'prod-gown-isolation',
    name: 'Autoclavable Surgical Isolation Gown',
    description: 'Reusable surgical isolation gown with full back overlap, stockinette cuffs, and tie closures. Constructed to withstand frequent autoclave sterilization cycles.',
    category_id: 'cat-medical',
    images: ['/images/gown_isolation.png'],
    fabric: '100% Cotton Canvas with Liquid Barrier',
    is_featured: false,
    is_visible: true,
    price_range: '₹280 - ₹380',
    min_order_qty: 100,
    sizes: ['Free Size'],
    colors: ['Surgical Green', 'Sky Blue'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 655000).toISOString(),
  },
  {
    id: 'prod-doctor-blazer',
    name: 'Premium Medical Consultation Blazer',
    description: 'Tailored short consultation coat for senior doctors and medical consultants. Features elegant notch lapels, structured shoulders, and clean lining.',
    category_id: 'cat-medical',
    images: ['/images/doctor_blazer.png'],
    fabric: 'Premium Tropical Poly-Viscose',
    is_featured: true,
    is_visible: true,
    price_range: '₹950 - ₹1,400',
    min_order_qty: 30,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Charcoal Grey', 'Navy Blue'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 660000).toISOString(),
  },
  {
    id: 'prod-maternity-scrub',
    name: 'Maternity Comfort Scrub Top',
    description: 'Specially tailored maternity scrub top with side-panel stretch panels and adjustable drawstrings, allowing comfort and room to grow throughout pregnancy.',
    category_id: 'cat-medical',
    images: ['/images/maternity_scrub.png'],
    fabric: 'Super Soft Bamboo-Cotton Blend',
    is_featured: false,
    is_visible: true,
    price_range: '₹480 - ₹620',
    min_order_qty: 30,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Royal Blue', 'Ceil Blue', 'Burgundy'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 665000).toISOString(),
  },
  {
    id: 'prod-patient-pajama',
    name: 'Premium Two-Piece Patient Suit',
    description: 'Deluxe patient uniform including a front-buttoned short-sleeve shirt and matching elastic waist trousers. Offers dignity and comfort for long-term recovery stays.',
    category_id: 'cat-medical',
    images: ['/images/patient_pajama.png'],
    fabric: '100% Soft Combed Cotton (Hospital Grade)',
    is_featured: false,
    is_visible: true,
    price_range: '₹320 - ₹480',
    min_order_qty: 100,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue Striped', 'Green Patterned', 'Solid White'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 670000).toISOString(),
  },
  {
    id: 'prod-medical-lab-apron',
    name: 'Pharmacist Short Sleeve Lab Jacket',
    description: 'Professional waist-length lab jacket featuring short sleeves, three patch pockets, and snap-button front. Perfect for pharmacists, lab technicians, and lab assistants.',
    category_id: 'cat-medical',
    images: ['/images/medical_lab_apron.png'],
    fabric: 'Durable Twill Poplin',
    is_featured: false,
    is_visible: true,
    price_range: '₹290 - ₹390',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Grey'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 675000).toISOString(),
  },
  {
    id: 'prod-scrub-premium-fit',
    name: 'Elite Stretch V-Neck Scrub Suit',
    description: 'Designer-grade athletic scrub suit with yoga-style waistband, clean V-neck, mesh lining for breathability, and zip pockets. Antimicrobial and wrinkle-free.',
    category_id: 'cat-medical',
    images: ['/images/scrub_premium_fit.png'],
    fabric: 'Elite Rayon-Poly-Spandex Blend',
    is_featured: true,
    is_visible: true,
    price_range: '₹890 - ₹1,190',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Olive', 'Royal Blue', 'Steel Grey'],
    categories: { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical' },
    created_at: new Date(Date.now() - 680000).toISOString(),
  },

  // ═══════════════════════════════════════════
  // ── HOSPITALITY & HOUSEKEEPING (10 products) ──
  // ═══════════════════════════════════════════
  {
    id: 'prod-chef-1',
    name: 'Double-Breasted Master Chef Jacket',
    description: 'Elite hospitality chef coat designed for hot kitchen environments. Features breathable mesh underarms, a thermometer arm pocket, and reversible front closure.',
    category_id: 'cat-hospitality',
    images: ['/images/chef_jacket.png'],
    fabric: 'Heavy Duty Canvas Cotton with Breathable Mesh',
    is_featured: true,
    is_visible: true,
    price_range: '₹750 - ₹1,100',
    min_order_qty: 30,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Grey'],
    categories: { id: 'cat-hospitality', name: 'Hotel & Hospitality Uniforms', slug: 'hospitality' },
    created_at: new Date(Date.now() - 800000).toISOString(),
  },
  {
    id: 'prod-chef-2',
    name: 'Premium Chef Kitchen Bib Apron',
    description: 'Professional kitchen bib apron tailored from stain-resistant canvas twill. Features dual deep pockets, reinforced loops, and adjustable neck straps.',
    category_id: 'cat-hospitality',
    images: ['/images/chef_apron.png'],
    fabric: 'Stain-Resistant Cotton Canvas Twill',
    is_featured: false,
    is_visible: true,
    price_range: '₹180 - ₹260',
    min_order_qty: 100,
    sizes: ['Free Size'],
    colors: ['Black', 'Brown', 'Navy', 'Denim Blue'],
    categories: { id: 'cat-hospitality', name: 'Hotel & Hospitality Uniforms', slug: 'hospitality' },
    created_at: new Date(Date.now() - 820000).toISOString(),
  },
  {
    id: 'prod-chef-pants',
    name: 'Chef Check Baggy Trouser',
    description: 'Classic houndstooth check chef trouser with elastic drawstring waist. Loose-fit for comfortable kitchen movement. Industrial wash-safe and colour-fast.',
    category_id: 'cat-hospitality',
    images: ['/images/chef_jacket.png'],
    fabric: 'Poly-Cotton Twill with Check Pattern',
    is_featured: false,
    is_visible: true,
    price_range: '₹320 - ₹480',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Black & White Check', 'Black', 'Grey'],
    categories: { id: 'cat-hospitality', name: 'Hotel & Hospitality Uniforms', slug: 'hospitality' },
    created_at: new Date(Date.now() - 830000).toISOString(),
  },
  {
    id: 'prod-chef-hat',
    name: 'Tall Pleated Chef Toque Hat',
    description: 'Traditional tall white chef toque with adjustable velcro band. Pleated design with internal mesh lining for ventilation.',
    category_id: 'cat-hospitality',
    images: ['/images/chef_jacket.png'],
    fabric: 'Starched Poly-Cotton with Mesh Lining',
    is_featured: false,
    is_visible: true,
    price_range: '₹120 - ₹200',
    min_order_qty: 50,
    sizes: ['Free Size'],
    colors: ['White', 'Black'],
    categories: { id: 'cat-hospitality', name: 'Hotel & Hospitality Uniforms', slug: 'hospitality' },
    created_at: new Date(Date.now() - 840000).toISOString(),
  },
  {
    id: 'prod-waiter-1',
    name: 'Waiter Formal Vest & Bow Tie Set',
    description: 'Classic five-button waistcoat with adjustable back buckle and matching bow tie. Designed for dining banquets and executive bar staff.',
    category_id: 'cat-hospitality',
    images: ['/images/chef_jacket.png'],
    fabric: 'Poly-Viscose Gabardine with Satin Back',
    is_featured: true,
    is_visible: true,
    price_range: '₹650 - ₹900',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Charcoal Grey', 'Maroon'],
    categories: { id: 'cat-hospitality', name: 'Hotel & Hospitality Uniforms', slug: 'hospitality' },
    created_at: new Date(Date.now() - 1000000).toISOString(),
  },
  {
    id: 'prod-waiter-shirt',
    name: 'Formal Waiter Long-Sleeve Service Shirt',
    description: 'Crisp formal shirt tailored for waiters, bartenders, and front-of-house staff. Features reinforced cuffs, chest pocket, and wrinkle-resistant finish.',
    category_id: 'cat-hospitality',
    images: ['/images/chef_jacket.png'],
    fabric: 'Easy-Iron Poly-Cotton Poplin',
    is_featured: false,
    is_visible: true,
    price_range: '₹350 - ₹500',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Light Blue', 'Cream'],
    categories: { id: 'cat-hospitality', name: 'Hotel & Hospitality Uniforms', slug: 'hospitality' },
    created_at: new Date(Date.now() - 980000).toISOString(),
  },


  // ═══════════════════════════════════════════
  // ── CORPORATE WEAR (8 products) ──
  // ═══════════════════════════════════════════
  {
    id: 'prod-corporate-1',
    name: "Slim Fit Corporate Men's Blazer",
    description: 'Ultra-modern corporate wool-blend blazer with double vent, notch lapel, and customized satin lining. Ideal for corporate office environments.',
    category_id: 'cat-corporate',
    images: ['/images/category_corporate.png'],
    fabric: 'Premium Tropical Wool Blend',
    is_featured: true,
    is_visible: true,
    price_range: '₹1,800 - ₹2,400',
    min_order_qty: 50,
    sizes: ['36', '38', '40', '42', '44', '46'],
    colors: ['Navy Blue', 'Charcoal', 'Black'],
    categories: { id: 'cat-corporate', name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate' },
    created_at: new Date(Date.now() - 1100000).toISOString(),
  },
  {
    id: 'prod-corporate-women-blazer',
    name: "Women's Tailored Corporate Blazer",
    description: 'Single-breasted feminine blazer with princess seam, padded shoulders, and functional pockets. Perfect for front-office, banking, and airline staff.',
    category_id: 'cat-corporate',
    images: ['/images/category_corporate.png'],
    fabric: 'Premium Poly-Viscose Suiting',
    is_featured: true,
    is_visible: true,
    price_range: '₹1,600 - ₹2,200',
    min_order_qty: 50,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Black', 'Charcoal'],
    categories: { id: 'cat-corporate', name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate' },
    created_at: new Date(Date.now() - 1120000).toISOString(),
  },
  {
    id: 'prod-corporate-2',
    name: 'Tailored Poly-Wool Corporate Nehru Jacket',
    description: 'Modern corporate sleeveless Modi waistcoat featuring traditional mandarin collar and high-quality button closures. Gives security or front office teams a premium identity.',
    category_id: 'cat-corporate',
    images: ['/images/category_corporate.png'],
    fabric: 'Premium Poly-Wool Tweed Weave',
    is_featured: false,
    is_visible: true,
    price_range: '₹850 - ₹1,200',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal Grey', 'Black', 'Beige'],
    categories: { id: 'cat-corporate', name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate' },
    created_at: new Date(Date.now() - 1200000).toISOString(),
  },
  {
    id: 'prod-corporate-3',
    name: 'Premium Corporate Oxford Shirt',
    description: 'Classic Oxford button-down shirt. Wrinkle-free finish with reinforced collar stays. Ideal for daily corporate and banking wear.',
    category_id: 'cat-corporate',
    images: ['/images/category_corporate.png'],
    fabric: 'Egyptian Cotton Oxford Weave',
    is_featured: false,
    is_visible: true,
    price_range: '₹480 - ₹700',
    min_order_qty: 55,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Grey', 'Sky Blue Stripe'],
    categories: { id: 'cat-corporate', name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate' },
    created_at: new Date(Date.now() - 1300000).toISOString(),
  },
  {
    id: 'prod-corporate-trouser',
    name: 'Corporate Formal Flat-Front Trouser',
    description: 'Classic flat-front formal trouser with permanent crease, hook-bar closure, and belt loops. Machine washable with shape-retention fabric.',
    category_id: 'cat-corporate',
    images: ['/images/category_corporate.png'],
    fabric: 'Premium Poly-Viscose Suiting',
    is_featured: false,
    is_visible: true,
    price_range: '₹550 - ₹850',
    min_order_qty: 50,
    sizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    colors: ['Navy Blue', 'Black', 'Charcoal', 'Khaki'],
    categories: { id: 'cat-corporate', name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate' },
    created_at: new Date(Date.now() - 1310000).toISOString(),
  },
  {
    id: 'prod-corporate-tie',
    name: 'Corporate Silk Necktie & Pocket Square Set',
    description: 'Premium woven silk tie with matching pocket square. Available in solid, stripe, and micro-dot patterns. Custom logo printing available for bulk orders.',
    category_id: 'cat-corporate',
    images: ['/images/category_corporate.png'],
    fabric: '100% Woven Silk',
    is_featured: false,
    is_visible: true,
    price_range: '₹350 - ₹600',
    min_order_qty: 50,
    sizes: ['Standard (148 cm)'],
    colors: ['Navy Blue', 'Maroon', 'Black', 'Royal Blue'],
    categories: { id: 'cat-corporate', name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate' },
    created_at: new Date(Date.now() - 1320000).toISOString(),
  },
  {
    id: 'prod-corporate-polo',
    name: 'Corporate Branded Polo T-Shirt',
    description: 'Relaxed-fit corporate polo with ribbed collar, 3-button placket, and side vents. Perfect for casual Fridays, tech teams, and field staff. Custom logo embroidery included.',
    category_id: 'cat-corporate',
    images: ['/images/category_corporate.png'],
    fabric: 'Honeycomb Knit Lacoste Cotton',
    is_featured: true,
    is_visible: true,
    price_range: '₹280 - ₹420',
    min_order_qty: 100,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['White', 'Navy Blue', 'Black', 'Red', 'Grey'],
    categories: { id: 'cat-corporate', name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate' },
    created_at: new Date(Date.now() - 1330000).toISOString(),
  },
  {
    id: 'prod-corporate-suit',
    name: "Men's 2-Piece Executive Suit Set",
    description: 'Complete 2-piece suit (blazer + trouser) tailored from premium tropical wool. Single-breasted, double-vent, with full canvas construction for a structured silhouette.',
    category_id: 'cat-corporate',
    images: ['/images/category_corporate.png'],
    fabric: 'Super 120s Tropical Wool',
    is_featured: true,
    is_visible: true,
    price_range: '₹3,500 - ₹5,500',
    min_order_qty: 30,
    sizes: ['36', '38', '40', '42', '44', '46', '48'],
    colors: ['Navy Blue', 'Charcoal', 'Black', 'Mid Grey'],
    categories: { id: 'cat-corporate', name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate' },
    created_at: new Date(Date.now() - 1080000).toISOString(),
  },

  // ═══════════════════════════════════════════
  // ── ADVOCATES & LEGAL (6 products) ──
  // ═══════════════════════════════════════════
  {
    id: 'prod-advocate-1',
    name: 'Classic Black Advocate Coat',
    description: 'Premium structured black advocate coat with notch lapel, satin-lined interior, and reinforced stitching. Tailored specifically for Indian courts — District, High Court, and Supreme Court.',
    category_id: 'cat-advocate',
    images: ['/images/category_advocate.png'],
    fabric: 'Poly-Wool Wrinkle-Resistant Suiting',
    is_featured: true,
    is_visible: true,
    price_range: '₹1,250 - ₹1,850',
    min_order_qty: 30,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    categories: { id: 'cat-advocate', name: 'Advocates & Legal (Coats & Gowns)', slug: 'advocate' },
    created_at: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: 'prod-advocate-2',
    name: 'Lady Advocate Formal Black Jacket',
    description: 'Elegant structured single-breasted black jacket designed for women legal practitioners in district and High Courts. Features inner pockets and comfortable back vents.',
    category_id: 'cat-advocate',
    images: ['/images/category_advocate.png'],
    fabric: 'Premium Tropical Wool Blend',
    is_featured: false,
    is_visible: true,
    price_range: '₹950 - ₹1,400',
    min_order_qty: 30,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    categories: { id: 'cat-advocate', name: 'Advocates & Legal (Coats & Gowns)', slug: 'advocate' },
    created_at: new Date(Date.now() - 700000).toISOString(),
  },
  {
    id: 'prod-advocate-gown',
    name: 'High Court / Supreme Court Advocate Gown',
    description: 'Full-length flowing black legal gown with pleated back, gathered shoulder yoke, and satin-trimmed front panels. Mandatory for High Court and Supreme Court appearances.',
    category_id: 'cat-advocate',
    images: ['/images/category_advocate.png'],
    fabric: 'Premium Matte Polyester Suiting',
    is_featured: true,
    is_visible: true,
    price_range: '₹1,800 - ₹2,500',
    min_order_qty: 20,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    categories: { id: 'cat-advocate', name: 'Advocates & Legal (Coats & Gowns)', slug: 'advocate' },
    created_at: new Date(Date.now() - 640000).toISOString(),
  },
  {
    id: 'prod-advocate-band',
    name: 'Advocate White Collar Band (Set of 5)',
    description: 'Starched white cotton collar bands (bib) for advocates. Classic two-tab style as prescribed by the Bar Council of India. Sold in packs of 5.',
    category_id: 'cat-advocate',
    images: ['/images/category_advocate.png'],
    fabric: 'Starched 100% Cotton Poplin',
    is_featured: false,
    is_visible: true,
    price_range: '₹120 - ₹180',
    min_order_qty: 100,
    sizes: ['Free Size'],
    colors: ['White'],
    categories: { id: 'cat-advocate', name: 'Advocates & Legal (Coats & Gowns)', slug: 'advocate' },
    created_at: new Date(Date.now() - 660000).toISOString(),
  },
  {
    id: 'prod-advocate-trouser',
    name: 'Advocate Formal Black Striped Trouser',
    description: 'Classic flat-front black trouser with subtle pin-stripe. Permanent crease, comfort waistband, and tailored leg for a professional courtroom appearance.',
    category_id: 'cat-advocate',
    images: ['/images/category_advocate.png'],
    fabric: 'Poly-Wool Suiting with Stripe',
    is_featured: false,
    is_visible: true,
    price_range: '₹650 - ₹950',
    min_order_qty: 30,
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: ['Black', 'Black Stripe'],
    categories: { id: 'cat-advocate', name: 'Advocates & Legal (Coats & Gowns)', slug: 'advocate' },
    created_at: new Date(Date.now() - 680000).toISOString(),
  },
  {
    id: 'prod-advocate-shirt',
    name: 'Advocate Formal White Full-Sleeve Shirt',
    description: 'Crisp white formal shirt specifically cut for wear under advocate coats. Extra-long placket, reinforced collar, and French cuff option available.',
    category_id: 'cat-advocate',
    images: ['/images/category_advocate.png'],
    fabric: '100% Cotton Twill with Easy-Iron Finish',
    is_featured: false,
    is_visible: true,
    price_range: '₹380 - ₹550',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
    categories: { id: 'cat-advocate', name: 'Advocates & Legal (Coats & Gowns)', slug: 'advocate' },
    created_at: new Date(Date.now() - 690000).toISOString(),
  },

  // ═══════════════════════════════════════════
  // ── SCHOOL UNIFORMS (10 products) ──
  // ═══════════════════════════════════════════
  {
    id: 'prod-school-1',
    name: 'Premium School Blazer (Embroidered Crest)',
    description: 'High-durability school blazer tailored from premium terry-wool fabric. Resists fading and pilling over daily wash. Custom school crest embroidery included.',
    category_id: 'cat-school',
    images: ['/images/school_blazer.svg'],
    fabric: 'Terry-Wool Premium Blend',
    is_featured: true,
    is_visible: true,
    price_range: '₹850 - ₹1,200',
    min_order_qty: 100,
    sizes: ['22', '24', '26', '28', '30', '32', '34', '36', '38', '40'],
    colors: ['Navy Blue', 'Black', 'Maroon', 'Bottle Green'],
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1400000).toISOString(),
  },
  {
    id: 'prod-school-2',
    name: 'Classic Girls Pleated Pinafore',
    description: 'Standard school pinafore featuring elegant box pleats and a side button closure. Tailored from sweat-wicking twill. Custom check pattern available.',
    category_id: 'cat-school',
    images: ['/images/school_pinafore.svg'],
    fabric: 'Premium Polyester-Cotton Twill',
    is_featured: true,
    is_visible: true,
    price_range: '₹350 - ₹500',
    min_order_qty: 150,
    sizes: ['22', '24', '26', '28', '30', '32'],
    colors: ['Grey', 'Navy Blue', 'Brown', 'Check Pattern'],
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1500000).toISOString(),
  },
  {
    id: 'prod-school-shirt',
    name: 'School Uniform Formal Shirt (Half / Full Sleeve)',
    description: 'Crisp white or coloured school shirt with pointed collar, chest pocket with logo embroidery, and reinforced seams. Available in both half and full sleeve.',
    category_id: 'cat-school',
    images: ['/images/school_shirt.svg'],
    fabric: 'Premium Poly-Cotton Poplin',
    is_featured: false,
    is_visible: true,
    price_range: '₹180 - ₹280',
    min_order_qty: 200,
    sizes: ['22', '24', '26', '28', '30', '32', '34', '36', '38'],
    colors: ['White', 'Light Blue', 'Cream'],
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1420000).toISOString(),
  },
  {
    id: 'prod-school-trouser',
    name: 'School Uniform Formal Trouser',
    description: 'Durable school trouser with elastic waist option for juniors and belt-loop for seniors. Colour-fast fabric that resists fading even after 100+ washes.',
    category_id: 'cat-school',
    images: ['/images/school_trouser.svg'],
    fabric: 'Premium Poly-Cotton Drill',
    is_featured: false,
    is_visible: true,
    price_range: '₹250 - ₹400',
    min_order_qty: 200,
    sizes: ['22', '24', '26', '28', '30', '32', '34', '36', '38'],
    colors: ['Grey', 'Navy Blue', 'Black', 'Khaki'],
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1430000).toISOString(),
  },
  {
    id: 'prod-school-tie',
    name: 'School Striped Necktie (Elastic / Regular)',
    description: 'Woven polyester school tie in house colours with diagonal stripe pattern. Available in both elastic clip-on (for juniors) and regular knot styles.',
    category_id: 'cat-school',
    images: ['/images/school_tie.svg'],
    fabric: 'Woven Polyester Satin',
    is_featured: false,
    is_visible: true,
    price_range: '₹60 - ₹120',
    min_order_qty: 200,
    sizes: ['Junior (35 cm)', 'Senior (50 cm)'],
    colors: ['Maroon & Gold', 'Navy & Silver', 'Green & Gold', 'Custom House Colours'],
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1440000).toISOString(),
  },
  {
    id: 'prod-school-sweater',
    name: 'School V-Neck Pullover Sweater',
    description: 'Warm acrylic-wool blend V-neck pullover with ribbed cuffs and hemband. School crest embroidery on chest. Pill-resistant and machine-washable.',
    category_id: 'cat-school',
    images: ['/images/school_sweater.svg'],
    fabric: 'Acrylic-Wool Blend Knit',
    is_featured: true,
    is_visible: true,
    price_range: '₹380 - ₹550',
    min_order_qty: 100,
    sizes: ['22', '24', '26', '28', '30', '32', '34', '36', '38', '40'],
    colors: ['Navy Blue', 'Maroon', 'Grey', 'Bottle Green'],
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1450000).toISOString(),
  },
  {
    id: 'prod-school-skirt',
    name: "Girls Pleated School Skirt (Knee-Length)",
    description: 'Classic knife-pleated school skirt with concealed side zipper and elastic waistband for comfort. Stain-resistant and easy-wash.',
    category_id: 'cat-school',
    images: ['/images/school_skirt.svg'],
    fabric: 'Premium Poly-Viscose Twill',
    is_featured: false,
    is_visible: true,
    price_range: '₹220 - ₹350',
    min_order_qty: 150,
    sizes: ['22', '24', '26', '28', '30', '32'],
    colors: ['Grey', 'Navy Blue', 'Check Pattern'],
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1460000).toISOString(),
  },
  {
    id: 'prod-school-pe',
    name: 'School PE / Sports Track Suit Set',
    description: 'Comfortable sportswear track suit (jacket + track pant) with school colour accents. Moisture-wicking fabric for outdoor games and PT classes.',
    category_id: 'cat-school',
    images: ['/images/school_pe_tracksuit.svg'],
    fabric: 'Micro-Mesh Polyester with Lycra',
    is_featured: true,
    is_visible: true,
    price_range: '₹450 - ₹700',
    min_order_qty: 100,
    sizes: ['22', '24', '26', '28', '30', '32', '34', '36', '38'],
    colors: ['Navy & White', 'Maroon & White', 'Green & Gold', 'Black & Red'],
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1470000).toISOString(),
  },
  {
    id: 'prod-school-belt',
    name: 'School Uniform Leather Belt (Logo Buckle)',
    description: 'Genuine leather school belt with custom school-crest metal buckle. Adjustable length with pre-punched holes. Polished brass or chrome finish.',
    category_id: 'cat-school',
    images: ['/images/school_belt.svg'],
    fabric: 'Genuine Leather with Metal Buckle',
    is_featured: false,
    is_visible: true,
    price_range: '₹120 - ₹220',
    min_order_qty: 200,
    sizes: ['S (22-26)', 'M (28-32)', 'L (34-38)'],
    colors: ['Black', 'Brown'],
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1480000).toISOString(),
  },
  {
    id: 'prod-school-socks',
    name: 'School Uniform Knee-High Socks (Pack of 3)',
    description: 'Premium cotton-blend school socks with reinforced heel and toe. Elastic cuff for stay-up fit. Colour-fast after 100+ washes. Pack of 3 pairs.',
    category_id: 'cat-school',
    images: ['/images/school_socks.svg'],
    fabric: 'Combed Cotton with Spandex',
    is_featured: false,
    is_visible: true,
    price_range: '₹90 - ₹150',
    min_order_qty: 500,
    sizes: ['Junior (1-3)', 'Medium (4-6)', 'Senior (7-10)'],
    colors: ['White', 'Navy Blue', 'Grey', 'Black'],
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1490000).toISOString(),
  },

  // ═══════════════════════════════════════════
  // ── CONVOCATION & ACADEMIC (6 products) ──
  // ═══════════════════════════════════════════
  {
    id: 'prod-convocation-1',
    name: 'Premium Convocation Gown (Full-Length)',
    description: 'Elegant traditional graduation gown with back zipper, pleated sleeve details, and fluted bell sleeves. Suitable for Bachelor, Master, and Doctoral ceremonies.',
    category_id: 'cat-convocation',
    images: ['/images/category_convocation.png'],
    fabric: 'Deluxe Matte Polyester',
    is_featured: true,
    is_visible: true,
    price_range: '₹600 - ₹900',
    min_order_qty: 50,
    sizes: ['S (5\'0-5\'4)', 'M (5\'4-5\'8)', 'L (5\'8-6\'0)', 'XL (6\'0-6\'4)'],
    colors: ['Black', 'Navy Blue', 'Maroon'],
    categories: { id: 'cat-convocation', name: 'Convocation (Gowns & Caps)', slug: 'convocation' },
    created_at: new Date(Date.now() - 1520000).toISOString(),
  },
  {
    id: 'prod-convocation-2',
    name: 'Deluxe Academic Mortarboard Cap',
    description: 'Standard square academic cap featuring a sturdy elastic interior headband and custom-matched hanging tassel with year charm.',
    category_id: 'cat-convocation',
    images: ['/images/category_convocation.png'],
    fabric: 'Matte Polyester with Reinforced Board',
    is_featured: false,
    is_visible: true,
    price_range: '₹150 - ₹220',
    min_order_qty: 100,
    sizes: ['Free Size'],
    colors: ['Black', 'Navy Blue'],
    categories: { id: 'cat-convocation', name: 'Convocation (Gowns & Caps)', slug: 'convocation' },
    created_at: new Date(Date.now() - 1540000).toISOString(),
  },
  {
    id: 'prod-convocation-hood',
    name: 'Academic Stream Colour Hood',
    description: 'Satin-lined academic hood denoting the degree stream. Draped over the gown during convocation. Colour coded as per university norms — Arts (white), Science (gold), Commerce (pink), etc.',
    category_id: 'cat-convocation',
    images: ['/images/category_convocation.png'],
    fabric: 'Premium Satin-Lined Polyester',
    is_featured: true,
    is_visible: true,
    price_range: '₹250 - ₹400',
    min_order_qty: 50,
    sizes: ['Free Size'],
    colors: ['Gold (Science)', 'White (Arts)', 'Pink (Commerce)', 'Blue (Engineering)', 'Green (Medicine)'],
    categories: { id: 'cat-convocation', name: 'Convocation (Gowns & Caps)', slug: 'convocation' },
    created_at: new Date(Date.now() - 1530000).toISOString(),
  },
  {
    id: 'prod-convocation-stole',
    name: 'Graduation Honour Stole / Sash',
    description: 'Embroidered satin stole worn over the gown to denote academic honours, societies, or department affiliation. Custom text and logo embroidery available.',
    category_id: 'cat-convocation',
    images: ['/images/category_convocation.png'],
    fabric: 'Premium Satin with Embroidery',
    is_featured: false,
    is_visible: true,
    price_range: '₹200 - ₹350',
    min_order_qty: 50,
    sizes: ['Standard (72" x 5")'],
    colors: ['Gold', 'Maroon', 'Royal Blue', 'Green', 'Custom Colours'],
    categories: { id: 'cat-convocation', name: 'Convocation (Gowns & Caps)', slug: 'convocation' },
    created_at: new Date(Date.now() - 1550000).toISOString(),
  },
  {
    id: 'prod-convocation-phd',
    name: 'PhD / Doctoral Regalia Gown Set',
    description: 'Premium doctoral gown set with velvet front panels, velvet chevron sleeve bars, and 8-sided tam cap with gold bullion tassel. The ultimate academic regalia.',
    category_id: 'cat-convocation',
    images: ['/images/category_convocation.png'],
    fabric: 'Heavyweight Matte Polyester with Velvet Trim',
    is_featured: true,
    is_visible: true,
    price_range: '₹2,500 - ₹4,000',
    min_order_qty: 10,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black with Gold Trim', 'Black with Maroon Trim', 'Black with Blue Trim'],
    categories: { id: 'cat-convocation', name: 'Convocation (Gowns & Caps)', slug: 'convocation' },
    created_at: new Date(Date.now() - 1510000).toISOString(),
  },
  {
    id: 'prod-convocation-set',
    name: 'Complete Convocation Set (Gown + Cap + Hood)',
    description: 'All-in-one convocation bundle — includes full-length gown, mortarboard cap with tassel, and stream-coloured hood. Best value combo for university bulk orders.',
    category_id: 'cat-convocation',
    images: ['/images/category_convocation.png'],
    fabric: 'Deluxe Matte Polyester',
    is_featured: true,
    is_visible: true,
    price_range: '₹800 - ₹1,200',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy Blue', 'Maroon'],
    categories: { id: 'cat-convocation', name: 'Convocation (Gowns & Caps)', slug: 'convocation' },
    created_at: new Date(Date.now() - 1500000).toISOString(),
  },
  {
    id: 'prod-security-guard',
    name: 'Classic Security Guard Uniform Shirt',
    description: 'Professional security officer shirt featuring button-down epaulettes, reinforced collar, and dual buttoned chest pockets. Breathable and comfortable for long watch shifts.',
    category_id: 'cat-security',
    images: ['/images/category_school.png'],
    fabric: 'Premium Poly-Cotton Twill Weave',
    is_featured: true,
    is_visible: true,
    price_range: '₹320 - ₹450',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Light Blue', 'Navy Blue', 'Khaki'],
    categories: { id: 'cat-security', name: 'Security & Defence Uniforms', slug: 'security' },
    created_at: new Date(Date.now() - 1600000).toISOString(),
    customization_available: true,
    fabric_care: 'Machine wash warm, tumble dry low, warm iron.',
    bulk_discounts: [{ qty: 50, discount: '5% Off' }, { qty: 100, discount: '10% Off' }, { qty: 500, discount: '20% Off' }],
    delivery_timeline: '7-10 working days',
    gender: 'Unisex',
    price_min: 320,
    price_max: 450
  },
  {
    id: 'prod-security-trousers',
    name: 'Tactical Security Officer Cargo Pants',
    description: 'Heavy-duty tactical cargo trousers designed for security personnel. Features six spacious utility pockets, reinforced knees, and double-stitched belt loops.',
    category_id: 'cat-security',
    images: ['/images/category_school.png'],
    fabric: 'Heavy Duty Ripstop Cotton-Poly',
    is_featured: false,
    is_visible: true,
    price_range: '₹480 - ₹690',
    min_order_qty: 50,
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Black', 'Navy Blue', 'Olive Drab'],
    categories: { id: 'cat-security', name: 'Security & Defence Uniforms', slug: 'security' },
    created_at: new Date(Date.now() - 1610000).toISOString(),
    customization_available: true,
    fabric_care: 'Machine wash cold, air dry recommended.',
    bulk_discounts: [{ qty: 50, discount: '5% Off' }, { qty: 100, discount: '12% Off' }, { qty: 500, discount: '22% Off' }],
    delivery_timeline: '8-12 working days',
    gender: 'Unisex',
    price_min: 480,
    price_max: 690
  },
  {
    id: 'prod-industrial-boiler',
    name: 'Heavy Duty Cotton Boiler Suit (Coverall)',
    description: 'Full-body industrial coverall boiler suit featuring heavy-duty brass double-zipper front, action back for flexibility, and multiple pockets for tools.',
    category_id: 'cat-industrial',
    images: ['/images/category_corporate.png'],
    fabric: '100% Heavy-Duty Cotton Drill',
    is_featured: true,
    is_visible: true,
    price_range: '₹650 - ₹950',
    min_order_qty: 30,
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Royal Blue', 'Orange', 'Navy Blue'],
    categories: { id: 'cat-industrial', name: 'Industrial & Factory Workwear', slug: 'industrial' },
    created_at: new Date(Date.now() - 1620000).toISOString(),
    customization_available: true,
    fabric_care: 'Hot wash safe, machine dry medium, heavy iron.',
    bulk_discounts: [{ qty: 50, discount: '8% Off' }, { qty: 100, discount: '15% Off' }, { qty: 500, discount: '25% Off' }],
    delivery_timeline: '10-15 working days',
    gender: 'Unisex',
    price_min: 650,
    price_max: 950
  },
  {
    id: 'prod-industrial-jacket',
    name: 'Reflective High-Visibility Work Jacket',
    description: 'Two-tone industrial work jacket with 3M reflective safety stripes. Designed for road construction, airport crew, and warehouse safety.',
    category_id: 'cat-industrial',
    images: ['/images/category_corporate.png'],
    fabric: 'Durable Polyester with PU Lamination',
    is_featured: false,
    is_visible: true,
    price_range: '₹420 - ₹580',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Neon Yellow', 'Neon Orange'],
    categories: { id: 'cat-industrial', name: 'Industrial & Factory Workwear', slug: 'industrial' },
    created_at: new Date(Date.now() - 1630000).toISOString(),
    customization_available: true,
    fabric_care: 'Wash cold inside out, do not iron on reflective tape.',
    bulk_discounts: [{ qty: 50, discount: '5% Off' }, { qty: 100, discount: '10% Off' }, { qty: 500, discount: '20% Off' }],
    delivery_timeline: '7-10 working days',
    gender: 'Unisex',
    price_min: 420,
    price_max: 580
  },
  {
    id: 'prod-sports-jersey',
    name: 'Custom Dry-Fit Sublimated Sports Jersey',
    description: 'Lightweight, sweat-wicking athletic PE and team jersey. Fully customizable with sublimation print for team names, logos, and numbers.',
    category_id: 'cat-sports',
    images: ['/images/school_pe_tracksuit.svg'],
    fabric: '100% Interlock Dry-Fit Polyester',
    is_featured: true,
    is_visible: true,
    price_range: '₹250 - ₹390',
    min_order_qty: 50,
    sizes: ['YS', 'YM', 'S', 'M', 'L', 'XL'],
    colors: ['Blue & White', 'Red & Black', 'Green & Yellow'],
    categories: { id: 'cat-sports', name: 'Sports & PE Uniforms', slug: 'sports' },
    created_at: new Date(Date.now() - 1640000).toISOString(),
    customization_available: true,
    fabric_care: 'Machine wash cold, do not fabric soften, do not iron.',
    bulk_discounts: [{ qty: 50, discount: '10% Off' }, { qty: 100, discount: '18% Off' }, { qty: 500, discount: '30% Off' }],
    delivery_timeline: '10-12 working days',
    gender: 'Kids',
    price_min: 250,
    price_max: 390
  },
  {
    id: 'prod-sports-track',
    name: 'School / Team Sports Tracksuit Set',
    description: 'High-performance team track jacket and matching athletic pants set. Contrast panel details, zip pockets, and elastic waist for comfort.',
    category_id: 'cat-sports',
    images: ['/images/school_pe_tracksuit.svg'],
    fabric: 'Super-Poly Brushed Tricot',
    is_featured: false,
    is_visible: true,
    price_range: '₹580 - ₹850',
    min_order_qty: 40,
    sizes: ['YS', 'YM', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy & Gold', 'Black & Red', 'Green & White'],
    categories: { id: 'cat-sports', name: 'Sports & PE Uniforms', slug: 'sports' },
    created_at: new Date(Date.now() - 1650000).toISOString(),
    customization_available: true,
    fabric_care: 'Wash warm, tumble dry low, do not iron logo.',
    bulk_discounts: [{ qty: 50, discount: '5% Off' }, { qty: 100, discount: '12% Off' }, { qty: 500, discount: '22% Off' }],
    delivery_timeline: '8-14 working days',
    gender: 'Kids',
    price_min: 580,
    price_max: 850
  },
  {
    id: 'prod-banking-shirt',
    name: 'Formal Banking Micro-Stripe Shirt',
    description: 'Crisp formal office shirt designed for banking and financial service teams. Wrinkle-resistant finish ensures a neat corporate appearance all day.',
    category_id: 'cat-banking',
    images: ['/images/category_corporate.png'],
    fabric: '60% Egyptian Cotton / 40% Polyester Poplin',
    is_featured: true,
    is_visible: true,
    price_range: '₹450 - ₹650',
    min_order_qty: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Sky Blue Stripe', 'Grey Stripe', 'Pink Stripe'],
    categories: { id: 'cat-banking', name: 'Banking & Finance Formals', slug: 'banking' },
    created_at: new Date(Date.now() - 1660000).toISOString(),
    customization_available: true,
    fabric_care: 'Machine wash warm, iron medium, dry-cleanable.',
    bulk_discounts: [{ qty: 50, discount: '5% Off' }, { qty: 100, discount: '10% Off' }, { qty: 500, discount: '20% Off' }],
    delivery_timeline: '7-10 working days',
    gender: 'Unisex',
    price_min: 450,
    price_max: 650
  },
  {
    id: 'prod-banking-skirt',
    name: "Women's Classic Formal Pencil Skirt",
    description: 'Elegant tailored formal pencil skirt featuring a neat back kick pleat and comfortable stretch panels. Ideal for front office and bank tellers.',
    category_id: 'cat-banking',
    images: ['/images/category_corporate.png'],
    fabric: 'Poly-Viscose Stretch Gabardine',
    is_featured: false,
    is_visible: true,
    price_range: '₹480 - ₹680',
    min_order_qty: 50,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal Grey', 'Navy Blue', 'Black'],
    categories: { id: 'cat-banking', name: 'Banking & Finance Formals', slug: 'banking' },
    created_at: new Date(Date.now() - 1670000).toISOString(),
    customization_available: true,
    fabric_care: 'Dry clean recommended, or machine wash cold on delicate.',
    bulk_discounts: [{ qty: 50, discount: '5% Off' }, { qty: 100, discount: '10% Off' }, { qty: 500, discount: '20% Off' }],
    delivery_timeline: '7-12 working days',
    gender: 'Women',
    price_min: 480,
    price_max: 680
  },
  {
    id: 'prod-police-tunic',
    name: 'Paramilitary Ceremonial Khaki Tunic',
    description: 'Traditional police and paramilitary tunic featuring structured shoulders, golden button closures, and chest epaulettes.',
    category_id: 'cat-police',
    images: ['/images/category_advocate.png'],
    fabric: 'Heavy Poly-Wool Suiting',
    is_featured: true,
    is_visible: true,
    price_range: '₹1,500 - ₹2,200',
    min_order_qty: 20,
    sizes: ['36', '38', '40', '42', '44', '46'],
    colors: ['Khaki', 'Dark Blue'],
    categories: { id: 'cat-police', name: 'Police & Paramilitary (Ceremonial)', slug: 'police' },
    created_at: new Date(Date.now() - 1680000).toISOString(),
    customization_available: true,
    fabric_care: 'Dry clean only. Do not wash at home.',
    bulk_discounts: [{ qty: 50, discount: '5% Off' }, { qty: 100, discount: '10% Off' }, { qty: 500, discount: '18% Off' }],
    delivery_timeline: '15-20 working days',
    gender: 'Men',
    price_min: 1500,
    price_max: 2200
  },
  {
    id: 'prod-police-lanyard',
    name: 'Ceremonial Braided Whistle Lanyard',
    description: 'High-quality braided ceremonial police and security whistle lanyard. Features brass clasp and durable woven silk-thread braids.',
    category_id: 'cat-police',
    images: ['/images/category_advocate.png'],
    fabric: '100% Mercerized Braided Cord',
    is_featured: false,
    is_visible: true,
    price_range: '₹120 - ₹180',
    min_order_qty: 100,
    sizes: ['Standard Size'],
    colors: ['Red & Gold', 'Blue & Silver', 'All Gold'],
    categories: { id: 'cat-police', name: 'Police & Paramilitary (Ceremonial)', slug: 'police' },
    created_at: new Date(Date.now() - 1690000).toISOString(),
    customization_available: false,
    fabric_care: 'Hand wash cold, air dry.',
    bulk_discounts: [{ qty: 100, discount: '5% Off' }, { qty: 500, discount: '15% Off' }],
    delivery_timeline: '5-7 working days',
    gender: 'Unisex',
    price_min: 120,
    price_max: 180
  },
  {
    id: 'prod-fire-suit',
    name: 'Flame-Retardant Nomex Safety Suit',
    description: 'Certified flame-resistant safety suit (jacket and trousers) designed for firefighters and industrial safety teams. Heavy-duty heat barrier protection.',
    category_id: 'cat-fire',
    images: ['/images/category_corporate.png'],
    fabric: '93% Nomex / 5% Kevlar / 2% Antistatic Blend',
    is_featured: true,
    is_visible: true,
    price_range: '₹3,500 - ₹5,500',
    min_order_qty: 10,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Dark Navy', 'Saffron Orange', 'Fire Red'],
    categories: { id: 'cat-fire', name: 'Fire & Safety Uniforms', slug: 'fire' },
    created_at: new Date(Date.now() - 1700000).toISOString(),
    customization_available: true,
    fabric_care: 'Industrial laundering recommended, do not use chlorine bleach.',
    bulk_discounts: [{ qty: 20, discount: '5% Off' }, { qty: 50, discount: '10% Off' }, { qty: 100, discount: '15% Off' }],
    delivery_timeline: '12-18 working days',
    gender: 'Unisex',
    price_min: 3500,
    price_max: 5500
  },
  {
    id: 'prod-safety-vest',
    name: 'Fluorescent Reflective Safety Vest (Class 2)',
    description: 'Lightweight safety vest featuring high-visibility neon color with double vertical and horizontal 3M reflective tape bands. Features front zip closure.',
    category_id: 'cat-fire',
    images: ['/images/category_corporate.png'],
    fabric: 'Breathable Polyester Warp Knit Mesh',
    is_featured: false,
    is_visible: true,
    price_range: '₹90 - ₹150',
    min_order_qty: 100,
    sizes: ['Free Size', 'XL', 'XXL'],
    colors: ['Neon Lime', 'Neon Orange'],
    categories: { id: 'cat-fire', name: 'Fire & Safety Uniforms', slug: 'fire' },
    created_at: new Date(Date.now() - 1710000).toISOString(),
    customization_available: true,
    fabric_care: 'Machine wash cold, do not iron reflective panels.',
    bulk_discounts: [{ qty: 100, discount: '5% Off' }, { qty: 500, discount: '15% Off' }, { qty: 1000, discount: '25% Off' }],
    delivery_timeline: '5-7 working days',
    gender: 'Unisex',
    price_min: 90,
    price_max: 150
  },
  {
    id: 'prod-airline-pilot',
    name: 'Aviation Pilot Epaulette Shirt',
    description: 'Crisp, high-performance pilot shirt. Features shoulder loops for epaulettes, dual mitred chest pockets with pencil slot, and durable interlined collars.',
    category_id: 'cat-airline',
    images: ['/images/category_corporate.png'],
    fabric: '65% Polyester / 35% Combed Cotton Twill',
    is_featured: true,
    is_visible: true,
    price_range: '₹550 - ₹750',
    min_order_qty: 30,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Pristine White', 'Sky Blue'],
    categories: { id: 'cat-airline', name: 'Airline & Aviation Crew', slug: 'airline' },
    created_at: new Date(Date.now() - 1720000).toISOString(),
    customization_available: true,
    fabric_care: 'Machine wash warm, bleach safe for white, warm iron.',
    bulk_discounts: [{ qty: 50, discount: '5% Off' }, { qty: 100, discount: '10% Off' }, { qty: 500, discount: '20% Off' }],
    delivery_timeline: '7-10 working days',
    gender: 'Men',
    price_min: 550,
    price_max: 750
  },
  {
    id: 'prod-airline-hostess',
    name: 'Aviation Cabin Crew Blazer & Scarf Set',
    description: 'Elegant tailored crew blazer matching structured corporate pants/skirt, accessorized with a custom silk scarf. Professional, sleek look.',
    category_id: 'cat-airline',
    images: ['/images/category_corporate.png'],
    fabric: 'Superfine Poly-Viscose Gabardine with Silk Scarf',
    is_featured: true,
    is_visible: true,
    price_range: '₹2,200 - ₹3,500',
    min_order_qty: 30,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Aviation Blue', 'Deep Burgundy', 'Classic Black'],
    categories: { id: 'cat-airline', name: 'Airline & Aviation Crew', slug: 'airline' },
    created_at: new Date(Date.now() - 1730000).toISOString(),
    customization_available: true,
    fabric_care: 'Dry clean only, iron on low temperature.',
    bulk_discounts: [{ qty: 50, discount: '5% Off' }, { qty: 100, discount: '12% Off' }, { qty: 500, discount: '22% Off' }],
    delivery_timeline: '10-15 working days',
    gender: 'Women',
    price_min: 2200,
    price_max: 3500
  }
]

// Dynamically enrich mock products with default values if they are missing
MOCK_PRODUCTS.forEach(p => {
  if (p.customization_available === undefined) p.customization_available = true
  if (p.fabric_care === undefined) {
    if (p.category_id === 'cat-corporate' || p.category_id === 'cat-advocate') {
      p.fabric_care = 'Dry clean only. Iron on low heat.'
    } else {
      p.fabric_care = 'Machine wash warm. Tumble dry low. Do not iron on print.'
    }
  }
  if (p.delivery_timeline === undefined) p.delivery_timeline = '7-10 working days'
  if (p.bulk_discounts === undefined) {
    p.bulk_discounts = [
      { qty: 50, discount: '5% Off' },
      { qty: 100, discount: '10% Off' },
      { qty: 500, discount: '20% Off' }
    ]
  }
  if (p.gender === undefined) {
    const n = p.name.toLowerCase()
    if (n.includes('women') || n.includes('female') || n.includes('girls') || n.includes('lady')) {
      p.gender = 'Women'
    } else if (n.includes('men') || n.includes('boys')) {
      p.gender = 'Men'
    } else if (n.includes('school') || n.includes('pe ') || n.includes('sports')) {
      p.gender = 'Kids'
    } else {
      p.gender = 'Unisex'
    }
  }
  if (p.price_min === undefined) {
    if (p.price_range) {
      const parts = p.price_range.replace(/[^\d-]/g, '').split('-')
      p.price_min = parseInt(parts[0]) || 0
      p.price_max = parseInt(parts[1]) || p.price_min || 1000
    } else {
      p.price_min = 200
      p.price_max = 500
    }
  }
})

// Filter to only include the 5 main categories
const allowedCategories = ['cat-corporate', 'cat-hospitality', 'cat-medical', 'cat-industrial', 'cat-school']
const filteredMockProducts = MOCK_PRODUCTS.filter(p => allowedCategories.includes(p.category_id))

// Assign specific faceless images for corporate products, fallback to category image for others
const productImages = {
  'prod-corporate-1': '/images/mens_blazer.png',
  'prod-corporate-women-blazer': '/images/womens_blazer.png',
  'prod-corporate-2': '/images/nehru_jacket.png',
  'prod-corporate-3': '/images/oxford_shirt.png'
}

const categoryImages = {
  'cat-corporate': '/images/corporate_shirt.png',
  'cat-hospitality': '/images/hospitality_coat.png',
  'cat-medical': '/images/medical_scrubs.png',
  'cat-industrial': '/images/industrial_coverall.png',
  'cat-school': '/images/school_polo.png'
}

filteredMockProducts.forEach(p => {
  if (productImages[p.id]) {
    p.images = [productImages[p.id]]
  } else {
    p.images = [categoryImages[p.category_id]]
  }
})

MOCK_PRODUCTS.length = 0
MOCK_PRODUCTS.push(...filteredMockProducts)

export const productService = {
  async getAll({ category, featured, search, gender, fabric_type, customization, max_price, page = 1, limit = 12, showHidden = false } = {}) {
    try {
      let query = supabase
        .from('products')
        .select('*, categories(id, name, slug)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1)

      if (!showHidden) query = query.eq('is_visible', true)
      if (category) query = query.eq('category_id', category)
      if (featured) query = query.eq('is_featured', true)
      if (search) query = query.ilike('name', `%${search}%`)
      if (gender) query = query.eq('gender', gender)
      if (fabric_type) query = query.ilike('fabric', `%${fabric_type}%`)
      if (customization !== undefined && customization !== null && customization !== '') {
        query = query.eq('customization_available', customization === 'true' || customization === true)
      }
      if (max_price) query = query.lte('price_max', max_price)

      const { data, count, error } = await query
      if (error || !data || data.length === 0) {
        let filtered = [...MOCK_PRODUCTS]
        if (!showHidden) filtered = filtered.filter(p => p.is_visible)
        if (category) {
          filtered = filtered.filter(p => p.category_id === category || p.categories.id === category || p.categories.slug === category)
        }
        if (featured) filtered = filtered.filter(p => p.is_featured)
        if (search) {
          const s = search.toLowerCase()
          filtered = filtered.filter(p => p.name.toLowerCase().includes(s))
        }
        if (gender) {
          filtered = filtered.filter(p => p.gender && p.gender.toLowerCase() === gender.toLowerCase())
        }
        if (fabric_type) {
          const ft = fabric_type.toLowerCase()
          filtered = filtered.filter(p => p.fabric && p.fabric.toLowerCase().includes(ft))
        }
        if (customization !== undefined && customization !== null && customization !== '') {
          const custBool = customization === 'true' || customization === true
          filtered = filtered.filter(p => p.customization_available === custBool)
        }
        if (max_price) {
          filtered = filtered.filter(p => p.price_max <= max_price)
        }

        const start = (page - 1) * limit
        const paginated = filtered.slice(start, start + limit)
        return { data: paginated, count: filtered.length, error: null }
      }
      return { data, count, error: null }
    } catch {
      let filtered = [...MOCK_PRODUCTS]
      if (!showHidden) filtered = filtered.filter(p => p.is_visible)
      if (category) {
        filtered = filtered.filter(p => p.category_id === category || p.categories.id === category || p.categories.slug === category)
      }
      if (featured) filtered = filtered.filter(p => p.is_featured)
      if (search) {
        const s = search.toLowerCase()
        filtered = filtered.filter(p => p.name.toLowerCase().includes(s))
      }
      if (gender) {
        filtered = filtered.filter(p => p.gender && p.gender.toLowerCase() === gender.toLowerCase())
      }
      if (fabric_type) {
        const ft = fabric_type.toLowerCase()
        filtered = filtered.filter(p => p.fabric && p.fabric.toLowerCase().includes(ft))
      }
      if (customization !== undefined && customization !== null && customization !== '') {
        const custBool = customization === 'true' || customization === true
        filtered = filtered.filter(p => p.customization_available === custBool)
      }
      if (max_price) {
        filtered = filtered.filter(p => p.price_max <= max_price)
      }
      const start = (page - 1) * limit
      const paginated = filtered.slice(start, start + limit)
      return { data: paginated, count: filtered.length, error: null }
    }
  },

  async getById(id) {
    try {
      const res = await supabase
        .from('products')
        .select('*, categories(id, name, slug)')
        .eq('id', id)
        .single()
      if (res.error || !res.data) {
        const mock = MOCK_PRODUCTS.find(p => p.id === id)
        if (mock) return { data: mock, error: null }
      }
      return res
    } catch {
      const mock = MOCK_PRODUCTS.find(p => p.id === id)
      return { data: mock ?? null, error: mock ? null : new Error('Product not found') }
    }
  },

  async create(data) {
    try {
      const res = await supabase.from('products').insert(data).select().single()
      if (res.error) throw res.error
      return res
    } catch {
      const newProduct = { ...data, id: `prod-local-${Date.now()}`, created_at: new Date().toISOString() }
      MOCK_PRODUCTS.unshift(newProduct)
      return { data: newProduct, error: null }
    }
  },

  async update(id, data) {
    try {
      const res = await supabase.from('products').update(data).eq('id', id).select().single()
      if (res.error) throw res.error
      return res
    } catch {
      const idx = MOCK_PRODUCTS.findIndex(p => p.id === id)
      if (idx !== -1) {
        MOCK_PRODUCTS[idx] = { ...MOCK_PRODUCTS[idx], ...data }
        return { data: MOCK_PRODUCTS[idx], error: null }
      }
      return { data: null, error: new Error('Product not found') }
    }
  },

  async delete(id) {
    try {
      const res = await supabase.from('products').delete().eq('id', id)
      if (res.error) throw res.error
      return res
    } catch {
      const idx = MOCK_PRODUCTS.findIndex(p => p.id === id)
      if (idx !== -1) MOCK_PRODUCTS.splice(idx, 1)
      return { data: null, error: null }
    }
  },

  async uploadImage(file, productId) {
    try {
      const ext = file.name.split('.').pop()
      const path = `products/${productId}/${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('product-images').upload(path, file)
      if (error) throw error
      const { data } = supabase.storage.from('product-images').getPublicUrl(path)
      return data.publicUrl
    } catch {
      return URL.createObjectURL(file)
    }
  },

  async deleteImage(url) {
    const path = url.split('/product-images/')[1]
    return supabase.storage.from('product-images').remove([path])
  },
}
