import { useState, useEffect, useCallback } from 'react'
import { productService } from '@/services/productService'

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, count, error } = await productService.getAll(filters)
      if (error) throw error
      setProducts(data ?? [])
      setCount(count ?? 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  return { products, count, loading, error, refetch: fetchProducts }
}
