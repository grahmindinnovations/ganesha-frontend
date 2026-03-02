import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = (
    <>
      <a href="#products" className="transition hover:text-blue-600" onClick={() => setMobileOpen(false)}>
        Products
      </a>
      <a href="#features" className="transition hover:text-blue-600" onClick={() => setMobileOpen(false)}>
        Why us
      </a>
      <a href="#how-it-works" className="transition hover:text-blue-600" onClick={() => setMobileOpen(false)}>
        Ecosystem
      </a>
      <a href="#contact" className="transition hover:text-blue-600" onClick={() => setMobileOpen(false)}>
        Contact
      </a>
      <a
      href="#contact"
        className="rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:shadow-blue-300"
        onClick={() => setMobileOpen(false)}
      >
        Get Started
      </a>
    </>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 text-xs font-bold tracking-wide text-white shadow-md shadow-blue-200">
            G
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Ganesha
            </span>
            <span className="text-xs text-slate-500">Hotel &amp; Restaurant Cloud</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navLinks}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-600">
            {navLinks}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
