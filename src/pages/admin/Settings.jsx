import { useState, useEffect } from 'react'
import { Save, Loader2 } from 'lucide-react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { supabase } from '@/lib/supabase'
import { useSettings } from '@/context/SettingsContext'
import toast from 'react-hot-toast'

const SETTINGS_FIELDS = [
  { key: 'site_name', label: 'Site Name', placeholder: 'Niyo Uniformals' },
  { key: 'tagline', label: 'Tagline', placeholder: 'Premium Uniforms for Every Profession' },
  { key: 'hero_title', label: 'Hero Title', placeholder: 'Dress Your Team in Excellence' },
  { key: 'hero_subtitle', label: 'Hero Subtitle', placeholder: 'Description below hero title…' },
  { key: 'whatsapp_number', label: 'WhatsApp Number', placeholder: '+919999999999' },
  { key: 'phone', label: 'Phone Number', placeholder: '+919999999999' },
  { key: 'email', label: 'Email', placeholder: 'info@niyouniforms.com' },
  { key: 'address', label: 'Address', placeholder: 'Gandhi Nagar, Delhi, India' },
]

export default function AdminSettings() {
  const { settings, setSettings } = useSettings()
  const [local, setLocal] = useState({ ...settings })
  const [saving, setSaving] = useState(false)

  useEffect(() => { setLocal({ ...settings }) }, [settings])

  const handleSave = async () => {
    setSaving(true)
    try {
      const upserts = SETTINGS_FIELDS.map(({ key }) => ({
        key,
        value: local[key] || '',
      }))
      const { error } = await supabase.from('settings').upsert(upserts, { onConflict: 'key' })
      if (error) throw error
      setSettings(prev => ({ ...prev, ...local }))
      toast.success('Settings saved successfully!')
    } catch (err) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <title>Settings — Niyo Admin</title>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-navy-900">Site Settings</h1>
            <p className="text-slate-500 text-sm">Manage website content and contact information</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>

        <div className="max-w-2xl space-y-5">
          {SETTINGS_FIELDS.map(({ key, label, placeholder }) => (
            <div key={key} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-2">{label}</label>
              {key === 'hero_subtitle' ? (
                <textarea
                  value={local[key] || ''}
                  onChange={e => setLocal(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={local[key] || ''}
                  onChange={e => setLocal(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
                />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
