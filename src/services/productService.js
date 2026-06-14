import MOCK_PRODUCTS from '../../product.json'
import { supabase } from '@/lib/supabase'

const MOCK_CATEGORIES = [
  { id: 'cat-medical', name: 'Healthcare & Hospital Uniforms', slug: 'medical', display_order: 1 },
  { id: 'cat-hospitality', name: 'Hotel & Hospitality Uniforms', slug: 'hospitality', display_order: 2 },
  { id: 'cat-corporate', name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate', display_order: 3 },
  { id: 'cat-advocate', name: 'Advocates & Legal (Coats & Gowns)', slug: 'advocate', display_order: 4 },
  { id: 'cat-school', name: 'School Uniforms', slug: 'school', display_order: 5 },
  { id: 'cat-convocation', name: 'Convocation (Gowns & Caps)', slug: 'convocation', display_order: 6 },
  { id: 'cat-security', name: 'Security & Defence Uniforms', slug: 'security', display_order: 7 },
  { id: 'cat-industrial', name: 'Industrial & Factory Workwear', slug: 'industrial', display_order: 8 },
  { id: 'cat-sports', name: 'Sports & PE Uniforms', slug: 'sports', display_order: 9 },
  { id: 'cat-banking', name: 'Banking & Finance Formals', slug: 'banking', display_order: 10 },
  { id: 'cat-police', name: 'Police & Paramilitary (Ceremonial)', slug: 'police', display_order: 11 },
  { id: 'cat-fire', name: 'Fire & Safety Uniforms', slug: 'fire', display_order: 12 },
  { id: 'cat-airline', name: 'Airline & Aviation Crew', slug: 'airline', display_order: 13 }
]

export const productService = {
  async getAll({ category, featured, search, gender, fabric_type, customization, max_price, page = 1, limit = 12, showHidden = false } = {}) {
    try {
      let query = supabase
        .from('products')
        .select('*, categories(id, name, slug)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1)

      if (!showHidden) query = query.eq('is_visible', true)
      if (category) query = query.eq('category_id', category)
      if (featured) query = query.eq('is_featured', true)
      if (search) query = query.ilike('name', `%${search}%`)
      if (gender) query = query.eq('gender', gender)
      if (fabric_type) query = query.ilike('fabric', `%${fabric_type}%`)
      if (customization !== undefined && customization !== null && customization !== '') {
        query = query.eq('customization_available', customization === 'true' || customization === true)
      }
      if (max_price) query = query.lte('price_max', max_price)

      const { data, count, error } = await query
      if (error || !data || data.length === 0) {
        let filtered = [...MOCK_PRODUCTS]
        if (!showHidden) filtered = filtered.filter(p => p.is_visible)
        if (category) {
          filtered = filtered.filter(p => p.category_id === category || p.categories.id === category || p.categories.slug === category)
        }
        if (featured) filtered = filtered.filter(p => p.is_featured)
        if (search) {
          const s = search.toLowerCase()
          filtered = filtered.filter(p => p.name.toLowerCase().includes(s))
        }
        if (gender) {
          filtered = filtered.filter(p => p.gender && p.gender.toLowerCase() === gender.toLowerCase())
        }
        if (fabric_type) {
          const ft = fabric_type.toLowerCase()
          filtered = filtered.filter(p => p.fabric && p.fabric.toLowerCase().includes(ft))
        }
        if (customization !== undefined && customization !== null && customization !== '') {
          const custBool = customization === 'true' || customization === true
          filtered = filtered.filter(p => p.customization_available === custBool)
        }
        if (max_price) {
          filtered = filtered.filter(p => p.price_max <= max_price)
        }

        const start = (page - 1) * limit
        const paginated = filtered.slice(start, start + limit)
        return { data: paginated, count: filtered.length, error: null }
      }
      return { data, count, error: null }
    } catch {
      let filtered = [...MOCK_PRODUCTS]
      if (!showHidden) filtered = filtered.filter(p => p.is_visible)
      if (category) {
        filtered = filtered.filter(p => p.category_id === category || p.categories.id === category || p.categories.slug === category)
      }
      if (featured) filtered = filtered.filter(p => p.is_featured)
      if (search) {
        const s = search.toLowerCase()
        filtered = filtered.filter(p => p.name.toLowerCase().includes(s))
      }
      if (gender) {
        filtered = filtered.filter(p => p.gender && p.gender.toLowerCase() === gender.toLowerCase())
      }
      if (fabric_type) {
        const ft = fabric_type.toLowerCase()
        filtered = filtered.filter(p => p.fabric && p.fabric.toLowerCase().includes(ft))
      }
      if (customization !== undefined && customization !== null && customization !== '') {
        const custBool = customization === 'true' || customization === true
        filtered = filtered.filter(p => p.customization_available === custBool)
      }
      if (max_price) {
        filtered = filtered.filter(p => p.price_max <= max_price)
      }
      const start = (page - 1) * limit
      const paginated = filtered.slice(start, start + limit)
      return { data: paginated, count: filtered.length, error: null }
    }
  },

  async getById(id) {
    try {
      const res = await supabase
        .from('products')
        .select('*, categories(id, name, slug)')
        .eq('id', id)
        .single()
      if (res.error || !res.data) {
        const mock = MOCK_PRODUCTS.find(p => p.id === id)
        if (mock) return { data: mock, error: null }
      }
      return res
    } catch {
      const mock = MOCK_PRODUCTS.find(p => p.id === id)
      return { data: mock ?? null, error: mock ? null : new Error('Product not found') }
    }
  },

  async create(data) {
    try {
      const res = await supabase.from('products').insert(data).select().single()
      if (res.error) throw res.error
      return res
    } catch {
      const newProduct = { ...data, id: `prod-local-${Date.now()}`, created_at: new Date().toISOString() }
      MOCK_PRODUCTS.unshift(newProduct)
      return { data: newProduct, error: null }
    }
  },

  async update(id, data) {
    try {
      const res = await supabase.from('products').update(data).eq('id', id).select().single()
      if (res.error) throw res.error
      return res
    } catch {
      const idx = MOCK_PRODUCTS.findIndex(p => p.id === id)
      if (idx !== -1) {
        MOCK_PRODUCTS[idx] = { ...MOCK_PRODUCTS[idx], ...data }
        return { data: MOCK_PRODUCTS[idx], error: null }
      }
      return { data: null, error: new Error('Product not found') }
    }
  },

  async delete(id) {
    try {
      const res = await supabase.from('products').delete().eq('id', id)
      if (res.error) throw res.error
      return res
    } catch {
      const idx = MOCK_PRODUCTS.findIndex(p => p.id === id)
      if (idx !== -1) MOCK_PRODUCTS.splice(idx, 1)
      return { data: null, error: null }
    }
  },

  async uploadImage(file, productId) {
    try {
      const ext = file.name.split('.').pop()
      const path = `products/${productId}/${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('product-images').upload(path, file)
      if (error) throw error
      const { data } = supabase.storage.from('product-images').getPublicUrl(path)
      return data.publicUrl
    } catch {
      return URL.createObjectURL(file)
    }
  },

  async deleteImage(url) {
    const path = url.split('/product-images/')[1]
    return supabase.storage.from('product-images').remove([path])
  },
}
