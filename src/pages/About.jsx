import { motion } from 'framer-motion'
import { Shield, Users, Award, Clock, Heart, Truck, CheckCircle } from 'lucide-react'

const values = [
  { icon: Shield, title: 'Quality First', desc: 'Premium fabrics and rigorous quality checks on every piece.' },
  { icon: Users, title: 'Customer Focus', desc: 'We listen to your requirements and deliver exactly what you need.' },
  { icon: Award, title: 'Expertise', desc: '15+ years of experience in uniform manufacturing and wholesale.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We understand your deadlines and always deliver on time.' },
  { icon: Heart, title: 'Made with Care', desc: 'Every uniform is stitched with precision and attention to detail.' },
  { icon: Truck, title: 'Pan-India Shipping', desc: 'We deliver to all major cities across India.' },
]

const milestones = [
  { year: '2000', title: 'Founded', desc: 'Shakti Dresses established in Gandhi Nagar, Delhi' },
  { year: '2008', title: 'Expansion', desc: 'Launched NIYO Uni-formals brand for premium uniform retail' },
  { year: '2015', title: 'Scale', desc: 'Crossed 1,000+ bulk clients across Delhi-NCR' },
  { year: '2024', title: 'Today', desc: '5,000+ uniforms delivered, 200+ satisfied clients' },
]

const stats = [
  { n: '5,000+', l: 'Uniforms Delivered' },
  { n: '200+', l: 'Happy Clients' },
  { n: '15+', l: 'Years Experience' },
  { n: '50+', l: 'Fabric Options' },
]

export default function About() {
  return (
    <main className="min-h-screen bg-stone-50">
      <title>About Us — NIYO Uni-formals</title>

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 pt-36 pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#b3913b] text-xs font-bold uppercase tracking-[0.22em] mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-5"
          >
            About NIYO Uni-formals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Based in the heart of Gandhi Nagar, Delhi — India's largest garment market — we have been supplying premium quality uniforms to schools, corporates, hospitals, and hotels for over 15 years.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ n, l }, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group text-center p-6 rounded-none border border-slate-100 hover:border-gold-200 hover:shadow-lg hover:shadow-gold-50 transition-all duration-300 bg-stone-50"
            >
              <p className="text-3xl font-display font-bold text-[#0a1128] mb-1 group-hover:text-[#b3913b] transition-colors">{n}</p>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#b3913b] text-xs font-bold uppercase tracking-[0.18em] mb-3">Who We Are</p>
              <h2 className="text-3xl font-display font-bold text-[#0a1128] mb-2">
                Gandhi Nagar's Trusted Uniform Partner
              </h2>
              <div className="gold-divider !mx-0 mb-6" />
              <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
                <p>
                  NIYO Uni-formals was founded with a simple mission: provide businesses and institutions with high-quality uniforms at competitive wholesale prices, without compromising on craftsmanship.
                </p>
                <p>
                  Strategically located in Gandhi Nagar, Delhi — one of India's largest textile and garment hubs — we have direct access to premium fabrics and skilled artisans, allowing us to offer unbeatable quality and pricing.
                </p>
                <p>
                  We serve both B2B bulk clients and B2C retail customers, with orders ranging from 10 pieces to 10,000+ pieces.
                </p>
              </div>

              {/* Feature list */}
              <ul className="mt-7 space-y-2.5">
                {[
                  'Custom logo embroidery & printing',
                  'GST invoicing for businesses',
                  'Pan-India express delivery',
                  'Dedicated bulk order manager',
                ].map(feat => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle size={15} className="text-[#b3913b] shrink-0" fill="currentColor" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#b3913b] text-xs font-bold uppercase tracking-[0.18em] mb-6">Our Journey</p>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-gold-200 via-gold-300 to-transparent" />
                <div className="space-y-8">
                  {milestones.map((m, i) => (
                    <motion.div
                      key={m.year}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5"
                    >
                      {/* Dot */}
                      <div className="w-10 h-10 rounded-full bg-stone-50 border-2 border-gold-400 flex items-center justify-center shrink-0 shadow-sm">
                        <span className="text-[10px] font-bold text-[#b3913b]">{m.year.slice(2)}</span>
                      </div>
                      <div className="pt-1.5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#b3913b] uppercase tracking-wider">{m.year}</span>
                          <span className="text-[#0a1128] font-display font-semibold text-base">{m.title}</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[#b3913b] text-xs font-bold uppercase tracking-[0.18em] mb-3">What Drives Us</p>
            <h2 className="text-3xl font-display font-bold text-[#0a1128]">Our Core Values</h2>
            <div className="gold-divider" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="group bg-stone-50 rounded-none p-7 border border-slate-100 hover:border-gold-200 shadow-sm hover:shadow-lg hover:shadow-slate-100 transition-[box-shadow,border-color] duration-300"
              >
                <div className="w-12 h-12 rounded-none bg-gradient-to-br from-navy-50 to-navy-100 group-hover:from-gold-50 group-hover:to-gold-100 flex items-center justify-center mb-5 transition-all duration-300">
                  <Icon size={20} className="text-navy-700 group-hover:text-[#b3913b] transition-colors" />
                </div>
                <h3 className="font-display font-bold text-[#0a1128] text-lg mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
