import { Search, X, SlidersHorizontal } from 'lucide-react'

export default function FilterPanel({ categories, filters, onChange, onClear }) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-navy-700" />
            <h3 className="text-sm font-semibold text-navy-900">Filters</h3>
          </div>
          {(filters.search || filters.category) && (
            <button
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
            >
              <X size={12} />
              Clear all
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-5">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-2">Search</label>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="filter-search"
              type="text"
              value={filters.search || ''}
              onChange={e => onChange({ ...filters, search: e.target.value })}
              placeholder="Search products…"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-2">Category</label>
          <div className="space-y-1.5">
            <button
              onClick={() => onChange({ ...filters, category: null })}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                !filters.category ? 'bg-navy-700 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onChange({ ...filters, category: cat.id })}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  filters.category === cat.id ? 'bg-navy-700 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
