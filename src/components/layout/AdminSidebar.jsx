import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, Tag, MessageSquare, Settings,
  ShoppingBag, LogOut, ChevronRight, ExternalLink,
  Image, Star, ImagePlay, FileText, PanelLeftClose, PanelLeftOpen,
  ChevronDown
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_GROUPS = [
  {
    label: 'Catalogue',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
      { icon: Package, label: 'Products', to: '/admin/products' },
      { icon: Tag, label: 'Categories', to: '/admin/categories' },
    ],
  },
  {
    label: 'Content',
    items: [
      { icon: ImagePlay, label: 'Banners', to: '/admin/banners' },
      { icon: Star, label: 'Testimonials', to: '/admin/testimonials' },
      { icon: FileText, label: 'Pages', to: '/admin/pages' },
      { icon: Image, label: 'Media Library', to: '/admin/media' },
    ],
  },
  {
    label: 'Communication',
    items: [
      { icon: MessageSquare, label: 'Enquiries', to: '/admin/enquiries', badgeKey: 'unread' },
    ],
  },
  {
    label: 'Config',
    items: [
      { icon: Settings, label: 'Settings', to: '/admin/settings' },
    ],
  },
]

export default function AdminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { count } = await supabase
          .from('enquiries')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new')
        setUnread(count ?? 0)
      } catch { /* ignore – mock mode */ }
    }
    fetch()
    const t = setInterval(fetch, 30_000)
    return () => clearInterval(t)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin')
  }

  const sidebarContent = (
    <div className={`flex flex-col h-full transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-64'}`}>
      {/* Brand + Collapse */}
      <div className={`px-4 py-5 border-b border-white/5 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-gold-500/20 flex items-center justify-center shrink-0">
              <ShoppingBag size={18} className="text-gold-400" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-display font-bold text-base leading-tight">Niyo</p>
              <p className="text-gold-500/70 text-[10px] tracking-widest uppercase">Admin Panel</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-9 h-9 rounded-lg bg-gold-500/20 flex items-center justify-center">
            <ShoppingBag size={18} className="text-gold-400" />
          </div>
        )}
        <button
          onClick={onToggle}
          className={`p-1.5 rounded-lg text-slate-500 hover:bg-white/5 hover:text-slate-300 transition-all ${collapsed ? 'mt-0 hidden lg:flex' : 'flex'}`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 px-2 py-4 space-y-5 overflow-y-auto">
        {NAV_GROUPS.map(group => (
          <div key={group.label}>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[9px] uppercase tracking-widest font-semibold text-slate-600">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map(({ icon: Icon, label, to, badgeKey }) => {
                const badge = badgeKey === 'unread' && unread > 0 ? unread : null
                return (
                  <NavLink
                    key={to}
                    to={to}
                    title={collapsed ? label : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                        isActive
                          ? 'bg-navy-700 text-white'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      } ${collapsed ? 'justify-center' : ''}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={17}
                          className={isActive ? 'text-gold-400 shrink-0' : 'text-slate-500 group-hover:text-slate-300 shrink-0'}
                        />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">{label}</span>
                            {badge != null && (
                              <span className="min-w-[20px] h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center px-1.5">
                                {badge > 99 ? '99+' : badge}
                              </span>
                            )}
                            {isActive && !badge && <ChevronRight size={14} className="text-gold-400/60" />}
                          </>
                        )}
                        {collapsed && badge != null && (
                          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">
                            {badge > 9 ? '9+' : badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* View public site link */}
      <div className={`px-2 pb-2 ${collapsed ? '' : ''}`}>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          title={collapsed ? 'View Site' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-white/5 hover:text-slate-300 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <ExternalLink size={17} className="shrink-0" />
          {!collapsed && <span className="flex-1">View Site</span>}
        </a>
      </div>

      {/* User info + Sign out */}
      <div className={`px-2 pb-4 pt-2 border-t border-white/5`}>
        {!collapsed && user?.email && (
          <div className="px-3 py-2 mb-1">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">Signed in as</p>
            <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleSignOut}
          title={collapsed ? 'Sign Out' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={17} className="shrink-0" />
          {!collapsed && 'Sign Out'}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex min-h-screen bg-navy-950 flex-col shrink-0 transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-64'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Overlay Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-navy-950/70 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-navy-950 flex flex-col lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
