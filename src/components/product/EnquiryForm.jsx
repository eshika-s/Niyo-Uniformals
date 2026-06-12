import { useState } from 'react'
import { Send, Loader2, CheckCircle, MessageCircle } from 'lucide-react'
import { enquiryService } from '@/services/enquiryService'
import toast from 'react-hot-toast'

const inputCls = 'input-premium w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-navy-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-400 transition-all duration-200'

export default function EnquiryForm({ product }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', quantity: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

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
      setSent(true)
      toast.success("Enquiry sent! We'll contact you soon.")
    } catch {
      toast.error('Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-7 border border-green-100 text-center">
        <div className="w-14 h-14 rounded-full bg-white border border-green-200 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={24} className="text-green-500" />
        </div>
        <h3 className="font-display font-bold text-navy-900 text-lg mb-1">Enquiry Sent!</h3>
        <p className="text-sm text-slate-500">We'll contact you within 24 hours.</p>
        <a
          href="https://wa.me/919999999999"
          target="_blank" rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <MessageCircle size={14} />
          Also Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-2xl p-7 border border-navy-800/50">
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-xl text-white mb-1">Enquire About This Product</h3>
        <p className="text-sm text-slate-400">Fill the form and we'll get back to you within 24 hours.</p>
      </div>

      <form id="product-enquiry-form" onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Full Name *</label>
            <input
              type="text" value={form.name} onChange={set('name')}
              placeholder="Your name" required
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 focus:bg-white/15 transition-all duration-200"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Phone *</label>
            <input
              type="tel" value={form.phone} onChange={set('phone')}
              placeholder="+91 98765 43210" required
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 focus:bg-white/15 transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Email (optional)</label>
          <input
            type="email" value={form.email} onChange={set('email')} placeholder="your@email.com"
            className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 focus:bg-white/15 transition-all duration-200"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Quantity Required</label>
          <input
            type="number" value={form.quantity} onChange={set('quantity')} placeholder="e.g. 50 pieces" min="1"
            className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 focus:bg-white/15 transition-all duration-200"
          />
          <p className="text-[11px] text-gold-400 font-medium mt-1.5">✦ 50+ pieces qualify for wholesale pricing</p>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Message</label>
          <textarea
            value={form.message} onChange={set('message')}
            placeholder="Any specific requirements, customizations, or questions..."
            rows={3}
            className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 focus:bg-white/15 transition-all duration-200 resize-none"
          />
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 text-sm font-bold rounded-xl transition-colors disabled:opacity-60 shadow-lg shadow-gold-500/20"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {loading ? 'Sending…' : 'Send Enquiry'}
        </button>

        <a
          href="https://wa.me/919999999999"
          target="_blank" rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 border border-white/10 text-white/70 hover:text-white hover:border-white/20 text-sm font-medium rounded-xl transition-all"
        >
          <MessageCircle size={14} />
          Or message via WhatsApp
        </a>
      </form>
    </div>
  )
}
