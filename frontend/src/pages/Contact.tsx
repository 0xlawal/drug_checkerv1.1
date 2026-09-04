import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, send to backend
    console.log('Form data:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-dark mb-6">Contact</h1>
      {submitted ? (
        <div className="p-6 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700">
          <CheckCircle2 className="h-6 w-6" />
          <span>Message sent! I'll get back to you soon.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition flex items-center justify-center gap-2">
            <Send className="h-5 w-5" /> Send Message
          </button>
        </form>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-sm font-black text-slate-500">Email</p>
          <a href="mailto:goodnesslawal6@gmail.com" className="text-emerald-700 font-bold hover:underline">
            goodnesslawal6@gmail.com
          </a>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-sm font-black text-slate-500">GitHub</p>
          <a href="https://github.com/0xlawal" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold hover:underline">0xlawal</a>
        </div>
      </div>
    </div>
  )
}