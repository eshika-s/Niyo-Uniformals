import { useState, useEffect } from 'react'
import {
  Plus, Pencil, Trash2, Loader2, X, Eye, EyeOff,
  Upload, ImagePlay, Link, Type, ChevronUp, ChevronDown, Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '@/components/layout/AdminLayout'
import { bannersService } from '@/services/bannersService'
import toast from 'react-hot-toast'

function BannerForm({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    title: item?.title || '',
    subtitle: item?.subtitle || '',
    image_url: item?.image_url || '',
    cta_text: item?.cta_text || '',
    cta_url: item?.cta_url || '',
    is_active: item?.is_active ?? true,
    display_order: item?.display_order || 1,
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const url = await bannersService.uploadImage(file)
    set('image_url', url)
    setUploading(false)
    toast.success('Image uploaded!')
  }

  const handleSave = async () => {
    if (!form.title.trim()) return toast.error('Banner title is required')
    setSaving(true)
    try {
      if (item) await bannersService.update(item.id, form)
      else await bannersService.create(form)
      toast.success(item ? 'Banner updated!' : 'Banner created!')
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-display font-bold text-navy-900">{item ? 'Edit Banner' : 'Add Banner Slide'}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Hero carousel slide shown on homepage</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Banner preview */}
          <div
            className="relative w-full h-40 rounded-xl overflow-hidden bg-navy-900 flex items-center"
            style={form.image_url ? { backgroundImage: `url(${form.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            {form.image_url && <div className="absolute inset-0 bg-navy-950/50" />}
            <div className="relative z-10 px-6">
              <p className="text-white font-display font-bold text-lg">{form.title || 'Banner Title'}</p>
              {form.subtitle && <p className="text-white/70 text-sm mt-1 line-clamp-2">{form.subtitle}</p>}
              {form.cta_text && (
                <div className="mt-3 inline-block px-4 py-1.5 bg-gold-500 text-navy-900 text-xs font-bold rounded-lg">
                  {form.cta_text}
                </div>
              )}
            </div>
            {!form.image_url && (
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <ImagePlay size={48} className="text-white" />
              </div>
            )}
          </div>

          {/* Image upload */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Banner Image</label>
            <div className="flex gap-3">
              <input
                type="url"
                value={form.image_url}
                onChange={e => set('image_url', e.target.value)}
                placeholder="https://… (paste URL or upload)"
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all"
              />
              <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors shrink-0">
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                Upload
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
              <Type size={11} className="inline mr-1" />Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Dress Your Team in Excellence"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Subtitle</label>
            <textarea
              value={form.subtitle}
              onChange={e => set('subtitle', e.target.value)}
              rows={2}
              placeholder="Brief supporting text shown below the title…"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none transition-all"
            />
          </div>

          {/* CTA */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                CTA Button Text
              </label>
              <input
                type="text"
                value={form.cta_text}
                onChange={e => set('cta_text', e.target.value)}
                placeholder="Browse Catalogue"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                <Link size={11} className="inline mr-1" />CTA URL
              </label>
              <input
                type="text"
                value={form.cta_url}
                onChange={e => set('cta_url', e.target.value)}
                placeholder="/catalogue"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all"
              />
            </div>
          </div>

          {/* Order + Active */}
          <div className="flex gap-4 items-end bg-slate-50 rounded-xl p-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Display Order</label>
              <input
                type="number"
                value={form.display_order}
                onChange={e => set('display_order', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white transition-all"
              />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer pb-2.5">
              <div
                className={`relative w-10 h-5 rounded-full transition-colors ${form.is_active ? 'bg-navy-600' : 'bg-slate-300'}`}
                onClick={() => set('is_active', !form.is_active)}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.is_active ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-slate-700 font-medium">Active on site</span>
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
            {saving ? 'Saving…' : item ? 'Save Changes' : 'Create Banner'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AdminBanners() {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  const load = async () => {
    setLoading(true)
    const { data } = await bannersService.getAll()
    setBanners((data ?? []).sort((a, b) => a.display_order - b.display_order))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this banner?')) return
    await bannersService.delete(id)
    toast.success('Banner deleted')
    load()
  }

  const toggleActive = async (id, current) => {
    await bannersService.update(id, { is_active: !current })
    toast.success(!current ? 'Banner activated' : 'Banner hidden')
    load()
  }

  const reorder = async (idx, dir) => {
    const list = [...banners]
    const swap = idx + dir
    if (swap < 0 || swap >= list.length) return
    ;[list[idx], list[swap]] = [list[swap], list[idx]]
    const withOrder = list.map((b, i) => ({ ...b, display_order: i + 1 }))
    setBanners(withOrder)
    await Promise.all(withOrder.map(b => bannersService.update(b.id, { display_order: b.display_order })))
  }

  const addBtn = (
    <motion.button
      onClick={() => { setEditing(null); setShowForm(true) }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors"
    >
      <Plus size={16} /> Add Banner
    </motion.button>
  )

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  }

  return (
    <AdminLayout
      title="Banners"
      subtitle={`${banners.length} hero slides · ${banners.filter(b => b.is_active).length} active`}
      actions={addBtn}
    >
      <title>Banners — Niyo Admin</title>

      <div className="mb-6 px-4 py-3 bg-navy-50 rounded-xl border border-navy-100 flex items-center gap-3">
        <Sparkles size={16} className="text-navy-600 shrink-0" />
        <p className="text-sm text-navy-700">
          Active banners are shown in the homepage hero carousel. Use display order to control the sequence.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-40 bg-white rounded-2xl animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : banners.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-slate-300"
        >
          <ImagePlay size={48} className="mb-3 opacity-40" />
          <p className="text-slate-400 font-medium">No banners yet</p>
          <p className="text-xs text-slate-400 mt-1">Add your first hero slide to display on the homepage</p>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        >
          {banners.map((banner, idx) => (
            <motion.div
              key={banner.id}
              variants={cardVariants}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all group ${banner.is_active ? 'border-slate-100' : 'border-slate-100 opacity-60'}`}
            >
              <div className="flex">
                {/* Banner preview panel */}
                <div
                  className="w-72 shrink-0 h-36 relative bg-navy-900 hidden md:block"
                  style={banner.image_url ? { backgroundImage: `url(${banner.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  {banner.image_url && <div className="absolute inset-0 bg-navy-950/50" />}
                  <div className="relative z-10 p-4 h-full flex flex-col justify-center">
                    <p className="text-white font-bold text-sm line-clamp-2">{banner.title}</p>
                    {banner.subtitle && <p className="text-white/60 text-xs mt-1 line-clamp-2">{banner.subtitle}</p>}
                  </div>
                  {!banner.image_url && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <ImagePlay size={32} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-navy-900">{banner.title}</p>
                        {banner.subtitle && <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{banner.subtitle}</p>}
                      </div>
                      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleActive(banner.id, banner.is_active)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-navy-700"
                          title={banner.is_active ? 'Deactivate' : 'Activate'}
                        >
                          {banner.is_active ? <Eye size={15} className="text-emerald-500" /> : <EyeOff size={15} />}
                        </button>
                        <button
                          onClick={() => { setEditing(banner); setShowForm(true) }}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-navy-700"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    {banner.cta_text && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-navy-50 text-navy-700 rounded-lg font-medium">
                          <Link size={10} />
                          {banner.cta_text} → {banner.cta_url}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${banner.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {banner.is_active ? 'Active' : 'Hidden'}
                      </span>
                      <span className="text-xs text-slate-400">Slide #{idx + 1}</span>
                    </div>
                    {/* Reorder buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => reorder(idx, -1)}
                        disabled={idx === 0}
                        className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-navy-700 disabled:opacity-30"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        onClick={() => reorder(idx, 1)}
                        disabled={idx === banners.length - 1}
                        className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-navy-700 disabled:opacity-30"
                      >
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {showForm && (
          <BannerForm
            item={editing}
            onSave={() => { setShowForm(false); load() }}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
