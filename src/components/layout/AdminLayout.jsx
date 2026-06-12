import { motion } from 'framer-motion'
import AdminSidebar from '@/components/layout/AdminSidebar'

/**
 * AdminLayout — wraps every protected admin page.
 * Provides the sidebar + a scrollable main content area with page transitions.
 */
export default function AdminLayout({ children, title, subtitle, actions }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Page header */}
        {(title || actions) && (
          <div className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 px-8 py-5 flex items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {title && <h1 className="text-2xl font-display font-bold text-navy-900">{title}</h1>}
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

        {/* Page content with fade + slide-up transition */}
        <motion.div
          className="p-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
