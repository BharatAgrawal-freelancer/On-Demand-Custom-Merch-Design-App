"use client"

import { useEffect, useState } from "react"
import { api } from "../lib/api.js"
import { useAuth } from "../context/AuthContext.jsx"

export default function Dashboard() {
  const { token } = useAuth()
  const [data, setData] = useState(null)
  const [liked, setLiked] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  useEffect(() => {
    if (!token) return
    api.get("/api/user/dashboard", token).then((res) => res.ok && setData(res.data))
    api.get("/api/user/likedPosts", token).then((res) => res.ok && setLiked(res.data))
    api.get("/api/user/followers", token).then((res) => res.ok && setFollowers(res.data))
    api.get("/api/user/following", token).then((res) => res.ok && setFollowing(res.data))
  }, [token])

  if (!data)
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <img src="/loading-dashboard.jpg" alt="loading" />
      </div>
    )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Designs" value={data.stats?.designsCount || 0} />
        <Stat label="Orders" value={data.stats?.ordersCount || 0} />
        <Stat label="Likes Received" value={data.stats?.likesReceived || 0} />
        <Stat label="Following" value={following?.length || 0} />
      </div>

      <section className="pb-card p-4">
        <h3 className="font-semibold mb-3">Recent Designs</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {data.designs?.map((d) => (
            <div key={d._id} className="bg-zinc-900 rounded-xl p-3">
              <img
                src={d.customUpload?.imageUrl || `/placeholder.svg?height=160&width=240&query=design`}
                alt={d.title}
                className="rounded-lg w-full"
              />
              <div className="mt-2 font-semibold">{d.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-card p-4">
        <h3 className="font-semibold mb-3">Liked Posts</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {liked.map((p) => (
            <div key={p._id} className="bg-zinc-900 rounded-xl p-3">
              <div className="font-semibold">{p.heading || "Untitled"}</div>
              <div className="text-xs text-zinc-400">by {p.author?.username}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="pb-card p-4 text-center">
      <div className="text-3xl font-extrabold text-zima">{value}</div>
      <div className="text-sm text-zinc-400">{label}</div>
    </div>
  )
}
