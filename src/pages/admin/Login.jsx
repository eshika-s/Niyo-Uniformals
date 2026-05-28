import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ShoppingBag, Loader2, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      toast.error('Invalid credentials. Please try again.')
    } else {
      navigate('/admin/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <title>Admin Login — Niyo Uniformals</title>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy-700 mb-4">
            <ShoppingBag size={24} className="text-gold-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Admin Login</h1>
          <p className="text-slate-400 text-sm mt-1">Niyo Uniformals CMS</p>
        </div>

        <form id="admin-login-form" onSubmit={handleSubmit} className="bg-navy-900 rounded-2xl border border-white/5 p-8 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="w-full px-4 py-3 bg-navy-800 border border-white/10 text-white rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-navy-800 border border-white/10 text-white rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-gold-500/50 pr-10"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
