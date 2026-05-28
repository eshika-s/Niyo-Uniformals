import { useState, useEffect } from 'react'
import { categoryService } from '@/services/categoryService'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchCategories() {
    setLoading(true)
    try {
      const { data, error } = await categoryService.getAll()
      if (error) throw error
      setCategories(data ?? [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  return { categories, loading, error, refetch: fetchCategories }
}
