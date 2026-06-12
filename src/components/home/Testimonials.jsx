import { motion } from 'framer-motion'

export default function Testimonials() {
  return (
    <section className="bg-stone-50 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-xl md:text-2xl lg:text-3xl italic text-[#0a1128] leading-[1.4] mb-8"
        >
          “Niyo's tailoring runs the length of our 1,400-room property without a single thread out of place. They understand institutional scale the way a couturier understands a single client.”
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-[#0a1128] font-bold text-lg mb-2">Rajeev Mathur</p>
          <p className="text-[#94a3b8] text-xs font-bold tracking-[0.15em] uppercase">
            Director of F&B Operations
          </p>
        </motion.div>
      </div>
    </section>
  )
}
