import { ReactNode } from 'react'
import { ShieldCheck, Github } from 'lucide-react'
import { Link } from 'wouter'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8f5]">
      <header className="border-b border-slate-200/70 bg-white/75 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/10">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-black tracking-tight text-slate-950">DrugChecker</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">Registry aid</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-bold">
            <Link href="/" className="text-slate-600 hover:text-emerald-700 transition">Home</Link>
            <Link href="/about" className="text-slate-600 hover:text-emerald-700 transition">About</Link>
            <Link href="/contact" className="text-slate-600 hover:text-emerald-700 transition">Contact</Link>
            <a href="https://github.com/0xlawal/drug_checkerv1.1" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-emerald-700 transition">
              <Github className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200/80 bg-white/60 px-5 py-7 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col gap-2 sm:flex-row sm:justify-between">
          <span>Independent lookup aid · Not affiliated with NAFDAC</span>
          <span>Registry information is not a safety certification.</span>
        </div>
      </footer>
    </div>
  )
}