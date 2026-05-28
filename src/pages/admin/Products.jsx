import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Star, StarOff, Loader2, Package, X, Upload } from 'lucide-react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { productService } from '@/services/productService'
import { useCategories } from '@/hooks/useCategories'
import toast from 'react-hot-toast'

function ProductForm({ product, categories, onSave, onClose }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category_id: product?.category_id || '',
    fabric: product?.fabric || '',
    price_range: product?.price_range || '',
    min_order_qty: product?.min_order_qty || '',
    is_featured: product?.is_featured || false,
    is_visible: product?.is_visible ?? true,
    images: product?.images || [],
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleImageUpload = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const id = product?.id || `temp-${Date.now()}`
      const url = await productService.uploadImage(file, id)
      setForm(p => ({ ...p, images: [...p.images, url] }))
      toast.success('Image uploaded')
    } catch {
      toast.error('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = url => setForm(p => ({ ...p, images: p.images.filter(i => i !== url) }))

  const handleSave = async () => {
    if (!form.name) return toast.error('Product name is required')
    setSaving(true)
    try {
      const data = { ...form, min_order_qty: form.min_order_qty ? parseInt(form.min_order_qty) : null }
      if (product) await productService.update(product.id, data)
      else await productService.create(data)
      toast.success(product ? 'Product updated' : 'Product created')
      onSave()
    } catch { toast.error('Failed to save product') }
    finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">
          <h2 className="font-display font-bold text-navy-900">{product ? 'Edit Product' : 'Add Product'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><X size={16} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1.5">Product Name *</label>
            <input type="text" value={form.name} onChange={set('name')} placeholder="e.g. School Winter Uniform"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Category</label>
              <select value={form.category_id} onChange={set('category_id')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white">
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Fabric</label>
              <input type="text" value={form.fabric} onChange={set('fabric')} placeholder="e.g. Cotton-Polyester"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Price Range</label>
              <input type="text" value={form.price_range} onChange={set('price_range')} placeholder="e.g. ₹250 - ₹450"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Min. Order Qty</label>
              <input type="number" value={form.min_order_qty} onChange={set('min_order_qty')} placeholder="50"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1.5">Description</label>
            <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Product description…"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none" />
          </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={set('is_featured')} className="rounded" />
              <span className="text-sm text-slate-600">Feature on homepage</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_visible} onChange={set('is_visible')} className="rounded" />
              <span className="text-sm text-slate-600">Visible in catalogue</span>
            </label>
          {/* Images */}
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-2">Product Images</label>
            <div className="flex gap-3 flex-wrap">
              {form.images.map(url => (
                <div key={url} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 group">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(url)}
                    className="absolute inset-0 bg-red-500/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <X size={14} className="text-white" />
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-navy-400 transition-colors">
                {uploading ? <Loader2 size={18} className="animate-spin text-slate-400" /> : <Upload size={18} className="text-slate-400" />}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-60">
            {saving && <Loader2 size={13} className="animate-spin" />}
            {saving ? 'Saving…' : 'Save Product'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const { categories } = useCategories()

  const load = async () => {
    setLoading(true)
    const { data } = await productService.getAll({ limit: 100, showHidden: true })
    setProducts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async id => {
    if (!confirm('Delete this product?')) return
    await productService.delete(id)
    toast.success('Product deleted')
    load()
  }

  const toggleFeatured = async (id, val) => {
    await productService.update(id, { is_featured: !val })
    toast.success(!val ? 'Marked as featured' : 'Removed from featured')
    load()
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <title>Products — Niyo Admin</title>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-navy-900">Products</h1>
            <p className="text-slate-500 text-sm">{products.length} products total</p>
          </div>
          <button onClick={() => { setEditing(null); setShowForm(true) }}
            className="flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors">
            <Plus size={16} />
            Add Product
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-white rounded-2xl animate-pulse border border-slate-100" />)}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase hidden lg:table-cell">Price</th>
                  <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase text-center">Featured</th>
                  <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          {p.images?.[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <Package size={16} className="text-slate-300 m-auto mt-3" />}
                        </div>
                        <p className="font-medium text-navy-900 line-clamp-1">{p.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-500 hidden md:table-cell">{p.categories?.name || '—'}</td>
                    <td className="px-4 py-4 text-slate-500 hidden lg:table-cell">{p.price_range || '—'}</td>
                    <td className="px-4 py-4 text-center">
                      <button onClick={() => toggleFeatured(p.id, p.is_featured)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                        {p.is_featured ? <Star size={16} className="text-gold-500" fill="currentColor" /> : <StarOff size={16} className="text-slate-300" />}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setEditing(p); setShowForm(true) }}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-navy-700">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(p.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-500 hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="py-16 text-center text-slate-400">
                <Package size={40} className="mx-auto mb-3 opacity-30" />
                <p>No products yet. Add your first product!</p>
              </div>
            )}
          </div>
        )}
      </main>

      {showForm && (
        <ProductForm
          product={editing}
          categories={categories}
          onSave={() => { setShowForm(false); load() }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
