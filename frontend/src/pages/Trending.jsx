"use client"

import { useEffect, useState } from "react"
import { api } from "../lib/api.js"

export default function Trending() {
  const [trends, setTrends] = useState([])
  const [ai, setAi] = useState([])

  useEffect(() => {
    api.get("/api/trends").then((res) => {
      if (res.ok) setTrends(res.data)
    })
    api.get("/api/ai/trends").then((res) => {
      if (res.ok) setAi(res.data.suggestions || [])
    })
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Trending Ideas</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="pb-card p-4">
          <h2 className="font-semibold mb-3">Top Trends</h2>
          <ul className="space-y-2">
            {trends.map((t) => (
              <li key={t._id} className="flex items-center justify-between">
                <span>#{t.tag}</span>
                <span className="text-unakite">{t.score}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pb-card p-4">
          <h2 className="font-semibold mb-3">AI Suggestions</h2>
          <ul className="space-y-2">
            {ai.map((s, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>#{s.tag}</span>
                <span className="text-unakite">{s.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
