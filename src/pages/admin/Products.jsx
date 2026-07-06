import { useState, useEffect, useMemo } from 'react'
import {
  Plus, Pencil, Trash2, Star, StarOff, Loader2, Package,
  X, Upload, Eye, EyeOff, Search, Filter, ChevronUp, ChevronDown,
  Grid2x2, List, CheckSquare, Square, Minus, LayoutGrid
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '@/components/layout/AdminLayout'
import { productService } from '@/services/productService'
import { useCategories } from '@/hooks/useCategories'
import toast from 'react-hot-toast'

// ─── Product Form Modal ────────────────────────────────────────────────────────
function ProductForm({ product, categories, onSave, onClose }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category_id: product?.category_id || '',
    fabric: product?.fabric || '',
    price_range: product?.price_range || '',
    min_order_qty: product?.min_order_qty || '',
    colors: product?.colors || '',
    tags: product?.tags || '',
    is_featured: product?.is_featured || false,
    is_visible: product?.is_visible ?? true,
    images: product?.images || [],
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleImageUpload = async e => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    try {
      const id = product?.id || `temp-${Date.now()}`
      const urls = await Promise.all(files.map(f => productService.uploadImage(f, id)))
      setForm(p => ({ ...p, images: [...p.images, ...urls] }))
      toast.success(`${urls.length} image${urls.length > 1 ? 's' : ''} uploaded`)
    } catch {
      toast.error('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = url => setForm(p => ({ ...p, images: p.images.filter(i => i !== url) }))
  const moveImage = (idx, dir) => {
    const imgs = [...form.images]
    const swap = idx + dir
    if (swap < 0 || swap >= imgs.length) return
    ;[imgs[idx], imgs[swap]] = [imgs[swap], imgs[idx]]
    setForm(p => ({ ...p, images: imgs }))
  }

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error('Product name is required')
    setSaving(true)
    try {
      const data = { ...form, min_order_qty: form.min_order_qty ? parseInt(form.min_order_qty) : null }
      if (product) await productService.update(product.id, data)
      else await productService.create(data)
      toast.success(product ? 'Product updated!' : 'Product created!')
      onSave()
    } catch { toast.error('Failed to save product') }
    finally { setSaving(false) }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-display font-bold text-navy-900">{product ? 'Edit Product' : 'Add New Product'}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{product ? 'Update the details below' : 'Fill in product information'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><X size={16} /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Product Name *</label>
            <input type="text" value={form.name} onChange={set('name')} placeholder="e.g. School Winter Uniform Set"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all" />
          </div>

          {/* Category & Fabric */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Category</label>
              <select value={form.category_id} onChange={set('category_id')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white transition-all">
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Fabric</label>
              <input type="text" value={form.fabric} onChange={set('fabric')} placeholder="e.g. Cotton-Polyester Blend"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all" />
            </div>
          </div>

          {/* Price Range & MOQ */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Price Range</label>
              <input type="text" value={form.price_range} onChange={set('price_range')} placeholder="e.g. ₹250 – ₹450"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Min. Order Qty</label>
              <input type="number" value={form.min_order_qty} onChange={set('min_order_qty')} placeholder="50"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all" />
            </div>
          </div>

          {/* Colors & Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Available Colors</label>
              <input type="text" value={form.colors} onChange={set('colors')} placeholder="Navy, White, Grey"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Tags</label>
              <input type="text" value={form.tags} onChange={set('tags')} placeholder="school, winter, blazer"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Description</label>
            <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Detailed product description…"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none transition-all" />
          </div>

          {/* Toggles */}
          <div className="flex gap-6 bg-slate-50 rounded-xl p-4">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div className={`relative w-10 h-5 rounded-full transition-colors ${form.is_featured ? 'bg-gold-500' : 'bg-slate-300'}`}
                onClick={() => setForm(p => ({ ...p, is_featured: !p.is_featured }))}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.is_featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-slate-700 font-medium">Featured on homepage</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div className={`relative w-10 h-5 rounded-full transition-colors ${form.is_visible ? 'bg-navy-600' : 'bg-slate-300'}`}
                onClick={() => setForm(p => ({ ...p, is_visible: !p.is_visible }))}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.is_visible ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-slate-700 font-medium">Visible in catalogue</span>
            </label>
          </div>

          {/* Images */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Product Images <span className="text-slate-400 font-normal normal-case">(first image is the cover)</span>
            </label>
            <div className="flex gap-3 flex-wrap">
              {form.images.map((url, idx) => (
                <div key={url} className="relative group">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </div>
                  {/* Remove */}
                  <button onClick={() => removeImage(url)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                    <X size={10} className="text-white" />
                  </button>
                  {/* Reorder arrows */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {idx > 0 && (
                      <button onClick={() => moveImage(idx, -1)}
                        className="w-5 h-5 bg-navy-700/80 rounded flex items-center justify-center">
                        <ChevronUp size={10} className="text-white" />
                      </button>
                    )}
                    {idx < form.images.length - 1 && (
                      <button onClick={() => moveImage(idx, 1)}
                        className="w-5 h-5 bg-navy-700/80 rounded flex items-center justify-center">
                        <ChevronDown size={10} className="text-white" />
                      </button>
                    )}
                  </div>
                  {idx === 0 && (
                    <span className="absolute top-1 left-1 text-[9px] bg-gold-500 text-white font-bold px-1 rounded">COVER</span>
                  )}
                </div>
              ))}
              <label className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-navy-400 hover:bg-navy-50/40 transition-all gap-1">
                {uploading ? <Loader2 size={18} className="animate-spin text-slate-400" /> : <Upload size={18} className="text-slate-400" />}
                <span className="text-[9px] text-slate-400 font-medium">Add Image</span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <p className="text-xs text-slate-400 mt-2">You can upload multiple images at once. Hover to reorder.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white">
          <button onClick={onClose} className="px-5 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-7 py-2 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-60">
            {saving && <Loader2 size={13} className="animate-spin" />}
            {saving ? 'Saving…' : product ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Products Page ────────────────────────────────────────────────────────
export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [view, setView] = useState('table') // 'table' | 'grid'
  const [selected, setSelected] = useState(new Set()) // Set of product IDs
  const [bulkLoading, setBulkLoading] = useState(false)
  const { categories } = useCategories()

  const load = async () => {
    setLoading(true)
    const { data } = await productService.getAll({ limit: 200, showHidden: true })
    setProducts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async id => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    await productService.delete(id)
    toast.success('Product deleted')
    load()
  }

  const toggleFeatured = async (id, val) => {
    await productService.update(id, { is_featured: !val })
    toast.success(!val ? 'Marked as featured' : 'Removed from featured')
    load()
  }

  const toggleVisible = async (id, val) => {
    await productService.update(id, { is_visible: !val })
    toast.success(!val ? 'Product is now visible' : 'Product hidden from catalogue')
    load()
  }

  // Client-side search + filter
  const filtered = useMemo(() => {
    let list = products
    if (search.trim()) {
      const s = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(s) || p.categories?.name?.toLowerCase().includes(s))
    }
    if (catFilter) list = list.filter(p => p.category_id === catFilter || p.categories?.id === catFilter)
    return list
  }, [products, search, catFilter])

  // ─── Bulk operations ──────────────────────────────────────────────────────
  const allIds = filtered.map(p => p.id)
  const allSelected = allIds.length > 0 && allIds.every(id => selected.has(id))
  const someSelected = allIds.some(id => selected.has(id)) && !allSelected

  const toggleSelect = (id) => setSelected(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const toggleSelectAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(allIds))
  }

  const clearSelection = () => setSelected(new Set())

  const bulkOp = async (op) => {
    if (!selected.size) return
    setBulkLoading(true)
    try {
      const ids = [...selected]
      if (op === 'delete') {
        if (!confirm(`Delete ${ids.length} products? This cannot be undone.`)) return setBulkLoading(false)
        await Promise.all(ids.map(id => productService.delete(id)))
        toast.success(`${ids.length} products deleted`)
      } else if (op === 'hide') {
        await Promise.all(ids.map(id => productService.update(id, { is_visible: false })))
        toast.success(`${ids.length} products hidden`)
      } else if (op === 'show') {
        await Promise.all(ids.map(id => productService.update(id, { is_visible: true })))
        toast.success(`${ids.length} products made visible`)
      } else if (op === 'feature') {
        await Promise.all(ids.map(id => productService.update(id, { is_featured: true })))
        toast.success(`${ids.length} products featured`)
      } else if (op === 'unfeature') {
        await Promise.all(ids.map(id => productService.update(id, { is_featured: false })))
        toast.success(`${ids.length} products unfeatured`)
      }
      clearSelection()
      load()
    } catch { toast.error('Bulk operation failed') }
    finally { setBulkLoading(false) }
  }

  const addBtn = (
    <div className="flex items-center gap-2">
      {/* View toggle */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
        <button
          onClick={() => setView('table')}
          className={`p-2 rounded-lg transition-colors ${view === 'table' ? 'bg-navy-700 text-white' : 'text-slate-400 hover:text-navy-700'}`}
          title="Table view"
        >
          <List size={15} />
        </button>
        <button
          onClick={() => setView('grid')}
          className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-navy-700 text-white' : 'text-slate-400 hover:text-navy-700'}`}
          title="Grid view"
        >
          <LayoutGrid size={15} />
        </button>
      </div>
      <motion.button
        id="admin-add-product-btn"
        onClick={() => { setEditing(null); setShowForm(true) }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors"
      >
        <Plus size={16} /> Add Product
      </motion.button>
    </div>
  )

  return (
    <AdminLayout
      title="Products"
      subtitle={`${products.length} products total`}
      actions={addBtn}
    >
      <title>Products — Niyo Admin</title>

      {/* Search + Filter bar */}
      <motion.div 
        className="flex flex-wrap gap-3 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative flex-1 min-w-52">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        {(search || catFilter) && (
          <button
            onClick={() => { setSearch(''); setCatFilter('') }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <X size={12} /> Clear
          </button>
        )}
      </motion.div>

      {/* Bulk Action Bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-navy-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10"
          >
            {bulkLoading && <Loader2 size={15} className="animate-spin text-gold-400" />}
            <span className="text-sm font-semibold">{selected.size} selected</span>
            <div className="w-px h-5 bg-white/20" />
            <button onClick={() => bulkOp('show')} className="text-xs font-medium px-3 py-1.5 bg-white/10 hover:bg-emerald-500/30 rounded-lg transition-colors flex items-center gap-1.5">
              <Eye size={12} /> Show
            </button>
            <button onClick={() => bulkOp('hide')} className="text-xs font-medium px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1.5">
              <EyeOff size={12} /> Hide
            </button>
            <button onClick={() => bulkOp('feature')} className="text-xs font-medium px-3 py-1.5 bg-white/10 hover:bg-gold-500/30 rounded-lg transition-colors flex items-center gap-1.5">
              <Star size={12} /> Feature
            </button>
            <button onClick={() => bulkOp('unfeature')} className="text-xs font-medium px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1.5">
              <StarOff size={12} /> Unfeature
            </button>
            <div className="w-px h-5 bg-white/20" />
            <button onClick={() => bulkOp('delete')} className="text-xs font-medium px-3 py-1.5 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors flex items-center gap-1.5 text-red-300">
              <Trash2 size={12} /> Delete
            </button>
            <button onClick={clearSelection} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400">
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table / Grid */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-white rounded-2xl animate-pulse border border-slate-100" />)}
        </div>
      ) : view === 'grid' ? (
        /* ── Grid View ── */
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence initial={false}>
            {filtered.map(p => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden group transition-all hover:shadow-md ${
                  selected.has(p.id) ? 'border-navy-400 ring-2 ring-navy-200' : 'border-slate-100'
                } ${!p.is_visible ? 'opacity-50' : ''}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-slate-100">
                  {p.images?.[0]
                    ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    : <Package size={32} className="text-slate-200 absolute inset-0 m-auto" />
                  }
                  {/* Select checkbox */}
                  <button
                    onClick={() => toggleSelect(p.id)}
                    className="absolute top-2 left-2 p-0.5 rounded-lg bg-white/90 shadow"
                  >
                    {selected.has(p.id)
                      ? <CheckSquare size={16} className="text-navy-700" />
                      : <Square size={16} className="text-slate-300" />
                    }
                  </button>
                  {p.is_featured && (
                    <span className="absolute top-2 right-2 p-1 bg-gold-500 rounded-lg">
                      <Star size={12} className="text-white" fill="currentColor" />
                    </span>
                  )}
                </div>
                {/* Content */}
                <div className="p-3">
                  <p className="text-sm font-semibold text-navy-900 line-clamp-1">{p.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.categories?.name || '—'}</p>
                  {p.price_range && <p className="text-xs text-slate-500 mt-1 font-medium">{p.price_range}</p>}
                </div>
                {/* Actions */}
                <div className="flex items-center justify-between px-3 pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleFeatured(p.id, p.is_featured)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                      {p.is_featured ? <Star size={13} className="text-gold-500" fill="currentColor" /> : <StarOff size={13} className="text-slate-300" />}
                    </button>
                    <button onClick={() => toggleVisible(p.id, p.is_visible)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                      {p.is_visible ? <Eye size={13} className="text-emerald-500" /> : <EyeOff size={13} className="text-slate-300" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => { setEditing(p); setShowForm(true) }} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-navy-700">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">{search || catFilter ? 'No products match your filters' : 'No products yet'}</p>
            </div>
          )}
        </motion.div>
      ) : (
        /* ── Table View ── */
        <motion.div 
          className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {/* Select all checkbox */}
                <th className="px-4 py-3 w-10">
                  <button onClick={toggleSelectAll} className="p-0.5">
                    {allSelected
                      ? <CheckSquare size={16} className="text-navy-700" />
                      : someSelected
                        ? <Minus size={16} className="text-navy-400" />
                        : <Square size={16} className="text-slate-300" />
                    }
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Price</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Featured</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Visible</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence initial={false}>
                {filtered.map(p => (
                  <motion.tr 
                    key={p.id}
                    layoutId={`product-row-${p.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`hover:bg-slate-50/50 transition-colors ${!p.is_visible ? 'opacity-50' : ''} ${
                      selected.has(p.id) ? 'bg-navy-50/60' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4 w-10">
                      <button onClick={() => toggleSelect(p.id)} className="p-0.5">
                        {selected.has(p.id)
                          ? <CheckSquare size={15} className="text-navy-700" />
                          : <Square size={15} className="text-slate-300" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          {p.images?.[0]
                            ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                            : <Package size={16} className="text-slate-300 m-auto mt-3" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-navy-900 line-clamp-1">{p.name}</p>
                          {p.images?.length > 0 ? (
                            <p className="text-xs text-slate-400 mt-0.5">{p.images.length} image{p.images.length !== 1 ? 's' : ''}</p>
                          ) : (
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded border border-red-100">
                              Missing Image
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-500 hidden md:table-cell">
                      <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium">
                        {p.categories?.name || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600 hidden lg:table-cell text-xs font-medium">{p.price_range || '—'}</td>
                    <td className="px-4 py-4 text-center">
                      <button onClick={() => toggleFeatured(p.id, p.is_featured)}
                        title={p.is_featured ? 'Remove from featured' : 'Mark as featured'}
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                        {p.is_featured
                          ? <Star size={16} className="text-gold-500" fill="currentColor" />
                          : <StarOff size={16} className="text-slate-300" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button onClick={() => toggleVisible(p.id, p.is_visible)}
                        title={p.is_visible ? 'Hide from catalogue' : 'Show in catalogue'}
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                        {p.is_visible
                          ? <Eye size={16} className="text-emerald-500" />
                          : <EyeOff size={16} className="text-slate-300" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => { setEditing(p); setShowForm(true) }}
                          title="Edit product"
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-navy-700">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(p.id)}
                          title="Delete product"
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">{search || catFilter ? 'No products match your filters' : 'No products yet'}</p>
              <p className="text-xs mt-1">{search || catFilter ? 'Try clearing the search or filter' : 'Click "Add Product" to get started'}</p>
            </div>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {showForm && (
          <ProductForm
            product={editing}
            categories={categories}
            onSave={() => { setShowForm(false); load() }}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
