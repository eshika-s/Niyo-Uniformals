import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, MessageCircle, Send, Loader2, Clock, CheckCircle } from 'lucide-react'
import { enquiryService } from '@/services/enquiryService'
import toast from 'react-hot-toast'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Office Address',
    value: 'IX/6202, Jain Mandir Gali Chowk, Ram Nagar, Gandhi Nagar, Delhi - 110031',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 99999 99999',
    href: 'tel:+919999999999',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@niyouniforms.com',
    href: 'mailto:info@niyouniforms.com',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon – Sat: 10:00 AM – 7:00 PM',
    href: null,
  },
]

const inputCls = 'input-premium w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none text-sm text-[#0a1128] placeholder:text-slate-400 focus:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-400 transition-all duration-200'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.phone) return toast.error('Name and phone are required')
    setLoading(true)
    try {
      const { error } = await enquiryService.create({ ...form, type: 'retail' })
      if (error) throw error
      setSent(true)
      toast.success("Message sent! We'll get back to you soon.")
    } catch {
      toast.error('Something went wrong. Try WhatsApp instead!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-16 bg-stone-50">
      <title>Contact Us — NIYO Uni-formals</title>

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[#b3913b] text-xs font-bold uppercase tracking-[0.22em] mb-4">
            Reach Out
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-slate-300 max-w-xl mx-auto">
            Have questions or need a quote? Reach out and we'll respond within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Info cards */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-start gap-4 p-5 bg-stone-50 border border-slate-100 hover:border-gold-200 rounded-none shadow-sm hover:shadow-md transition-[box-shadow,border-color] duration-300"
                >
                  <div className="w-10 h-10 rounded-none bg-navy-50 group-hover:bg-gold-50 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon size={16} className="text-navy-700 group-hover:text-[#b3913b] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-navy-800 hover:text-[#b3913b] transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm font-medium text-navy-800">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <a
                href="https://wa.me/919999999999"
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-none transition-colors text-sm"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-stone-50 rounded-none border border-slate-100 shadow-sm p-8"
              >
                <h2 className="text-xl font-display font-bold text-[#0a1128] mb-1">Send us a Message</h2>
                <p className="text-sm text-slate-400 mb-7">We typically respond within 24 hours on business days.</p>

                <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                      <CheckCircle size={28} className="text-green-500" />
                    </div>
                    <h3 className="font-display font-bold text-[#0a1128] text-xl mb-2">Message Sent!</h3>
                    <p className="text-slate-500 text-sm max-w-xs">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    id="contact-form" onSubmit={handleSubmit} className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Full Name *</label>
                        <input type="text" value={form.name} onChange={set('name')} required placeholder="Your name" className={inputCls} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Phone *</label>
                        <input type="tel" value={form.phone} onChange={set('phone')} required placeholder="+91 98765 43210" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Email</label>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Message</label>
                      <textarea value={form.message} onChange={set('message')} rows={5}
                        placeholder="Tell us about your uniform requirements…"
                        className={`${inputCls} resize-none`} />
                    </div>
                    <motion.button type="submit" disabled={loading}
                      className="flex items-center gap-2 px-8 py-3.5 bg-navy-800 hover:bg-navy-700 text-white font-semibold rounded-none transition-colors disabled:opacity-60 text-sm"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                      {loading ? 'Sending…' : 'Send Message'}
                    </motion.button>
                  </motion.form>
                )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-none overflow-hidden border border-slate-100 shadow-sm h-72 relative"
          >
            <div className="absolute top-3 left-3 z-10 bg-stone-50/95 backdrop-blur-sm px-3 py-1.5 rounded-none border border-slate-100 shadow-sm flex items-center gap-2">
              <MapPin size={12} className="text-[#b3913b]" />
              <span className="text-xs font-semibold text-navy-800">Gandhi Nagar, Delhi</span>
            </div>
            <iframe
              title="NIYO Uni-formals Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.5!2d77.2432!3d28.6722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b7e6d5bd3%3A0x7e68d9b8e4b7e800!2sGandhi%20Nagar%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
