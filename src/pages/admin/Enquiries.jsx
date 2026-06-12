import { useState, useEffect, useCallback } from 'react'
import { Filter, Trash2, CheckCircle, Phone, Download, Search, MessageCircle, X, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '@/components/layout/AdminLayout'
import { enquiryService } from '@/services/enquiryService'
import toast from 'react-hot-toast'

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-slate-100 text-slate-600',
  resolved: 'bg-green-100 text-green-700',
}

const STATUS_LABELS = {
  new: 'New',
  read: 'Read',
  resolved: 'Resolved',
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selected, setSelected] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await enquiryService.getAll({
      type: typeFilter || undefined,
      status: statusFilter || undefined,
      search: search.trim() || undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo ? dateTo + 'T23:59:59Z' : undefined,
      limit: 100,
    })
    setEnquiries(data ?? [])
    setLoading(false)
  }, [typeFilter, statusFilter, search, dateFrom, dateTo])

  useEffect(() => { load() }, [load])

  const updateStatus = async (id, status) => {
    await enquiryService.updateStatus(id, status)
    toast.success(`Marked as ${STATUS_LABELS[status]}`)
    // Update local state too
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e))
    if (selected?.id === id) setSelected(s => ({ ...s, status }))
  }

  const handleDelete = async id => {
    if (!confirm('Delete this enquiry? This cannot be undone.')) return
    await enquiryService.delete(id)
    toast.success('Enquiry deleted')
    if (selected?.id === id) setSelected(null)
    load()
  }

  const openEnquiry = enq => {
    setSelected(enq)
    if (enq.status === 'new') updateStatus(enq.id, 'read')
  }

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Type', 'Status', 'Date', 'Message', 'Product']
    const rows = enquiries.map(e => [
      e.customer_name, e.phone, e.email, e.type, e.status,
      new Date(e.created_at).toLocaleDateString('en-IN'),
      e.message, e.products?.name || '',
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${v || ''}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `enquiries-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success('CSV exported!')
  }

  const clearFilters = () => {
    setTypeFilter(''); setStatusFilter(''); setSearch(''); setDateFrom(''); setDateTo('')
  }
  const hasFilters = typeFilter || statusFilter || search || dateFrom || dateTo

  const newCount = enquiries.filter(e => e.status === 'new').length

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }

  return (
    <AdminLayout
      title="Enquiries"
      subtitle={`${enquiries.length} total${newCount > 0 ? ` · ${newCount} unread` : ''}`}
    >
      <title>Enquiries — Niyo Admin</title>

      {/* Filters row */}
      <motion.div 
        className="flex flex-wrap gap-3 mb-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Search */}
        <div className="relative flex-1 min-w-44">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name or phone…"
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={13} className="text-slate-400" />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none bg-white">
            <option value="">All Types</option>
            <option value="retail">Retail</option>
            <option value="bulk">Bulk</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none bg-white">
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2">
          <Calendar size={13} className="text-slate-400" />
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none bg-white" />
          <span className="text-slate-400 text-xs">to</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none bg-white" />
        </div>

        {hasFilters && (
          <button onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <X size={12} /> Clear
          </button>
        )}

        <button onClick={exportCSV}
          className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-sm hover:bg-slate-50 transition-colors ml-auto">
          <Download size={14} />
          Export CSV
        </button>
      </motion.div>

      {/* Split panel */}
      <div className="flex gap-5 h-[calc(100vh-20rem)]">
        {/* Enquiry List */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-y-auto">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="h-20 border-b border-slate-50 animate-pulse bg-slate-50/50" />
            ))
          ) : enquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <MessageCircle size={36} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">No enquiries found</p>
              {hasFilters && <p className="text-xs mt-1">Try clearing the filters</p>}
            </div>
          ) : (
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {enquiries.map(enq => (
                <motion.div
                  key={enq.id}
                  variants={itemVariants}
                  onClick={() => openEnquiry(enq)}
                  className={`px-5 py-4 border-b border-slate-50 cursor-pointer transition-colors ${
                    selected?.id === enq.id ? 'bg-navy-50 border-l-2 border-l-navy-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {enq.status === 'new' && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-0.5" />
                      )}
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${enq.status === 'new' ? 'text-navy-900' : 'text-slate-700'}`}>
                          {enq.customer_name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {enq.phone}
                          {enq.products?.name && ` · ${enq.products.name}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[enq.status] || ''}`}>
                        {STATUS_LABELS[enq.status] || enq.status}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {new Date(enq.created_at).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  {enq.type && (
                    <span className="mt-1.5 inline-block text-[10px] uppercase tracking-wide font-semibold text-slate-400">
                      {enq.type} order
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div 
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-80 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-y-auto flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-50">
                <div>
                  <h3 className="font-bold text-navy-900">{selected.customer_name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[selected.status] || ''}`}>
                    {STATUS_LABELS[selected.status] || selected.status}
                  </span>
                </div>
                <button onClick={() => setSelected(null)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                  <X size={14} />
                </button>
              </div>

              {/* Details */}
              <div className="px-5 py-4 space-y-3 text-sm flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">Phone</p>
                    <a href={`tel:${selected.phone}`} className="text-navy-700 font-medium hover:underline">{selected.phone}</a>
                  </div>
                  {selected.email && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">Email</p>
                      <p className="text-navy-700 break-all text-xs">{selected.email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">Order Type</p>
                    <span className="capitalize font-medium text-navy-900">{selected.type}</span>
                  </div>
                  {selected.quantity && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">Quantity</p>
                      <span className="font-medium text-navy-900">{selected.quantity} pcs</span>
                    </div>
                  )}
                </div>

                {selected.products?.name && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5">Product Enquired</p>
                    <p className="text-navy-900 font-medium text-xs bg-navy-50 px-2.5 py-1.5 rounded-lg">{selected.products.name}</p>
                  </div>
                )}

                {selected.message && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">Message</p>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-sm text-slate-600 leading-relaxed">{selected.message}</p>
                    </div>
                  </div>
                )}

                <p className="text-xs text-slate-400">
                  Received: {new Date(selected.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>

              {/* Actions */}
              <div className="px-5 pb-5 space-y-2 border-t border-slate-50 pt-4">
                {/* WhatsApp quick reply */}
                <a
                  href={`https://wa.me/${selected.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selected.customer_name}, thank you for your enquiry at Niyo Uniformals. `)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={15} fill="currentColor" />
                  Reply on WhatsApp
                </a>

                <a href={`tel:${selected.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-navy-50 hover:bg-navy-100 text-navy-700 text-sm font-medium rounded-xl transition-colors">
                  <Phone size={14} />
                  Call Back
                </a>

                {selected.status !== 'resolved' && (
                  <button onClick={() => updateStatus(selected.id, 'resolved')}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium rounded-xl transition-colors">
                    <CheckCircle size={14} />
                    Mark Resolved
                  </button>
                )}

                <button onClick={() => handleDelete(selected.id)}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-xl transition-colors">
                  <Trash2 size={14} />
                  Delete Enquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-80 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center text-slate-300"
            >
              <div className="text-center p-8">
                <MessageCircle size={36} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">Select an enquiry to view details</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  )
}
