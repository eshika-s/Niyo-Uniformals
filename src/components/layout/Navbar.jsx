import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, UserCircle } from 'lucide-react'
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
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-obsidian-100/60 shadow-[0_2px_20px_rgba(0,0,0,0.07)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-29">

            {/* Logo image */}
            <Link to="/" className="shrink-0 flex items-center">
              <div
                className="rounded-full overflow-hidden transition-all duration-300 flex-shrink-0"
                style={{
                  width: '80px',
                  height: '80px',
                  boxShadow: scrolled
                    ? '0 2px 12px rgba(0,0,0,0.12)'
                    : '0 2px 16px rgba(201,168,76,0.25)',
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

            {/* Desktop Nav */}
            <nav className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border shadow-sm transition-all duration-300 ${
              scrolled
                ? 'bg-white/60 backdrop-blur-md border-obsidian-100/80'
                : 'bg-white/10 backdrop-blur-md border-white/20'
            }`}>
              <a
                href="/#sectors"
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                  scrolled ? 'text-obsidian-600 hover:text-electric-600 hover:bg-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Sectors
              </a>

              <a
                href="/#manufacturing"
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                  scrolled ? 'text-obsidian-600 hover:text-electric-600 hover:bg-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Production
              </a>

              <NavLink
                to="/catalogue"
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                    isActive
                      ? 'bg-white text-electric-600 shadow-sm'
                      : scrolled
                      ? 'text-obsidian-600 hover:text-electric-600 hover:bg-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Catalogue
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                    isActive
                      ? 'bg-white text-electric-600 shadow-sm'
                      : scrolled
                      ? 'text-obsidian-600 hover:text-electric-600 hover:bg-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                About
              </NavLink>
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  scrolled
                    ? 'text-obsidian-600 hover:text-electric-600 border border-obsidian-200 hover:border-electric-300 bg-white hover:bg-electric-50'
                    : 'text-white/80 border border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                <UserCircle size={16} />
                Sign In
              </button>
              <button
                onClick={() => navigate('/bulk-order')}
                className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg ${
                  scrolled
                    ? 'bg-obsidian-900 text-white hover:bg-electric-600 hover:shadow-electric-500/30'
                    : 'bg-white/15 text-white border border-white/25 hover:bg-white/25 backdrop-blur-sm'
                }`}
              >
                Bulk Enquiry
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-2 rounded-xl transition-colors ${
                scrolled ? 'text-obsidian-900 hover:bg-obsidian-100' : 'text-white hover:bg-white/10'
              }`}
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
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-obsidian-100 shadow-2xl p-4"
            >
              <div className="flex flex-col gap-2">
                <NavLink to="/" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-obsidian-700 hover:bg-obsidian-50">Home</NavLink>
                <NavLink to="/catalogue" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-obsidian-700 hover:bg-obsidian-50">Catalogue</NavLink>
                <NavLink to="/about" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-obsidian-700 hover:bg-obsidian-50">About</NavLink>
                <NavLink to="/contact" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-obsidian-700 hover:bg-obsidian-50">Contact</NavLink>

                <div className="mt-4 pt-4 border-t border-obsidian-100 space-y-2">
                  <button
                    onClick={() => { navigate('/login'); setOpen(false) }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 border-2 border-obsidian-200 text-obsidian-700 font-bold rounded-xl"
                  >
                    <UserCircle size={16} /> Sign In
                  </button>
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
