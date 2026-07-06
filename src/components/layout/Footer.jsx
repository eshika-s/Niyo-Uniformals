import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-obsidian-950 border-t border-white/10 py-12 md:py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 pb-12 md:pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="shrink-0 flex items-center mb-6">
              <div
                className="rounded-full overflow-hidden transition-all duration-300 flex-shrink-0"
                style={{
                  width: '80px',
                  height: '80px',
                  boxShadow: '0 2px 16px rgba(201,168,76,0.25)',
                  border: '1.5px solid rgba(201,168,76,0.3)',
                }}
              >
                <img
                  src="/images/logo1.jpeg"
                  alt="NIYO Uni-formals"
                  style={{
                    width: '209%',
                    height: '250%',
                    marginLeft: '0%',
                    marginTop: '-63%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            </Link>
            <p className="text-obsidian-400 text-sm leading-relaxed pr-4 font-light">
              Wholesale garment manufacturing and institutional apparel supply since 1994.
            </p>
          </div>

          {/* Delhi Office */}
          <div>
            <h4 className="text-obsidian-300 font-bold text-[11px] tracking-[0.2em] uppercase mb-6">
              Delhi Office
            </h4>
            <div className="text-obsidian-500 text-sm space-y-1.5 leading-relaxed font-light mb-4">
              <p>12/481 Gandhi Nagar</p>
              <p>Main Market Road</p>
              <p>New Delhi, 110031</p>
            </div>
            <div className="w-full h-32 rounded-lg overflow-hidden border border-white/10 opacity-80 hover:opacity-100 transition-opacity">
              <iframe
                title="Delhi Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14005.14389657065!2d77.26084615!3d28.6511677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfc8d45ba8903%3A0xc0fb19ce77de144e!2sGandhi%20Nagar%2C%20New%20Delhi%2C%20Delhi%20110031!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Communication */}
          <div>
            <h4 className="text-obsidian-300 font-bold text-[11px] tracking-[0.2em] uppercase mb-6">
              Communication
            </h4>
            <div className="text-obsidian-500 text-sm space-y-1.5 leading-relaxed font-light">
              <p className="hover:text-electric-400 cursor-pointer transition-colors">WhatsApp: +91 98710 00000</p>
              <p className="hover:text-electric-400 cursor-pointer transition-colors">enquiry@niyouniforms.in</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-obsidian-300 font-bold text-[11px] tracking-[0.2em] uppercase mb-6">
              Status
            </h4>
            <div className="flex items-center gap-2 text-electric-400 bg-electric-900/30 px-4 py-2 rounded-lg border border-electric-500/20 w-max">
              <span className="w-2 h-2 rounded-full bg-electric-500 animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wide">Taking Bulk Orders</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-2 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-obsidian-600 uppercase tracking-wider">
          <p>© 2026 NIYO UNIFORMALS PRIVATE LIMITED</p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-electric-400 transition-colors">Terms</Link>
            <div className="w-1 h-1 bg-obsidian-700 rounded-full"></div>
            <Link to="/privacy" className="hover:text-electric-400 transition-colors">Privacy</Link>
            <div className="w-1 h-1 bg-obsidian-700 rounded-full"></div>
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/15 border border-gold-500/30 text-gold-400 hover:bg-gold-500/25 hover:border-gold-400/50 hover:text-gold-300 transition-all"
            >
              <ShieldCheck size={11} />
              Admin Panel
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
