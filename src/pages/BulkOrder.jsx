import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, Building2, Phone, Mail, User, Package, FileText, BadgeCheck } from 'lucide-react'
import { enquiryService } from '@/services/enquiryService'
import toast from 'react-hot-toast'

const uniformTypes = [
  { value: 'Healthcare & Hospital Uniforms', label: 'Medical', emoji: '🩺' },
  { value: 'Chefs, Waiters & Housekeeping', label: 'Hospitality', emoji: '🏨' },
  { value: 'Corporate (Suits, Blazers, Shirts)', label: 'Corporate', emoji: '💼' },
  { value: 'Advocates & Legal (Coats & Gowns)', label: 'Advocates', emoji: '⚖️' },
  { value: 'School Uniforms', label: 'School', emoji: '🎒' },
  { value: 'Convocation (Gowns & Caps)', label: 'Convocation', emoji: '🎓' },
  { value: 'Other', label: 'Other', emoji: '✦' },
]

const inputCls = 'input-premium w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none text-sm text-[#0a1128] placeholder:text-slate-400 focus:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-400 transition-all duration-200'

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
      <main className="min-h-screen pt-24 flex items-center justify-center bg-stone-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-display font-bold text-[#0a1128] mb-3">Request Received!</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">Our team will contact you within 24 hours with a custom quote. You can also reach us directly on WhatsApp for faster response.</p>
          <a href="https://wa.me/919999999999"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-600 text-white font-semibold rounded-none hover:bg-green-500 transition-colors">
            Follow up on WhatsApp
          </a>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50 pt-16">
      <title>Bulk Order Quote — NIYO Uni-formals</title>

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[#b3913b] text-xs font-bold uppercase tracking-[0.22em] mb-4">
            B2B Wholesale
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Request a Bulk Quote
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            className="text-slate-300 max-w-xl mx-auto">
            Fill in your requirements below. We offer special pricing for orders of 50+ pieces.
          </motion.p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-7">
            {['Special Wholesale Pricing', 'GST Invoice Available', 'Free Sample on 100+ Orders'].map(b => (
              <div key={b} className="flex items-center gap-1.5 bg-stone-50/10 border border-white/10 rounded-full px-3 py-1.5">
                <BadgeCheck size={12} className="text-[#b3913b]" />
                <span className="text-white/80 text-xs font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <form id="bulk-order-form" onSubmit={handleSubmit} className="space-y-8">

            {/* Section 1: Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-stone-50 rounded-none border border-slate-100 shadow-sm p-7"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 rounded-none bg-navy-50 flex items-center justify-center">
                  <User size={14} className="text-navy-700" />
                </div>
                <h3 className="font-display font-semibold text-[#0a1128]">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Full Name *</label>
                  <input type="text" value={form.name} onChange={set('name')} required placeholder="Your name" className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Phone Number *</label>
                  <input type="tel" value={form.phone} onChange={set('phone')} required placeholder="+91 98765 43210" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" className={inputCls} />
                </div>
              </div>
            </motion.div>

            {/* Section 2: Organization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-stone-50 rounded-none border border-slate-100 shadow-sm p-7"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 rounded-none bg-navy-50 flex items-center justify-center">
                  <Building2 size={14} className="text-navy-700" />
                </div>
                <h3 className="font-display font-semibold text-[#0a1128]">Organization Details</h3>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Organization Name</label>
                <input type="text" value={form.organization} onChange={set('organization')} placeholder="School / Company / Hospital name" className={`${inputCls} mb-4`} />
              </div>

              {/* Visual uniform type selector */}
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">Uniform Type</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {uniformTypes.map(t => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, uniform_type: t.value }))}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-none border text-center transition-all duration-200 ${
                      form.uniform_type === t.value
                        ? 'bg-navy-800 border-navy-700 text-white shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-navy-300 hover:bg-navy-50'
                    }`}
                  >
                    <span className="text-xl">{t.emoji}</span>
                    <span className="text-[11px] font-semibold">{t.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Section 3: Order */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-stone-50 rounded-none border border-slate-100 shadow-sm p-7"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 rounded-none bg-navy-50 flex items-center justify-center">
                  <Package size={14} className="text-navy-700" />
                </div>
                <h3 className="font-display font-semibold text-[#0a1128]">Order Specifications</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Quantity Required *</label>
                  <input type="number" value={form.quantity} onChange={set('quantity')} required min="1" placeholder="e.g. 100" className={inputCls} />
                  <p className="text-[11px] text-[#b3913b] font-medium mt-1.5">✦ Special pricing for 50+ pieces</p>
                </div>
                <div className="flex items-start gap-3 bg-navy-50/50 border border-navy-100 rounded-none p-4 mt-auto">
                  <input type="checkbox" id="gst-required" checked={form.gst_required} onChange={set('gst_required')}
                    className="w-4 h-4 mt-0.5 accent-navy-700 cursor-pointer" />
                  <div>
                    <label htmlFor="gst-required" className="text-sm font-semibold text-navy-800 cursor-pointer block">GST Invoice Required</label>
                    <p className="text-[11px] text-slate-500 mt-0.5">For business tax claims</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Additional Requirements</label>
                <textarea value={form.message} onChange={set('message')} rows={4}
                  placeholder="Color preferences, logo customization, delivery timeline, fabric requirements…"
                  className={`${inputCls} resize-none`} />
              </div>
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-navy-800 to-navy-700 hover:from-navy-700 hover:to-navy-600 text-white font-bold rounded-none transition-all shadow-lg shadow-navy-900/20 hover:shadow-navy-900/30 disabled:opacity-60 text-base"
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {loading ? 'Submitting…' : 'Submit Bulk Quote Request'}
            </motion.button>

            <p className="text-center text-xs text-slate-400">
              We typically respond within 24 hours. For urgent orders,{' '}
              <a href="https://wa.me/919999999999" className="text-green-600 font-semibold hover:underline">WhatsApp us directly</a>.
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
