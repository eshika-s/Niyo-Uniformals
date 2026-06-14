import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-obsidian-950 border-t border-white/10 py-12 md:py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 pb-12 md:pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-baseline gap-1.5 shrink-0 mb-6 inline-block group">
              <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-obsidian-300 transition-colors">NIYO</span>
              <span className="font-display text-xl md:text-2xl italic tracking-tight text-electric-500 group-hover:text-electric-400 transition-colors">Uniformals</span>
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
            <div className="text-obsidian-500 text-sm space-y-1.5 leading-relaxed font-light">
              <p>12/481 Gandhi Nagar</p>
              <p>Main Market Road</p>
              <p>New Delhi, 110031</p>
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
          </div>
        </div>

      </div>
    </footer>
  )
}
