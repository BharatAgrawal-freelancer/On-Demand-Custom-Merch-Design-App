"use client"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import { useState } from "react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [q, setQ] = useState("")
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="PrintBazaar logo" className="w-7 h-7 rounded-lg" />
          <span className="font-extrabold text-2xl tracking-tight">PrintBazaar</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 ml-6 text-sm">
          <Link to="/products" className="hover:text-zima">
            Products
          </Link>
          <Link to="/community" className="hover:text-zima">
            Community
          </Link>
          <Link to="/trending" className="hover:text-zima">
            Trending
          </Link>
          {user && (
            <Link to="/dashboard" className="hover:text-zima">
              Dashboard
            </Link>
          )}
        </nav>

        <form
          className="ml-auto flex items-center gap-2 bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-800"
          onSubmit={(e) => {
            e.preventDefault()
            navigate(`/search?q=${encodeURIComponent(q)}`)
          }}
        >
          <i className="fa-solid fa-magnifying-glass text-zima" aria-hidden />
          <input
            aria-label="Search"
            className="bg-transparent outline-none text-sm w-40 md:w-64"
            placeholder="Search designs, products, users"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>

        <Link to="/cart" className="btn btn-ghost" title="Cart" aria-label="Cart">
          <i className="fa-solid fa-bag-shopping text-zima text-lg" aria-hidden />
        </Link>

        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-primary">
              Sign in
            </Link>
            <Link to="/signup" className="btn btn-ghost">
              Sign up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm opacity-80">Hi, {user.name}</span>
            <button className="btn btn-ghost" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket" aria-hidden /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
