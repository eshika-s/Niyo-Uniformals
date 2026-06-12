import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Tag, Package, Shirt, Truck, Info, X, MessageCircle } from 'lucide-react'
import { productService } from '@/services/productService'
import ImageGallery from '@/components/product/ImageGallery'
import EnquiryForm from '@/components/product/EnquiryForm'
import ProductCard from '@/components/catalogue/ProductCard'
import { useProducts } from '@/hooks/useProducts'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'specifications', label: 'Specifications', icon: Shirt },
  { id: 'delivery', label: 'Delivery & Care', icon: Truck },
]

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

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  // Selected State
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [showSizeChart, setShowSizeChart] = useState(false)

  const { products: related } = useProducts({ category: product?.category_id, limit: 5 })

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data, error } = await productService.getById(id)
      if (error || !data) {
        navigate('/catalogue')
      } else {
        setProduct(data)
        if (data.colors?.length > 0) setSelectedColor(data.colors[0])
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0])
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen pt-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="h-96 bg-slate-100 rounded-none animate-pulse" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <div key={i} className="h-8 bg-slate-100 rounded-none animate-pulse" />)}
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!product) return null

  const relatedProducts = related.filter(p => p.id !== product.id).slice(0, 4)

  const tabContent = {
    overview: (
      <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed text-left">
        {product.description
          ? <p>{product.description}</p>
          : <p className="text-slate-400 italic">No description provided for this product.</p>
        }
      </div>
    ),
    specifications: (
      <div className="space-y-3 text-left">
        {[
          { label: 'Fabric / Material', value: product.fabric },
          { label: 'Available Colors', value: product.colors?.join(', ') },
          { label: 'Category', value: product.categories?.name },
          { label: 'Price Range', value: product.price_range },
          { label: 'Min. Order Qty', value: product.min_order_qty ? `${product.min_order_qty} pieces` : null },
          { label: 'Customization', value: product.customization_available ? 'Available (Embroidery, printing, custom labels)' : 'Not Available' },
        ].filter(r => r.value).map(row => (
          <div key={row.label} className="flex items-start gap-4 py-3 border-b border-slate-50 last:border-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-36 shrink-0 pt-0.5">{row.label}</span>
            <span className="text-sm text-navy-800 font-medium">{row.value}</span>
          </div>
        ))}
      </div>
    ),
    delivery: (
      <div className="space-y-4 text-sm text-slate-600 text-left">
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-none border border-slate-100">
          <Truck size={16} className="text-[#b3913b] mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-navy-800 mb-0.5">Est. Delivery Timeline</p>
            <p className="leading-relaxed text-slate-500">
              Bulk manufacturing & shipping: {product.delivery_timeline || '7-10 working days'}. Pan-India express logistics enabled.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-none border border-slate-100">
          <Shirt size={16} className="text-[#b3913b] mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-navy-800 mb-0.5">Care Instructions</p>
            <p className="leading-relaxed text-slate-500">
              {product.fabric_care || 'Machine wash warm, tumble dry low, warm iron.'}
            </p>
          </div>
        </div>
      </div>
    ),
  }

  // WhatsApp link generator
  const waMessage = `Hello, I'm interested in: ${product.name}` +
                    (selectedColor ? `\n- Color: ${selectedColor}` : '') +
                    (selectedSize ? `\n- Size: ${selectedSize}` : '') +
                    `\n- URL: ${window.location.href}`
  const waLink = `https://wa.me/919999999999?text=${encodeURIComponent(waMessage)}`

  return (
    <main className="min-h-screen bg-stone-50 pt-24">
      <title>{product.name} — NIYO Uni-formals</title>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-navy-700 transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Catalogue
        </button>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ImageGallery images={product.images || []} productName={product.name} />
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="space-y-6 text-left"
          >
            {/* Category badge & Customization badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap items-center gap-3"
            >
              {product.categories && (
                <div className="flex items-center gap-2">
                  <Tag size={12} className="text-[#b3913b]" />
                  <span className="text-xs font-bold text-[#b3913b] uppercase tracking-wider">{product.categories.name}</span>
                </div>
              )}
              {product.customization_available && (
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold rounded-none uppercase tracking-wide">
                  🎨 Customization Available
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="text-3xl md:text-4xl font-display font-bold text-[#0a1128] leading-tight"
            >
              {product.name}
            </motion.h1>

            {/* Pricing cards */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap gap-3"
            >
              {product.price_range && (
                <div className="px-5 py-3 bg-navy-50 rounded-none border border-navy-100">
                  <p className="text-[10px] text-navy-500 font-bold uppercase tracking-wider mb-0.5">Price Range</p>
                  <p className="text-xl font-display font-bold text-[#0a1128]">{product.price_range}</p>
                </div>
              )}
              {product.min_order_qty && (
                <div className="px-5 py-3 bg-gold-50 rounded-none border border-gold-100">
                  <p className="text-[10px] text-[#b3913b] font-bold uppercase tracking-wider mb-0.5">Min. Order Qty</p>
                  <p className="text-xl font-display font-bold text-[#b3913b]">{product.min_order_qty} pcs</p>
                </div>
              )}
            </motion.div>

            {/* Color Swatch Selection */}
            {product.colors?.length > 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="space-y-2.5"
              >
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Color</p>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map(color => {
                    const hex = colorMap[color.toLowerCase()] || '#94a3b8'
                    const isSelected = selectedColor === color
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative flex items-center justify-center p-0.5 rounded-full border-2 transition-all duration-200 ${
                          isSelected ? 'border-navy-800 scale-110 shadow-sm' : 'border-transparent hover:border-slate-300'
                        }`}
                        title={color}
                      >
                        <span
                          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center shrink-0"
                          style={{ backgroundColor: hex }}
                        >
                          {isSelected && (
                            <span className={`w-1.5 h-1.5 rounded-full ${color.toLowerCase() === 'white' ? 'bg-slate-900' : 'bg-stone-50'}`} />
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
                {selectedColor && (
                  <p className="text-xs font-semibold text-slate-500">Selected Color: <span className="text-[#0a1128]">{selectedColor}</span></p>
                )}
              </motion.div>
            )}

            {/* Size Chart & Selection */}
            {product.sizes?.length > 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between max-w-xs">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Size</p>
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="text-xs font-bold text-[#b3913b] hover:text-[#b3913b] underline flex items-center gap-1"
                  >
                    Size Chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => {
                    const isSelected = selectedSize === size
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs font-bold rounded-none border transition-all duration-200 ${
                          isSelected
                            ? 'bg-navy-800 border-navy-800 text-white shadow-sm'
                            : 'bg-stone-50 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}



            {/* Premium CTA Buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md pt-2"
            >
              <button
                onClick={() => document.getElementById('product-enquiry-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 bg-navy-800 hover:bg-navy-700 text-white font-bold rounded-none transition-all duration-200 active:scale-[0.98] shadow-lg shadow-navy-950/10 flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                Request Custom Quote
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-none transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={16} />
                Order on WhatsApp
              </a>
            </motion.div>

            {/* Tabbed spec panel */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="bg-stone-50 border border-slate-100 rounded-none overflow-hidden shadow-sm"
            >
              {/* Tab headers */}
              <div className="flex border-b border-slate-100">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-navy-800 border-b-2 border-gold-500 bg-gold-50/30'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <tab.icon size={12} />
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="p-5"
                >
                  {tabContent[activeTab]}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Enquiry Form */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              id="product-enquiry-section"
              className="pt-4"
            >
              <EnquiryForm product={product} />
            </motion.div>
          </motion.div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-t border-slate-100 pt-16"
          >
            <div className="flex items-end justify-between mb-8">
              <div className="text-left">
                <p className="text-[#b3913b] text-xs font-bold uppercase tracking-[0.18em] mb-2">You May Also Like</p>
                <h2 className="text-2xl font-display font-bold text-[#0a1128]">Related Products</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {showSizeChart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowSizeChart(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-stone-50 rounded-none p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-100 text-left relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSizeChart(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-display font-bold text-[#0a1128] mb-1">Standard Size Chart</h3>
              <p className="text-slate-400 text-xs mb-6 font-medium">All measurements are in inches. Body fit measurements.</p>
              
              <div className="overflow-x-auto border border-slate-100 rounded-none">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[#0a1128] font-semibold text-xs uppercase tracking-wider">
                      <th className="px-4 py-3">Size</th>
                      <th className="px-4 py-3">Chest</th>
                      <th className="px-4 py-3">Waist</th>
                      <th className="px-4 py-3">Sleeve</th>
                      <th className="px-4 py-3">Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                    {[
                      { size: 'XS', chest: '34-36', waist: '28-30', sleeve: '24.5', length: '27.5' },
                      { size: 'S', chest: '36-38', waist: '30-32', sleeve: '25.0', length: '28.0' },
                      { size: 'M', chest: '38-40', waist: '32-34', sleeve: '25.5', length: '28.5' },
                      { size: 'L', chest: '40-42', waist: '34-36', sleeve: '26.0', length: '29.0' },
                      { size: 'XL', chest: '42-44', waist: '36-38', sleeve: '26.5', length: '29.5' },
                      { size: 'XXL', chest: '44-46', waist: '38-40', sleeve: '27.0', length: '30.0' },
                    ].map(row => (
                      <tr key={row.size} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-bold text-[#0a1128]">{row.size}</td>
                        <td className="px-4 py-3">{row.chest}</td>
                        <td className="px-4 py-3">{row.waist}</td>
                        <td className="px-4 py-3">{row.sleeve}</td>
                        <td className="px-4 py-3">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-gold-50/50 border border-gold-100 rounded-none flex gap-3">
                <Info size={16} className="text-[#b3913b] shrink-0 mt-0.5" />
                <p className="text-[11px] text-gold-800 leading-normal font-medium">
                  <strong>Tip:</strong> If your measurements fall between sizes, select the larger size for a relaxed uniform fit. We also provide bespoke custom measurements for bulk orders.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
