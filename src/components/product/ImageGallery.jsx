import { useState } from 'react'
import { Package, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageGallery({ images = [], productName }) {
  const [selected, setSelected] = useState(0)

  if (!images.length) {
    return (
      <div className="h-96 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
        <Package size={64} className="text-slate-200" />
      </div>
    )
  }

  const prev = () => setSelected(i => (i - 1 + images.length) % images.length)
  const next = () => setSelected(i => (i + 1) % images.length)

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative h-96 lg:h-[480px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group">
        <img
          src={images[selected]}
          alt={`${productName} - image ${selected + 1}`}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === selected ? 'bg-white w-5' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                i === selected ? 'border-navy-600' : 'border-transparent hover:border-slate-300'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
