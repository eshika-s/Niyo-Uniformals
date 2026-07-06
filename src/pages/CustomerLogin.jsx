import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import {
  Eye, EyeOff, Loader2, Mail, Lock, User,
  ArrowRight, ShoppingBag, CheckCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const PERKS = [
  'Track your bulk order enquiries',
  'Save favourite products',
  'Get exclusive wholesale pricing',
  'Priority support from our team',
]

export default function CustomerLogin() {
  const [mode, setMode] = useState('login') // 'login' | 'signup' | 'forgot'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle, user, loading: authLoading, supabase } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) navigate('/', { replace: true })
  }, [user, authLoading, navigate])

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  // ── Login ──────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return toast.error('Please fill in all fields')
    setLoading(true)
    const { error } = await signIn(form.email, form.password)
    if (error) toast.error('Invalid email or password. Please try again.')
    else { toast.success('Welcome back! 👋'); navigate('/') }
    setLoading(false)
  }

  // ── Sign Up ────────────────────────────────────────────────────
  const handleSignup = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) return toast.error('Please fill in all fields')
    if (form.password !== form.confirm) return toast.error('Passwords do not match')
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name } },
      })
      if (error) throw error
      toast.success('Account created! Please check your email to verify.')
      setMode('login')
    } catch (err) {
      toast.error(err?.message || 'Signup failed. Please try again.')
    }
    setLoading(false)
  }

  // ── Forgot Password ────────────────────────────────────────────
  const handleForgot = async (e) => {
    e.preventDefault()
    if (!form.email) return toast.error('Please enter your email')
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
        redirectTo: `${window.location.origin}/account/reset`,
      })
      if (error) throw error
      toast.success('Password reset link sent! Check your inbox.')
      setMode('login')
    } catch {
      toast.error('Failed to send reset email')
    }
    setLoading(false)
  }

  // ── Google Sign In ─────────────────────────────────────────────
  const handleGoogle = async () => {
    setLoading(true)
    const { error } = await signInWithGoogle()
    if (error) { toast.error('Google sign-in failed'); setLoading(false) }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian-950">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const inputCls = 'w-full pl-11 pr-4 py-3.5 bg-obsidian-800/60 border border-white/10 text-white rounded-xl text-sm placeholder:text-obsidian-500 focus:outline-none focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20 transition-all'

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      {/* ── Left Panel (decorative, desktop only) ── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-obsidian-900 to-obsidian-950" />
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gold-500/8 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-electric-600/8 blur-3xl"
          animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Brand mark */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{
              width: '52px', height: '52px',
              boxShadow: '0 2px 16px rgba(201,168,76,0.3)',
              border: '1.5px solid rgba(201,168,76,0.4)',
            }}
          >
            <img
              src="/images/logo1.jpeg"
              alt="NIYO Uni-formals"
              style={{ width: '209%', height: '250%', marginLeft: '0%', marginTop: '-63%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <p className="text-white font-display font-bold text-lg leading-tight">NIYO Uni-formals</p>
            <p className="text-gold-500/70 text-xs tracking-widest uppercase">Since 1994</p>
          </div>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-4xl font-display font-bold text-white leading-tight">
              Your uniform partner,<br />
              <span className="gradient-text-gold">always available.</span>
            </h2>
            <p className="text-obsidian-400 mt-4 text-base leading-relaxed">
              Sign in to manage enquiries, track your bulk orders, and get access to exclusive wholesale pricing.
            </p>
          </div>

          <ul className="space-y-3">
            {PERKS.map((perk, i) => (
              <motion.li
                key={perk}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 text-sm text-obsidian-300"
              >
                <CheckCircle size={16} className="text-gold-500 shrink-0" />
                {perk}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-obsidian-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            Trusted by 500+ institutions across India
          </div>
        </div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex items-center gap-3">
          <div
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{ width: '44px', height: '44px', border: '1.5px solid rgba(201,168,76,0.4)' }}
          >
            <img
              src="/images/logo1.jpeg"
              alt="NIYO"
              style={{ width: '209%', height: '250%', marginLeft: '0%', marginTop: '-63%', objectFit: 'cover' }}
            />
          </div>
          <p className="text-white font-display font-bold">NIYO Uni-formals</p>
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {/* Tabs */}
          {mode !== 'forgot' && (
            <div className="flex bg-obsidian-900/60 border border-white/8 rounded-2xl p-1 mb-8">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  mode === 'login'
                    ? 'bg-white text-obsidian-900 shadow-md'
                    : 'text-obsidian-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-obsidian-900 shadow-md'
                    : 'text-obsidian-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-white">
              {mode === 'login' && 'Welcome back'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot' && 'Reset your password'}
            </h1>
            <p className="text-obsidian-500 text-sm mt-1.5">
              {mode === 'login' && 'Sign in to your Niyo account'}
              {mode === 'signup' && 'Join thousands of institutions we serve'}
              {mode === 'forgot' && "We'll send you a link to reset your password"}
            </p>
          </div>

          {/* Google OAuth */}
          {mode !== 'forgot' && (
            <>
              <motion.button
                onClick={handleGoogle}
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-3 py-3.5 bg-white hover:bg-slate-50 text-obsidian-900 font-semibold rounded-xl border border-obsidian-100 transition-all shadow-sm text-sm mb-5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </motion.button>

              <div className="flex items-center gap-4 mb-5">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-obsidian-600 text-xs font-medium">or continue with email</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>
            </>
          )}

          {/* ── Login Form ── */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-500" />
                <input id="customer-email" type="email" value={form.email} onChange={set('email')} placeholder="Email address" className={inputCls} autoFocus required />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-500" />
                <input id="customer-password" type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="Password" className={`${inputCls} pr-12`} required />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-obsidian-500 hover:text-obsidian-300 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="flex justify-end">
                <button type="button" onClick={() => setMode('forgot')} className="text-xs text-obsidian-500 hover:text-gold-400 transition-colors">
                  Forgot password?
                </button>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-gold-500/20 mt-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                {loading ? 'Signing in…' : 'Sign In'}
              </motion.button>
            </form>
          )}

          {/* ── Sign Up Form ── */}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-500" />
                <input id="customer-name" type="text" value={form.name} onChange={set('name')} placeholder="Full name" className={inputCls} autoFocus required />
              </div>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-500" />
                <input id="customer-signup-email" type="email" value={form.email} onChange={set('email')} placeholder="Email address" className={inputCls} required />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-500" />
                <input id="customer-signup-password" type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="Password (min 6 chars)" className={`${inputCls} pr-12`} required />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-obsidian-500 hover:text-obsidian-300 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-500" />
                <input id="customer-confirm-password" type={showPass ? 'text' : 'password'} value={form.confirm} onChange={set('confirm')} placeholder="Confirm password" className={inputCls} required />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-gold-500/20 mt-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                {loading ? 'Creating account…' : 'Create Account'}
              </motion.button>

              <p className="text-center text-xs text-obsidian-600 mt-3">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-obsidian-400 hover:text-gold-400 transition-colors">Terms of Service</Link>
              </p>
            </form>
          )}

          {/* ── Forgot Password Form ── */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-500" />
                <input id="customer-forgot-email" type="email" value={form.email} onChange={set('email')} placeholder="Your account email" className={inputCls} autoFocus required />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-gold-500/20"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                {loading ? 'Sending…' : 'Send Reset Link'}
              </motion.button>

              <button type="button" onClick={() => setMode('login')} className="w-full text-center text-sm text-obsidian-500 hover:text-obsidian-300 transition-colors mt-2">
                ← Back to sign in
              </button>
            </form>
          )}

          {/* Back to site */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-xs text-obsidian-600 hover:text-obsidian-400 transition-colors">
              ← Back to Niyo Uni-formals
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
