import HeroSection from '@/components/home/HeroSection'
import Testimonials from '@/components/home/Testimonials'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const sectors = [
  { id: '01', title: 'Corporate', desc: 'Executive shirting & suiting', slug: 'cat-corporate' },
  { id: '02', title: 'Hospitality', desc: 'Resort wear & culinary aprons', slug: 'cat-hospitality' },
  { id: '03', title: 'Medical', desc: 'Technical grade antimicrobial', slug: 'cat-medical' },
  { id: '04', title: 'Industrial', desc: 'High-tenacity workwear', slug: 'cat-industrial' },
  { id: '05', title: 'Education', desc: 'Durable institutional dress', slug: 'cat-school' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <main>
      <title>NIYO Uni-formals — Precision-cut textiles</title>

      <HeroSection />

      {/* Sectors of Excellence */}
      <section id="sectors" className="py-24 md:py-32 bg-[#0d1624] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-4xl mb-6"
              >
                Sectors of Excellence
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[#94a3b8] text-sm leading-relaxed"
              >
                From the sterile precision of medical wards to the executive poise of corporate suites, we engineer fabric for specific demands.
              </motion.p>
            </div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate('/catalogue')}
              className="text-[#b3913b] hover:text-[#fbbf24] transition-colors font-medium text-sm flex items-center gap-2 shrink-0 pb-1"
            >
              View Full Catalogue <span>→</span>
            </motion.button>
          </div>

          {/* Horizontal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/catalogue?category=${sector.slug}`)}
                className="bg-[#151f32] p-8 hover:bg-[#1a263d] transition-colors cursor-pointer group flex flex-col h-full min-h-[240px]"
              >
                <div className="text-[#b3913b] font-display italic text-base mb-auto group-hover:scale-110 origin-left transition-transform">
                  {sector.id}
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-2">{sector.title}</h3>
                  <p className="text-[#64748b] text-[11px] leading-relaxed">{sector.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Wholesale Capacity Section */}
      <section id="manufacturing" className="py-24 md:py-32 bg-stone-50 text-[#0a1128]">
        <div className="max-w-6xl mx-auto px-6 md:px-8 border border-blue-100/50">
          
          <div className="border border-[#e2e8f0] p-8 md:p-16 lg:p-24 bg-white/50 backdrop-blur-sm shadow-sm relative">
            <div className="max-w-3xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-10"
              >
                Wholesale capacity with <span className="italic">boutique</span> finish.
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[#475569] text-base md:text-lg leading-relaxed mb-16"
              >
                Our Gandhi Nagar facility operates at a threshold of 10,000 units per month, maintaining a defect rate of under 0.2%. We manage the entire lifecycle: sourcing the raw yarn, weaving the proprietary blends, and the final press.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#e2e8f0]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-[#b3913b] font-bold text-xs tracking-widest uppercase mb-4">In-House Quality</h4>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Four-point fabric inspection at every stage of production.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-[#b3913b] font-bold text-xs tracking-widest uppercase mb-4">Direct Logistics</h4>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Nationwide freight management from our central Delhi hub.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16"
            >
              <button 
                onClick={() => navigate('/about')}
                className="px-8 py-4 border border-[#0a1128] text-[#0a1128] font-medium hover:bg-[#0a1128] hover:text-white transition-colors"
              >
                Read the Capability Statement
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* B2B Banner */}
      <section className="relative py-16 md:py-24 bg-[#0a1128] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=2000" 
            alt="Folded shirts" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-[#0d1624]/80" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.2]"
            >
              From 50 units to <br />
              <span className="text-[#b3913b] italic">50,000</span>. Same <br />
              standard.
            </motion.h2>
          </div>

          <div className="flex-1 max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <p className="text-[#94a3b8] text-sm md:text-base leading-relaxed">
                Send a brief — fabric, fit, quantity, timeline. Our wholesale desk replies within one business day with a sample plan and indicative pricing.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => navigate('/bulk-order')}
                className="px-6 py-3.5 bg-[#b3913b] hover:bg-[#c9a84c] text-[#0a1128] font-bold text-sm transition-colors rounded-none"
              >
                Start a Bulk Enquiry
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/20 text-white font-semibold text-sm transition-colors rounded-none"
              >
                Visit the Showroom
              </button>
            </motion.div>
          </div>

        </div>
      </section>

    </main>
  )
}
