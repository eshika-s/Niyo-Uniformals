import { useState, useEffect } from 'react'
import {
  Plus, Pencil, Trash2, Loader2, X, Star,
  GripVertical, Eye, EyeOff, Quote, User
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '@/components/layout/AdminLayout'
import { testimonialsService } from '@/services/testimonialsService'
import toast from 'react-hot-toast'

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={22}
            className={n <= (hovered || value) ? 'text-gold-500' : 'text-slate-200'}
            fill={n <= (hovered || value) ? 'currentColor' : 'none'}
          />
        </button>
      ))}
    </div>
  )
}

function TestimonialForm({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    name: item?.name || '',
    role: item?.role || '',
    quote: item?.quote || '',
    rating: item?.rating || 5,
    avatar_url: item?.avatar_url || '',
    is_active: item?.is_active ?? true,
    display_order: item?.display_order || 0,
  })
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error('Name is required')
    if (!form.quote.trim()) return toast.error('Quote is required')
    setSaving(true)
    try {
      if (item) await testimonialsService.update(item.id, form)
      else await testimonialsService.create(form)
      toast.success(item ? 'Testimonial updated!' : 'Testimonial added!')
      onSave()
    } catch { toast.error('Failed to save') }
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-display font-bold text-navy-900">{item ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Customer review shown on homepage</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Preview */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center shrink-0">
                {form.avatar_url
                  ? <img src={form.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                  : <User size={18} className="text-navy-400" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy-900">{form.name || 'Customer Name'}</p>
                <p className="text-xs text-slate-400">{form.role || 'Role / Company'}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} size={12} className={n <= form.rating ? 'text-gold-500' : 'text-slate-200'} fill={n <= form.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
              </div>
            </div>
            {form.quote && (
              <p className="text-sm text-slate-600 mt-3 italic leading-relaxed line-clamp-3">"{form.quote}"</p>
            )}
          </div>

          {/* Name + Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Rajesh Kumar"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Role / Company</label>
              <input
                type="text"
                value={form.role}
                onChange={e => set('role', e.target.value)}
                placeholder="Principal, DPS School"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all"
              />
            </div>
          </div>

          {/* Quote */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Review Quote *</label>
            <textarea
              value={form.quote}
              onChange={e => set('quote', e.target.value)}
              rows={4}
              placeholder="Write the customer's testimonial here…"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none transition-all"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Rating</label>
            <StarPicker value={form.rating} onChange={v => set('rating', v)} />
          </div>

          {/* Avatar URL */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Avatar Image URL</label>
            <input
              type="url"
              value={form.avatar_url}
              onChange={e => set('avatar_url', e.target.value)}
              placeholder="https://… (optional)"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all"
            />
          </div>

          {/* Display Order + Active */}
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Display Order</label>
              <input
                type="number"
                value={form.display_order}
                onChange={e => set('display_order', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all"
              />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer pb-2.5">
              <div
                className={`relative w-10 h-5 rounded-full transition-colors ${form.is_active ? 'bg-navy-600' : 'bg-slate-300'}`}
                onClick={() => set('is_active', !form.is_active)}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.is_active ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-slate-700 font-medium">Show on site</span>
            </label>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white">
          <button onClick={onClose} className="px-5 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-7 py-2 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-60"
          >
            {saving && <Loader2 size={13} className="animate-spin" />}
            {saving ? 'Saving…' : item ? 'Save Changes' : 'Add Testimonial'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  const load = async () => {
    setLoading(true)
    const { data } = await testimonialsService.getAll()
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    await testimonialsService.delete(id)
    toast.success('Testimonial deleted')
    load()
  }

  const toggleActive = async (id, current) => {
    await testimonialsService.update(id, { is_active: !current })
    toast.success(!current ? 'Testimonial shown on site' : 'Testimonial hidden')
    load()
  }

  const addBtn = (
    <motion.button
      onClick={() => { setEditing(null); setShowForm(true) }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors"
    >
      <Plus size={16} /> Add Testimonial
    </motion.button>
  )

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
  const cardVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

  return (
    <AdminLayout
      title="Testimonials"
      subtitle={`${items.length} customer reviews`}
      actions={addBtn}
    >
      <title>Testimonials — Niyo Admin</title>

      {/* Info banner */}
      <div className="mb-6 px-4 py-3 bg-navy-50 rounded-xl border border-navy-100 flex items-center gap-3">
        <Quote size={16} className="text-navy-600 shrink-0" />
        <p className="text-sm text-navy-700">
          Active testimonials are displayed on the homepage. Toggle visibility with the eye icon.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-2xl animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-slate-300"
        >
          <Quote size={48} className="mb-3 opacity-40" />
          <p className="text-slate-400 font-medium">No testimonials yet</p>
          <p className="text-xs text-slate-400 mt-1">Add your first customer review to show on the homepage</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map(item => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -2 }}
              className={`bg-white rounded-2xl border shadow-sm p-5 transition-all group ${item.is_active ? 'border-slate-100' : 'border-slate-100 opacity-60'}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-navy-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {item.avatar_url
                      ? <img src={item.avatar_url} alt={item.name} className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                      : <User size={18} className="text-navy-400" />
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.role}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[1,2,3,4,5].map(n => (
                        <Star key={n} size={11} className={n <= item.rating ? 'text-gold-500' : 'text-slate-200'} fill={n <= item.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleActive(item.id, item.is_active)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-navy-700"
                    title={item.is_active ? 'Hide from site' : 'Show on site'}
                  >
                    {item.is_active ? <Eye size={15} className="text-emerald-500" /> : <EyeOff size={15} />}
                  </button>
                  <button
                    onClick={() => { setEditing(item); setShowForm(true) }}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-navy-700"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-sm text-slate-600 italic leading-relaxed line-clamp-3">"{item.quote}"</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {item.is_active ? 'Active' : 'Hidden'}
                </span>
                <span className="text-xs text-slate-400">Order #{item.display_order}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {showForm && (
          <TestimonialForm
            item={editing}
            onSave={() => { setShowForm(false); load() }}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
