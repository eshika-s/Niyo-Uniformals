import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import ProductCard from '@/components/catalogue/ProductCard'
import FilterPanel from '@/components/catalogue/FilterPanel'
import QuickViewModal from '@/components/catalogue/QuickViewModal'
import { Package, ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 12

export default function Catalogue() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || null,
  })
  const [page, setPage] = useState(1)
  const [quickView, setQuickView] = useState(null)

  const { products, count, loading } = useProducts({ ...filters, page, limit: PAGE_SIZE })
  const { categories } = useCategories()

  const totalPages = Math.ceil(count / PAGE_SIZE)

  const clearFilters = () => { setFilters({ search: '', category: null }); setPage(1) }

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <title>Catalogue — Niyo Uniformals</title>

      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-1">Our Catalogue</h1>
          <p className="text-slate-500">Browse our complete range of premium uniforms</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <p className="text-sm text-slate-500 mb-5">
              {loading ? 'Loading…' : `${count} product${count !== 1 ? 's' : ''} found`}
            </p>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-slate-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setQuickView}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                          page === i + 1 ? 'bg-navy-700 text-white' : 'border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <Package size={56} className="text-slate-200 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-500 mb-1">No products found</h3>
                <p className="text-sm text-slate-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </main>
  )
}
