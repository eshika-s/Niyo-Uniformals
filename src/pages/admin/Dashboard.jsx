import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Package, Tag, MessageSquare, TrendingUp, ArrowRight,
  Plus, Settings, Eye, Bell
} from 'lucide-react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/layout/AdminLayout'
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
        ...enqStats, // spreads: enquiries, today, unread
      })
      setRecentEnquiries(recentEnq.data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const statCards = [
    {
      label: 'Total Products', value: stats.products, icon: Package,
      iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
      valueBg: 'from-blue-600', to: '/admin/products'
    },
    {
      label: 'Categories', value: stats.categories, icon: Tag,
      iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
      valueBg: 'from-purple-600', to: '/admin/categories'
    },
    {
      label: 'Total Enquiries', value: stats.enquiries, icon: MessageSquare,
      iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600',
      valueBg: 'from-emerald-600', to: '/admin/enquiries'
    },
    {
      label: 'New Today', value: stats.today, icon: TrendingUp,
      iconBg: 'bg-gold-50', iconColor: 'text-gold-600',
      valueBg: 'from-gold-500', to: '/admin/enquiries'
    },
  ]

  const quickActions = [
    {
      icon: Plus, label: 'Add Product', desc: 'List a new uniform item',
      color: 'bg-navy-700 hover:bg-navy-800 text-white', to: '/admin/products',
    },
    {
      icon: MessageSquare, label: 'View Enquiries', desc: `${stats.unread} unread messages`,
      color: 'bg-white hover:bg-slate-50 text-navy-900 border border-slate-200', to: '/admin/enquiries',
    },
    {
      icon: Settings, label: 'Site Settings', desc: 'Edit content & contacts',
      color: 'bg-white hover:bg-slate-50 text-navy-900 border border-slate-200', to: '/admin/settings',
    },
    {
      icon: Eye, label: 'View Live Site', desc: 'Opens in new tab',
      color: 'bg-white hover:bg-slate-50 text-navy-900 border border-slate-200', to: '/',
      external: true,
    },
  ]

  const STATUS_COLORS = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-slate-100 text-slate-600',
    resolved: 'bg-green-100 text-green-700',
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  return (
    <AdminLayout>
      <title>Dashboard — Niyo Admin</title>

      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Welcome back! Here's what's happening at Niyo Uniformals.</p>
        </div>
        {stats.unread > 0 && (
          <motion.button
            onClick={() => navigate('/admin/enquiries?status=new')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            <Bell size={15} className="animate-pulse" />
            {stats.unread} unread {stats.unread === 1 ? 'enquiry' : 'enquiries'}
            <ArrowRight size={13} />
          </motion.button>
        )}
      </div>

      {/* Stat Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map(({ label, value, icon: Icon, iconBg, iconColor, to }) => (
          <motion.button
            key={label}
            onClick={() => navigate(to)}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl border border-slate-100 p-5 text-left shadow-sm hover:shadow-md transition-all group"
          >
            <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
              <Icon size={20} className={iconColor} />
            </div>
            <p className="text-3xl font-bold text-navy-900">{loading ? '—' : value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{label}</p>
            <div className="flex items-center gap-1 text-xs text-navy-500 mt-3 group-hover:text-navy-700 transition-colors font-medium">
              View all <ArrowRight size={11} />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Quick Actions</h2>
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {quickActions.map(({ icon: Icon, label, desc, color, to, external }) => (
            <motion.button
              key={label}
              onClick={() => external ? window.open(to, '_blank') : navigate(to)}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`${color} rounded-2xl p-4 text-left shadow-sm transition-all`}
            >
              <Icon size={20} className="mb-3 opacity-80" />
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-xs opacity-60 mt-0.5">{desc}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Recent Enquiries */}
      <motion.div 
        className="bg-white rounded-2xl border border-slate-100 shadow-sm"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
          <h2 className="font-semibold text-navy-900">Recent Enquiries</h2>
          <button
            onClick={() => navigate('/admin/enquiries')}
            className="text-xs text-navy-500 hover:text-navy-700 flex items-center gap-1 font-medium"
          >
            View all <ArrowRight size={11} />
          </button>
        </div>
        <motion.div 
          className="divide-y divide-slate-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="px-6 py-4 flex gap-4 animate-pulse">
                <div className="h-4 bg-slate-100 rounded flex-1" />
                <div className="h-4 bg-slate-100 rounded w-20" />
              </div>
            ))
          ) : recentEnquiries.length > 0 ? (
            recentEnquiries.map(enq => (
              <motion.div
                key={enq.id}
                onClick={() => navigate('/admin/enquiries')}
                variants={cardVariants}
                whileHover={{ backgroundColor: '#f8fafc' }}
                className="px-6 py-4 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {enq.status === 'new' && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-navy-900">{enq.customer_name}</p>
                    <p className="text-xs text-slate-400">{enq.phone} · {enq.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[enq.status] || 'bg-slate-100 text-slate-600'}`}>
                    {enq.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(enq.created_at).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="px-6 py-10 text-sm text-slate-400 text-center">No enquiries yet</p>
          )}
        </motion.div>
      </motion.div>
    </AdminLayout>
  )
}
