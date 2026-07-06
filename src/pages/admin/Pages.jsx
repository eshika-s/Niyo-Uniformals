import { useState, useEffect, useRef } from 'react'
import {
  Save, Loader2, FileText, Home, Info, Users, Truck,
  ChevronDown, Bold, Italic, List, AlignLeft, Eye, EyeOff,
  RotateCcw, Check
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '@/components/layout/AdminLayout'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

// ─── Page sections registry ─────────────────────────────────────────────────
const PAGE_SECTIONS = [
  {
    id: 'home_hero',
    page: 'Home',
    label: 'Hero Section',
    icon: Home,
    description: 'The headline banner shown at the top of the homepage',
    fields: [
      { key: 'home_hero_badge', label: 'Badge Text', type: 'text', placeholder: 'Trusted by 500+ Schools & Institutions' },
      { key: 'home_hero_title', label: 'Hero Title', type: 'text', placeholder: 'Dress Your Team in Excellence' },
      { key: 'home_hero_subtitle', label: 'Hero Subtitle', type: 'textarea', placeholder: 'Wholesale & retail uniforms for every profession…' },
      { key: 'home_hero_cta_primary', label: 'Primary CTA Text', type: 'text', placeholder: 'Browse Catalogue' },
      { key: 'home_hero_cta_secondary', label: 'Secondary CTA Text', type: 'text', placeholder: 'Get a Bulk Quote' },
    ],
  },
  {
    id: 'home_why_us',
    page: 'Home',
    label: 'Why Choose Us',
    icon: Check,
    description: 'Feature highlights shown in the "Why Niyo?" section',
    fields: [
      { key: 'why_us_title', label: 'Section Title', type: 'text', placeholder: 'Why Choose Niyo Uniformals?' },
      { key: 'why_us_point_1', label: 'Point 1', type: 'text', placeholder: '500+ Institutions Served' },
      { key: 'why_us_point_2', label: 'Point 2', type: 'text', placeholder: 'MOQ of 50 pieces' },
      { key: 'why_us_point_3', label: 'Point 3', type: 'text', placeholder: 'Custom Embroidery Available' },
      { key: 'why_us_point_4', label: 'Point 4', type: 'text', placeholder: 'Pan India Delivery' },
    ],
  },
  {
    id: 'about_story',
    page: 'About',
    label: 'Our Story',
    icon: Info,
    description: 'The company story text shown on the About page',
    fields: [
      { key: 'about_story_title', label: 'Section Title', type: 'text', placeholder: 'Our Story' },
      { key: 'about_story_content', label: 'Story Content', type: 'richtext', placeholder: 'Write your company story here…' },
      { key: 'about_founded_year', label: 'Founded Year', type: 'text', placeholder: '2005' },
      { key: 'about_location', label: 'Location Tagline', type: 'text', placeholder: 'Gandhi Nagar, East Delhi' },
    ],
  },
  {
    id: 'about_stats',
    page: 'About',
    label: 'Key Stats',
    icon: Users,
    description: 'Numbers displayed on the About page (institutions, years, etc.)',
    fields: [
      { key: 'stat_institutions', label: 'Institutions Served', type: 'text', placeholder: '500+' },
      { key: 'stat_years', label: 'Years in Business', type: 'text', placeholder: '20+' },
      { key: 'stat_products', label: 'Product Varieties', type: 'text', placeholder: '200+' },
      { key: 'stat_cities', label: 'Cities Delivered', type: 'text', placeholder: '50+' },
    ],
  },
  {
    id: 'bulk_order',
    page: 'Bulk Order',
    label: 'Bulk Order Info',
    icon: Truck,
    description: 'Content shown on the Bulk Order enquiry page',
    fields: [
      { key: 'bulk_hero_title', label: 'Hero Title', type: 'text', placeholder: 'Bulk & Wholesale Orders' },
      { key: 'bulk_hero_subtitle', label: 'Hero Subtitle', type: 'textarea', placeholder: 'Minimum order 50 pieces. Custom branding available.' },
      { key: 'bulk_moq', label: 'Minimum Order Qty', type: 'text', placeholder: '50 pieces' },
      { key: 'bulk_lead_time', label: 'Lead Time', type: 'text', placeholder: '7-14 business days' },
    ],
  },
]

// Group sections by page
const PAGES = [...new Set(PAGE_SECTIONS.map(s => s.page))]

// ─── Rich Text Mini Editor ─────────────────────────────────────────────────
function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null)

  const execCmd = (cmd, val = null) => {
    document.execCommand(cmd, false, val)
    editorRef.current?.focus()
    syncContent()
  }

  const syncContent = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, []) // intentionally run only once to avoid cursor jump

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-navy-300 transition-all">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 bg-slate-50 border-b border-slate-200">
        <button type="button" onClick={() => execCmd('bold')} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600" title="Bold">
          <Bold size={13} />
        </button>
        <button type="button" onClick={() => execCmd('italic')} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600" title="Italic">
          <Italic size={13} />
        </button>
        <div className="w-px h-4 bg-slate-200 mx-1" />
        <button type="button" onClick={() => execCmd('insertUnorderedList')} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600" title="Bullet List">
          <List size={13} />
        </button>
        <button type="button" onClick={() => execCmd('justifyLeft')} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600" title="Align Left">
          <AlignLeft size={13} />
        </button>
        <div className="w-px h-4 bg-slate-200 mx-1" />
        <button type="button" onClick={() => { if (editorRef.current) { editorRef.current.innerHTML = ''; onChange('') } }} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-600" title="Clear">
          <RotateCcw size={13} />
        </button>
      </div>
      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncContent}
        className="min-h-[120px] px-4 py-3 text-sm text-slate-700 focus:outline-none leading-relaxed"
        style={{ lineHeight: '1.6' }}
      />
    </div>
  )
}

