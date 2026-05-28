import { Shirt } from 'lucide-react'

export default function FabricDetails({ fabric, description }) {
  if (!fabric && !description) return null

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Shirt size={16} className="text-gold-600" />
        <h3 className="font-semibold text-navy-900 text-base">Product Details</h3>
      </div>

      {fabric && (
        <div className="mb-3 pb-3 border-b border-slate-50">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Fabric / Material</p>
          <p className="text-sm text-slate-700">{fabric}</p>
        </div>
      )}

      {description && (
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Description</p>
          <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  )
}
