import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { saveContactLead } from '../../services/contactService.js'
function Landing() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setStatus(null)
  
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
  
    try {
      const res = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
  
      const data = await res.json().catch(() => ({}))
  
      if (!res.ok) {
        throw new Error(data.message || 'Failed to send message')
      }
  
      // Also store in Firestore users collection
      try {
        await saveContactLead(payload)
      } catch (err) {
        console.error('[contact] Failed to save lead in Firestore:', err)
        // We don't block the user on this; email already went through.
      }
  
      setStatus({
        type: 'success',
        message: 'Message sent successfully. Our team will contact you shortly.',
      })
      form.reset()
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.message ||
          'Could not send message. Please try again or contact us directly at inquiry@ganesha.app.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-w-0 bg-white">
      {/* ========== HERO ========== */}
      <section id="top" className="bg-gradient-to-b from-blue-50 via-white to-white px-6 pt-14 pb-20 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-extrabold leading-[1.15] tracking-tight text-slate-900 text-4xl md:text-5xl lg:text-6xl">
            All-in-One Software Powering
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Hotel & Restaurant Growth
            </span>
            <br />
            At Every Step
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Stay ahead of the curve with solutions designed for tomorrow's challenges—flexible tools that adapt to your unique needs.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-200 transition hover:shadow-blue-300 hover:brightness-105"
          >
            Get Started
          </a>
        </div>

        {/* Product preview strip */}
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {[
              { label: 'Operations', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=85', border: 'border-blue-200 shadow-blue-100' },
              { label: 'Orders & Kitchen', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=85', border: 'border-emerald-200 shadow-emerald-100' },
              { label: 'Inventory', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=85', border: 'border-violet-200 shadow-violet-100' },
              { label: 'Staff & Reports', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=85', border: 'border-amber-200 shadow-amber-100' },
            ].map((item) => (
              <div
                key={item.label}
                className={`w-[260px] overflow-hidden rounded-2xl border-2 bg-white shadow-lg transition hover:shadow-xl ${item.border}`}
              >
                <div className="h-36 w-full overflow-hidden">
                  <img src={item.img} alt={item.label} className="h-full w-full object-cover" />
                </div>
                <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-700">{item.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">Dashboard · Real-time</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRODUCT SECTIONS (alternating) ========== */}
      <section id="products" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* Operations */}
          <div className="grid items-center gap-12 py-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Restaurant operations software made simple
              </h2>
              <p className="mt-5 text-lg text-slate-600">
                Manage all your restaurant operations efficiently so you can grow your brand. Orders, tables, kitchen display—all in one place.
              </p>
            
            </div>
            <div className="overflow-hidden rounded-3xl border-2 border-slate-200 shadow-2xl shadow-slate-200/80">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85"
                alt="Restaurant operations"
                className="h-72 w-full object-cover md:h-80"
              />
            </div>
          </div>

          {/* Inventory & Suppliers */}
          <div className="grid items-center gap-12 py-12 md:grid-cols-2 md:gap-16">
            <div className="order-2 md:order-1 overflow-hidden rounded-3xl border-2 border-slate-200 shadow-2xl shadow-slate-200/80">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85"
                alt="Inventory and stock"
                className="h-72 w-full object-cover md:h-80"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Inventory & suppliers at a glance
              </h2>
              <p className="mt-5 text-lg text-slate-600">
                Track stock, reorder points, and supplier orders. Real-time insights so you never run out of what matters.
              </p>
              
            </div>
          </div>

          {/* Staff & Roles */}
          <div className="grid items-center gap-12 py-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Staff, roles and access—under control
              </h2>
              <p className="mt-5 text-lg text-slate-600">
                Role-based dashboards for admin, manager, kitchen and cashier. Everyone sees only what they need; security is built in.
              </p>
            
            </div>
            <div className="overflow-hidden rounded-3xl border-2 border-slate-200 shadow-2xl shadow-slate-200/80">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=85"
                alt="Team collaboration"
                className="h-72 w-full object-cover md:h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRUST BAR ========== */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 py-10">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xl font-bold text-white md:text-2xl">
            Trusted by restaurants and hotel groups worldwide
          </p>
        </div>
      </section>

      {/* ========== WHY OUR CLIENTS LOVE US ========== */}
      <section id="features" className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Simplicity meets excellence—our product excels in every aspect
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            We design our product to be the best in every way: quality, ease of use, and great performance so your operations run smoothly.
          </p>
        </div>
      </section>

      {/* ========== WHY US (4 cards) ========== */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">Why us</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-slate-600">
            Simple & powerful—we craft top-quality, user-friendly software for peak performance.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Continuous innovation', desc: 'Regular updates and new features to improve performance.', bg: 'bg-blue-50', border: 'border-blue-200', icon: '◆', color: 'text-blue-600' },
              { title: 'Transparent pricing', desc: 'Industry-low, scalable pricing designed to grow with you.', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: '◇', color: 'text-emerald-600' },
              { title: 'Simplicity', desc: 'User-centric design so you learn fast and leverage full potential.', bg: 'bg-violet-50', border: 'border-violet-200', icon: '○', color: 'text-violet-600' },
              { title: '24×7 support', desc: 'Dedicated support via call or email whenever you need help.', bg: 'bg-amber-50', border: 'border-amber-200', icon: '●', color: 'text-amber-600' },
            ].map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border-2 ${card.border} ${card.bg} p-6 shadow-md transition hover:shadow-lg`}
              >
                <div className={`text-2xl font-bold ${card.color}`}>{card.icon}</div>
                <h3 className="mt-4 font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-slate-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== OUR ECOSYSTEM ========== */}
      <section id="how-it-works" className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Our ecosystem—empowering hospitality through integrated solutions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
            We combine industry expertise with creative problem-solving to drive efficiency and unlock new possibilities.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Operations', desc: 'Orders, tables, kitchen and real-time service overview.', link: 'Know More', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=85' },
              { title: 'Inventory', desc: 'Stock levels, reorders and supplier management.', link: 'Know More', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=85' },
              { title: 'Staff & roles', desc: 'Access control and role-based dashboards.', link: 'Know More', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=85' },
              { title: 'Analytics', desc: 'Reports and insights across locations.', link: 'Know More', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=85' },
            ].map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg transition hover:border-blue-200 hover:shadow-xl"
              >
                <div className="h-40 w-full overflow-hidden">
                  <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-slate-600">{item.desc}</p>
                  <Link to="/login" className="mt-3 inline-block font-semibold text-blue-600 hover:text-blue-700">
                    {item.link} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== KEY METRICS ========== */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Amplifying the key metrics that matter
          </h2>
          <div className="mt-14 flex flex-wrap justify-center gap-12 md:gap-20">
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 px-10 py-8 text-center">
              <p className="text-4xl font-extrabold text-blue-600 md:text-5xl">1000+</p>
              <p className="mt-1 font-medium text-slate-700">Restaurants per project</p>
            </div>
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-10 py-8 text-center">
              <p className="text-4xl font-extrabold text-emerald-600 md:text-5xl">99.99%</p>
              <p className="mt-1 font-medium text-slate-700">Uptime</p>
            </div>
            <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 px-10 py-8 text-center">
              <p className="text-4xl font-extrabold text-violet-600 md:text-5xl">0%</p>
              <p className="mt-1 font-medium text-slate-700">Data mix—strict tenant isolation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT OUR SOLUTIONS CAN DO ========== */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            What our solution can do for you
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
            Tailored for every scale—from single outlet to multi-location groups.
          </p>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: 'Boost restaurant growth', color: 'bg-blue-500' },
              { label: 'Multi-location & franchise-ready', color: 'bg-emerald-500' },
              { label: 'Role-based access control', color: 'bg-violet-500' },
              { label: 'Real-time orders & kitchen', color: 'bg-amber-500' },
              { label: 'Analytics & reports', color: 'bg-rose-500' },
            ].map((item) => (
              <Link
                key={item.label}
                to="/login"
                className={`rounded-2xl ${item.color} p-6 text-center font-semibold text-white shadow-lg transition hover:brightness-110 hover:shadow-xl`}
              >
                {item.label}
             
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Hear from our clients
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { quote: 'Ganesha gives us detailed control over operations and real-time visibility. Support is responsive and the platform scales with our growth.', name: 'Alex Chen', role: 'Operations Manager @ Bistro One', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80' },
              { quote: 'We run multiple outlets and needed one system that syncs everything. Ganesha keeps orders, inventory and staff in one place—smooth operations.', name: 'Maria Santos', role: 'Founder @ Cloud Kitchen Co', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80' },
              { quote: 'Simple to use, powerful underneath. Our team adopted it quickly and we finally have clear reports across all locations.', name: 'James Wright', role: 'Partner @ Hotel Group', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80' },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-6 shadow-md">
                <p className="text-slate-700">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={t.img} alt="" className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            We'd love to answer your questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-slate-600">
            Have a query? We're happy to help. Reach out or fill the form below.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="font-bold text-slate-900">Connect with us</h3>
              <p className="text-slate-600">Phone: +1 (555) 000-0000</p>
              <p className="text-slate-600">Email: inquiry@ganesha.app</p>
              <div className="flex gap-4">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-700" aria-label="LinkedIn">LinkedIn</a>
                <a href="#" className="font-medium text-blue-600 hover:text-blue-700" aria-label="Twitter">Twitter</a>
              </div>
              <div className="overflow-hidden rounded-2xl border-2 border-slate-200 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=85"
                  alt="Team"
                  className="h-56 w-full object-cover"
                />
              </div>
            </div>
            <form
              className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-xl"
              onSubmit={handleContactSubmit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    required
                    className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  />
                </label>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  City
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Phone number
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 555 000 0000"
                    className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  />
                </label>
              </div>
              <label className="mt-4 block text-sm font-medium text-slate-700">
                Business name
                <input
                  type="text"
                  name="businessName"
                  placeholder="Your restaurant or group name"
                  className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </label>
              <label className="mt-4 block text-sm font-medium text-slate-700">
                Message
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Your question or request"
                  className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:shadow-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
              {status && (
                <p
                  className={`mt-3 text-sm ${
                    status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
