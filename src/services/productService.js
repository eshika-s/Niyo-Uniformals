import { supabase } from '@/lib/supabase'

const MOCK_CATEGORIES = [
  { id: 'cat-school', name: 'School Uniforms', slug: 'school', display_order: 1 },
  { id: 'cat-corporate', name: 'Corporate Wear', slug: 'corporate', display_order: 2 },
  { id: 'cat-healthcare', name: 'Healthcare & Medical', slug: 'healthcare', display_order: 3 },
  { id: 'cat-hospitality', name: 'Hospitality & Culinary', slug: 'hospitality', display_order: 4 },
  { id: 'cat-industrial', name: 'Industrial Safety', slug: 'industrial', display_order: 5 },
  { id: 'cat-sports', name: 'Sports & Activewear', slug: 'sports', display_order: 6 },
]

const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Premium Boys School Blazer & Trouser Set',
    description: 'High-durability navy blue school blazer tailored from premium terry-wool fabric. Resists pilling and fading over daily use. Comes with matching trousers and adjustable waistband.',
    category_id: 'cat-school',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Terry-Wool Premium Blend',
    is_featured: true,
    is_visible: true,
    price_range: '₹850 - ₹1,200',
    min_order_qty: 100,
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 100000).toISOString(),
  },
  {
    id: 'prod-2',
    name: 'Classic Girls Pleated Pinafore',
    description: 'Standard school pinafore featuring elegant box pleats and a side button closure. Tailored from highly breathable and sweat-wicking fabric suitable for all-day campus comfort.',
    category_id: 'cat-school',
    images: ['https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Premium Polyester-Cotton Twill',
    is_featured: true,
    is_visible: true,
    price_range: '₹350 - ₹500',
    min_order_qty: 150,
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 200000).toISOString(),
  },
  {
    id: 'prod-3',
    name: 'Slim Fit Corporate Men\'s Blazer',
    description: 'Ultra-modern corporate wool-blend blazer with double vent, notch lapel, and customized satin lining. Crafted to give a professional and sharp outline for boardrooms and daily corporate wear.',
    category_id: 'cat-corporate',
    images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Premium Tropical Wool Blend',
    is_featured: true,
    is_visible: true,
    price_range: '₹1,800 - ₹2,400',
    min_order_qty: 50,
    categories: { id: 'cat-corporate', name: 'Corporate Wear', slug: 'corporate' },
    created_at: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Doctors Anti-Microbial Lab Coat',
    description: 'Full-length professional lab coat with side vent openings for trouser pocket access, multiple chest utility pockets, and durable reinforced stitching. Treated with advanced stain-resistant finish.',
    category_id: 'cat-healthcare',
    images: ['https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&q=80&w=600'],
    fabric: '100% Cotton with Liquid Barrier Finish',
    is_featured: true,
    is_visible: true,
    price_range: '₹450 - ₹650',
    min_order_qty: 50,
    categories: { id: 'cat-healthcare', name: 'Healthcare & Medical', slug: 'healthcare' },
    created_at: new Date(Date.now() - 400000).toISOString(),
  },
  {
    id: 'prod-5',
    name: 'Double-Breasted Master Chef Jacket',
    description: 'Elite hospitality chef coat designed for hot kitchen environments. Features breathable mesh underarms, a thermometer arm pocket, and reversible front closure with removable stud buttons.',
    category_id: 'cat-hospitality',
    images: ['https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Heavy duty Canvas Cotton with Breathable Mesh',
    is_featured: true,
    is_visible: true,
    price_range: '₹750 - ₹1,100',
    min_order_qty: 30,
    categories: { id: 'cat-hospitality', name: 'Hospitality & Culinary', slug: 'hospitality' },
    created_at: new Date(Date.now() - 500000).toISOString(),
  },
  {
    id: 'prod-6',
    name: 'Heavy Duty Flame-Retardant Coverall',
    description: 'Industrial safety boiler suit with reflective high-visibility neon stripes. Includes reinforced knee pads, double-slider brass zipper, and specialized utility pen/ruler pockets.',
    category_id: 'cat-industrial',
    images: ['https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Flame-Resistant Pyrovatex Treated Cotton',
    is_featured: true,
    is_visible: true,
    price_range: '₹950 - ₹1,400',
    min_order_qty: 50,
    categories: { id: 'cat-industrial', name: 'Industrial Safety', slug: 'industrial' },
    created_at: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: 'prod-7',
    name: 'Hospitality Premium Full-Bib Utility Apron',
    description: 'Professional grade kitchen and service bib apron. Tailored from water-resistant canvas cloth, featuring adjustable criss-cross back straps to reduce neck strain, and multiple double-stitched utility pick pockets.',
    category_id: 'cat-hospitality',
    images: ['https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Water-Resistant Cotton Canvas Twill',
    is_featured: false,
    is_visible: true,
    price_range: '₹150 - ₹250',
    min_order_qty: 100,
    categories: { id: 'cat-hospitality', name: 'Hospitality & Culinary', slug: 'hospitality' },
    created_at: new Date(Date.now() - 700000).toISOString(),
  },
  {
    id: 'prod-8',
    name: 'Premium Hospital Unisex OT Scrub Suit',
    description: 'Classic medical scrubs set (top and cargo trousers) featuring double chest pockets, split side hem for active ease, and secure drawstring waist. Antimicrobial treated to prevent bacterial odors.',
    category_id: 'cat-healthcare',
    images: ['https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Breathable Poly-Cotton Medical Weave',
    is_featured: false,
    is_visible: true,
    price_range: '₹450 - ₹650',
    min_order_qty: 150,
    categories: { id: 'cat-healthcare', name: 'Healthcare & Medical', slug: 'healthcare' },
    created_at: new Date(Date.now() - 800000).toISOString(),
  },
  {
    id: 'prod-9',
    name: 'Tailored Poly-Wool Corporate Nehru Jacket',
    description: 'Modern corporate sleeveless Modi waistcoat featuring traditional mandarin collar, structured chest pockets, and high-quality brass/bone button closures. Gives corporate front-desk team a premium ethnic corporate branding.',
    category_id: 'cat-corporate',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Premium Poly-Wool Tweed Weave',
    is_featured: false,
    is_visible: true,
    price_range: '₹850 - ₹1,200',
    min_order_qty: 50,
    categories: { id: 'cat-corporate', name: 'Corporate Wear', slug: 'corporate' },
    created_at: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: 'prod-10',
    name: 'Dry-Fit Performance School Sports Polo',
    description: 'High-performance, moisture-wicking dry-fit polo tailored for school sports days and PE classes. Lightweight, breathable mesh fabric ensures students stay cool and dry during intense activities.',
    category_id: 'cat-sports',
    images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=600'],
    fabric: '100% Polyester Moisture-Wicking Mesh',
    is_featured: true,
    is_visible: true,
    price_range: '₹250 - ₹350',
    min_order_qty: 100,
    categories: { id: 'cat-sports', name: 'Sports & Activewear', slug: 'sports' },
    created_at: new Date(Date.now() - 1000000).toISOString(),
  },
  {
    id: 'prod-11',
    name: 'Premium Unisex Athletic Tracksuit Set',
    description: 'Premium athletic tracksuit consisting of a zip-up jacket and matching joggers. Designed for team travel, sports training, and active physical education. Features zippered side pockets and elasticated cuffs.',
    category_id: 'cat-sports',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Premium Poly-Cotton Fleece Blend',
    is_featured: true,
    is_visible: true,
    price_range: '₹750 - ₹950',
    min_order_qty: 50,
    categories: { id: 'cat-sports', name: 'Sports & Activewear', slug: 'sports' },
    created_at: new Date(Date.now() - 1100000).toISOString(),
  },
  {
    id: 'prod-12',
    name: 'Elite Sublimated Team Football Jersey',
    description: 'Professional-grade soccer jersey featuring full-color sublimation printing. Designed with breathable side panels and raglan sleeves for maximum range of motion on the field. Custom team numbers and logos included.',
    category_id: 'cat-sports',
    images: ['https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?auto=format&fit=crop&q=80&w=600'],
    fabric: 'High-Performance Interlock Polyester',
    is_featured: true,
    is_visible: true,
    price_range: '₹350 - ₹480',
    min_order_qty: 50,
    categories: { id: 'cat-sports', name: 'Sports & Activewear', slug: 'sports' },
    created_at: new Date(Date.now() - 1200000).toISOString(),
  },
  {
    id: 'prod-13',
    name: 'High-Performance Breathable Cricket Whites Kit',
    description: 'Traditional white cricket uniform kit featuring a half-sleeve shirt and matching trousers. Lightweight fabric with mesh ventilation at high-heat zones and stain-release technology for tough field play.',
    category_id: 'cat-sports',
    images: ['https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Stretchable Poly-Spandex Cricket Weave',
    is_featured: true,
    is_visible: true,
    price_range: '₹550 - ₹750',
    min_order_qty: 30,
    categories: { id: 'cat-sports', name: 'Sports & Activewear', slug: 'sports' },
    created_at: new Date(Date.now() - 1300000).toISOString(),
  },
  {
    id: 'prod-14',
    name: 'Pro-Series Moisture-Wicking Tennis Polo & Skirt Set',
    description: 'Sleek and stylish dual-set designed for school and university tennis teams. Features a quick-dry collar shirt paired with a pleated athletic skirt/skort with built-in compression shorts for ultimate play comfort.',
    category_id: 'cat-sports',
    images: ['https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Lightweight Nylon-Spandex Dry-Fit',
    is_featured: true,
    is_visible: true,
    price_range: '₹650 - ₹850',
    min_order_qty: 40,
    categories: { id: 'cat-sports', name: 'Sports & Activewear', slug: 'sports' },
    created_at: new Date(Date.now() - 1400000).toISOString(),
  },

  // ── Additional School Uniforms ──
  {
    id: 'prod-15',
    name: 'Classic White School Shirt & Tie Combo',
    description: 'Crisp white full-sleeve school shirt made from wrinkle-resistant cotton-polyester blend. Includes a matching striped tie with adjustable clip-on closure for easy wear by young students.',
    category_id: 'cat-school',
    images: ['https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Wrinkle-Free Cotton-Polyester Blend',
    is_featured: false,
    is_visible: true,
    price_range: '₹250 - ₹400',
    min_order_qty: 200,
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1500000).toISOString(),
  },
  {
    id: 'prod-16',
    name: 'School V-Neck Wool Blend Sweater',
    description: 'Winter-ready V-neck school sweater knitted from soft merino-wool blend yarn. Available in navy, maroon, and grey with optional school crest embroidery on the chest pocket.',
    category_id: 'cat-school',
    images: ['https://images.unsplash.com/photo-1614975059251-992f11792571?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Merino-Wool Acrylic Knit',
    is_featured: false,
    is_visible: true,
    price_range: '₹450 - ₹600',
    min_order_qty: 100,
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1600000).toISOString(),
  },
  {
    id: 'prod-17',
    name: 'Girls Summer Check Tunic Dress',
    description: 'Lightweight summer tunic dress in classic check pattern with Peter Pan collar. Made from breathable cotton poplin that keeps students comfortable during hot months. Easy wash-and-wear fabric.',
    category_id: 'cat-school',
    images: ['https://images.unsplash.com/photo-1621452773781-0f992fd1f31f?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Cotton Poplin Check Weave',
    is_featured: false,
    is_visible: true,
    price_range: '₹300 - ₹450',
    min_order_qty: 150,
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1700000).toISOString(),
  },
  {
    id: 'prod-18',
    name: 'Boys School Cargo Shorts',
    description: 'Durable school cargo shorts with reinforced knee panels and adjustable elastic waistband. Multiple utility pockets for active students. Stain-resistant finish for easy maintenance.',
    category_id: 'cat-school',
    images: ['https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Heavy-Duty Poly-Cotton Drill',
    is_featured: false,
    is_visible: true,
    price_range: '₹280 - ₹380',
    min_order_qty: 200,
    categories: { id: 'cat-school', name: 'School Uniforms', slug: 'school' },
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },

  // ── Additional Corporate Wear ──
  {
    id: 'prod-19',
    name: 'Women\'s Tailored Corporate Blazer & Pencil Skirt Set',
    description: 'Elegant two-piece women\'s corporate ensemble featuring a structured single-button blazer with satin-lined interior paired with a knee-length pencil skirt. Perfect for executive and front-desk teams.',
    category_id: 'cat-corporate',
    images: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Premium Italian Poly-Viscose',
    is_featured: false,
    is_visible: true,
    price_range: '₹2,200 - ₹3,000',
    min_order_qty: 30,
    categories: { id: 'cat-corporate', name: 'Corporate Wear', slug: 'corporate' },
    created_at: new Date(Date.now() - 1900000).toISOString(),
  },
  {
    id: 'prod-20',
    name: 'Premium Corporate Oxford Shirt Pack (Set of 3)',
    description: 'Classic oxford button-down corporate shirts in white, light blue, and grey. Wrinkle-free finish with reinforced collar stays. Slim-fit and regular-fit options available.',
    category_id: 'cat-corporate',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Egyptian Cotton Oxford Weave',
    is_featured: false,
    is_visible: true,
    price_range: '₹1,500 - ₹2,100',
    min_order_qty: 50,
    categories: { id: 'cat-corporate', name: 'Corporate Wear', slug: 'corporate' },
    created_at: new Date(Date.now() - 2000000).toISOString(),
  },
  {
    id: 'prod-21',
    name: 'Men\'s Formal Pleated Trousers',
    description: 'Classic pleated formal trousers with permanent crease finish. Features hook-and-bar closure, adjustable side tabs, and deep slash pockets. Available in black, charcoal, and navy.',
    category_id: 'cat-corporate',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Tropical Poly-Wool Suiting',
    is_featured: false,
    is_visible: true,
    price_range: '₹800 - ₹1,200',
    min_order_qty: 50,
    categories: { id: 'cat-corporate', name: 'Corporate Wear', slug: 'corporate' },
    created_at: new Date(Date.now() - 2100000).toISOString(),
  },

  // ── Additional Healthcare ──
  {
    id: 'prod-22',
    name: 'Premium Nurse Tunic Uniform',
    description: 'Professional nursing tunic with princess seam styling and concealed zip front. Features two deep side pockets, pen slot on chest, and action-back pleats for unrestricted movement during patient care.',
    category_id: 'cat-healthcare',
    images: ['https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Poly-Cotton Easy-Care Poplin',
    is_featured: false,
    is_visible: true,
    price_range: '₹400 - ₹550',
    min_order_qty: 100,
    categories: { id: 'cat-healthcare', name: 'Healthcare & Medical', slug: 'healthcare' },
    created_at: new Date(Date.now() - 2200000).toISOString(),
  },
  {
    id: 'prod-23',
    name: 'Disposable Surgical OT Gown (Pack of 50)',
    description: 'Single-use sterile surgical gown with full back coverage, reinforced sleeves, and knitted cuffs. Fluid-resistant SMS fabric provides barrier protection during surgical procedures.',
    category_id: 'cat-healthcare',
    images: ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600'],
    fabric: 'SMS Non-Woven Spunbond',
    is_featured: false,
    is_visible: true,
    price_range: '₹3,500 - ₹5,000',
    min_order_qty: 10,
    categories: { id: 'cat-healthcare', name: 'Healthcare & Medical', slug: 'healthcare' },
    created_at: new Date(Date.now() - 2300000).toISOString(),
  },
  {
    id: 'prod-24',
    name: 'Medical Staff Polo T-Shirt',
    description: 'Comfortable medical staff polo in antimicrobial-treated fabric. Features moisture-wicking technology, ribbed collar, and chest pocket with ID badge loop. Ideal for hospital reception and pharmacy teams.',
    category_id: 'cat-healthcare',
    images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Antimicrobial Pique Cotton Blend',
    is_featured: false,
    is_visible: true,
    price_range: '₹350 - ₹500',
    min_order_qty: 50,
    categories: { id: 'cat-healthcare', name: 'Healthcare & Medical', slug: 'healthcare' },
    created_at: new Date(Date.now() - 2400000).toISOString(),
  },

  // ── Additional Hospitality ──
  {
    id: 'prod-25',
    name: 'Waiter Formal Vest & Bow Tie Set',
    description: 'Classic five-button waistcoat with adjustable back buckle and matching satin bow tie. Designed for fine dining restaurants and banquet service staff. Available in black, burgundy, and navy.',
    category_id: 'cat-hospitality',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Poly-Viscose Gabardine with Satin Back',
    is_featured: false,
    is_visible: true,
    price_range: '₹650 - ₹900',
    min_order_qty: 50,
    categories: { id: 'cat-hospitality', name: 'Hospitality & Culinary', slug: 'hospitality' },
    created_at: new Date(Date.now() - 2500000).toISOString(),
  },
  {
    id: 'prod-26',
    name: 'Hotel Housekeeping Dress Uniform',
    description: 'Professional housekeeping dress with contrast piping and side zip closure. Features stretch fabric at waist for comfort during bending and reaching. Includes matching belt.',
    category_id: 'cat-hospitality',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Stretch Poly-Cotton Poplin',
    is_featured: false,
    is_visible: true,
    price_range: '₹500 - ₹700',
    min_order_qty: 50,
    categories: { id: 'cat-hospitality', name: 'Hospitality & Culinary', slug: 'hospitality' },
    created_at: new Date(Date.now() - 2600000).toISOString(),
  },
  {
    id: 'prod-27',
    name: 'Bartender Classic Black Shirt',
    description: 'Mandarin collar bartender shirt with roll-up sleeve tabs and concealed button placket. Stain-resistant coating repels spills. Available in black, white, and charcoal.',
    category_id: 'cat-hospitality',
    images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Stain-Guard Cotton Twill',
    is_featured: false,
    is_visible: true,
    price_range: '₹400 - ₹550',
    min_order_qty: 50,
    categories: { id: 'cat-hospitality', name: 'Hospitality & Culinary', slug: 'hospitality' },
    created_at: new Date(Date.now() - 2700000).toISOString(),
  },

  // ── Additional Industrial ──
  {
    id: 'prod-28',
    name: 'Hi-Vis Reflective Safety Vest',
    description: 'High-visibility fluorescent safety vest with 3M reflective tape strips on chest and back. Lightweight mesh body for ventilation. Meets IS 15809 safety standards. Adjustable side straps.',
    category_id: 'cat-industrial',
    images: ['https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&q=80&w=600'],
    fabric: '100% Polyester Mesh with 3M Scotchlite',
    is_featured: false,
    is_visible: true,
    price_range: '₹150 - ₹300',
    min_order_qty: 200,
    categories: { id: 'cat-industrial', name: 'Industrial Safety', slug: 'industrial' },
    created_at: new Date(Date.now() - 2800000).toISOString(),
  },
  {
    id: 'prod-29',
    name: 'Mechanic Workshop Overalls',
    description: 'Full-body mechanic coverall with concealed brass zipper, multiple tool pockets, and reinforced knee patches. Oil and grease-resistant fabric ideal for automotive garages and workshops.',
    category_id: 'cat-industrial',
    images: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Heavy-Duty 100% Cotton Drill 280 GSM',
    is_featured: false,
    is_visible: true,
    price_range: '₹750 - ₹1,100',
    min_order_qty: 50,
    categories: { id: 'cat-industrial', name: 'Industrial Safety', slug: 'industrial' },
    created_at: new Date(Date.now() - 2900000).toISOString(),
  },
  {
    id: 'prod-30',
    name: 'Industrial Welding Leather Apron',
    description: 'Split-leather welding apron offering full torso and leg protection from sparks and spatter. Adjustable neck strap and waist tie. Heat-resistant up to 600°C.',
    category_id: 'cat-industrial',
    images: ['https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&q=80&w=600'],
    fabric: 'Split Cowhide Leather',
    is_featured: false,
    is_visible: true,
    price_range: '₹500 - ₹800',
    min_order_qty: 30,
    categories: { id: 'cat-industrial', name: 'Industrial Safety', slug: 'industrial' },
    created_at: new Date(Date.now() - 3000000).toISOString(),
  },
]

export const productService = {
  async getAll({ category, featured, search, page = 1, limit = 12, showHidden = false } = {}) {
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
    return supabase.from('products').insert(data).select().single()
  },

  async update(id, data) {
    return supabase.from('products').update(data).eq('id', id).select().single()
  },

  async delete(id) {
    return supabase.from('products').delete().eq('id', id)
  },

  async uploadImage(file, productId) {
    const ext = file.name.split('.').pop()
    const path = `products/${productId}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('product-images').upload(path, file)
    if (error) throw error
    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    return data.publicUrl
  },

  async deleteImage(url) {
    const path = url.split('/product-images/')[1]
    return supabase.storage.from('product-images').remove([path])
  },
}
