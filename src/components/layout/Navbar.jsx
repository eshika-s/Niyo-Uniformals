import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, UserCircle, LogOut, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'

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
              <UserButton scrolled={scrolled} navigate={navigate} />
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
                  <MobileUserButton navigate={navigate} setOpen={setOpen} />
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

// ── Desktop user button / avatar ──────────────────────────────────────────────
function UserButton({ scrolled, navigate }) {
  const [dropOpen, setDropOpen] = useState(false)
  const { user, signOut } = useAuth()

  if (!user) {
    return (
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
    )
  }

  const initial = (user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()
  const name = user.user_metadata?.full_name || ''
  const email = user.email || ''

  return (
    <div className="relative">
      <button
        onClick={() => setDropOpen(v => !v)}
        className="flex items-center gap-2 group"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-obsidian-900 font-bold text-sm shadow-md ring-2 ring-gold-400/30 group-hover:ring-gold-400/60 transition-all">
          {initial}
        </div>
        <ChevronDown size={14} className={`transition-transform duration-200 ${scrolled ? 'text-obsidian-500' : 'text-white/60'} ${dropOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {dropOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-obsidian-100 overflow-hidden z-50"
            onMouseLeave={() => setDropOpen(false)}
          >
            {/* User info */}
            <div className="px-4 py-3.5 border-b border-obsidian-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-obsidian-900 font-bold text-base shadow-sm flex-shrink-0">
                  {initial}
                </div>
                <div className="min-w-0">
                  {name && <p className="text-sm font-semibold text-obsidian-900 truncate">{name}</p>}
                  <p className="text-xs text-obsidian-500 truncate">{email}</p>
                </div>
              </div>
            </div>

            {/* Sign out */}
            <button
              onClick={async () => { setDropOpen(false); await signOut?.(); navigate('/') }}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Mobile user button ─────────────────────────────────────────────────────────
function MobileUserButton({ navigate, setOpen }) {
  const { user, signOut } = useAuth()

  if (!user) {
    return (
      <button
        onClick={() => { navigate('/login'); setOpen(false) }}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 border-2 border-obsidian-200 text-obsidian-700 font-bold rounded-xl"
      >
        <UserCircle size={16} /> Sign In
      </button>
    )
  }

  const initial = (user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()
  const name = user.user_metadata?.full_name || user.email || ''

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-obsidian-50 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-obsidian-900 font-bold text-sm shadow-sm">
          {initial}
        </div>
        <span className="text-sm font-semibold text-obsidian-800 truncate max-w-[140px]">{name}</span>
      </div>
      <button
        onClick={async () => { setOpen(false); await signOut?.(); navigate('/') }}
        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        title="Sign Out"
      >
        <LogOut size={16} />
      </button>
    </div>
  )
}
