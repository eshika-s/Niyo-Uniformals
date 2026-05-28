import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingBag, Phone, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-navy-900 text-center py-2 px-4 text-xs text-gold-300 font-medium tracking-wide hidden sm:block">
        🎉 Bulk orders of 50+ pieces get <span className="text-gold-400 font-bold">special wholesale pricing</span> — <button onClick={() => navigate('/bulk-order')} className="underline hover:text-white transition-colors">Get a Quote</button>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-100'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center shadow-md group-hover:shadow-navy-700/30 group-hover:shadow-lg transition-all duration-300">
                  <ShoppingBag size={19} className="text-gold-400" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gold-400 rounded-full border-2 border-white" />
              </div>
              <div className="leading-none">
                <span className="block text-navy-900 font-display font-bold text-xl tracking-tight">Niyo</span>
                <span className="block text-gold-600 text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">Uniformals</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${
                      isActive ? 'text-navy-800' : 'text-slate-500 hover:text-navy-800'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gold-500 rounded-full transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+919999999999"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy-700 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <Phone size={13} className="text-navy-600" />
                <span className="font-medium">+91 99999 99999</span>
              </a>
              <div className="h-5 w-px bg-slate-200" />
              <button
                onClick={() => navigate('/bulk-order')}
                className="px-5 py-2.5 bg-gradient-to-r from-navy-700 to-navy-800 text-white text-sm font-semibold rounded-xl hover:from-navy-600 hover:to-navy-700 active:scale-95 transition-all shadow-md hover:shadow-navy-700/20 hover:shadow-lg"
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              className="md:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {open
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={22} /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive ? 'text-navy-700 bg-navy-50 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-navy-700'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  <a href="tel:+919999999999" className="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 rounded-xl">
                    <Phone size={14} />+91 99999 99999
                  </a>
                  <button
                    onClick={() => { navigate('/bulk-order'); setOpen(false) }}
                    className="w-full px-5 py-3.5 bg-gradient-to-r from-navy-700 to-navy-800 text-white text-sm font-bold rounded-xl"
                  >
                    Get a Bulk Quote
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
