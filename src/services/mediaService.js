import { supabase } from '@/lib/supabase'

export const mediaService = {
  /**
   * List all files in a storage bucket folder.
   * Falls back to an empty array if bucket doesn't exist.
   */
  async listFiles(bucket = 'product-images', folder = '') {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder, { limit: 200, sortBy: { column: 'created_at', order: 'desc' } })
      if (error) throw error
      // Get public URLs for each file
      const files = (data || [])
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => {
          const path = folder ? `${folder}/${f.name}` : f.name
          const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path)
          return {
            ...f,
            path,
            url: urlData.publicUrl,
            bucket,
          }
        })
      return { data: files, error: null }
    } catch {
      return { data: [], error: null }
    }
  },

  /**
   * List files across multiple folders (products subfolder, banners, etc.)
   */
  async listAll(bucket = 'product-images') {
    try {
      // List root level items
      const { data: root, error: rootErr } = await supabase.storage
        .from(bucket)
        .list('', { limit: 50, sortBy: { column: 'name', order: 'asc' } })

      if (rootErr) throw rootErr

      const folders = (root || []).filter(f => !f.id) // folders have no id
      const rootFiles = (root || []).filter(f => f.id && f.name !== '.emptyFolderPlaceholder')

      // Fetch files from each subfolder
      const subResults = await Promise.all(
        folders.map(folder => this.listFiles(bucket, folder.name))
      )

      const rootMapped = rootFiles.map(f => {
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(f.name)
        return { ...f, path: f.name, url: urlData.publicUrl, bucket }
      })

      const allFiles = [
        ...rootMapped,
        ...subResults.flatMap(r => r.data),
      ]

      return { data: allFiles, error: null }
    } catch {
      return { data: [], error: null }
    }
  },

  /**
   * Upload a file to storage.
   */
  async upload(file, folder = 'uploads') {
    try {
      const ext = file.name.split('.').pop()
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage
        .from('product-images')
        .upload(path, file, { upsert: false })
      if (error) throw error
      const { data } = supabase.storage.from('product-images').getPublicUrl(path)
      return { url: data.publicUrl, path, error: null }
    } catch (err) {
      return { url: null, path: null, error: err }
    }
  },

  /**
   * Delete a file from storage.
   */
  async delete(bucket = 'product-images', path) {
    try {
      const { error } = await supabase.storage.from(bucket).remove([path])
      if (error) throw error
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  },

  /**
   * Get public URL for a path.
   */
  getPublicUrl(bucket = 'product-images', path) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  },
}
