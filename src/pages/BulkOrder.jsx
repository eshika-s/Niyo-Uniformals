import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle } from 'lucide-react'
import { enquiryService } from '@/services/enquiryService'
import toast from 'react-hot-toast'

const uniformTypes = ['School Uniform', 'Corporate Uniform', 'Healthcare', 'Hospitality', 'Industrial', 'Sports', 'Other']

export default function BulkOrder() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', organization: '',
    uniform_type: '', quantity: '', message: '', gst_required: false,
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = f => e => setForm(p => ({
    ...p, [f]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
  }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.quantity) return toast.error('Please fill all required fields')
    setLoading(true)
    try {
      const { error } = await enquiryService.create({
        name: form.name, phone: form.phone, email: form.email,
        message: `Org: ${form.organization} | Type: ${form.uniform_type} | GST: ${form.gst_required ? 'Yes' : 'No'} | Notes: ${form.message}`,
        quantity: parseInt(form.quantity),
        type: 'bulk',
      })
      if (error) throw error
      setSubmitted(true)
    } catch {
      toast.error('Failed to submit. Please try WhatsApp instead.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-5" />
          <h1 className="text-3xl font-display font-bold text-navy-900 mb-3">Request Received!</h1>
          <p className="text-slate-500 mb-6">Our team will contact you within 24 hours with a custom quote. You can also reach us directly on WhatsApp for faster response.</p>
          <a
            href="https://wa.me/919999999999"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            Follow up on WhatsApp
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-16">
      <title>Bulk Order Quote — Niyo Uniformals</title>

      {/* Header */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold text-white mb-3"
        >
          Request a Bulk Quote
        </motion.h1>
        <p className="text-slate-300 max-w-xl mx-auto">
          Fill in your requirements below. We offer special pricing for orders of 50+ pieces.
        </p>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <form id="bulk-order-form" onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Full Name *</label>
                <input type="text" value={form.name} onChange={set('name')} required placeholder="Your name"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Phone Number *</label>
                <input type="tel" value={form.phone} onChange={set('phone')} required placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Organization Name</label>
              <input type="text" value={form.organization} onChange={set('organization')} placeholder="School / Company / Hospital name"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Uniform Type</label>
                <select value={form.uniform_type} onChange={set('uniform_type')}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white">
                  <option value="">Select type</option>
                  {uniformTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">Quantity Required *</label>
                <input type="number" value={form.quantity} onChange={set('quantity')} required min="1" placeholder="e.g. 100"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Additional Requirements</label>
              <textarea value={form.message} onChange={set('message')} rows={4}
                placeholder="Color preferences, logo customization, delivery timeline, fabric requirements…"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none" />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" id="gst-required" checked={form.gst_required} onChange={set('gst_required')}
                className="w-4 h-4 rounded border-slate-300 text-navy-700" />
              <span className="text-sm text-slate-600">GST invoice required</span>
            </label>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-navy-700 hover:bg-navy-800 text-white font-bold rounded-xl transition-colors disabled:opacity-60 text-base">
              {loading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
              {loading ? 'Submitting…' : 'Submit Bulk Quote Request'}
            </button>

            <p className="text-center text-xs text-slate-400">
              We typically respond within 24 hours. For urgent orders,{' '}
              <a href="https://wa.me/919999999999" className="text-green-600 font-medium">WhatsApp us directly</a>.
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
