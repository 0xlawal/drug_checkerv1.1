import { CheckCircle2, AlertTriangle, XCircle, AlertCircle, Clock } from 'lucide-react'

export default function ResultDisplay({ result }: { result: any }) {
  const { state, record, warnings, source, cached, cacheAgeSeconds } = result

  const states = {
    registry_match: { icon: CheckCircle2, color: 'text-green-700', bg: 'bg-green-50', label: 'Registry Match' },
    registry_match_warning: { icon: AlertTriangle, color: 'text-amber-700', bg: 'bg-amber-50', label: 'Match with Warning' },
    no_registry_match: { icon: XCircle, color: 'text-red-700', bg: 'bg-red-50', label: 'No Registry Match' },
    unable_to_verify: { icon: AlertCircle, color: 'text-gray-700', bg: 'bg-gray-50', label: 'Unable to Verify' },
  }

  const st = states[state] || states.unable_to_verify
  const Icon = st.icon

  return (
    <div className={`mt-8 p-6 rounded-3xl border ${st.bg} border-${st.color.split('-')[1]}-200 max-w-2xl mx-auto`}>
      <div className="flex items-start gap-4">
        <Icon className={`h-8 w-8 ${st.color} shrink-0 mt-1`} />
        <div>
          <h2 className={`text-xl font-bold ${st.color}`}>{st.label}</h2>
          {record ? (
            <div className="mt-2 space-y-1 text-sm">
              <p><span className="font-semibold">Product:</span> {record.productName || 'N/A'}</p>
              <p><span className="font-semibold">Applicant:</span> {record.applicantName || 'N/A'}</p>
              <p><span className="font-semibold">Status:</span> {record.status || 'N/A'}</p>
              <p><span className="font-semibold">Expiry:</span> {record.expiryDate || 'N/A'}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mt-2">{result.message || 'No record found.'}</p>
          )}
          {warnings && warnings.length > 0 && (
            <div className="mt-3 p-3 bg-amber-100/60 rounded-xl text-amber-800 text-sm">
              {warnings.map((w: string, i: number) => <p key={i}>⚠️ {w}</p>)}
            </div>
          )}
          <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
            <Clock className="h-3 w-3" />
            Source: {source?.name || 'NAFDAC Greenbook'} · {cached ? `Cached ${cacheAgeSeconds}s ago` : 'Fresh from source'}
          </div>
        </div>
      </div>
    </div>
  )
}