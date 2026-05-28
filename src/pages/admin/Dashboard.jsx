import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Tag, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { enquiryService } from '@/services/enquiryService'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ products: 0, categories: 0, enquiries: 0, today: 0, unread: 0 })
  const [recentEnquiries, setRecentEnquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [prodCount, catCount, enqStats, recentEnq] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        enquiryService.getStats(),
        supabase.from('enquiries').select('*, products(name)').order('created_at', { ascending: false }).limit(5),
      ])
      setStats({
        products: prodCount.count ?? 0,
        categories: catCount.count ?? 0,
        ...enqStats,
      })
      setRecentEnquiries(recentEnq.data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'bg-blue-50 text-blue-700', to: '/admin/products' },
    { label: 'Categories', value: stats.categories, icon: Tag, color: 'bg-purple-50 text-purple-700', to: '/admin/categories' },
    { label: 'Total Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'bg-green-50 text-green-700', to: '/admin/enquiries' },
    { label: 'New Today', value: stats.today, icon: TrendingUp, color: 'bg-gold-50 text-gold-700', to: '/admin/enquiries' },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <title>Dashboard — Niyo Admin</title>

        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-navy-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Welcome back! Here's what's happening.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, to }) => (
            <button
              key={label}
              onClick={() => navigate(to)}
              className="bg-white rounded-2xl border border-slate-100 p-5 text-left hover:shadow-md transition-shadow group"
            >
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold text-navy-900">{loading ? '—' : value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{label}</p>
              <div className="flex items-center gap-1 text-xs text-navy-500 mt-3 group-hover:text-navy-700 transition-colors">
                View all <ArrowRight size={11} />
              </div>
            </button>
          ))}
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <h2 className="font-semibold text-navy-900">Recent Enquiries</h2>
            <button onClick={() => navigate('/admin/enquiries')} className="text-xs text-navy-500 hover:text-navy-700 flex items-center gap-1">
              View all <ArrowRight size={11} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="px-6 py-4 flex gap-4 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded flex-1" />
                  <div className="h-4 bg-slate-100 rounded w-20" />
                </div>
              ))
            ) : recentEnquiries.length > 0 ? (
              recentEnquiries.map(enq => (
                <div key={enq.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-900">{enq.customer_name}</p>
                    <p className="text-xs text-slate-400">{enq.phone} · {enq.type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      enq.status === 'new' ? 'bg-blue-100 text-blue-700' :
                      enq.status === 'read' ? 'bg-slate-100 text-slate-600' : 'bg-green-100 text-green-700'
                    }`}>
                      {enq.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(enq.created_at).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="px-6 py-8 text-sm text-slate-400 text-center">No enquiries yet</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
