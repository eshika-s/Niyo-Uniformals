import { useState, useEffect } from 'react'
import { Filter, Trash2, CheckCircle, Eye, Download } from 'lucide-react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { enquiryService } from '@/services/enquiryService'
import toast from 'react-hot-toast'

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-slate-100 text-slate-600',
  resolved: 'bg-green-100 text-green-700',
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const load = async () => {
    setLoading(true)
    const { data } = await enquiryService.getAll({ type: typeFilter || undefined, status: statusFilter || undefined, limit: 50 })
    setEnquiries(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [typeFilter, statusFilter])

  const updateStatus = async (id, status) => {
    await enquiryService.updateStatus(id, status)
    toast.success(`Marked as ${status}`)
    load()
  }

  const handleDelete = async id => {
    if (!confirm('Delete this enquiry?')) return
    await enquiryService.delete(id)
    toast.success('Enquiry deleted')
    if (selected?.id === id) setSelected(null)
    load()
  }

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Type', 'Status', 'Date', 'Message']
    const rows = enquiries.map(e => [e.customer_name, e.phone, e.email, e.type, e.status, new Date(e.created_at).toLocaleDateString('en-IN'), e.message])
    const csv = [headers, ...rows].map(r => r.map(v => `"${v || ''}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'enquiries.csv'; a.click()
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-hidden">
        <title>Enquiries — Niyo Admin</title>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-navy-900">Enquiries</h1>
            <p className="text-slate-500 text-sm">{enquiries.length} enquiries</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-slate-400" />
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
            <button onClick={exportCSV} className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-sm hover:bg-slate-50 transition-colors">
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="flex gap-5 h-[calc(100vh-14rem)]">
          {/* List */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-y-auto">
            {loading ? (
              [...Array(8)].map((_, i) => <div key={i} className="h-16 border-b border-slate-50 animate-pulse bg-slate-50/50" />)
            ) : enquiries.map(enq => (
              <div key={enq.id} onClick={() => { setSelected(enq); updateStatus(enq.id, 'read') }}
                className={`px-5 py-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${selected?.id === enq.id ? 'bg-navy-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-navy-900 flex items-center gap-2">
                    {enq.status === 'new' && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                    {enq.customer_name}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[enq.status] || ''}`}>
                    {enq.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{enq.phone} · {enq.type} · {new Date(enq.created_at).toLocaleDateString('en-IN')}</p>
              </div>
            ))}
            {!loading && enquiries.length === 0 && (
              <p className="text-center py-16 text-slate-400 text-sm">No enquiries found</p>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-80 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">{selected.customer_name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[selected.status] || ''}`}>
                  {selected.status}
                </span>
              </div>
              <div className="space-y-2 text-sm mb-5">
                <p><span className="text-slate-400">Phone:</span> <a href={`tel:${selected.phone}`} className="text-navy-700 hover:underline">{selected.phone}</a></p>
                {selected.email && <p><span className="text-slate-400">Email:</span> {selected.email}</p>}
                <p><span className="text-slate-400">Type:</span> {selected.type}</p>
                {selected.quantity && <p><span className="text-slate-400">Qty:</span> {selected.quantity} pcs</p>}
                <p><span className="text-slate-400">Date:</span> {new Date(selected.created_at).toLocaleString('en-IN')}</p>
              </div>
              {selected.message && (
                <div className="bg-slate-50 rounded-xl p-3 mb-5">
                  <p className="text-xs text-slate-400 mb-1">Message</p>
                  <p className="text-sm text-slate-600">{selected.message}</p>
                </div>
              )}
              <div className="space-y-2">
                <button onClick={() => updateStatus(selected.id, 'resolved')}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-medium rounded-xl transition-colors">
                  <CheckCircle size={14} />
                  Mark Resolved
                </button>
                <a href={`tel:${selected.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-navy-50 hover:bg-navy-100 text-navy-700 text-sm font-medium rounded-xl transition-colors">
                  <Eye size={14} />
                  Call Back
                </a>
                <button onClick={() => handleDelete(selected.id)}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-xl transition-colors">
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