// Fallback simple textarea for richtext when execCommand is unreliable
function ContentField({ field, value, onChange }) {
  const base = 'w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition-all bg-white'

  if (field.type === 'richtext') {
    return (
      <div>
        <label className="text-xs font-semibold text-slate-500 block mb-1.5">{field.label}</label>
        <textarea
          value={value || ''}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          rows={6}
          className={`${base} resize-y font-mono text-xs leading-relaxed`}
        />
        <p className="text-xs text-slate-400 mt-1">Supports basic HTML (bold, ul, p tags)</p>
      </div>
    )
  }

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
          type="text"
          value={value || ''}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          className={base}
        />
      )}
    </div>
  )
}

// ─── Main Pages Component ───────────────────────────────────────────────────
export default function AdminPages() {
  const [activePage, setActivePage] = useState(PAGES[0])
  const [activeSection, setActiveSection] = useState(PAGE_SECTIONS[0].id)
  const [content, setContent] = useState({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState(false)

  // Load all page content from Supabase settings table (reuses same table)
  useEffect(() => {
    const allKeys = PAGE_SECTIONS.flatMap(s => s.fields.map(f => f.key))
    supabase
      .from('settings')
      .select('key, value')
      .in('key', allKeys)
      .then(({ data }) => {
        if (data?.length) {
          const map = data.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})
          setContent(map)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleChange = (key, val) => setContent(p => ({ ...p, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    const currentSection = PAGE_SECTIONS.find(s => s.id === activeSection)
    if (!currentSection) return setSaving(false)
    try {
      const upserts = currentSection.fields.map(f => ({ key: f.key, value: content[f.key] || '' }))
      const { error } = await supabase.from('settings').upsert(upserts, { onConflict: 'key' })
      if (error) throw error
      toast.success('Content saved!')
    } catch {
      toast.error('Failed to save — changes stored locally')
    } finally {
      setSaving(false)
    }
  }

  const sectionsForPage = PAGE_SECTIONS.filter(s => s.page === activePage)
  const currentSection = PAGE_SECTIONS.find(s => s.id === activeSection) || PAGE_SECTIONS[0]

  const saveBtn = (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setPreview(v => !v)}
        className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
      >
        {preview ? <EyeOff size={14} /> : <Eye size={14} />}
        {preview ? 'Edit' : 'Preview'}
      </button>
      <motion.button
        onClick={handleSave}
        disabled={saving}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-6 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-60"
      >
        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        {saving ? 'Saving…' : 'Save Section'}
      </motion.button>
    </div>
  )

  return (
    <AdminLayout title="Page Content" subtitle="Edit website copy without touching code" actions={saveBtn}>
      <title>Pages — Niyo Admin</title>

      <div className="flex gap-6">
        {/* Left: page + section navigator */}
        <div className="w-56 shrink-0 space-y-3">
          {PAGES.map(page => (
            <div key={page}>
              <button
                onClick={() => {
                  setActivePage(page)
                  const first = PAGE_SECTIONS.find(s => s.page === page)
                  if (first) setActiveSection(first.id)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activePage === page ? 'text-navy-900 bg-navy-50' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <span>{page}</span>
                <ChevronDown size={14} className={activePage === page ? 'rotate-0' : '-rotate-90'} />
              </button>
              <AnimatePresence>
                {activePage === page && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 ml-2 space-y-0.5 overflow-hidden"
                  >
                    {sectionsForPage.map(section => {
                      const SIcon = section.icon
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                            activeSection === section.id
                              ? 'bg-navy-700 text-white'
                              : 'text-slate-500 hover:bg-slate-100 hover:text-navy-900'
                          }`}
                        >
                          <SIcon size={14} className={activeSection === section.id ? 'text-gold-400' : 'text-slate-400'} />
                          <span className="truncate">{section.label}</span>
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right: content editor */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              {/* Section header */}
              <div className="px-6 py-5 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
                    {(() => { const Icon = currentSection.icon; return <Icon size={18} className="text-navy-700" /> })()}
                  </div>
                  <div>
                    <h2 className="font-semibold text-navy-900">{currentSection.page} → {currentSection.label}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">{currentSection.description}</p>
                  </div>
                </div>
              </div>

              {/* Fields */}
              {loading ? (
                <div className="p-6 space-y-4">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-slate-100 rounded-xl animate-pulse" />)}
                </div>
              ) : preview ? (
                /* Preview mode */
                <div className="p-6">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Content Preview</p>
                    {currentSection.fields.map(field => (
                      <div key={field.key} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <p className="text-xs text-slate-400 font-medium mb-1">{field.label}</p>
                        {field.type === 'richtext'
                          ? <div className="text-sm text-slate-700 leading-relaxed prose prose-sm" dangerouslySetInnerHTML={{ __html: content[field.key] || '<em class="text-slate-400">Empty</em>' }} />
                          : <p className="text-sm text-slate-700">{content[field.key] || <span className="text-slate-300 italic">Empty</span>}</p>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-5">
                  {currentSection.fields.map(field => (
                    <ContentField
                      key={field.key}
                      field={field}
                      value={content[field.key]}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              )}

              {/* Bottom save */}
              {!preview && (
                <div className="flex justify-end px-6 py-4 border-t border-slate-50">
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
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  )
}
