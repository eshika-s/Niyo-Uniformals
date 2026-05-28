import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, Tag, MessageSquare, Settings,
  ShoppingBag, LogOut, ChevronRight
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: Package, label: 'Products', to: '/admin/products' },
  { icon: Tag, label: 'Categories', to: '/admin/categories' },
  { icon: MessageSquare, label: 'Enquiries', to: '/admin/enquiries' },
  { icon: Settings, label: 'Settings', to: '/admin/settings' },
]

export default function AdminSidebar() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin')
  }

  return (
    <aside className="w-64 min-h-screen bg-navy-950 flex flex-col shrink-0">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gold-500/20 flex items-center justify-center">
            <ShoppingBag size={18} className="text-gold-400" />
          </div>
          <div>
            <p className="text-white font-display font-bold text-base">Niyo</p>
            <p className="text-gold-500/70 text-xs tracking-widest uppercase -mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-navy-700 text-white'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-gold-400' : 'text-slate-500 group-hover:text-slate-300'} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={14} className="text-gold-400/60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-5 border-t border-white/5 pt-3">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
