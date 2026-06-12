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
    bgClass: 'bg-[#0a1128]',
    titleColor: 'text-white',
    textColor: 'text-[#94a3b8]'
  }

  switch (categoryId) {
    case 'cat-medical':
      return { ...baseBanner, title: 'Healthcare & Hospital', desc: 'Professional scrubs, lab coats, and staff wear crafted for hygiene, flexibility, and daily durability.' }
    case 'cat-school':
      return { ...baseBanner, title: 'Education & PE', desc: 'Comfortable, long-lasting, and smart school shirts, trousers, skirts, blazers, and PE tracks.' }
    case 'cat-hospitality':
      return { ...baseBanner, title: 'Hotel & Hospitality', desc: 'Premium chef coats, waiter uniforms, aprons, and hospitality front-desk wear.' }
    case 'cat-corporate':
      return { ...baseBanner, title: 'Corporate & Executive', desc: 'Tailored suits, blazers, shirts, and trousers designed for a modern professional corporate identity.' }
    case 'cat-industrial':
      return { ...baseBanner, title: 'Industrial Workwear', desc: 'Heavy-duty coveralls, safety shirts, and boiler suits engineered for safety and durability.' }
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
    <main className="min-h-screen bg-stone-50 pt-[72px]">
      <title>Catalogue — NIYO Uni-formals</title>

      {/* Category Header Banner Strip */}
      <div className={`w-full py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-300 ${banner.bgClass}`}>
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <motion.div
            key={filters.category || 'all'}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 tracking-tight ${banner.titleColor}`}>
              {banner.title}
            </h1>
            <p className={`text-sm sm:text-base leading-relaxed ${banner.textColor}`}>
              {banner.desc}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="shrink-0"
          >
            {filters.category ? (
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl">
                Premium Identity
              </span>
            ) : (
              <span className="px-4 py-2 bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider rounded-xl">
                Shakti Dresses
              </span>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active filter chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Active Filters:</span>
            {filters.search && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-50 border border-navy-100 text-navy-700 text-xs font-semibold rounded-full">
                Search: "{filters.search}"
                <button onClick={() => { setFilters(f => ({ ...f, search: '' })); setPage(1) }}>
                  <X size={11} className="text-navy-500 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-50 border border-gold-200 text-gold-700 text-xs font-semibold rounded-full">
                Category: {categories.find(c => c.id === filters.category)?.name || 'Filtered'}
                <button onClick={() => { setFilters(f => ({ ...f, category: null })); setPage(1) }}>
                  <X size={11} className="text-gold-600 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
            {filters.gender && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-full">
                Gender: {filters.gender}
                <button onClick={() => { setFilters(f => ({ ...f, gender: null })); setPage(1) }}>
                  <X size={11} className="text-blue-500 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
            {filters.fabric_type && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold rounded-full">
                Fabric: {filters.fabric_type}
                <button onClick={() => { setFilters(f => ({ ...f, fabric_type: null })); setPage(1) }}>
                  <X size={11} className="text-purple-500 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
            {(filters.customization === 'true' || filters.customization === true) && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full">
                Customization Available
                <button onClick={() => { setFilters(f => ({ ...f, customization: null })); setPage(1) }}>
                  <X size={11} className="text-emerald-500 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
            {filters.max_price && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-full">
                Max Price: ₹{filters.max_price}
                <button onClick={() => { setFilters(f => ({ ...f, max_price: null })); setPage(1) }}>
                  <X size={11} className="text-amber-500 hover:text-red-500 transition-colors" />
                </button>
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
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
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                {loading ? 'Loading…' : (
                  <span>
                    <span className="font-semibold text-navy-900">{count}</span>
                    {' '}product{count !== 1 ? 's' : ''} found
                  </span>
                )}
              </p>
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <SlidersHorizontal size={11} />
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-slate-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2.5 rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                          page === i + 1
                            ? 'bg-navy-800 text-white shadow-md shadow-navy-900/20'
                            : 'border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2.5 rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-24 border border-dashed border-slate-200 rounded-3xl"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                >
                  <Package size={56} className="text-slate-200 mx-auto mb-4" />
                </motion.div>
                <h3 className="font-display font-semibold text-slate-500 mb-1">No products found</h3>
                <p className="text-sm text-slate-400 mb-4">Try adjusting your search or filters</p>
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters}
                    className="text-xs font-semibold text-gold-600 hover:underline">
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
