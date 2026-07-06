import { supabase } from '@/lib/supabase'

const MOCK_BANNERS = [
  {
    id: 'banner-1',
    title: 'Dress Your Team in Excellence',
    subtitle: 'Wholesale & retail uniforms for schools, corporates, hospitals and more — from Gandhi Nagar, East Delhi.',
    image_url: '',
    cta_text: 'Browse Catalogue',
    cta_url: '/catalogue',
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'banner-2',
    title: 'Bulk Orders Welcome',
    subtitle: 'Minimum order of 50 pieces. Custom embroidery & printing available for all uniform types.',
    image_url: '',
    cta_text: 'Request a Quote',
    cta_url: '/bulk-order',
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
  },
]

let _mockStore = [...MOCK_BANNERS]

export const bannersService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('display_order', { ascending: true })
      if (error || !data || data.length === 0) throw new Error('use mock')
      return { data, error: null }
    } catch {
      return { data: [..._mockStore], error: null }
    }
  },

  async create(payload) {
    try {
      const { data, error } = await supabase.from('banners').insert(payload).select().single()
      if (error) throw error
      return { data, error: null }
    } catch {
      const item = { ...payload, id: `banner-local-${Date.now()}`, created_at: new Date().toISOString() }
      _mockStore.push(item)
      return { data: item, error: null }
    }
  },

  async update(id, payload) {
    try {
      const { data, error } = await supabase.from('banners').update(payload).eq('id', id).select().single()
      if (error) throw error
      return { data, error: null }
    } catch {
      const idx = _mockStore.findIndex(b => b.id === id)
      if (idx !== -1) {
        _mockStore[idx] = { ..._mockStore[idx], ...payload }
        return { data: _mockStore[idx], error: null }
      }
      return { data: null, error: new Error('Not found') }
    }
  },

  async delete(id) {
    try {
      const { error } = await supabase.from('banners').delete().eq('id', id)
      if (error) throw error
      return { error: null }
    } catch {
      _mockStore = _mockStore.filter(b => b.id !== id)
      return { error: null }
    }
  },

  async uploadImage(file) {
    try {
      const ext = file.name.split('.').pop()
      const path = `banners/${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('product-images').upload(path, file)
      if (error) throw error
      const { data } = supabase.storage.from('product-images').getPublicUrl(path)
      return data.publicUrl
    } catch {
      return URL.createObjectURL(file)
    }
  },
}
