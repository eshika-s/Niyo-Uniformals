import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { SettingsProvider } from '@/context/SettingsContext'
import { MessageCircle } from 'lucide-react'

// Layout
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Public pages
import Home from '@/pages/Home'
import Catalogue from '@/pages/Catalogue'
import ProductDetail from '@/pages/ProductDetail'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import BulkOrder from '@/pages/BulkOrder'

// Admin pages
import AdminLogin from '@/pages/admin/Login'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminProducts from '@/pages/admin/Products'
import AdminCategories from '@/pages/admin/Categories'
import AdminEnquiries from '@/pages/admin/Enquiries'
import AdminSettings from '@/pages/admin/Settings'

// Public layout wrapper
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        <MessageCircle size={24} className="text-white" fill="currentColor" />
      </a>
    </>
  )
}

// Protected admin route wrapper
function ProtectedRoute() {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  return user ? <Outlet /> : <Navigate to="/admin" replace />
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bulk-order" element={<BulkOrder />} />
      </Route>

      {/* Admin login */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/enquiries" element={<AdminEnquiries />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: '12px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
              },
            }}
          />
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
