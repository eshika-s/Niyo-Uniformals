import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, MessageCircle, Send, Loader2 } from 'lucide-react'
import { enquiryService } from '@/services/enquiryService'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.phone) return toast.error('Name and phone are required')
    setLoading(true)
    try {
      const { error } = await enquiryService.create({ ...form, type: 'retail' })
      if (error) throw error
      toast.success('Message sent! We\'ll get back to you soon.')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Something went wrong. Try WhatsApp instead!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-16 bg-white">
      <title>Contact Us — Niyo Uniformals</title>

      {/* Header */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold text-white mb-3"
        >
          Get in Touch
        </motion.h1>
        <p className="text-slate-300 max-w-xl mx-auto">
          Have questions or need a quote? Reach out and we'll respond within 24 hours.
        </p>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-5">
              <h2 className="text-xl font-display font-bold text-navy-900">Contact Information</h2>

              {[
                { icon: MapPin, label: 'Address', value: 'IX/6202, Jain Mandir Gali, Ram Nagar, Gandhi Nagar, East Delhi, Delhi - 110031' },
                { icon: Phone, label: 'Phone', value: '+91 99999 99999', href: 'tel:+919999999999' },
                { icon: Mail, label: 'Email', value: 'info@niyouniforms.com', href: 'mailto:info@niyouniforms.com' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-navy-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-navy-800 hover:text-gold-600 transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm font-medium text-navy-800">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle size={17} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-xl font-display font-bold text-navy-900 mb-6">Send us a Message</h2>
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">Full Name *</label>
                    <input type="text" value={form.name} onChange={set('name')} required placeholder="Your name"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">Phone *</label>
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
                  <label className="text-xs font-medium text-slate-500 block mb-1.5">Message</label>
                  <textarea value={form.message} onChange={set('message')} rows={5} placeholder="Tell us about your uniform requirements…"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-navy-700 hover:bg-navy-800 text-white font-semibold rounded-xl transition-colors disabled:opacity-60">
                  {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-10 rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-72">
            <iframe
              title="Niyo Uniformals Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4!2d77.2432!3d28.6622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM5JzQ0LjAiTiA3N8KwMTQnMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
