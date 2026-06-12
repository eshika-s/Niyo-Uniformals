import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ShoppingBag, Loader2, Eye, EyeOff, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [user, authLoading, navigate])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      toast.error('Invalid credentials. Please try again.')
    } else {
      toast.success('Welcome back!')
      navigate('/admin/dashboard')
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    const { error } = await signInWithGoogle()
    if (error) {
      toast.error('Google Sign-In failed. Please try again.')
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 relative overflow-hidden">
      <title>Admin Login — Niyo Uniformals</title>

      {/* Dynamic background orbs with breathing animations */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-navy-700/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 mb-5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag size={28} className="text-gold-400" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-white">Admin Login</h1>
          <p className="text-slate-400 text-sm mt-2">Niyo Uniformals Control Panel</p>
        </motion.div>

        <motion.form 
          id="admin-login-form" 
          onSubmit={handleSubmit} 
          className="bg-navy-900 rounded-2xl border border-white/5 p-8 space-y-5 shadow-2xl"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">Email Address</label>
            <input
              type="email"
              id="admin-email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="admin@niyouniforms.com"
              className="w-full px-4 py-3 bg-navy-800 border border-white/10 text-white rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                id="admin-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-navy-800 border border-white/10 text-white rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-gold-500/50 pr-12 transition-all"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </motion.div>

          <motion.button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading
              ? <><Loader2 size={15} className="animate-spin" /> Signing in…</>
              : <><Shield size={15} /> Sign In Securely</>
            }
          </motion.button>

          <motion.div className="relative flex py-2 items-center" variants={itemVariants}>
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase font-medium">Or continue with</span>
            <div className="flex-grow border-t border-white/5"></div>
          </motion.div>

          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3 bg-white hover:bg-slate-50 text-navy-900 font-bold rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2.5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </motion.button>
        </motion.form>

        <motion.p className="text-center text-xs text-slate-600 mt-6" variants={itemVariants}>
          Authorized personnel only. All activity is logged.
        </motion.p>
      </motion.div>
    </div>
  )
}
