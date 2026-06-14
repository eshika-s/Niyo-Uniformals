import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Package, ArrowUpRight, Truck } from 'lucide-react'
import { motion } from 'framer-motion'

const colorMap = {
  white: '#ffffff',
  black: '#1a1a1a',
  'navy blue': '#1e3a5f',
  'light blue': '#a8d8ea',
  'soft pink': '#f4b6c2',
  green: '#2e7d32',
  teal: '#00897b',
  maroon: '#800020',
  'navy': '#1e3a5f',
  burgundy: '#800020',
  'ceil blue': '#92b4d4',
  wine: '#722f37',
  'hunter green': '#355e3b',
  blue: '#2196f3',
  grey: '#9e9e9e',
  'charcoal grey': '#36454f',
  'charcoal': '#36454f',
  brown: '#795548',
  'dark brown': '#4e342e',
  'denim blue': '#6f8faf',
  beige: '#f5f0e1',
  olive: '#6b8e23',
}

export default function ProductCard({ product, onQuickView, layout = 'vertical' }) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const mainImage = product.images?.[0]
  const isHorizontal = layout === 'horizontal'

  return (
    <motion.article
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className={`group bg-white rounded-2xl overflow-hidden border border-obsidian-200 hover:border-electric-400/50 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer flex ${isHorizontal ? 'flex-row h-full' : 'flex-col'}`}
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className={`relative bg-obsidian-50 overflow-hidden shrink-0 ${isHorizontal ? 'w-2/5 sm:w-48 h-full min-h-[240px]' : 'h-64'}`}>
        {mainImage && !imgError ? (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-obsidian-50"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-obsidian-50 border-b border-obsidian-200">
            <div className="text-obsidian-300 font-display font-bold text-2xl tracking-widest opacity-40">
              {product.name?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || 'NA'}
            </div>
            <span className="text-[10px] font-bold text-obsidian-400 tracking-[0.2em] uppercase text-center px-4">Image Pending</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-obsidian-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 max-w-[calc(100%-2rem)]">
          {product.is_featured && (
            <span className="px-3 py-1.5 glass-panel-dark text-electric-400 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm border border-electric-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-electric-500 rounded-full animate-pulse"></span>
              Featured
            </span>
          )}
          {product.categories && !isHorizontal && (
            <span className="px-3 py-1.5 bg-obsidian-900/90 backdrop-blur-md text-white border border-obsidian-700 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm hidden sm:block">
              {product.categories.name}
            </span>
          )}
          {product.customization_available && !isHorizontal && (
            <span className="px-2.5 py-1.5 bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-bold rounded-lg shadow-sm hidden sm:flex items-center gap-1 border border-emerald-400">
              🎨 Custom
            </span>
          )}
        </div>

        {/* Quick view button */}
        <motion.button
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10, scale: hovered ? 1 : 0.95 }}
          transition={{ duration: 0.2 }}
          id={`quickview-${product.id}`}
          onClick={e => { e.stopPropagation(); onQuickView?.(product) }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 glass-panel text-obsidian-900 text-xs font-bold rounded-xl shadow-xl hover:bg-white hover:text-electric-600 transition-colors whitespace-nowrap border border-white/50"
        >
          <Eye size={14} />
          Quick View
        </motion.button>
      </div>

      {/* Content */}
      <div className={`p-6 flex flex-col flex-1 ${isHorizontal ? 'justify-between py-6 px-8' : ''}`}>
        <h3 className="font-display font-bold text-obsidian-900 text-xl leading-tight mb-2 line-clamp-2 group-hover:text-electric-600 transition-colors">
          {product.name}
        </h3>

        {product.fabric && (
          <div className="flex items-center gap-1.5 text-[11px] text-obsidian-500 mb-4 font-semibold uppercase tracking-wider relative group/tooltip w-fit">
            <span>{product.fabric}</span>
            {product.fabric_care && (
              <div className="relative inline-block">
                <span className="cursor-help inline-flex items-center justify-center w-4 h-4 rounded-full bg-obsidian-100 text-obsidian-600 font-bold hover:bg-electric-100 hover:text-electric-600 text-[10px] transition-colors normal-case">
                  i
                </span>
                <div className="absolute z-30 bottom-full left-0 mb-2 hidden group-hover/tooltip:block w-56 p-3 glass-panel-dark text-[11px] text-obsidian-100 font-normal normal-case rounded-xl shadow-2xl border border-obsidian-700 leading-relaxed pointer-events-none">
                  {product.fabric_care}
                  <div className="absolute top-full left-3 w-2 h-2 bg-obsidian-800 rotate-45 -translate-y-1 border-r border-b border-obsidian-700" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-bold text-obsidian-400 uppercase tracking-widest mb-2">Sizes</p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map(size => (
               <span key={size} className="px-2.5 py-1.5 text-[11px] font-bold text-obsidian-700 bg-obsidian-50 border border-obsidian-200 rounded-lg hover:border-obsidian-300 hover:bg-obsidian-100 transition-colors cursor-default">
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-bold text-obsidian-400 uppercase tracking-widest mb-2">Colors</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map(color => (
                <span key={color} className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-obsidian-700 bg-white border border-obsidian-200 rounded-lg shadow-sm">
                  <span
                    className="w-3 h-3 rounded-full shadow-inner border border-obsidian-200 shrink-0"
                    style={{ backgroundColor: colorMap[color.toLowerCase()] || '#94a3b8' }}
                  />
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Delivery timeline */}
        {product.delivery_timeline && (
          <div className="flex items-center gap-2 text-xs text-obsidian-600 mb-4 font-medium bg-obsidian-50 w-fit px-3 py-1.5 rounded-lg border border-obsidian-100">
            <Truck size={14} className="text-electric-500 shrink-0" />
            <span>Est. Delivery: {product.delivery_timeline}</span>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-obsidian-100">
          {/* Price & MOQ */}
          <div className="flex items-center justify-between mb-5">
            {product.price_range ? (
              <span className="text-obsidian-900 font-price font-bold text-xl tracking-tight">{product.price_range}</span>
            ) : (
              <span className="text-obsidian-500 text-sm font-semibold">Price on enquiry</span>
            )}
            {product.min_order_qty && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-obsidian-500 px-2.5 py-1.5 bg-obsidian-50 border border-obsidian-200 rounded-lg">
                MOQ {product.min_order_qty}+
              </span>
            )}
          </div>

          {/* CTA */}
          <button
            className="w-full py-3.5 flex items-center justify-center gap-2 bg-obsidian-900 hover:bg-electric-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 group/btn shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5"
            onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`) }}
          >
            View Details
            <ArrowUpRight size={15} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
