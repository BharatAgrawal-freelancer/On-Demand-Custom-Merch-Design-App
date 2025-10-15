"use client"

import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { api } from "../lib/api.js"

export default function Search() {
  const [params] = useSearchParams()
  const q = params.get("q") || ""
  const [res, setRes] = useState({ products: [], designs: [], users: [] })

  useEffect(() => {
    if (!q) return
    api.get(`/api/search?q=${encodeURIComponent(q)}`).then((r) => r.ok && setRes(r.data))
  }, [q])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold">
        Search: <span className="text-zima">{q}</span>
      </h1>

      <Section title="Products">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {res.products.map((p) => (
            <Link key={p._id} to={`/products/${p._id}`} className="pb-card p-3">
              <div className="aspect-[4/3] rounded-lg bg-zinc-800" />
              <div className="mt-2 font-semibold">{p.name}</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Designs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {res.designs.map((d) => (
            <div key={d._id} className="pb-card p-3">
              <img
                src={d.customUpload?.imageUrl || `/placeholder.svg?height=160&width=240&query=design`}
                alt={d.title}
                className="rounded-lg"
              />
              <div className="mt-2 font-semibold">{d.title}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Users">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {res.users.map((u) => (
            <Link key={u._id} to={`/user/${u._id}`} className="pb-card p-3">
              <div className="flex items-center gap-3">
                <img
                  src={u.profilePhoto || `/placeholder.svg?height=48&width=48&query=avatar`}
                  alt={u.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-sm text-zinc-400">@{u.username}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="font-semibold mb-3">{title}</h2>
      {children}
    </section>
  )
}
