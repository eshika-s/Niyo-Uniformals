import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search, Menu, X, Command } from 'lucide-react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { supabase } from '@/lib/supabase'

function AdminTopbar({ onMobileMenuOpen, unread }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [showNotifs, setShowNotifs] = useState(false)
  const [recentEnqs, setRecentEnqs] = useState([])
  const navigate = useNavigate()
  const searchRef = useRef(null)
  const notifRef = useRef(null)

  // Keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setShowNotifs(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50)
  }, [searchOpen])

  useEffect(() => {
    if (showNotifs) {
      supabase
        .from('enquiries')
        .select('id, customer_name, phone, status, created_at')
        .eq('status', 'new')
        .order('created_at', { ascending: false })
        .limit(5)
        .then(({ data }) => setRecentEnqs(data ?? []))
        .catch(() => {})
    }
  }, [showNotifs])

  // Close notif panel on outside click
  useEffect(() => {
    if (!showNotifs) return
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showNotifs])

  const QUICK_LINKS = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Categories', path: '/admin/categories' },
    { label: 'Enquiries', path: '/admin/enquiries' },
    { label: 'Banners', path: '/admin/banners' },
    { label: 'Testimonials', path: '/admin/testimonials' },
    { label: 'Media Library', path: '/admin/media' },
    { label: 'Pages', path: '/admin/pages' },
    { label: 'Settings', path: '/admin/settings' },
  ]

  const filtered = query.trim()
    ? QUICK_LINKS.filter(l => l.label.toLowerCase().includes(query.toLowerCase()))
    : QUICK_LINKS

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-100 px-4 lg:px-6 py-3 flex items-center gap-3">
      {/* Mobile Menu Button */}
      <button
        onClick={onMobileMenuOpen}
        className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Search trigger */}
      <button
        onClick={() => setSearchOpen(true)}
        className="flex items-center gap-2.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm text-slate-400 transition-colors flex-1 max-w-xs text-left"
      >
        <Search size={15} />
        <span className="flex-1">Search pages…</span>
        <span className="hidden sm:flex items-center gap-1 text-xs bg-white rounded-lg px-1.5 py-0.5 border border-slate-200 text-slate-400 font-mono">
          <Command size={10} />K
        </span>
      </button>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifs(v => !v)}
            className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-slate-50 flex items-center justify-between">
                  <p className="text-sm font-semibold text-navy-900">Unread Enquiries</p>
                  {unread > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{unread} new</span>
                  )}
                </div>
                {recentEnqs.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-slate-400 text-center">No new enquiries</p>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {recentEnqs.map(enq => (
                      <button
                        key={enq.id}
                        onClick={() => { navigate('/admin/enquiries'); setShowNotifs(false) }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                          <p className="text-sm font-medium text-navy-900 truncate">{enq.customer_name}</p>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 ml-4">{enq.phone} · {new Date(enq.created_at).toLocaleDateString('en-IN')}</p>
                      </button>
                    ))}
                  </div>
                )}
                <div className="px-4 py-2.5 border-t border-slate-50">
                  <button
                    onClick={() => { navigate('/admin/enquiries?status=new'); setShowNotifs(false) }}
                    className="text-xs text-navy-600 font-medium hover:underline"
                  >
                    View all enquiries →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Spotlight Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-navy-950/50 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search admin pages…"
                  className="flex-1 text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                />
                <button onClick={() => setSearchOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                  <X size={15} className="text-slate-400" />
                </button>
              </div>
              <div className="py-2 max-h-72 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-slate-400 text-center">No results</p>
                ) : (
                  filtered.map(link => (
                    <button
                      key={link.path}
                      onClick={() => { navigate(link.path); setSearchOpen(false); setQuery('') }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                    >
                      <span className="text-sm text-navy-900 font-medium">{link.label}</span>
                      <span className="text-xs text-slate-400 ml-auto font-mono">{link.path}</span>
                    </button>
                  ))
                )}
              </div>
              <div className="px-4 py-2.5 border-t border-slate-50 flex items-center gap-4 text-xs text-slate-400">
                <span><kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">↵</kbd> to navigate</span>
                <span><kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">Esc</kbd> to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/**
 * AdminLayout — wraps every protected admin page.
 * Provides the sidebar + topbar + scrollable main content area with page transitions.
 */
export default function AdminLayout({ children, title, subtitle, actions }) {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('admin-sidebar-collapsed') === 'true' } catch { return false }
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [unread, setUnread] = useState(0)

  const handleToggle = () => {
    setCollapsed(v => {
      const next = !v
      try { localStorage.setItem('admin-sidebar-collapsed', String(next)) } catch {}
      return next
    })
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const { count } = await supabase
          .from('enquiries')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new')
        setUnread(count ?? 0)
      } catch {}
    }
    fetch()
    const t = setInterval(fetch, 30_000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={handleToggle}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AdminTopbar
          onMobileMenuOpen={() => setMobileOpen(true)}
          unread={unread}
        />
        <main className="flex-1 overflow-y-auto">
          {/* Page header */}
          {(title || actions) && (
            <div className="bg-white/60 backdrop-blur-sm border-b border-slate-100 px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {title && <h1 className="text-xl lg:text-2xl font-display font-bold text-navy-900">{title}</h1>}
                {subtitle && <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>}
              </motion.div>
              {actions && (
                <motion.div
                  className="flex items-center gap-3 shrink-0"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 }}
                >
                  {actions}
                </motion.div>
              )}
            </div>
          )}

          {/* Page content */}
          <motion.div
            className="p-6 lg:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
