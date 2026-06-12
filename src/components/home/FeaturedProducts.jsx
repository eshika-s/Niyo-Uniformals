import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Package } from 'lucide-react'
import ProductCard from '@/components/catalogue/ProductCard'
import { useProducts } from '@/hooks/useProducts'

export default function FeaturedProducts() {
  const { products, loading } = useProducts({ featured: true, limit: 6 })
  const navigate = useNavigate()

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Ambient background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <span className="text-gold-600 text-xs font-bold uppercase tracking-[0.18em]">Handpicked for You</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-950 leading-tight">
              Featured Products
            </h2>
            <div className="gold-divider mt-3 !mx-0" />
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/catalogue')}
            className="group flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors pb-1 border-b border-navy-200 hover:border-gold-400"
          >
            View Full Catalogue
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-slate-200 rounded-3xl">
            <Package size={48} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">Featured products will appear here once added from the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  )
}
