import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white">
                G
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-slate-800">Ganesha</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              All-in-one software for hotels and restaurants. Multi-tenant, secure, scalable.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Products</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link to="/login" className="hover:text-blue-600">Operations</Link></li>
              <li><Link to="/login" className="hover:text-blue-600">Inventory</Link></li>
              <li><Link to="/login" className="hover:text-blue-600">Staff & roles</Link></li>
              <li><Link to="/login" className="hover:text-blue-600">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href="#features" className="hover:text-blue-600">Why us</a></li>
              <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
              <li><a href="#" className="hover:text-blue-600">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms</a></li>
              <li><a href="#" className="hover:text-blue-600">Cancellation & refund</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">© {year} Ganesha. All rights reserved.</p>
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:shadow-blue-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
