import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Tag, Loader2, X } from 'lucide-react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { categoryService } from '@/services/categoryService'
import toast from 'react-hot-toast'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', slug: '', display_order: 0 })
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await categoryService.getAll()
    setCategories(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openForm = (cat = null) => {
    setEditing(cat)
    setForm(cat ? { name: cat.name, slug: cat.slug, display_order: cat.display_order ?? 0 } : { name: '', slug: '', display_order: 0 })
    setShowForm(true)
  }

  const generateSlug = name => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  const handleSave = async () => {
    if (!form.name || !form.slug) return toast.error('Name and slug are required')
    setSaving(true)
    try {
      if (editing) await categoryService.update(editing.id, form)
      else await categoryService.create(form)
      toast.success(editing ? 'Category updated' : 'Category created')
      setShowForm(false)
      load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async id => {
    if (!confirm('Delete this category? Products in this category will not be deleted.')) return
    await categoryService.delete(id)
    toast.success('Category deleted')
    load()
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <title>Categories — Niyo Admin</title>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-navy-900">Categories</h1>
            <p className="text-slate-500 text-sm">{categories.length} categories</p>
          </div>
          <button onClick={() => openForm()}
            className="flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors">
            <Plus size={16} />
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? [...Array(6)].map((_, i) => <div key={i} className="h-24 bg-white rounded-2xl animate-pulse border border-slate-100" />)
            : categories.map(cat => (
              <div key={cat.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center">
                    <Tag size={17} className="text-navy-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{cat.name}</p>
                    <p className="text-xs text-slate-400">{cat.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => openForm(cat)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-navy-700">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </main>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-display font-bold text-navy-900">{editing ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Category Name *</label>
                <input type="text" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value, slug: generateSlug(e.target.value) }))}
                  placeholder="e.g. School Uniforms"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Slug *</label>
                <input type="text" value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                  placeholder="school-uniforms"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 font-mono" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Display Order</label>
                <input type="number" value={form.display_order} onChange={e => setForm(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
                <p className="text-xs text-slate-400 mt-1">Lower numbers appear first in the catalogue</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-60">
                {saving && <Loader2 size={13} className="animate-spin" />}
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
