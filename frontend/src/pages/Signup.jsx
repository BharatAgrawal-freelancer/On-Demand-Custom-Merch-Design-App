"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { useNavigate, Link } from "react-router-dom"

export default function Signup() {
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" })
  const [error, setError] = useState("")
  const { signup } = useAuth()
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await signup(form)
    if (!res.ok) setError(res.message || "Failed to sign up")
    else nav("/products")
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16" data-aos="fade-up">
      <h1 className="text-3xl font-bold mb-6">Create your account</h1>
      <form onSubmit={onSubmit} className="space-y-4 pb-card p-6">
        {error && <div className="text-red-400">{error}</div>}
        {["name", "username", "email", "password"].map((k) => (
          <div key={k}>
            <label className="block text-sm mb-1 capitalize">{k}</label>
            <input
              type={k === "password" ? "password" : "text"}
              className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800"
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              required
            />
          </div>
        ))}
        <button className="btn btn-primary w-full">Sign up</button>
        <p className="text-sm text-zinc-400">
          Have an account?{" "}
          <Link className="text-zima" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
