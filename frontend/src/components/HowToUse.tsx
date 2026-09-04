import { useState } from 'react'
import { HelpCircle, X } from 'lucide-react'

export default function HowToUse() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-400 hover:text-emerald-600 transition"
        aria-label="How to use"
      >
        <HelpCircle className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute z-20 right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-5 text-left">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-slate-900 text-sm">How to use</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ol className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="font-bold text-emerald-600">1.</span>
              <span>Enter the <strong>NAFDAC number</strong> from the product pack.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-emerald-600">2.</span>
              <span>Optionally, add the product name or strength.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-emerald-600">3.</span>
              <span>Click <strong>"Check registry"</strong>.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-emerald-600">4.</span>
              <span>Compare the returned record with your product label.</span>
            </li>
          </ol>
          <p className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-3">
             A registry match does not guarantee the physical product is genuine or safe.
          </p>
        </div>
      )}
    </div>
  )
}