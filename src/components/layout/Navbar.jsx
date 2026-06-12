import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingBag, Phone, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'


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
      <header
        className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link to="/" className="flex items-baseline gap-1.5 shrink-0">
              <span className="text-[#0a1128] font-display text-2xl md:text-3xl font-semibold tracking-wider">NIYO</span>
              <span className="text-[#b3913b] font-display text-2xl md:text-3xl italic tracking-wide">Uniformals</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              <a
                href="/#sectors"
                className="px-4 py-2 text-sm font-bold text-[#0a1128] hover:text-[#b3913b] transition-colors duration-200 uppercase tracking-wider"
              >
                Sectors
              </a>

              <a
                href="/#manufacturing"
                className="px-4 py-2 text-sm font-bold text-[#0a1128] hover:text-[#b3913b] transition-colors duration-200 uppercase tracking-wider"
              >
                Manufacturing
              </a>

              <NavLink
                to="/catalogue"
                className="px-4 py-2 text-sm font-bold text-[#0a1128] hover:text-[#b3913b] transition-colors duration-200 uppercase tracking-wider"
              >
                Catalogue
              </NavLink>

              <NavLink
                to="/about"
                className="px-4 py-2 text-sm font-bold text-[#0a1128] hover:text-[#b3913b] transition-colors duration-200 uppercase tracking-wider"
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                className="px-4 py-2 text-sm font-bold text-[#0a1128] hover:text-[#b3913b] transition-colors duration-200 uppercase tracking-wider"
              >
                Contact
              </NavLink>
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => navigate('/bulk-order')}
                className="px-6 py-2.5 bg-[#0a1128] text-white text-sm font-bold uppercase tracking-wider rounded-none hover:bg-[#151f32] transition-colors shadow-sm"
              >
                Bulk Enquiry
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
                {/* Home */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
                  <NavLink
                    to="/"
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'text-navy-700 bg-navy-50 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-navy-700'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </motion.div>

                {/* Catalogue */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <NavLink
                    to="/catalogue"
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'text-navy-700 bg-navy-50 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-navy-700'
                      }`
                    }
                  >
                    Catalogue
                  </NavLink>
                </motion.div>

                {/* Indented Categories */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="pl-4 border-l-2 border-slate-100 ml-4 py-1 flex flex-col gap-1"
                >
                  <Link to="/catalogue?category=cat-medical" onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors">Healthcare & Hospital</Link>
                  <Link to="/catalogue?category=cat-corporate" onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors">Corporate & Executive</Link>
                  <Link to="/catalogue?category=cat-school" onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors">School & PE Uniforms</Link>
                  <Link to="/catalogue?category=cat-hospitality" onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors">Hotel & Hospitality</Link>
                  <Link to="/catalogue?category=cat-advocate" onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors">Advocates & Legal</Link>
                </motion.div>

                {/* About */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <NavLink
                    to="/about"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'text-navy-700 bg-navy-50 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-navy-700'
                      }`
                    }
                  >
                    About
                  </NavLink>
                </motion.div>

                {/* Contact */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <NavLink
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'text-navy-700 bg-navy-50 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-navy-700'
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                </motion.div>
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
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
