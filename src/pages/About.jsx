import { motion } from 'framer-motion'
import { Shield, Users, Award, Clock, Heart, Truck } from 'lucide-react'

const values = [
  { icon: Shield, title: 'Quality First', desc: 'Premium fabrics and rigorous quality checks on every piece.' },
  { icon: Users, title: 'Customer Focus', desc: 'We listen to your requirements and deliver exactly what you need.' },
  { icon: Award, title: 'Expertise', desc: '15+ years of experience in uniform manufacturing and wholesale.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We understand your deadlines and always deliver on time.' },
  { icon: Heart, title: 'Made with Care', desc: 'Every uniform is stitched with precision and attention to detail.' },
  { icon: Truck, title: 'Pan-India Shipping', desc: 'We deliver to all major cities across India.' },
]

export default function About() {
  return (
    <main className="min-h-screen pt-16 bg-white">
      <title>About Us — Niyo Uniformals</title>

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-5"
          >
            About Niyo Uniformals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Based in the heart of Gandhi Nagar, East Delhi — India's largest garment market — we have been supplying premium quality uniforms to schools, corporates, hospitals, and hotels for over 15 years.
          </motion.p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">Who We Are</p>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-5">
                Gandhi Nagar's Trusted Uniform Partner
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Niyo Uniformals was founded with a simple mission: provide businesses and institutions with high-quality uniforms at competitive wholesale prices, without compromising on craftsmanship.
                </p>
                <p>
                  Strategically located in Gandhi Nagar, East Delhi — one of India's largest textile and garment hubs — we have direct access to premium fabrics and skilled artisans, allowing us to offer unbeatable quality and pricing.
                </p>
                <p>
                  We serve both B2B bulk clients and B2C retail customers, with orders ranging from 10 pieces to 10,000+ pieces. Our state-of-the-art tailoring unit ensures consistent quality across every order.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { n: '5000+', l: 'Uniforms Delivered' },
                { n: '200+', l: 'Happy Clients' },
                { n: '15+', l: 'Years Experience' },
                { n: '50+', l: 'Fabric Options' },
              ].map(({ n, l }) => (
                <div key={l} className="bg-navy-50 rounded-2xl p-6 border border-navy-100 text-center">
                  <p className="text-3xl font-display font-bold text-navy-800">{n}</p>
                  <p className="text-sm text-slate-500 mt-1">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-2">What Drives Us</p>
            <h2 className="text-3xl font-display font-bold text-navy-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-navy-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-navy-700" />
                </div>
                <h3 className="font-display font-bold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
