import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, CheckCircle, Sparkles } from 'lucide-react'

const stats = [
  { value: '5,000+', label: 'Uniforms Delivered' },
  { value: '200+', label: 'Satisfied Clients' },
  { value: '15+', label: 'Years Experience' },
  { value: '50+', label: 'Fabric Varieties' },
]

const trustedBy = ['Delhi Public School', 'AIIMS', 'Taj Hotels', 'TCS', 'Fortis Hospital', 'NDMC']

const features = [
  'Premium quality fabrics',
  'Pan-India delivery',
  'Custom logo embroidery',
  'GST invoicing available',
]

export default function HeroSection({ settings = {} }) {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/40 to-gold-50/30">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23162d6e\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
      />

      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-300/10 rounded-full blur-[128px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy-300/8 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[90vh] flex items-center py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

            {/* Left: Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <Sparkles size={14} className="text-gold-500" />
                <span className="text-gold-700 text-xs font-semibold tracking-[0.2em] uppercase">Gandhi Nagar, East Delhi</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-bold text-navy-950 leading-[1.08] mb-6"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}
              >
                {settings.hero_title || (
                  <>
                    Premium Uniforms<br />
                    <span className="text-navy-700">for Every </span>
                    <span className="relative inline-block">
                      <span className="relative z-10">Profession</span>
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="absolute bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-gold-300/50 to-gold-400/30 rounded origin-left"
                      />
                    </span>
                  </>
                )}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-lg"
              >
                {settings.hero_subtitle || "Wholesale & retail uniforms for schools, corporates, hospitals and more — crafted with premium fabrics, shipped across India."}
              </motion.p>

              {/* Feature checklist */}
              <motion.ul
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-10"
              >
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <CheckCircle size={15} className="text-gold-500 shrink-0" fill="currentColor" />
                    {f}
                  </li>
                ))}
              </motion.ul>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 mb-14"
              >
                <button
                  id="hero-catalogue-btn"
                  onClick={() => navigate('/catalogue')}
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-navy-800 to-navy-700 text-white font-bold rounded-2xl text-sm shadow-xl shadow-navy-900/20 hover:shadow-navy-900/40 hover:from-navy-700 hover:to-navy-600 active:scale-[0.97] transition-all duration-300"
                >
                  Browse Catalogue
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  id="hero-bulk-btn"
                  onClick={() => navigate('/bulk-order')}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-900 font-bold rounded-2xl text-sm shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30 active:scale-[0.97] transition-all duration-300"
                >
                  <MessageCircle size={15} />
                  Request Bulk Quote
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200/60"
              >
                {stats.map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-display font-bold text-navy-900">{value}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-tight font-medium">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Premium Image Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-900/20">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
                  alt="Premium uniform showcase"
                  className="w-full h-[540px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

                {/* Floating badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-navy-900 font-display font-bold text-lg">Trusted by 200+ Brands</p>
                      <p className="text-slate-500 text-xs mt-0.5">Schools • Corporates • Hospitals • Hotels</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg shadow-gold-500/30">
                      <span className="text-white font-display font-bold text-lg">15+</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Secondary floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -top-4 -left-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center">
                    <Sparkles size={16} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-navy-900 font-bold text-sm">Premium Quality</p>
                    <p className="text-slate-400 text-xs">50+ Fabric Options</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-2 border-gold-300/30 -z-10" />
              <div className="absolute -top-8 -right-4 w-20 h-20 rounded-full border border-navy-200/30 -z-10" />
            </motion.div>
          </div>
        </div>

        {/* Trusted by ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="border-t border-slate-200/60 py-6 flex items-center justify-center gap-8 flex-wrap"
        >
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Trusted by</span>
          {trustedBy.map(name => (
            <span key={name} className="text-slate-400/80 text-sm font-medium">{name}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
