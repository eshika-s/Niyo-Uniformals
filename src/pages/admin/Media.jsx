import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Upload, Trash2, Copy, Check, Search, Image as ImageIcon,
  Loader2, Grid2x2, List, X, CloudUpload, FolderOpen
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminLayout from '@/components/layout/AdminLayout'
import { mediaService } from '@/services/mediaService'
import toast from 'react-hot-toast'

function formatBytes(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function ImageCard({ file, view, onDelete, onCopy, copiedUrl }) {
  const [imgError, setImgError] = useState(false)

  if (view === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-4 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-all group"
      >
        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
          {!imgError
            ? <img src={file.url} alt={file.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
            : <ImageIcon size={20} className="text-slate-300 m-auto mt-3" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-navy-900 truncate">{file.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">{formatBytes(file.metadata?.size)} · {formatDate(file.created_at)}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onCopy(file.url)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-navy-700"
            title="Copy URL"
          >
            {copiedUrl === file.url ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
          <button
            onClick={() => onDelete(file)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      <div className="aspect-square bg-slate-50">
        {!imgError
          ? <img src={file.url} alt={file.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
          : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon size={32} className="text-slate-200" />
            </div>
          )
        }
      </div>
      <div className="p-3">
        <p className="text-xs font-medium text-navy-900 truncate">{file.name}</p>
        <p className="text-[10px] text-slate-400 mt-0.5">{formatBytes(file.metadata?.size)}</p>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button
          onClick={() => onCopy(file.url)}
          className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-white"
          title="Copy URL"
        >
          {copiedUrl === file.url ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
        </button>
        <button
          onClick={() => onDelete(file)}
          className="p-2.5 bg-white/20 hover:bg-red-500/80 rounded-xl transition-colors text-white"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  )
}

export default function AdminMedia() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const [copiedUrl, setCopiedUrl] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileRef = useRef()

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await mediaService.listAll()
    setFiles(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleUpload = async (fileList) => {
    const arr = Array.from(fileList)
    if (!arr.length) return
    setUploading(true)
    let successCount = 0
    for (const file of arr) {
      const { error } = await mediaService.upload(file, 'uploads')
      if (!error) successCount++
    }
    if (successCount > 0) toast.success(`${successCount} file${successCount > 1 ? 's' : ''} uploaded`)
    else toast.error('Upload failed')
    setUploading(false)
    load()
  }

  const handleDelete = async (file) => {
    if (!confirm(`Delete "${file.name}"? This cannot be undone.`)) return
    const { error } = await mediaService.delete(file.bucket, file.path)
    if (error) toast.error('Delete failed')
    else { toast.success('File deleted'); load() }
  }

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).catch(() => {})
    setCopiedUrl(url)
    toast.success('URL copied!')
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  // Drag + drop
  const handleDragOver = (e) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = () => setDragging(false)
  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false)
    handleUpload(e.dataTransfer.files)
  }

  const filtered = search.trim()
    ? files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : files

  const uploadBtn = (
    <motion.label
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 px-5 py-2.5 bg-navy-700 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors cursor-pointer"
    >
      {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
      {uploading ? 'Uploading…' : 'Upload Files'}
      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={e => handleUpload(e.target.files)}
      />
    </motion.label>
  )

  return (
    <AdminLayout title="Media Library" subtitle={`${files.length} files`} actions={uploadBtn}>
      <title>Media Library — Niyo Admin</title>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-52">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search files…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 bg-white"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-navy-700 text-white' : 'text-slate-400 hover:text-navy-700'}`}
          >
            <Grid2x2 size={15} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-navy-700 text-white' : 'text-slate-400 hover:text-navy-700'}`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Drop Zone */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{ borderColor: dragging ? '#162d6e' : '#e2e8f0', backgroundColor: dragging ? '#f0f4ff' : '#f8fafc' }}
        className="border-2 border-dashed rounded-2xl p-6 mb-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
        onClick={() => fileRef.current?.click()}
      >
        <CloudUpload size={28} className={dragging ? 'text-navy-600' : 'text-slate-300'} />
        <p className="text-sm text-slate-500 font-medium">
          {dragging ? 'Drop to upload' : 'Drag & drop images here, or click to browse'}
        </p>
        <p className="text-xs text-slate-400">Supports: JPG, PNG, WebP, GIF, SVG</p>
      </motion.div>

      {/* Files Grid / List */}
      {loading ? (
        <div className={view === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-2'}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`bg-white rounded-2xl animate-pulse border border-slate-100 ${view === 'grid' ? 'aspect-square' : 'h-16'}`} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-slate-300"
        >
          <FolderOpen size={48} className="mb-3 opacity-50" />
          <p className="font-medium text-slate-400">{search ? 'No files match your search' : 'No files uploaded yet'}</p>
          <p className="text-xs text-slate-400 mt-1">{search ? '' : 'Upload images using the button or drag & drop above'}</p>
        </motion.div>
      ) : (
        <motion.div
          className={view === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            : 'space-y-2'
          }
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(file => (
              <ImageCard
                key={file.path}
                file={file}
                view={view}
                onDelete={handleDelete}
                onCopy={handleCopy}
                copiedUrl={copiedUrl}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <img src={preview.url} alt={preview.name} className="w-full h-full object-contain" />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-xl text-white transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
