import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="bg-stone-50 pt-20 md:pt-32 pb-16 md:pb-24 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#b3913b] font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-8"
        >
          Est. 1994 • Gandhi Nagar, Delhi
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[#0a1128] text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] mb-8"
        >
          The quiet authority <br className="hidden md:block" />
          of <span className="italic">precision-cut</span> textiles.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#334155] text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-16 md:mb-24"
        >
          Supplying India's leading institutions with garments that command respect. Measured for utility, tailored for the profession.
        </motion.p>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto px-4 md:px-8"
      >
        <div className="aspect-[4/3] md:aspect-[21/9] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
          <img
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=2000"
            alt="Tailoring precision"
            className="w-full h-full object-cover"
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1128]/20 mix-blend-multiply" />
        </div>
      </motion.div>
    </section>
  )
}
