import { useState, useEffect } from 'react'
import { Save, Loader2, Globe, Phone, MapPin, Share2, Search, Clock, Image } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '@/components/layout/AdminLayout'
import { supabase } from '@/lib/supabase'
import { useSettings } from '@/context/SettingsContext'
import toast from 'react-hot-toast'

// ─── Field definitions grouped by section ─────────────────────────────────────

const SECTIONS = [
  {
    id: 'business',
    title: 'Business Identity',
    icon: Globe,
    description: 'Core branding and headline content shown across the site',
    fields: [
      { key: 'site_name', label: 'Business Name', placeholder: 'Niyo Uniformals', type: 'text' },
      { key: 'tagline', label: 'Tagline', placeholder: 'Premium Uniforms for Every Profession', type: 'text' },
      { key: 'hero_title', label: 'Homepage Hero Title', placeholder: 'Dress Your Team in Excellence', type: 'text' },
      { key: 'hero_subtitle', label: 'Homepage Hero Subtitle', placeholder: 'Wholesale & retail uniforms from Gandhi Nagar, Delhi…', type: 'textarea' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact Information',
    icon: Phone,
    description: 'Phone, WhatsApp, and email shown on contact page and header',
    fields: [
      { key: 'whatsapp_number', label: 'WhatsApp Number', placeholder: '+919999999999', type: 'tel', hint: 'Include country code, e.g. +91 for India' },
      { key: 'phone', label: 'Phone Number', placeholder: '+919999999999', type: 'tel' },
      { key: 'email', label: 'Email Address', placeholder: 'info@niyouniforms.com', type: 'email' },
    ],
  },
  {
    id: 'location',
    title: 'Location & Hours',
    icon: MapPin,
    description: 'Business address and operating hours shown on the Contact page',
    fields: [
      { key: 'address', label: 'Full Address', placeholder: 'IX/6202, Jain Mandir Gali, Gandhi Nagar, Delhi - 110031', type: 'textarea' },
      { key: 'business_hours', label: 'Business Hours', placeholder: 'Mon–Sat: 10 AM – 7 PM | Sun: Closed', type: 'text' },
      { key: 'google_maps_url', label: 'Google Maps Embed URL', placeholder: 'https://maps.google.com/...', type: 'url' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Meta Tags',
    icon: Search,
    description: 'Controls how the site appears in Google Search and social media previews',
    fields: [
      { key: 'meta_title', label: 'Meta Title', placeholder: 'Niyo Uniformals – Premium Wholesale Uniforms, Gandhi Nagar Delhi', type: 'text', hint: 'Keep under 60 characters for best results' },
      { key: 'meta_description', label: 'Meta Description', placeholder: 'Buy wholesale and retail uniforms for schools, hospitals, corporate and more at Niyo Uniformals, Gandhi Nagar, Delhi. Bulk orders welcome.', type: 'textarea', hint: 'Keep under 160 characters' },
      { key: 'og_image_url', label: 'Social Share Image URL', placeholder: 'https://...', type: 'url', hint: 'Image shown when link is shared on WhatsApp, Facebook etc.' },
    ],
  },
  {
    id: 'social',
    title: 'Social Media Links',
    icon: Share2,
    description: 'Social media profiles shown in the footer',
    fields: [
      { key: 'instagram_url', label: 'Instagram', placeholder: 'https://instagram.com/niyouniforms', type: 'url' },
      { key: 'facebook_url', label: 'Facebook', placeholder: 'https://facebook.com/niyouniforms', type: 'url' },
      { key: 'youtube_url', label: 'YouTube', placeholder: 'https://youtube.com/@niyouniforms', type: 'url' },
    ],
  },
  {
    id: 'branding',
    title: 'Branding Assets',
    icon: Image,
    description: 'Logo and visual identity assets',
    fields: [
      { key: 'logo_url', label: 'Logo Image URL', placeholder: 'https://...', type: 'url', hint: 'Paste a hosted image URL. Recommended: 200×60px PNG with transparent background.' },
    ],
  },
]

// All field keys (for saving)
const ALL_KEYS = SECTIONS.flatMap(s => s.fields.map(f => f.key))

// ─── Input component ──────────────────────────────────────────────────────────
function SettingInput({ field, value, onChange }) {
  const base = 'w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all bg-white'
  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 block mb-1.5">{field.label}</label>
      {field.type === 'textarea' ? (
        <textarea
          value={value || ''}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type={field.type || 'text'}
          value={value || ''}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          className={base}
        />
      )}
      {field.hint && <p className="text-xs text-slate-400 mt-1">{field.hint}</p>}
    </div>
  )
}

// ─── Main Settings Page ────────────────────────────────────────────────────────
export default function AdminSettings() {
  const { settings, setSettings } = useSettings()
  const [local, setLocal] = useState({ ...settings })
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState('business')

  useEffect(() => { setLocal({ ...settings }) }, [settings])

  const handleChange = (key, val) => setLocal(p => ({ ...p, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    try {
      const upserts = ALL_KEYS.map(key => ({ key, value: local[key] || '' }))
      const { error } = await supabase.from('settings').upsert(upserts, { onConflict: 'key' })
      if (error) throw error
      setSettings(prev => ({ ...prev, ...local }))
      toast.success('Settings saved successfully!')
    } catch {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const saveBtn = (
    <motion.button
      id="admin-save-settings-btn"
      onClick={handleSave}
      disabled={saving}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 px-6 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-60"
    >
      {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
      {saving ? 'Saving…' : 'Save All Changes'}
    </motion.button>
  )

  const currentSection = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0]

  return (
    <AdminLayout
      title="Site Settings"
      subtitle="Edit website content, contacts, and SEO without touching any code"
      actions={saveBtn}
    >
      <title>Settings — Niyo Admin</title>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-52 shrink-0">
          <nav className="space-y-1 bg-white rounded-2xl border border-slate-100 p-2 shadow-sm sticky top-4">
            {SECTIONS.map(s => {
              const SIcon = s.icon
              return (
                <motion.button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  whileHover={{ x: 3 }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    activeSection === s.id
                      ? 'bg-navy-700 text-white'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-navy-900'
                  }`}
                >
                  <SIcon size={15} className={activeSection === s.id ? 'text-gold-400' : 'text-slate-400'} />
                  {s.title}
                </motion.button>
              )
            })}
          </nav>
        </div>

        {/* Section content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              {/* Section header */}
              <div className="px-6 py-5 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  {(() => {
                    const HeaderIcon = currentSection.icon
                    return (
                      <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
                        <HeaderIcon size={18} className="text-navy-700" />
                      </div>
                    )
                  })()}
                  <div>
                    <h2 className="font-semibold text-navy-900">{currentSection.title}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">{currentSection.description}</p>
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="p-6 space-y-5">
                {currentSection.fields.map(field => (
                  <SettingInput
                    key={field.key}
                    field={field}
                    value={local[field.key]}
                    onChange={handleChange}
                  />
                ))}
              </div>

              {/* Preview panel for specific sections */}
              {activeSection === 'seo' && (
                <div className="px-6 pb-6">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Google Preview</p>
                    <div className="space-y-1">
                      <p className="text-blue-700 text-base font-medium leading-tight line-clamp-1">
                        {local.meta_title || local.site_name || 'Niyo Uniformals'}
                      </p>
                      <p className="text-green-700 text-xs">niyouniforms.com</p>
                      <p className="text-slate-600 text-sm line-clamp-2">
                        {local.meta_description || 'Premium wholesale and retail uniforms from Gandhi Nagar, Delhi.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'branding' && local.logo_url && (
                <div className="px-6 pb-6">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Logo Preview</p>
                    <img src={local.logo_url} alt="Logo preview" className="h-12 object-contain" onError={e => e.target.style.display = 'none'} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom save button */}
          <div className="flex justify-end mt-4">
            <motion.button
              onClick={handleSave}
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? 'Saving…' : 'Save Changes'}
            </motion.button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
