import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, X, ZoomIn, Play, Pause,
  ChevronRight, Sparkles, MapPin, Info, ShoppingBag,
  Stethoscope, Briefcase, GraduationCap, HardHat, ChefHat,
  ShieldCheck, Plane, Flame
} from 'lucide-react'

// ── Showroom Zones ────────────────────────────────────────────────────────────
const ZONES = [
  {
    id: 'medical',
    title: 'Healthcare & Medical',
    tagline: 'Antimicrobial. Precision-stitched. Certified.',
    icon: Stethoscope,
    color: '#0f766e',
    gradient: 'from-teal-950 via-teal-900 to-emerald-950',
    accent: 'text-teal-400',
    accentBg: 'bg-teal-500/10 border-teal-500/20',
    products: [
      { name: "Men's Lab Coat",  price: '₹450–₹650', image: '/images/mens_lab_coat.png' },
      { name: 'OT Scrub Suit',  price: '₹480–₹690', image: '/images/ot_scrub_suit.png' },
      { name: 'Nurse Tunic',    price: '₹420–₹580', image: '/images/nurse_tunic.png' },
      { name: 'Patient Gown',   price: '₹180–₹280', image: '/images/unisex_hospital_gown.png' },
    ],
    features: ['Anti-microbial treated fabric', 'Liquid barrier finish', 'Autoclave-safe options', 'Custom embroidery'],
    slug: 'medical',
  },
  {
    id: 'corporate',
    title: 'Corporate & Executive',
    tagline: 'Sharp. Distinguished. Authoritative.',
    icon: Briefcase,
    color: '#1e3a8a',
    gradient: 'from-blue-950 via-navy-900 to-indigo-950',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/10 border-blue-500/20',
    products: [
      { name: "Men's Slim Blazer",  price: '₹1,800–₹2,400', image: '/images/corporate_mens_blazer.png' },
      { name: 'Nehru Jacket',       price: '₹850–₹1,200',   image: '/images/nehru_jacket.png' },
      { name: 'Oxford Shirt',       price: '₹1,500–₹2,100', image: '/images/oxford_shirt.png' },
      { name: "Women's Blazer",     price: '₹950–₹1,400',   image: '/images/corporate_womens_blazer.png' },
    ],
    features: ['Premium tropical wool', 'Custom satin lining', 'Logo embroidery', 'Pan India delivery'],
    slug: 'corporate',
  },
  {
    id: 'hospitality',
    title: 'Hotel & Hospitality',
    tagline: 'Elegance meets functionality.',
    icon: ChefHat,
    color: '#92400e',
    gradient: 'from-amber-950 via-orange-950 to-red-950',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500/10 border-amber-500/20',
    products: [
      { name: 'Chef Jacket',      price: '₹750–₹1,100', image: '/images/chef_jacket.png' },
      { name: 'Waiter Vest Set',  price: '₹650–₹900',   image: '/images/waiter_vest.png' },
      { name: 'Chef Apron',       price: '₹180–₹260',   image: '/images/chef_apron.png' },
      { name: 'Housekeeping Set', price: '₹390–₹550',   image: '/images/hospitality_coat.png' },
    ],
    features: ['Stain-resistant twill', 'Breathable mesh panels', 'Multiple pocket design', 'Durable zippers'],
    slug: 'hospitality',
  },
  {
    id: 'school',
    title: 'School & Education',
    tagline: 'Built to last. Made to inspire.',
    icon: GraduationCap,
    color: '#162d6e',
    gradient: 'from-navy-950 via-blue-950 to-indigo-950',
    accent: 'text-indigo-400',
    accentBg: 'bg-indigo-500/10 border-indigo-500/20',
    products: [
      { name: "Boys' Blazer",   price: '₹850–₹1,200', image: '/images/school_blazer.png' },
      { name: 'School Polo',    price: '₹350–₹500',   image: '/images/school_polo.png' },
      { name: 'PE Tracksuit',   price: '₹580–₹850',   image: '/images/school_tracksuit.png' },
      { name: 'Sports Jersey',  price: '₹250–₹390',   image: '/images/sports_jersey.png' },
    ],
    features: ['Terry-wool blend', 'Fade-resistant colour', 'Pilling-resistant', 'Min. 100 pieces'],
    slug: 'school',
  },
  {
    id: 'industrial',
    title: 'Industrial & Safety',
    tagline: 'Engineered for extreme environments.',
    icon: HardHat,
    color: '#c2410c',
    gradient: 'from-orange-950 via-red-950 to-rose-950',
    accent: 'text-orange-400',
    accentBg: 'bg-orange-500/10 border-orange-500/20',
    products: [
      { name: 'Boiler / Coverall',  price: '₹650–₹950',   image: '/images/industrial_coverall.png' },
      { name: 'Hi-Vis Jacket',      price: '₹420–₹580',   image: '/images/industrial_coverall.png' },
      { name: 'Nomex Safety Suit',  price: '₹3,500–₹5,500', image: '/images/industrial_coverall.png' },
      { name: 'Lab Apron',          price: '₹90–₹150',    image: '/images/medical_lab_apron.png' },
    ],
    features: ['Flame-retardant Nomex', '3M reflective tape', 'Heavy-duty brass zips', 'EN ISO certified'],
    slug: 'industrial',
  },
  {
    id: 'aviation',
    title: 'Airline & Aviation',
    tagline: 'Precision-tailored for the skies.',
    icon: Plane,
    color: '#4338ca',
    gradient: 'from-indigo-950 via-violet-950 to-purple-950',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-500/10 border-violet-500/20',
    products: [
      { name: 'Pilot Epaulette Shirt',  price: '₹550–₹750',   image: '/images/corporate_shirt.png' },
      { name: 'Cabin Crew Blazer',      price: '₹2,200–₹3,500', image: '/images/womens_blazer.png' },
      { name: "Men's Formal Blazer",    price: '₹1,800–₹2,400', image: '/images/mens_blazer.png' },
      { name: 'Doctor / Consultant Blazer', price: '₹950–₹1,400', image: '/images/doctor_blazer.png' },
    ],
    features: ['Superfine gabardine', 'Silk scarf included', 'Epaulette shoulder loops', 'Bespoke tailoring'],
    slug: 'airline',
  },
]

