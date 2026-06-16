import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Package, Tag, ExternalLink } from 'lucide-react'

export default function QuickViewModal({ product, onClose }) {
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm h-20"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="h-64 md:h-full bg-slate-50 flex items-center justify-center">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <Package size={64} className="text-slate-200" />
              )}
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col">
              {product.categories && (
                <div className="flex items-center gap-1.5 mb-2">
                  <Tag size={12} className="text-gold-600" />
                  <span className="text-xs text-gold-600 font-medium">{product.categories.name}</span>
                </div>
              )}

              <h2 className="font-display font-bold text-xl text-navy-900 mb-3">{product.name}</h2>

              {product.fabric && (
                <p className="text-sm text-slate-500 mb-2">
                  <span className="font-medium text-slate-700">Fabric:</span> {product.fabric}
                </p>
              )}

              {product.price_range && (
                <p className="text-sm text-slate-500 mb-2">
                  <span className="font-medium text-slate-700">Price Range:</span> {product.price_range}
                </p>
              )}

              {product.min_order_qty && (
                <p className="text-sm text-slate-500 mb-3">
                  <span className="font-medium text-slate-700">Min Order:</span> {product.min_order_qty} pieces
                </p>
              )}

              {product.description && (
                <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">{product.description}</p>
              )}

              <div className="mt-auto space-y-2">
                <button
                  onClick={() => { navigate(`/product/${product.id}`); onClose() }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors"
                >
                  <ExternalLink size={15} />
                  View Full Details
                </button>
                <button
                  onClick={() => { navigate(`/bulk-order?product=${product.id}`); onClose() }}
                  className="w-full py-3 border border-navy-200 text-navy-700 text-sm font-semibold rounded-xl hover:bg-navy-50 transition-colors"
                >
                  Request Bulk Quote
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
