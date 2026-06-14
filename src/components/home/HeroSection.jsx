import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const navigate = useNavigate()
  
  return (
    <section className="bg-obsidian-900 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden relative min-h-[90vh] flex items-center">
      
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-dark mb-8 border border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-electric-400 animate-pulse" />
          <span className="text-obsidian-300 font-medium text-xs tracking-wider uppercase">Next-Gen Uniforms</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-white text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] mb-8 max-w-5xl font-bold tracking-tight"
        >
          Engineering the <br className="hidden md:block" />
          <span className="gradient-text">future of workwear.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-obsidian-300 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-light"
        >
          Precision-cut textiles designed for modern professionals. From surgical wards to corporate boardrooms, we build uniforms that command authority.
        </motion.p>
        
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={() => navigate('/catalogue')}
            className="px-8 py-4 rounded-xl bg-electric-500 hover:bg-electric-400 text-white font-semibold text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
          >
            Explore Catalogue
          </button>
          <button 
            onClick={() => navigate('/bulk-order')}
            className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all border border-white/10 backdrop-blur-md"
          >
            Request Bulk Quote
          </button>
        </motion.div>
      </div>

    </section>
  )
}
