"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { useLocation, useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [emailOrUsername, setEU] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from?.pathname || "/"

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await login(emailOrUsername, password)
    if (!res.ok) setError(res.message || "Failed to login")
    else nav(from, { replace: true })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16" data-aos="fade-up">
      <h1 className="text-3xl font-bold mb-6">Welcome back</h1>
      <form onSubmit={onSubmit} className="space-y-4 pb-card p-6">
        {error && <div className="text-red-400">{error}</div>}
        <div>
          <label className="block text-sm mb-1">Email or Username</label>
          <input
            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800"
            value={emailOrUsername}
            onChange={(e) => setEU(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-full">Sign in</button>
        <p className="text-sm text-zinc-400">
          New here?{" "}
          <Link className="text-zima" to="/signup">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  )
}
