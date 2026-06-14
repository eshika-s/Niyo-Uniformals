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
      <main className="min-h-screen pt-24 bg-obsidian-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="h-[500px] bg-obsidian-100 rounded-3xl animate-pulse" />
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-obsidian-100 rounded-xl animate-pulse" />)}
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
      <div className="prose prose-sm max-w-none text-obsidian-600 leading-relaxed text-left font-light">
        {product.description
          ? <p>{product.description}</p>
          : <p className="text-obsidian-400 italic">No description provided for this product.</p>
        }
      </div>
    ),
    specifications: (
      <div className="space-y-4 text-left">
        {[
          { label: 'Fabric / Material', value: product.fabric },
          { label: 'Available Colors', value: product.colors?.join(', ') },
          { label: 'Category', value: product.categories?.name },
          { label: 'Price Range', value: product.price_range },
          { label: 'Min. Order Qty', value: product.min_order_qty ? `${product.min_order_qty} pieces` : null },
          { label: 'Customization', value: product.customization_available ? 'Available (Embroidery, printing, custom labels)' : 'Not Available' },
        ].filter(r => r.value).map(row => (
          <div key={row.label} className="flex items-start gap-4 py-3 border-b border-obsidian-100 last:border-0">
            <span className="text-xs font-bold text-obsidian-400 uppercase tracking-widest w-36 shrink-0 pt-0.5">{row.label}</span>
            <span className="text-sm text-obsidian-900 font-semibold">{row.value}</span>
          </div>
        ))}
      </div>
    ),
    delivery: (
      <div className="space-y-4 text-sm text-obsidian-600 text-left">
        <div className="flex items-start gap-4 p-5 bg-obsidian-50 rounded-2xl border border-obsidian-200 shadow-sm">
          <Truck size={20} className="text-electric-500 shrink-0" />
          <div>
            <p className="font-bold text-obsidian-900 mb-1">Est. Delivery Timeline</p>
            <p className="leading-relaxed text-obsidian-500 font-light">
              Bulk manufacturing & shipping: {product.delivery_timeline || '7-10 working days'}. Pan-India express logistics enabled.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-5 bg-obsidian-50 rounded-2xl border border-obsidian-200 shadow-sm">
          <Shirt size={20} className="text-electric-500 shrink-0" />
          <div>
            <p className="font-bold text-obsidian-900 mb-1">Care Instructions</p>
            <p className="leading-relaxed text-obsidian-500 font-light">
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
    <main className="min-h-screen bg-obsidian-50 pt-28 pb-20">
      <title>{product.name} — NIYO Uni-formals</title>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-obsidian-500 hover:text-electric-600 transition-colors mb-8 group bg-white px-4 py-2 rounded-full border border-obsidian-200 shadow-sm w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Catalogue
        </button>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 mb-24">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="sticky top-32">
              <ImageGallery images={product.images || []} productName={product.name} />
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="space-y-8 text-left"
          >
            {/* Category badge & Customization badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap items-center gap-3"
            >
              {product.categories && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-electric-50 border border-electric-200 rounded-lg">
                  <Tag size={12} className="text-electric-600" />
                  <span className="text-[10px] font-bold text-electric-700 uppercase tracking-widest">{product.categories.name}</span>
                </div>
              )}
              {product.customization_available && (
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-lg uppercase tracking-widest shadow-sm">
                  🎨 Customization Available
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-obsidian-900 leading-tight tracking-tight"
            >
              {product.name}
            </motion.h1>

            {/* Pricing cards */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap gap-4"
            >
              {product.price_range && (
                <div className="px-6 py-4 bg-white rounded-2xl border border-obsidian-200 shadow-sm flex-1 min-w-[150px]">
                  <p className="text-[10px] text-obsidian-400 font-bold uppercase tracking-widest mb-1">Price Range</p>
                  <p className="text-2xl font-price font-bold text-obsidian-900">{product.price_range}</p>
                </div>
              )}
              {product.min_order_qty && (
                <div className="px-6 py-4 bg-electric-50 rounded-2xl border border-electric-200 shadow-sm flex-1 min-w-[150px]">
                  <p className="text-[10px] text-electric-600 font-bold uppercase tracking-widest mb-1">Min. Order Qty</p>
                  <p className="text-2xl font-display font-bold text-electric-700">{product.min_order_qty} <span className="text-base font-medium">pcs</span></p>
                </div>
              )}
            </motion.div>

            {/* Color Swatch Selection */}
            {product.colors?.length > 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="space-y-3 bg-white p-6 rounded-2xl border border-obsidian-200 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-obsidian-400 uppercase tracking-widest">Select Color</p>
                  {selectedColor && (
                    <p className="text-xs font-semibold text-obsidian-500">Selected: <span className="text-obsidian-900 font-bold">{selectedColor}</span></p>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => {
                    const hex = colorMap[color.toLowerCase()] || '#94a3b8'
                    const isSelected = selectedColor === color
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative flex items-center justify-center p-1 rounded-full border-2 transition-all duration-300 ${
                          isSelected ? 'border-electric-500 scale-110 shadow-md' : 'border-transparent hover:border-obsidian-300 hover:scale-105'
                        }`}
                        title={color}
                      >
                        <span
                          className="w-8 h-8 rounded-full shadow-inner border border-obsidian-200 flex items-center justify-center shrink-0"
                          style={{ backgroundColor: hex }}
                        >
                          {isSelected && (
                            <span className={`w-2 h-2 rounded-full ${color.toLowerCase() === 'white' ? 'bg-obsidian-900' : 'bg-white'}`} />
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Size Chart & Selection */}
            {product.sizes?.length > 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="space-y-3 bg-white p-6 rounded-2xl border border-obsidian-200 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-obsidian-400 uppercase tracking-widest">Select Size</p>
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="text-xs font-bold text-electric-600 hover:text-electric-500 underline flex items-center gap-1"
                  >
                    View Size Chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => {
                    const isSelected = selectedSize === size
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 text-sm font-bold rounded-xl transition-all duration-200 ${
                          isSelected
                            ? 'bg-obsidian-900 text-white shadow-lg shadow-obsidian-900/20 scale-105'
                            : 'bg-obsidian-50 border border-obsidian-200 text-obsidian-700 hover:bg-white hover:border-obsidian-400 hover:shadow-sm'
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
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              <button
                onClick={() => document.getElementById('product-enquiry-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 bg-obsidian-900 hover:bg-electric-600 text-white font-bold rounded-xl transition-all duration-300 active:scale-[0.98] shadow-lg shadow-obsidian-900/20 flex items-center justify-center gap-2 hover:-translate-y-1"
              >
                <MessageCircle size={18} />
                Request Custom Quote
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all duration-300 active:scale-[0.98] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-1"
              >
                <MessageCircle size={18} />
                Order on WhatsApp
              </a>
            </motion.div>

            {/* Tabbed spec panel */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white border border-obsidian-200 rounded-2xl overflow-hidden shadow-sm mt-8"
            >
              {/* Tab headers */}
              <div className="flex border-b border-obsidian-100">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-electric-600 border-b-2 border-electric-500 bg-electric-50/50'
                        : 'text-obsidian-400 hover:text-obsidian-700 hover:bg-obsidian-50'
                    }`}
                  >
                    <tab.icon size={14} />
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 md:p-8"
                >
                  {tabContent[activeTab]}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Enquiry Form */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              id="product-enquiry-section"
              className="pt-8"
            >
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-obsidian-200 shadow-sm">
                <h3 className="text-xl font-display font-bold text-obsidian-900 mb-6">Enquire about this product</h3>
                <EnquiryForm product={product} />
              </div>
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
            className="pt-20 border-t border-obsidian-200"
          >
            <div className="flex items-end justify-between mb-10">
              <div className="text-left">
                <p className="text-electric-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">You May Also Like</p>
                <h2 className="text-3xl font-display font-bold text-obsidian-900">Related Products</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-900/60 backdrop-blur-md"
            onClick={() => setShowSizeChart(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-obsidian-200 text-left relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSizeChart(false)}
                className="absolute top-6 right-6 text-obsidian-400 hover:text-obsidian-900 hover:bg-obsidian-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold text-obsidian-900 mb-2">Standard Size Chart</h3>
                <p className="text-obsidian-500 text-sm font-light">All measurements are in inches. Standard body fit measurements.</p>
              </div>
              
              <div className="overflow-x-auto rounded-xl border border-obsidian-200">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-obsidian-50 border-b border-obsidian-200 text-obsidian-900 font-bold text-xs uppercase tracking-widest">
                      <th className="px-6 py-4">Size</th>
                      <th className="px-6 py-4">Chest</th>
                      <th className="px-6 py-4">Waist</th>
                      <th className="px-6 py-4">Sleeve</th>
                      <th className="px-6 py-4">Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-obsidian-100 text-obsidian-600">
                    {[
                      { size: 'XS', chest: '34-36', waist: '28-30', sleeve: '24.5', length: '27.5' },
                      { size: 'S', chest: '36-38', waist: '30-32', sleeve: '25.0', length: '28.0' },
                      { size: 'M', chest: '38-40', waist: '32-34', sleeve: '25.5', length: '28.5' },
                      { size: 'L', chest: '40-42', waist: '34-36', sleeve: '26.0', length: '29.0' },
                      { size: 'XL', chest: '42-44', waist: '36-38', sleeve: '26.5', length: '29.5' },
                      { size: 'XXL', chest: '44-46', waist: '38-40', sleeve: '27.0', length: '30.0' },
                    ].map(row => (
                      <tr key={row.size} className="hover:bg-electric-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-obsidian-900">{row.size}</td>
                        <td className="px-6 py-4">{row.chest}</td>
                        <td className="px-6 py-4">{row.waist}</td>
                        <td className="px-6 py-4">{row.sleeve}</td>
                        <td className="px-6 py-4">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 p-5 bg-electric-50 border border-electric-200 rounded-xl flex gap-4">
                <Info size={20} className="text-electric-500 shrink-0" />
                <p className="text-sm text-electric-900 leading-relaxed font-light">
                  <strong className="font-semibold">Tip:</strong> If your measurements fall between sizes, select the larger size for a relaxed uniform fit. We also provide bespoke custom measurements for bulk orders over 100 units.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
