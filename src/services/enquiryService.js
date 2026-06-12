import { supabase } from '@/lib/supabase'

export const enquiryService = {
  async getAll({ type, status, search, dateFrom, dateTo, page = 1, limit = 50 } = {}) {
    let query = supabase
      .from('enquiries')
      .select('*, products(id, name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (type) query = query.eq('type', type)
    if (status) query = query.eq('status', status)
    if (search) query = query.or(`customer_name.ilike.%${search}%,phone.ilike.%${search}%`)
    if (dateFrom) query = query.gte('created_at', dateFrom)
    if (dateTo) query = query.lte('created_at', dateTo)

    return query
  },

  async create(data) {
    // Map `name` → `customer_name` to match DB schema
    const { name, ...rest } = data
    return supabase.from('enquiries').insert({ ...rest, customer_name: name ?? data.customer_name }).select().single()
  },

  async updateStatus(id, status) {
    return supabase.from('enquiries').update({ status }).eq('id', id).select().single()
  },

  async delete(id) {
    return supabase.from('enquiries').delete().eq('id', id)
  },

  async getStats() {
    const today = new Date().toISOString().split('T')[0]
    const [total, todayCount, unread] = await Promise.all([
      supabase.from('enquiries').select('*', { count: 'exact', head: true }),
      supabase.from('enquiries').select('*', { count: 'exact', head: true }).gte('created_at', today),
      supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    ])
    return {
      // `enquiries` key used by Dashboard stats spread
      enquiries: total.count ?? 0,
      today: todayCount.count ?? 0,
      unread: unread.count ?? 0,
    }
  },
}
