import { Link } from 'react-router-dom'
import { ShoppingBag, MapPin, Phone, Mail, MessageCircle, Camera, Users } from 'lucide-react'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'Bulk Orders', to: '/bulk-order' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const categories = [
  'School Uniforms',
  'Corporate Uniforms',
  'Hospital & Healthcare',
  'Hotel & Hospitality',
  'Industrial Uniforms',
  'Sports Uniforms',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-slate-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center">
                <ShoppingBag size={18} className="text-gold-400" />
              </div>
              <div>
                <span className="block text-white font-display font-bold text-lg">Niyo</span>
                <span className="block text-gold-500 text-xs font-semibold tracking-widest uppercase -mt-1">Uniformals</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Premium wholesale & retail uniforms for schools, corporates, hospitals and more. Based in Gandhi Nagar, East Delhi.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold-500/20 flex items-center justify-center transition-colors">
                <Camera size={16} className="text-slate-400" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold-500/20 flex items-center justify-center transition-colors">
                <Users size={16} className="text-slate-400" />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-500/20 flex items-center justify-center transition-colors"
              >
                <MessageCircle size={16} className="text-slate-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <Link
                    to={`/catalogue?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-slate-400 hover:text-gold-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">IX/6202, Jain Mandir Gali, Ram Nagar, Gandhi Nagar, East Delhi, Delhi - 110031</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold-500 shrink-0" />
                <a href="tel:+919999999999" className="text-sm text-slate-400 hover:text-white transition-colors">
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold-500 shrink-0" />
                <a href="mailto:info@niyouniforms.com" className="text-sm text-slate-400 hover:text-white transition-colors">
                  info@niyouniforms.com
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {year} Niyo Uniformals. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Gandhi Nagar, East Delhi, Delhi - 110031
          </p>
        </div>
      </div>
    </footer>
  )
}
