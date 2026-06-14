import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-baseline gap-1.5 shrink-0 group">
              <span className={`font-display text-2xl md:text-3xl font-bold tracking-tight transition-colors ${scrolled ? 'text-obsidian-900' : 'text-obsidian-900'}`}>
                NIYO
              </span>
              <span className={`font-display text-2xl md:text-3xl font-bold italic tracking-tight transition-colors ${scrolled ? 'text-electric-500' : 'text-electric-500'}`}>
                Uniformals
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/40 shadow-sm">
              <a
                href="/#sectors"
                className="px-4 py-2 text-sm font-semibold text-obsidian-600 hover:text-electric-600 hover:bg-white rounded-full transition-all"
              >
                Sectors
              </a>

              <a
                href="/#manufacturing"
                className="px-4 py-2 text-sm font-semibold text-obsidian-600 hover:text-electric-600 hover:bg-white rounded-full transition-all"
              >
                Production
              </a>

              <NavLink
                to="/catalogue"
                className={({ isActive }) => `px-4 py-2 text-sm font-semibold rounded-full transition-all ${isActive ? 'bg-white text-electric-600 shadow-sm' : 'text-obsidian-600 hover:text-electric-600 hover:bg-white'}`}
              >
                Catalogue
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) => `px-4 py-2 text-sm font-semibold rounded-full transition-all ${isActive ? 'bg-white text-electric-600 shadow-sm' : 'text-obsidian-600 hover:text-electric-600 hover:bg-white'}`}
              >
                About
              </NavLink>
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => navigate('/bulk-order')}
                className="px-6 py-2.5 bg-obsidian-900 text-white text-sm font-bold rounded-xl hover:bg-electric-600 transition-colors shadow-lg hover:shadow-electric-500/30 hover:-translate-y-0.5"
              >
                Bulk Enquiry
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-xl text-obsidian-900 hover:bg-obsidian-100 transition-colors"
              onClick={() => setOpen(!open)}
            >
              <AnimatePresence mode="wait">
                {open
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={24} /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={24} /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-obsidian-100 shadow-2xl overflow-hidden p-4"
            >
              <div className="flex flex-col gap-2">
                <NavLink to="/" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-obsidian-700 hover:bg-obsidian-50">Home</NavLink>
                <NavLink to="/catalogue" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-obsidian-700 hover:bg-obsidian-50">Catalogue</NavLink>
                <NavLink to="/about" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-obsidian-700 hover:bg-obsidian-50">About</NavLink>
                <NavLink to="/contact" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-obsidian-700 hover:bg-obsidian-50">Contact</NavLink>
                
                <div className="mt-4 pt-4 border-t border-obsidian-100">
                  <button
                    onClick={() => { navigate('/bulk-order'); setOpen(false) }}
                    className="w-full px-5 py-3.5 bg-electric-500 text-white font-bold rounded-xl shadow-lg"
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
