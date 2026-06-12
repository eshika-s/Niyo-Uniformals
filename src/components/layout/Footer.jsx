import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-[#e2e8f0] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 pb-12 md:pb-16 border-b border-[#e2e8f0]">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-baseline gap-1.5 shrink-0 mb-6 inline-block">
              <span className="text-[#0a1128] font-display text-lg md:text-xl font-semibold tracking-wider">NIYO</span>
              <span className="text-[#b3913b] font-display text-lg md:text-xl italic tracking-wide">Uniformals</span>
            </Link>
            <p className="text-[#64748b] text-sm leading-relaxed pr-4">
              Wholesale garment manufacturing and institutional apparel supply since 1994.
            </p>
          </div>

          {/* Delhi Office */}
          <div>
            <h4 className="text-[#0a1128] font-bold text-[11px] tracking-[0.2em] uppercase mb-6">
              Delhi Office
            </h4>
            <div className="text-[#64748b] text-sm space-y-1.5 leading-relaxed">
              <p>12/481 Gandhi Nagar</p>
              <p>Main Market Road</p>
              <p>New Delhi, 110031</p>
            </div>
          </div>

          {/* Communication */}
          <div>
            <h4 className="text-[#0a1128] font-bold text-[11px] tracking-[0.2em] uppercase mb-6">
              Communication
            </h4>
            <div className="text-[#64748b] text-sm space-y-1.5 leading-relaxed">
              <p>WhatsApp: +91 98710 00000</p>
              <p>enquiry@niyouniforms.in</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-[#0a1128] font-bold text-[11px] tracking-[0.2em] uppercase mb-6">
              Status
            </h4>
            <div className="flex items-center gap-2 text-[#059669]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
              <span className="text-sm">Taking Bulk Orders</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-2 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
          <p>© 2026 NIYO UNIFORMALS PRIVATE LIMITED</p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-[#0a1128] transition-colors">Terms</Link>
            <div className="w-1 h-1 bg-[#cbd5e1] rounded-full"></div>
            <Link to="/privacy" className="hover:text-[#0a1128] transition-colors">Privacy</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
