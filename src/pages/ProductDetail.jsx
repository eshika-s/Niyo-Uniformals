import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Tag, Package } from 'lucide-react'
import { productService } from '@/services/productService'
import ImageGallery from '@/components/product/ImageGallery'
import FabricDetails from '@/components/product/FabricDetails'
import EnquiryForm from '@/components/product/EnquiryForm'
import ProductCard from '@/components/catalogue/ProductCard'
import { useProducts } from '@/hooks/useProducts'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const { products: related } = useProducts({
    category: product?.category_id,
    limit: 4,
  })

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data, error } = await productService.getById(id)
      if (error || !data) navigate('/catalogue')
      else setProduct(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="h-96 bg-slate-100 rounded-2xl animate-pulse" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <div key={i} className="h-8 bg-slate-100 rounded-xl animate-pulse" />)}
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!product) return null

  const relatedProducts = related.filter(p => p.id !== product.id).slice(0, 4)

  return (
    <main className="min-h-screen bg-white pt-24">
      <title>{product.name} — Niyo Uniformals</title>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-navy-700 transition-colors mb-6"
        >
          <ArrowLeft size={15} />
          Back to Catalogue
        </button>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Left: Gallery */}
          <ImageGallery images={product.images || []} productName={product.name} />

          {/* Right: Info */}
          <div className="space-y-5">
            {/* Category */}
            {product.categories && (
              <div className="flex items-center gap-2">
                <Tag size={13} className="text-gold-600" />
                <span className="text-sm text-gold-600 font-medium">{product.categories.name}</span>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-display font-bold text-navy-900">{product.name}</h1>

            {/* Pricing */}
            <div className="flex flex-wrap gap-4">
              {product.price_range && (
                <div className="px-4 py-2 bg-navy-50 rounded-xl border border-navy-100">
                  <p className="text-xs text-navy-500 mb-0.5">Price Range</p>
                  <p className="text-lg font-bold text-navy-800">{product.price_range}</p>
                </div>
              )}
              {product.min_order_qty && (
                <div className="px-4 py-2 bg-gold-50 rounded-xl border border-gold-100">
                  <p className="text-xs text-gold-600 mb-0.5">Min. Order Qty</p>
                  <p className="text-lg font-bold text-gold-700">{product.min_order_qty} pcs</p>
                </div>
              )}
            </div>

            {/* Fabric details */}
            <FabricDetails fabric={product.fabric} description={product.description} />

            {/* Enquiry Form */}
            <EnquiryForm product={product} />
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
