import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const SettingsContext = createContext({})

const DEFAULTS = {
  // Business identity
  site_name: 'NIYO Uni-formals',
  tagline: 'Premium Uniforms for Every Profession',
  hero_title: 'Dress Your Team in Excellence',
  hero_subtitle: 'Wholesale & retail uniforms for schools, corporates, hospitals and more — from Gandhi Nagar, East Delhi.',
  // Contact
  whatsapp_number: '+919999999999',
  phone: '+919999999999',
  email: 'info@niyouniforms.com',
  // Location
  address: 'IX/6202, Jain Mandir Gali, Ram Nagar, Gandhi Nagar, East Delhi, Delhi - 110031',
  business_hours: 'Mon–Sat: 10 AM – 7 PM | Sunday: Closed',
  google_maps_url: '',
  // SEO
  meta_title: 'NIYO Uni-formals – Premium Wholesale Uniforms, Gandhi Nagar Delhi',
  meta_description: 'Buy wholesale and retail uniforms for schools, hospitals, corporate and hospitality at NIYO Uni-formals (by Shakti Dresses), Gandhi Nagar, Delhi. Bulk orders welcome.',
  og_image_url: '',
  // Social
  instagram_url: '',
  facebook_url: '',
  youtube_url: '',
  // Branding
  logo_url: '',
}


export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase.from('settings').select('key, value')
        if (!error && data?.length > 0) {
          const map = data.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})
          setSettings(prev => ({ ...prev, ...map }))
        }
      } catch {
        // use defaults
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, loading, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
