import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { enquiryService } from '@/services/enquiryService'
import toast from 'react-hot-toast'

export default function EnquiryForm({ product }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', quantity: '' })
  const [loading, setLoading] = useState(false)

  const set = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.phone) return toast.error('Name and phone are required')
    setLoading(true)
    try {
      const { error } = await enquiryService.create({
        ...form,
        product_id: product?.id,
        type: 'retail',
      })
      if (error) throw error
      toast.success('Enquiry sent! We\'ll contact you soon.')
      setForm({ name: '', email: '', phone: '', message: '', quantity: '' })
    } catch (err) {
      toast.error('Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-navy-50 rounded-2xl p-6 border border-navy-100">
      <h3 className="font-display font-bold text-lg text-navy-900 mb-1">Enquire About This Product</h3>
      <p className="text-sm text-slate-500 mb-5">Fill the form and we'll get back to you within 24 hours.</p>

      <form id="product-enquiry-form" onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Full Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={set('name')}
              placeholder="Your name"
              required
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Phone Number *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={set('phone')}
              placeholder="+91 98765 43210"
              required
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1">Email (optional)</label>
          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="your@email.com"
            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1">Quantity Required</label>
          <input
            type="number"
            value={form.quantity}
            onChange={set('quantity')}
            placeholder="e.g. 50 pieces"
            min="1"
            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1">Message</label>
          <textarea
            value={form.message}
            onChange={set('message')}
            placeholder="Any specific requirements, customizations, or questions..."
            rows={3}
            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-navy-700 hover:bg-navy-800 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {loading ? 'Sending…' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  )
}
