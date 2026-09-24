import { Clock3, History, Search, X } from "lucide-react";

type RecentLookup = {
  query: string;
  mode: "nrn" | "name";
  timestamp: number;
};

type Props = {
  items: RecentLookup[];
  onSelect: (item: RecentLookup) => void;
  onClear: () => void;
};

export type { RecentLookup };

export default function RecentLookups({ items, onSelect, onClear }: Props) {
  if (!items.length) return null;

  return (
    <section className="recent-lookups" aria-labelledby="recent-lookups-title">
      <div className="recent-lookups__heading">
        <div className="flex items-center gap-2">
          <span className="recent-lookups__icon"><History className="h-4 w-4" aria-hidden="true" /></span>
          <div>
            <p className="eyebrow">Your device</p>
            <h2 id="recent-lookups-title" className="text-sm font-black text-slate-950">Recent lookups</h2>
          </div>
        </div>
        <button type="button" onClick={onClear} className="text-xs font-bold text-slate-500 hover:text-slate-900">Clear</button>
      </div>
      <div className="recent-lookups__list">
        {items.map((item) => (
          <button key={`${item.mode}-${item.query}-${item.timestamp}`} type="button" onClick={() => onSelect(item)} className="recent-lookups__item">
            <span className="recent-lookups__item-icon"><Search className="h-3.5 w-3.5" aria-hidden="true" /></span>
            <span className="min-w-0 text-left">
              <span className="block truncate text-sm font-bold text-slate-900">{item.query}</span>
              <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{item.mode === "nrn" ? "NAFDAC number" : "Product name"}</span>
            </span>
            <Clock3 className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden="true" />
          </button>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1 text-[11px] leading-5 text-slate-400"><X className="h-3 w-3" aria-hidden="true" />Stored only in this browser.</p>
    </section>
  );
}
