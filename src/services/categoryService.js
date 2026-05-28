import { supabase } from '@/lib/supabase'

const MOCK_CATEGORIES = [
  { id: 'cat-school', name: 'School Uniforms', slug: 'school', display_order: 1 },
  { id: 'cat-corporate', name: 'Corporate Wear', slug: 'corporate', display_order: 2 },
  { id: 'cat-healthcare', name: 'Healthcare & Medical', slug: 'healthcare', display_order: 3 },
  { id: 'cat-hospitality', name: 'Hospitality & Culinary', slug: 'hospitality', display_order: 4 },
  { id: 'cat-industrial', name: 'Industrial Safety', slug: 'industrial', display_order: 5 },
  { id: 'cat-sports', name: 'Sports & Activewear', slug: 'sports', display_order: 6 },
]

export const categoryService = {
  async getAll() {
    try {
      const res = await supabase.from('categories').select('*').order('display_order', { ascending: true }).order('name')
      if (res.error || !res.data || res.data.length === 0) {
        return { data: MOCK_CATEGORIES, error: null }
      }
      return res
    } catch {
      return { data: MOCK_CATEGORIES, error: null }
    }
  },

  async getById(id) {
    try {
      const res = await supabase.from('categories').select('*').eq('id', id).single()
      if (res.error || !res.data) {
        const mock = MOCK_CATEGORIES.find(c => c.id === id)
        if (mock) return { data: mock, error: null }
      }
      return res
    } catch {
      const mock = MOCK_CATEGORIES.find(c => c.id === id)
      return { data: mock ?? null, error: mock ? null : new Error('Category not found') }
    }
  },

  async create(data) {
    return supabase.from('categories').insert(data).select().single()
  },

  async update(id, data) {
    return supabase.from('categories').update(data).eq('id', id).select().single()
  },

  async delete(id) {
    return supabase.from('categories').delete().eq('id', id)
  },
}
