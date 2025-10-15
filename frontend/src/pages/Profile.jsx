"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../lib/api.js"

export default function Profile() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    api.get(`/api/user/profile/${userId}`).then((res) => {
      if (res.ok) setUser(res.data)
    })
  }, [userId])

  if (!user)
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <img src="/loading-profile.jpg" alt="loading" />
      </div>
    )

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4">
        <img
          src={user.profilePhoto || `/placeholder.svg?height=80&width=80&query=avatar`}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <div className="text-xl font-bold">{user.name}</div>
          <div className="text-zinc-400">@{user.username}</div>
        </div>
      </div>
      <h2 className="text-lg font-semibold mt-8 mb-4">Designs</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {(user.user_designs || []).map((d) => (
          <div key={d._id} className="pb-card p-3">
            <img
              src={d.customUpload?.imageUrl || `/placeholder.svg?height=200&width=300&query=design`}
              alt={d.title}
              className="rounded-lg w-full"
            />
            <div className="mt-2 font-semibold">{d.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