// ── Zone Card (Selector) ─────────────────────────────────────────────────────
function ZoneCard({ zone, isActive, onClick, index }) {
  const Icon = zone.icon
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
        isActive
          ? 'bg-white/10 border-white/30 shadow-lg shadow-white/5'
          : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${zone.color}30`, border: `1px solid ${zone.color}50` }}
        >
          <Icon size={18} style={{ color: zone.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{zone.title}</p>
          <p className="text-white/40 text-xs mt-0.5 truncate">{zone.products.length} products</p>
        </div>
        {isActive && <ChevronRight size={14} className="text-white/60 shrink-0" />}
      </div>
      {isActive && (
        <motion.div
          layoutId="zone-active"
          className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
          style={{ borderColor: zone.color }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  )
}

// ── Product Spotlight Card ───────────────────────────────────────────────────
function ProductSpotlight({ product, zone, onEnquire }) {
  const [imgErr, setImgErr] = useState(false)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.3 }}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 hover:bg-white/8 transition-all cursor-pointer"
      onClick={onEnquire}
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-white/5 flex items-center justify-center">
        {!imgErr ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-30">
            <ShoppingBag size={32} className="text-white" />
            <span className="text-white/50 text-xs">{product.name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-xs text-white font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            Enquire Now →
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-white font-semibold text-sm">{product.name}</p>
        <p className="text-white/50 text-xs mt-1">{product.price}</p>
      </div>
    </motion.div>
  )
}

// ── Main Showroom Page ───────────────────────────────────────────────────────
export default function VirtualShowroom() {
  const [activeZone, setActiveZone] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [lightbox, setLightbox] = useState(null)
  const navigate = useNavigate()
  const zone = ZONES[activeZone]
  const Icon = zone.icon
  const timerRef = useRef(null)

  // Auto-rotate zones
  useEffect(() => {
    if (!autoPlay) return
    timerRef.current = setInterval(() => {
      setActiveZone(p => (p + 1) % ZONES.length)
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [autoPlay, activeZone])

  const goTo = (idx) => {
    setAutoPlay(false)
    setActiveZone(idx)
  }

  const prev = () => goTo((activeZone - 1 + ZONES.length) % ZONES.length)
  const next = () => goTo((activeZone + 1) % ZONES.length)

  const handleEnquire = (product) => {
    navigate(`/catalogue?category=${zone.slug}&q=${encodeURIComponent(product.name)}`)
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-white">
      <title>Virtual Showroom — Niyo Uni-formals</title>

      {/* ── Top Nav ── */}
      <div className="sticky top-0 z-50 bg-obsidian-950/80 backdrop-blur-xl border-b border-white/8 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40 font-mono uppercase tracking-widest">Virtual Showroom</span>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-xs text-gold-400 font-semibold">{activeZone + 1} / {ZONES.length}</span>
        </div>
        <button
          onClick={() => navigate('/catalogue')}
          className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-sm font-bold rounded-xl transition-colors"
        >
          <ShoppingBag size={14} /> Full Catalogue
        </button>
      </div>

      <div className="flex h-[calc(100vh-65px)]">
        {/* ── Left: Zone Navigator ── */}
        <div className="hidden lg:flex w-72 shrink-0 flex-col bg-obsidian-900/60 border-r border-white/5 p-4 gap-2 overflow-y-auto">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold px-2 mb-2">Showroom Zones</p>
          {ZONES.map((z, i) => (
            <ZoneCard key={z.id} zone={z} isActive={i === activeZone} onClick={() => goTo(i)} index={i} />
          ))}

          {/* Auto-play control */}
          <div className="mt-auto pt-4 border-t border-white/5">
            <button
              onClick={() => setAutoPlay(v => !v)}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-white/60 hover:text-white"
            >
              {autoPlay ? <Pause size={14} /> : <Play size={14} />}
              {autoPlay ? 'Pause Auto-Tour' : 'Start Auto-Tour'}
              <span className="ml-auto text-xs text-white/30">6s</span>
            </button>
          </div>
        </div>

        {/* ── Main Stage ── */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Dynamic background gradient */}
          <AnimatePresence mode="wait">
            <motion.div
              key={zone.id + '-bg'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className={`absolute inset-0 bg-gradient-to-br ${zone.gradient} opacity-40 pointer-events-none`}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />

          {/* ── Zone Header ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={zone.id + '-header'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative z-10 px-6 lg:px-10 pt-8 pb-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-4 ${zone.accentBg} ${zone.accent}`}>
                    <Icon size={12} />
                    Zone {String(activeZone + 1).padStart(2, '0')}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-display font-bold text-white leading-tight">{zone.title}</h1>
                  <p className="text-white/50 mt-2 text-base">{zone.tagline}</p>
                </div>

                {/* Zone navigation arrows (desktop) */}
                <div className="hidden lg:flex items-center gap-2 shrink-0 mt-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:-translate-x-0.5"
                  >
                    <ArrowLeft size={16} className="text-white/70" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:translate-x-0.5"
                  >
                    <ArrowRight size={16} className="text-white/70" />
                  </button>
                </div>
              </div>

              {/* Features pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {zone.features.map(f => (
                  <span key={f} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Product Grid ── */}
          <div className="flex-1 overflow-y-auto px-6 lg:px-10 pb-8 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={zone.id + '-products'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {zone.products.map((product, i) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <ProductSpotlight
                      product={product}
                      zone={zone}
                      onEnquire={() => handleEnquire(product)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Zone CTA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={zone.id + '-cta'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div>
                  <p className="text-white font-semibold">Interested in {zone.title}?</p>
                  <p className="text-white/50 text-sm mt-0.5">Browse all products or send a bulk enquiry.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => navigate(`/catalogue?category=${zone.slug}`)}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    Browse All
                  </button>
                  <button
                    onClick={() => navigate('/bulk-order')}
                    className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-sm font-bold rounded-xl transition-colors"
                  >
                    Get Quote
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Progress bar ── */}
          <div className="relative z-10 px-6 lg:px-10 pb-4 flex items-center gap-3">
            <div className="flex gap-1.5 flex-1">
              {ZONES.map((z, i) => (
                <button
                  key={z.id}
                  onClick={() => goTo(i)}
                  className="flex-1 h-1 rounded-full overflow-hidden bg-white/10 transition-all"
                >
                  {i === activeZone && (
                    <motion.div
                      key={z.id + '-bar'}
                      className="h-full rounded-full"
                      style={{ backgroundColor: zone.color }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: autoPlay ? 6 : 0.3, ease: 'linear' }}
                    />
                  )}
                  {i < activeZone && (
                    <div className="h-full w-full rounded-full bg-white/30" />
                  )}
                </button>
              ))}
            </div>
            {/* Mobile arrows */}
            <div className="lg:hidden flex items-center gap-2">
              <button onClick={prev} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <ArrowLeft size={14} />
              </button>
              <button onClick={next} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
