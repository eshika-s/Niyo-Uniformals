import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Package, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductCard({ product, onQuickView }) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const mainImage = product.images?.[0]

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/80 hover:border-slate-200 transition-[box-shadow,border-color] duration-300 cursor-pointer flex flex-col"
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="relative h-60 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden shrink-0">
        {mainImage && !imgError ? (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Package size={40} className="text-slate-200" />
            <span className="text-xs text-slate-300">No image</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.is_featured && (
            <span className="px-2.5 py-1 bg-gold-500 text-navy-900 text-[11px] font-bold rounded-lg shadow-sm">
              ✦ Featured
            </span>
          )}
          {product.categories && (
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-navy-700 text-[11px] font-semibold rounded-lg shadow-sm">
              {product.categories.name}
            </span>
          )}
        </div>

        {/* Quick view button */}
        <motion.button
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.2 }}
          id={`quickview-${product.id}`}
          onClick={e => { e.stopPropagation(); onQuickView?.(product) }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white text-navy-800 text-xs font-bold rounded-xl shadow-xl hover:bg-gold-50 transition-colors whitespace-nowrap"
        >
          <Eye size={13} />
          Quick View
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-navy-900 text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-navy-700 transition-colors">
          {product.name}
        </h3>

        {product.fabric && (
          <p className="text-[11px] text-slate-400 mb-3 font-medium uppercase tracking-wide">
            {product.fabric}
          </p>
        )}

        <div className="mt-auto">
          {/* Price & MOQ */}
          <div className="flex items-center justify-between mb-3">
            {product.price_range ? (
              <span className="text-navy-800 font-bold text-sm">{product.price_range}</span>
            ) : (
              <span className="text-slate-400 text-xs">Price on enquiry</span>
            )}
            {product.min_order_qty && (
              <span className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                MOQ {product.min_order_qty}+
              </span>
            )}
          </div>

          {/* CTA */}
          <button
            className="w-full py-2.5 flex items-center justify-center gap-1.5 bg-navy-50 hover:bg-navy-700 text-navy-700 hover:text-white text-sm font-semibold rounded-xl border border-navy-100 hover:border-navy-700 transition-all duration-200 group/btn"
            onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`) }}
          >
            View Details
            <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
