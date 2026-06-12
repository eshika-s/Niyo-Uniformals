import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Loader2, X, Package, Tag,
  GraduationCap, Briefcase, Stethoscope, ChefHat, HardHat,
  Trophy, Shirt, Shield, Star, Building2, HeartPulse,
  Wrench, Flame, Leaf, Globe, Landmark, Award, Utensils } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '@/components/layout/AdminLayout'
import { categoryService } from '@/services/categoryService'
import toast from 'react-hot-toast'

// Curated set of icons relevant to uniform categories
const ICON_OPTIONS = [
  'GraduationCap', 'Briefcase', 'Stethoscope', 'ChefHat', 'HardHat',
  'Trophy', 'Shirt', 'Shield', 'Star', 'Building2', 'HeartPulse',
  'Wrench', 'Flame', 'Leaf', 'Globe', 'Landmark', 'Award', 'Utensils',
]

// Icon name → component map
const ICON_MAP = {
  GraduationCap, Briefcase, Stethoscope, ChefHat, HardHat,
  Trophy, Shirt, Shield, Star, Building2, HeartPulse,
  Wrench, Flame, Leaf, Globe, Landmark, Tag, Award, Utensils,
}


const COLOR_OPTIONS = [
  '#162d6e', '#1e3a8a', '#0f766e', '#92400e', '#78350f', '#7c3aed',
  '#065f46', '#9f1239', '#1e293b', '#0369a1', '#c2410c', '#4338ca',
]

function IconPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-8 gap-1.5 p-3 bg-slate-50 rounded-xl max-h-36 overflow-y-auto">
      {ICON_OPTIONS.map(name => {
        const Icon = ICON_MAP[name]
        if (!Icon) return null
        return (
          <button
            key={name}
            type="button"
            title={name}
            onClick={() => onChange(name)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              value === name ? 'bg-navy-700 text-white' : 'hover:bg-slate-200 text-slate-500'
            }`}
          >
            <Icon size={15} />
          </button>
        )
      })}
    </div>
  )
}

function ColorPicker({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLOR_OPTIONS.map(c => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={`w-7 h-7 rounded-full border-2 transition-all ${value === c ? 'border-navy-700 scale-110' : 'border-transparent hover:scale-105'}`}
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  )
}

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', slug: '', display_order: 0, icon: 'Tag', color: '#162d6e' })
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await categoryService.getWithProductCount()
    setCategories(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openForm = (cat = null) => {
    setEditing(cat)
    setForm(cat
      ? { name: cat.name, slug: cat.slug, display_order: cat.display_order ?? 0, icon: cat.icon || 'Tag', color: cat.color || '#162d6e' }
      : { name: '', slug: '', display_order: 0, icon: 'Tag', color: '#162d6e' }
    )
    setShowForm(true)
  }

  const generateSlug = name => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  const handleSave = async () => {
    if (!form.name || !form.slug) return toast.error('Name and slug are required')
    setSaving(true)
    try {
      if (editing) await categoryService.update(editing.id, form)
      else await categoryService.create(form)
      toast.success(editing ? 'Category updated!' : 'Category created!')
      setShowForm(false)
      load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async id => {
    if (!confirm('Delete this category? Products will not be deleted.')) return
    await categoryService.delete(id)
    toast.success('Category deleted')
    load()
  }

  const addBtn = (
    <motion.button
      id="admin-add-category-btn"
      onClick={() => openForm()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors"
    >
      <Plus size={16} /> Add Category
    </motion.button>
  )

  // Stagger animation configuration
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' }
    }
  }

  return (
    <AdminLayout
      title="Categories"
      subtitle={`${categories.length} categories`}
      actions={addBtn}
    >
      <title>Categories — Niyo Admin</title>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-white rounded-2xl animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map(cat => {
            const Icon = ICON_MAP[cat.icon] || Tag
            return (
              <motion.div 
                key={cat.id} 
                variants={cardVariants}
                whileHover={{ y: -2, scale: 1.01, boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)' }}
                className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center justify-between shadow-sm transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  {/* Color + Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: cat.color || '#162d6e' }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{cat.name}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{cat.slug}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Package size={11} className="text-slate-400" />
                      <span className="text-xs text-slate-400">
                        {cat.product_count ?? 0} product{cat.product_count !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openForm(cat)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-navy-700">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(cat.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {/* Category Form Modal */}
      <AnimatePresence>
        {showForm && (
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
                <h2 className="font-display font-bold text-navy-900">{editing ? 'Edit Category' : 'Add Category'}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-6 space-y-5">
                {/* Preview */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  {(() => {
                    const PreviewIcon = ICON_MAP[form.icon] || Tag
                    return (
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: form.color || '#162d6e' }}>
                        <PreviewIcon size={18} className="text-white" />
                      </div>
                    )
                  })()}
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{form.name || 'Category Name'}</p>
                    <p className="text-xs text-slate-400 font-mono">{form.slug || 'category-slug'}</p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Category Name *</label>
                  <input type="text" value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value, slug: generateSlug(e.target.value) }))}
                    placeholder="e.g. School Uniforms"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all" />
                </div>

                {/* Slug */}
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">URL Slug *</label>
                  <input type="text" value={form.slug}
                    onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                    placeholder="school-uniforms"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 font-mono transition-all" />
                </div>

                {/* Display Order */}
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Display Order</label>
                  <input type="number" value={form.display_order}
                    onChange={e => setForm(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all" />
                  <p className="text-xs text-slate-400 mt-1">Lower numbers appear first</p>
                </div>

                {/* Icon */}
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Icon</label>
                  <IconPicker value={form.icon} onChange={icon => setForm(p => ({ ...p, icon }))} />
                </div>

                {/* Color */}
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Accent Color</label>
                  <ColorPicker value={form.color} onChange={color => setForm(p => ({ ...p, color }))} />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-60">
                  {saving && <Loader2 size={13} className="animate-spin" />}
                  {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
