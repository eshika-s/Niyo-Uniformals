import { supabase } from '@/lib/supabase'

const MOCK_CATEGORIES = [
  { id: 'cat-corporate', name: 'Corporate & Executive', slug: 'corporate', display_order: 1, icon: 'Briefcase', color: '#1e3a8a' },
  { id: 'cat-hospitality', name: 'Hotel & Hospitality', slug: 'hospitality', display_order: 2, icon: 'ChefHat', color: '#92400e' },
  { id: 'cat-medical', name: 'Healthcare & Hospital', slug: 'medical', display_order: 3, icon: 'Stethoscope', color: '#0f766e' },
  { id: 'cat-industrial', name: 'Industrial Workwear', slug: 'industrial', display_order: 4, icon: 'HardHat', color: '#c2410c' },
  { id: 'cat-school', name: 'Education & PE', slug: 'school', display_order: 5, icon: 'GraduationCap', color: '#162d6e' }
]

// Mock product counts per category
const MOCK_COUNTS = {
  'cat-corporate': 12, 'cat-hospitality': 10, 'cat-medical': 15,
  'cat-industrial': 8, 'cat-school': 10
}

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

  async getWithProductCount() {
    try {
      // Fetch categories with a product count via Supabase's embedded count
      const res = await supabase
        .from('categories')
        .select('*, products(count)')
        .order('display_order', { ascending: true })
        .order('name')
      if (res.error || !res.data || res.data.length === 0) {
        return {
          data: MOCK_CATEGORIES.map(c => ({ ...c, product_count: MOCK_COUNTS[c.id] ?? 0 })),
          error: null,
        }
      }
      // Normalize the nested count into a flat field
      const normalized = res.data.map(c => ({
        ...c,
        product_count: Array.isArray(c.products) ? c.products[0]?.count ?? 0 : 0,
      }))
      return { data: normalized, error: null }
    } catch {
      return {
        data: MOCK_CATEGORIES.map(c => ({ ...c, product_count: MOCK_COUNTS[c.id] ?? 0 })),
        error: null,
      }
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

