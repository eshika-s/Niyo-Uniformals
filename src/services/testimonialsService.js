import { supabase } from '@/lib/supabase'

// Mock testimonials for fallback
const MOCK_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Rajesh Kumar',
    role: 'Principal, Delhi Public School',
    quote: 'Niyo Uniformals delivered 500+ school uniforms on time with exceptional quality. The stitching is perfect and the fabric is durable. Highly recommended for bulk orders!',
    rating: 5,
    is_active: true,
    display_order: 1,
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: 'test-2',
    name: 'Priya Sharma',
    role: 'HR Manager, Star Hotels Group',
    quote: 'We\'ve been ordering hospitality uniforms from Niyo for 3 years. The consistency in quality and prompt delivery make them our go-to vendor.',
    rating: 5,
    is_active: true,
    display_order: 2,
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: 'test-3',
    name: 'Dr. Amit Verma',
    role: 'Administrator, Max Healthcare',
    quote: 'Professional medical uniforms at competitive prices. The customization options for our hospital logo were seamless. Great experience overall.',
    rating: 4,
    is_active: true,
    display_order: 3,
    avatar_url: '',
    created_at: new Date().toISOString(),
  },
]

let _mockStore = [...MOCK_TESTIMONIALS]

export const testimonialsService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('testimonials')
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
      const { data, error } = await supabase.from('testimonials').insert(payload).select().single()
      if (error) throw error
      return { data, error: null }
    } catch {
      const item = { ...payload, id: `test-local-${Date.now()}`, created_at: new Date().toISOString() }
      _mockStore.unshift(item)
      return { data: item, error: null }
    }
  },

  async update(id, payload) {
    try {
      const { data, error } = await supabase.from('testimonials').update(payload).eq('id', id).select().single()
      if (error) throw error
      return { data, error: null }
    } catch {
      const idx = _mockStore.findIndex(t => t.id === id)
      if (idx !== -1) {
        _mockStore[idx] = { ..._mockStore[idx], ...payload }
        return { data: _mockStore[idx], error: null }
      }
      return { data: null, error: new Error('Not found') }
    }
  },

  async delete(id) {
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id)
      if (error) throw error
      return { error: null }
    } catch {
      _mockStore = _mockStore.filter(t => t.id !== id)
      return { error: null }
    }
  },

  async reorder(items) {
    // items: [{ id, display_order }]
    try {
      const updates = items.map(({ id, display_order }) =>
        supabase.from('testimonials').update({ display_order }).eq('id', id)
      )
      await Promise.all(updates)
      return { error: null }
    } catch {
      items.forEach(({ id, display_order }) => {
        const idx = _mockStore.findIndex(t => t.id === id)
        if (idx !== -1) _mockStore[idx].display_order = display_order
      })
      return { error: null }
    }
  },
}
