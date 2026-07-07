import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import ProductCard from '@/components/catalogue/ProductCard'
import FilterPanel from '@/components/catalogue/FilterPanel'
import QuickViewModal from '@/components/catalogue/QuickViewModal'
import { Package, ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react'
import { motion } from 'framer-motion'

const PAGE_SIZE = 12

const getCategoryBanner = (categoryId) => {
  const baseBanner = {
    bgClass: 'bg-obsidian-900 border-b border-obsidian-800',
    titleColor: 'text-white',
    textColor: 'text-obsidian-300'
  }

  switch (categoryId) {
    case '00000000-0000-0000-0000-000000000001':
      return { ...baseBanner, title: 'Healthcare & Hospital', desc: 'Professional scrubs, lab coats, and staff wear crafted for hygiene, flexibility, and daily durability.' }
    case '00000000-0000-0000-0000-000000000005':
      return { ...baseBanner, title: 'Education & PE', desc: 'Comfortable, long-lasting, and smart school shirts, trousers, skirts, blazers, and PE tracks.' }
    case '00000000-0000-0000-0000-000000000002':
      return { ...baseBanner, title: 'Hotel & Hospitality', desc: 'Premium chef coats, waiter uniforms, aprons, and hospitality front-desk wear.' }
    case '00000000-0000-0000-0000-000000000003':
      return { ...baseBanner, title: 'Corporate & Executive', desc: 'Tailored suits, blazers, shirts, and trousers designed for a modern professional corporate identity.' }
    case '00000000-0000-0000-0000-000000000008':
      return { ...baseBanner, title: 'Industrial Workwear', desc: 'Heavy-duty coveralls, safety shirts, and boiler suits engineered for safety and durability.' }
    case '00000000-0000-0000-0000-000000000004':
      return { ...baseBanner, title: 'Advocates & Legal', desc: 'Traditional legal coats, gowns, and court dress for advocates and legal professionals.' }
    case '00000000-0000-0000-0000-000000000006':
      return { ...baseBanner, title: 'Convocation Gowns', desc: 'Elegant graduation gowns, hoods, and caps for colleges and universities across India.' }
    case '00000000-0000-0000-0000-000000000007':
      return { ...baseBanner, title: 'Security & Defence', desc: 'Durable tactical uniforms, guard wear, and defence-grade clothing for security professionals.' }
    case '00000000-0000-0000-0000-000000000009':
      return { ...baseBanner, title: 'Sports & PE', desc: 'High-performance sports jerseys, tracksuits, and athletic wear for schools and clubs.' }
    default:
      return { ...baseBanner, title: 'The Complete Collection', desc: 'Browse our entire range of premium uniforms and corporate clothing identity solutions.' }
  }
}

export default function Catalogue() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || null,
    gender: null,
    fabric_type: null,
    customization: null,
    max_price: null,
  })
  const [page, setPage] = useState(1)
  const [quickView, setQuickView] = useState(null)

  const { products, count, loading } = useProducts({ ...filters, page, limit: PAGE_SIZE })
  const { categories } = useCategories()

  const totalPages = Math.ceil(count / PAGE_SIZE)
  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.gender ? 1 : 0) +
    (filters.fabric_type ? 1 : 0) +
    ((filters.customization !== undefined && filters.customization !== null && filters.customization !== '') ? 1 : 0) +
    (filters.max_price ? 1 : 0)

  // Synchronize category search param changes
  useEffect(() => {
    const cat = searchParams.get('category') || null
    const search = searchParams.get('search') || ''
    setFilters(f => ({ ...f, category: cat, search: search }))
    setPage(1)
  }, [searchParams])

  const clearFilters = () => {
    setFilters({
      search: '',
      category: null,
      gender: null,
      fabric_type: null,
      customization: null,
      max_price: null,
    })
    setPage(1)
  }

  const banner = getCategoryBanner(filters.category)

  return (
    <main className="min-h-screen bg-obsidian-50">
      <title>Catalogue — NIYO Uni-formals</title>

      {/* Category Header Banner Strip */}
      <div className={`w-full pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-300 ${banner.bgClass}`}>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-electric-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="shrink-0 mb-2"
          >
            {filters.category ? (
              <span className="px-4 py-2 glass-panel-dark text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 shadow-xl inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-400"></span> Premium Identity
              </span>
            ) : (
              <span className="px-4 py-2 glass-panel-dark text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full border border-electric-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-400"></span> All Products
              </span>
            )}
          </motion.div>

          <motion.div
            key={filters.category || 'all'}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 tracking-tight ${banner.titleColor}`}>
              {banner.title}
            </h1>
            <p className={`text-sm sm:text-base md:text-lg leading-relaxed font-light ${banner.textColor} max-w-2xl mx-auto`}>
              {banner.desc}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Active filter chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 p-5 bg-white rounded-2xl border border-obsidian-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <span className="text-xs font-bold text-obsidian-400 uppercase tracking-wider mr-2">Active Filters:</span>
            {filters.search && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-obsidian-50 border border-obsidian-200 text-obsidian-700 text-xs font-semibold rounded-full shadow-sm">
                Search: "{filters.search}"
                <button onClick={() => { setFilters(f => ({ ...f, search: '' })); setPage(1) }}>
                  <X size={11} className="text-obsidian-400 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-electric-50 border border-electric-200 text-electric-700 text-xs font-semibold rounded-full shadow-sm">
                Category: {categories.find(c => c.id === filters.category)?.name || 'Filtered'}
                <button onClick={() => { setFilters(f => ({ ...f, category: null })); setPage(1) }}>
                  <X size={11} className="text-electric-600 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
            {filters.gender && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-electric-50 border border-electric-200 text-electric-700 text-xs font-semibold rounded-full shadow-sm">
                Gender: {filters.gender}
                <button onClick={() => { setFilters(f => ({ ...f, gender: null })); setPage(1) }}>
                  <X size={11} className="text-electric-500 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
            {filters.fabric_type && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-neon-50 border border-neon-200 text-neon-700 text-xs font-semibold rounded-full shadow-sm">
                Fabric: {filters.fabric_type}
                <button onClick={() => { setFilters(f => ({ ...f, fabric_type: null })); setPage(1) }}>
                  <X size={11} className="text-neon-500 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
            {(filters.customization === 'true' || filters.customization === true) && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full shadow-sm">
                Customization Available
                <button onClick={() => { setFilters(f => ({ ...f, customization: null })); setPage(1) }}>
                  <X size={11} className="text-emerald-500 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
            {filters.max_price && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-obsidian-100 border border-obsidian-200 text-obsidian-700 text-xs font-semibold rounded-full shadow-sm">
                Max Price: ₹{filters.max_price}
                <button onClick={() => { setFilters(f => ({ ...f, max_price: null })); setPage(1) }}>
                  <X size={11} className="text-obsidian-500 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters */}
          <FilterPanel
            categories={categories}
            filters={filters}
            onChange={f => { setFilters(f); setPage(1) }}
            onClear={clearFilters}
          />

          {/* Products */}
          <div className="flex-1">
            {/* Result count */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-obsidian-200">
              <p className="text-sm font-medium text-obsidian-500">
                {loading ? 'Loading…' : (
                  <span>
                    <span className="font-bold text-obsidian-900">{count}</span>
                    {' '}product{count !== 1 ? 's' : ''}
                  </span>
                )}
              </p>
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-obsidian-400 bg-white px-3 py-1.5 rounded-lg border border-obsidian-200 shadow-sm">
                  <SlidersHorizontal size={12} />
                  {activeFiltersCount} active
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[400px] bg-obsidian-100 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {products.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
                    >
                      <ProductCard product={product} onQuickView={setQuickView} layout="horizontal" />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-16">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-3 rounded-xl border border-obsidian-200 disabled:opacity-40 hover:bg-white hover:border-obsidian-300 transition-all text-obsidian-600 shadow-sm hover:shadow-md"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-12 h-12 rounded-xl text-sm font-bold transition-all shadow-sm ${page === i + 1
                            ? 'bg-electric-500 text-white shadow-electric-500/30'
                            : 'border border-obsidian-200 text-obsidian-600 hover:bg-white hover:border-obsidian-300 hover:shadow-md'
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-3 rounded-xl border border-obsidian-200 disabled:opacity-40 hover:bg-white hover:border-obsidian-300 transition-all text-obsidian-600 shadow-sm hover:shadow-md"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-32 bg-white border border-dashed border-obsidian-300 rounded-[2rem] shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                >
                  <Package size={64} className="text-obsidian-200 mx-auto mb-6" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-obsidian-900 mb-2">No products found</h3>
                <p className="text-base text-obsidian-500 mb-6 font-light">Try adjusting your search or filters to find what you're looking for.</p>
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters}
                    className="px-6 py-2.5 bg-obsidian-100 hover:bg-obsidian-200 text-obsidian-900 font-semibold rounded-xl transition-colors">
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </main>
  )
}
