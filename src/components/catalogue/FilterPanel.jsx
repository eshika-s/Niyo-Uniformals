import { Search, X, SlidersHorizontal, ChevronRight } from 'lucide-react'

export default function FilterPanel({ categories, filters, onChange, onClear }) {
  const hasFilters =
    filters.search ||
    filters.category ||
    filters.gender ||
    filters.fabric_type ||
    (filters.customization !== undefined && filters.customization !== null && filters.customization !== '') ||
    filters.max_price

  const activeCount =
    (filters.search ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.gender ? 1 : 0) +
    (filters.fabric_type ? 1 : 0) +
    ((filters.customization !== undefined && filters.customization !== null && filters.customization !== '') ? 1 : 0) +
    (filters.max_price ? 1 : 0)

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-none border border-[#e2e8f0] shadow-sm overflow-hidden sticky top-24 max-h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[#0a1128]" />
            <h3 className="text-sm font-semibold text-[#0a1128] uppercase tracking-wider">Filters</h3>
            {hasFilters && (
              <span className="w-5 h-5 rounded-none bg-[#b3913b] text-[10px] font-bold text-[#0a1128] flex items-center justify-center animate-pulse">
                {activeCount}
              </span>
            )}
          </div>
          {hasFilters && (
            <button
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors font-medium"
            >
              <X size={11} />
              Clear
            </button>
          )}
        </div>

        {/* Scrollable Filters */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {/* Search */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Search</label>
            <div className="relative">
              <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="filter-search"
                type="text"
                value={filters.search || ''}
                onChange={e => onChange({ ...filters, search: e.target.value })}
                placeholder="Search products…"
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-stone-50 border border-[#e2e8f0] rounded-none focus:outline-none focus:ring-1 focus:ring-[#0a1128] focus:border-[#0a1128] focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Gender</label>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Men', 'Women', 'Unisex', 'Kids'].map(g => {
                const isActive = (g === 'All' && !filters.gender) || filters.gender === g
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => onChange({ ...filters, gender: g === 'All' ? null : g })}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-none border transition-all duration-200 ${
                      isActive
                        ? 'bg-[#0a1128] border-[#0a1128] text-white shadow-sm'
                        : 'bg-stone-50 border-[#e2e8f0] text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Fabric Type */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Fabric Type</label>
            <select
              value={filters.fabric_type || ''}
              onChange={e => onChange({ ...filters, fabric_type: e.target.value || null })}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-[#e2e8f0] rounded-none focus:outline-none focus:ring-1 focus:ring-[#0a1128] focus:border-[#0a1128] focus:bg-white transition-all duration-200 cursor-pointer text-slate-700 font-medium"
            >
              <option value="">All Fabrics</option>
              <option value="Cotton">Cotton</option>
              <option value="Poly-Cotton">Poly-Cotton</option>
              <option value="Polyester">Polyester</option>
              <option value="Wool">Wool / Wool Blend</option>
              <option value="Twill">Twill</option>
              <option value="Viscose">Viscose</option>
            </select>
          </div>

          {/* Customization Toggle */}
          <div className="pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer select-none group/lbl">
              <input
                type="checkbox"
                checked={filters.customization === 'true' || filters.customization === true}
                onChange={e => onChange({ ...filters, customization: e.target.checked ? 'true' : null })}
                className="w-4.5 h-4.5 rounded-none border-[#e2e8f0] text-[#0a1128] focus:ring-[#0a1128] focus:ring-offset-0 focus:outline-none transition-colors cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-700 group-hover/lbl:text-[#0a1128] transition-colors">
                🎨 Customization Available
              </span>
            </label>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Max Price</label>
              <span className="text-xs font-bold text-navy-800">
                {filters.max_price ? `₹${filters.max_price}` : '₹6,000+'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="6000"
              step="200"
              value={filters.max_price || 6000}
              onChange={e => onChange({ ...filters, max_price: parseInt(e.target.value) === 6000 ? null : parseInt(e.target.value) })}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
            <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-medium">
              <span>₹0</span>
              <span>₹6,000+</span>
            </div>
          </div>

          {/* Category */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Category</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => onChange({ ...filters, category: null })}
                className={`group w-full flex items-center justify-between px-3 py-2 text-xs rounded-none transition-all duration-200 ${
                  !filters.category
                    ? 'bg-[#0a1128] text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-stone-50 hover:text-[#0a1128]'
                }`}
              >
                <span>All Categories</span>
                {!filters.category && <ChevronRight size={12} />}
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onChange({ ...filters, category: cat.id })}
                  className={`group w-full flex items-center justify-between px-3 py-2 text-xs rounded-none transition-all duration-200 ${
                    filters.category === cat.id
                      ? 'bg-[#0a1128] text-white font-semibold shadow-sm'
                      : 'text-slate-600 hover:bg-stone-50 hover:text-[#0a1128]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  {filters.category === cat.id && <ChevronRight size={12} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
