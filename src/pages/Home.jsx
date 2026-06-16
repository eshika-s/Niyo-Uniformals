import HeroSection from '@/components/home/HeroSection'
import Testimonials from '@/components/home/Testimonials'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Beaker, Briefcase, GraduationCap, HardHat, ShieldCheck } from 'lucide-react'

const sectors = [
  { id: '01', title: 'Corporate', desc: 'Executive shirting & suiting', slug: 'cat-corporate', icon: Briefcase },
  { id: '02', title: 'Medical', desc: 'Technical grade antimicrobial', slug: 'cat-medical', icon: Beaker },
  { id: '03', title: 'Industrial', desc: 'High-tenacity workwear', slug: 'cat-industrial', icon: HardHat },
  { id: '04', title: 'Education', desc: 'Durable institutional dress', slug: 'cat-school', icon: GraduationCap },
  { id: '05', title: 'Security', desc: 'Tactical defense gear', slug: 'cat-security', icon: ShieldCheck },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="bg-black">
      <title>NIYO Uni-formals — Next-Gen Workwear</title>

      <HeroSection />

      {/* Sectors of Excellence */}
      <section id="sectors" className="py-24 md:py-32 bg-black text-white relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0  bg-[size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-5xl mb-6 font-bold tracking-tight"
              >
                Sectors of <span className="gradient-text">Excellence</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-obsidian-300 text-base leading-relaxed font-light"
              >
                Engineered for extreme performance across multiple domains. From sterile medical environments to demanding industrial sites.
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate('/catalogue')}
              className="text-electric-400 hover:text-electric-300 transition-colors font-medium flex items-center gap-2 shrink-0 group"
            >
              View Full Catalogue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {sectors.map((sector, index) => {
              const Icon = sector.icon
              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/catalogue?category=${sector.slug}`)}
                  className="bg-obsidian-800/50 border border-obsidian-700/50 rounded-2xl p-8 hover:bg-obsidian-800 hover:border-electric-500/30 transition-all cursor-pointer group flex flex-col h-full min-h-[260px] backdrop-blur-sm shadow-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-obsidian-900 border border-obsidian-700 flex items-center justify-center mb-auto group-hover:border-electric-500/50 group-hover:text-electric-400 transition-colors text-obsidian-300">
                    <Icon strokeWidth={1.5} size={24} />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-display font-bold mb-2 text-white">{sector.title}</h3>
                    <p className="text-obsidian-400 text-sm leading-relaxed">{sector.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Wholesale Capacity Section */}
      <section id="manufacturing" className="py-24 md:py-32 bg-white text-obsidian-900 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-obsidian-50 rounded-l-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex px-3 py-1 rounded-full bg-neon-50 text-neon-600 text-xs font-bold uppercase tracking-widest mb-6"
              >
                Production Scale
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
              >
                Wholesale capacity with <span className="text-neon-500">boutique finish.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-obsidian-600 text-lg leading-relaxed mb-12"
              >
                Our cutting-edge facility in Gandhi Nagar operates at a threshold of 10,000 units per month, maintaining a near-zero defect rate. We control the entire supply chain: sourcing raw yarn, weaving proprietary blends, and the final laser-guided press.
              </motion.p>

              <div className="grid sm:grid-cols-2 gap-8 border-t border-obsidian-100 pt-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-obsidian-900 font-bold text-lg mb-2">Four-Point Inspection</h4>
                  <p className="text-obsidian-500 text-sm leading-relaxed">
                    Automated and manual fabric inspection at every stage of the production pipeline.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-obsidian-900 font-bold text-lg mb-2">Direct Logistics</h4>
                  <p className="text-obsidian-500 text-sm leading-relaxed">
                    Nationwide freight management from our central AI-powered routing hub.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-12"
              >
                <button
                  onClick={() => navigate('/about')}
                  className="px-8 py-4 rounded-xl border-2 border-obsidian-900 text-obsidian-900 font-semibold hover:bg-obsidian-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  Read Capability Statement
                </button>
              </motion.div>
            </div>

            {/* Visual Abstract */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/5] bg-obsidian-50 rounded-3xl overflow-hidden relative shadow-2xl grid grid-cols-2 grid-rows-2 gap-2 p-2 border border-obsidian-100">
                <div className="bg-white rounded-2xl overflow-hidden relative flex items-center justify-center">
                  <img src="/images/corporate_mens_blazer.png" alt="Corporate" className="w-full h-full object-contain p-4 drop-shadow-md hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-white rounded-2xl overflow-hidden relative flex items-center justify-center">
                  <img src="/images/medical_scrubs.png" alt="Medical" className="w-full h-full object-contain p-4 drop-shadow-md hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-white rounded-2xl overflow-hidden relative flex items-center justify-center">
                  <img src="/images/hospitality_coat.png" alt="Hospitality" className="w-full h-full object-contain p-4 drop-shadow-md hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-white rounded-2xl overflow-hidden relative flex items-center justify-center">
                  <img src="/images/industrial_coverall.png" alt="Industrial" className="w-full h-full object-contain p-4 drop-shadow-md hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-5xl font-display font-bold text-electric-500 mb-2">0.2%</div>
                <div className="text-sm font-semibold text-obsidian-500 uppercase tracking-widest">Defect Rate</div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* B2B Banner */}
      <section className="relative py-24 bg-obsidian-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian-900 via-obsidian-900 to-electric-900 opacity-90 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-20 z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
          >
            From 50 units to <span className="text-electric-400">50,000</span>. <br />
            Zero compromises.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-obsidian-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-light"
          >
            Send a brief — fabric, fit, quantity, timeline. Our automated wholesale desk processes your requirements and replies within hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={() => navigate('/bulk-order')}
              className="px-8 py-4 bg-electric-500 hover:bg-electric-400 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95"
            >
              Start Bulk Enquiry
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-md transition-all"
            >
              Virtual Showroom Tour
            </button>
          </motion.div>

        </div>
      </section>

    </main>
  )
}
