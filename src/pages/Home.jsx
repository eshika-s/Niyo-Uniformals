import { useSettings } from '@/context/SettingsContext'
import HeroSection from '@/components/home/HeroSection'
import Testimonials from '@/components/home/Testimonials'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, MessageCircle, Scissors, Truck, Award, Shield } from 'lucide-react'

const categories = [
  {
    num: '01',
    label: 'School Uniforms',
    desc: 'Premium school uniform sets for all ages',
    slug: 'school',
    image: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?auto=format&fit=crop&q=80&w=600',
  },
  {
    num: '02',
    label: 'Corporate Wear',
    desc: 'Professional corporate attire and workwear',
    slug: 'corporate',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
  },
  {
    num: '03',
    label: 'Hospitality',
    desc: 'Hotel, restaurant and chef uniforms',
    slug: 'hospitality',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600',
  },
  {
    num: '04',
    label: 'Industrial',
    desc: 'Heavy-duty workwear and safety uniforms',
    slug: 'industrial',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
  },
  {
    num: '05',
    label: 'Healthcare',
    desc: 'Scrubs and medical uniforms',
    slug: 'healthcare',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&q=80&w=600',
  },
  {
    num: '06',
    label: 'Sports & Activewear',
    desc: 'Team jerseys and sports uniforms',
    slug: 'sports',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=600',
  },
]

const whyUs = [
  {
    icon: Scissors,
    title: 'Expert Craftsmanship',
    desc: 'Every piece is tailored by skilled artisans with 15+ years of experience in uniform manufacturing.',
  },
  {
    icon: Shield,
    title: 'Premium Fabrics',
    desc: '50+ fabric varieties sourced directly from mills, ensuring top-notch quality at wholesale prices.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    desc: 'Fast, reliable shipping to all major cities. Bulk orders dispatched within 7-10 working days.',
  },
  {
    icon: Award,
    title: 'Custom Branding',
    desc: 'Logo embroidery, custom colors, and bespoke sizing to match your brand identity perfectly.',
  },
]

export default function Home() {
  const { settings } = useSettings()
  const navigate = useNavigate()

  return (
    <main>
      <title>Niyo Uniformals — Premium Uniform Supplier in Delhi</title>

      {/* Hero */}
      <HeroSection settings={settings} />

      {/* Why Choose Us */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-100/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold-600 text-xs font-bold uppercase tracking-[0.25em] mb-3"
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-bold text-navy-950"
            >
              The Niyo Difference
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-50 to-navy-100/50 border border-navy-100 flex items-center justify-center mx-auto mb-5 group-hover:from-gold-50 group-hover:to-gold-100/50 group-hover:border-gold-200 transition-all duration-300 shadow-sm">
                  <Icon size={24} className="text-navy-700 group-hover:text-gold-600 transition-colors duration-300" />
                </div>
                <h3 className="font-display font-bold text-navy-900 text-lg mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories strip */}
      <section className="py-24 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold-600 text-xs font-bold uppercase tracking-[0.25em] mb-3"
            >
              Browse by Industry
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-display font-bold text-navy-950"
            >
              Uniform Categories
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(({ num, label, desc, slug, image }, i) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/catalogue?category=${slug}`)}
                className="group relative flex flex-col justify-between items-start p-8 md:p-10 bg-navy-950 rounded-3xl shadow-lg shadow-navy-950/10 hover:shadow-2xl hover:shadow-navy-950/20 transition-all duration-500 cursor-pointer text-left aspect-[4/3] w-full overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={image}
                    alt={label}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/20" />
                </div>

                {/* Content wrapper */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between items-start">
                  {/* Number tag */}
                  <span className="text-gold-400/70 font-display text-5xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">{num}</span>

                  {/* Bottom title & description */}
                  <div className="mt-auto">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-gold-400 transition-colors duration-300 mb-2">
                      {label}
                    </h3>
                    <p className="text-slate-300/80 text-sm font-light leading-relaxed mb-4">
                      {desc}
                    </p>
                    <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Explore
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* B2B CTA Banner */}
      <section className="py-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23fbbf24\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy-400/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-400 text-xs font-bold uppercase tracking-[0.2em]">Bulk Orders Welcome</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-5"
          >
            Need Uniforms for Your Organization?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300/80 mb-10 max-w-xl mx-auto text-lg leading-relaxed"
          >
            Get special pricing for bulk orders of 50+ pieces. Schools, corporates, hospitals — we cater to all.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              id="cta-bulk-order"
              onClick={() => navigate('/bulk-order')}
              className="group flex items-center justify-center gap-2.5 px-10 py-4.5 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-900 font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-gold-500/20 hover:shadow-gold-500/40 active:scale-[0.97]"
            >
              Request Bulk Quote
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 px-10 py-4.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white font-semibold rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              <MessageCircle size={17} />
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
