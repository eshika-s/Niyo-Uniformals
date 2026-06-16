import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const navigate = useNavigate()

  const stats = [
    { num: '10,000+', label: 'Units / Month' },
    { num: '500+', label: 'Clients Served' },
    { num: '5', label: 'Sectors Covered' },
    { num: '0.2%', label: 'Defect Rate' },
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0f172a]">

      {/* ── Main layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Text & Content */}
          <div className="lg:col-span-6 text-left">
            {/* Top label row */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                NIYO Uni-formals
              </span>
              <span className="w-12 h-px bg-white/20" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                By Shakti Dresses
              </span>
            </motion.div>

            {/* Hero headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-poppins font-semibold text-white leading-tight tracking-tight mb-8"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Redefining the uniform,
              <br />
              <span className="text-white/50">profession by profession.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/60 text-lg md:text-xl font-poppins font-light leading-relaxed mb-12 max-w-md"
            >
              Good uniforms don't just dress your team — they build your brand.
              We craft high-performance uniforms for schools, hospitals, offices & industries.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-5 items-center mb-16"
            >
              <button
                onClick={() => navigate('/catalogue')}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95 bg-white text-black"
              >
                Browse Catalogue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/bulk-order')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm text-white transition-all hover:bg-white/10 active:scale-95 border border-white/20"
              >
                Request Bulk Quote
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-poppins font-semibold text-2xl text-white mb-1">
                    {s.num}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-widest text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Clean Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full max-w-[500px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10"
            >
              <img
                src="/images/category_corporate.png"
                alt="Corporate Uniforms"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
