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
  'navy blue': '#1e3a5f',
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
      className={`group bg-white overflow-hidden border border-[#e2e8f0] hover:border-[#b3913b] hover:shadow-xl transition-all duration-300 cursor-pointer flex ${isHorizontal ? 'flex-row h-full' : 'flex-col'}`}
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className={`relative bg-stone-50 overflow-hidden shrink-0 ${isHorizontal ? 'w-2/5 sm:w-48 h-full min-h-[240px]' : 'h-64'}`}>
        {mainImage && !imgError ? (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-slate-50"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-stone-50 border-b border-[#e2e8f0]">
            <div className="text-[#0a1128] font-display font-bold text-2xl tracking-widest italic opacity-40">
              {product.name?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || 'NA'}
            </div>
            <span className="text-[10px] font-bold text-[#94a3b8] tracking-[0.2em] uppercase text-center px-4">Photo Coming Soon</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 max-w-[calc(100%-2rem)]">
          {product.is_featured && (
            <span className="px-3 py-1 bg-[#b3913b] text-[#0a1128] text-[10px] font-bold uppercase tracking-wider rounded-none shadow-sm">
              ✦ Featured
            </span>
          )}
          {product.categories && !isHorizontal && (
            <span className="px-3 py-1 bg-[#0a1128] text-white text-[10px] font-bold uppercase tracking-wider rounded-none shadow-sm hidden sm:block">
              {product.categories.name}
            </span>
          )}
          {product.customization_available && !isHorizontal && (
            <span className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-lg shadow-sm hidden sm:flex items-center gap-1">
              🎨 Customization Available
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
      <div className={`p-6 flex flex-col flex-1 ${isHorizontal ? 'justify-between py-6 px-8' : ''}`}>
        <h3 className="font-display font-bold text-[#0a1128] text-lg leading-snug mb-3 line-clamp-2 group-hover:text-[#b3913b] transition-colors">
          {product.name}
        </h3>

        {product.fabric && (
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-3 font-medium uppercase tracking-wide relative group/tooltip w-fit">
            <span>{product.fabric}</span>
            {product.fabric_care && (
              <div className="relative inline-block">
                <span className="cursor-help inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 text-[9px] transition-colors normal-case ml-0.5">
                  i
                </span>
                <div className="absolute z-30 bottom-full left-0 mb-2 hidden group-hover/tooltip:block w-48 p-2.5 bg-slate-900/95 backdrop-blur-sm text-[10px] text-slate-100 font-normal normal-case rounded-lg shadow-xl border border-slate-800 leading-normal pointer-events-none">
                  {product.fabric_care}
                  <div className="absolute top-full left-3 w-1.5 h-1.5 bg-slate-900/95 rotate-45 -translate-y-0.5 border-r border-b border-slate-800" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="mb-3">
            <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Sizes</p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map(size => (
                <span key={size} className="px-2.5 py-1 text-[10px] font-bold text-[#0a1128] bg-stone-50 border border-[#e2e8f0] rounded-none">
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="mb-3">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Colors</p>
            <div className="flex flex-wrap gap-1.5">
              {product.colors.map(color => (
                <span key={color} className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-md">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-slate-200 shrink-0"
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
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-3.5 font-medium">
            <Truck size={13} className="text-gold-500 shrink-0" />
            <span>Est. Delivery: {product.delivery_timeline}</span>
          </div>
        )}

        <div className="mt-auto pt-4">
          {/* Price & MOQ */}
          <div className="flex items-center justify-between mb-4">
            {product.price_range ? (
              <span className="text-[#0a1128] font-display font-bold text-lg">{product.price_range}</span>
            ) : (
              <span className="text-[#64748b] text-xs font-semibold">Price on enquiry</span>
            )}
            {product.min_order_qty && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] px-2 py-1 bg-stone-50 border border-[#e2e8f0]">
                MOQ {product.min_order_qty}+
              </span>
            )}
          </div>

          {/* CTA */}
          <button
            className="w-full py-3 flex items-center justify-center gap-2 bg-transparent hover:bg-[#0a1128] text-[#0a1128] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#0a1128] transition-colors duration-200 group/btn rounded-none"
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
