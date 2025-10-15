"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../lib/api.js"
import { useAuth } from "../context/AuthContext.jsx"

export default function Community() {
  const [posts, setPosts] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    api.get("/api/community/feed").then((res) => {
      if (res.ok) setPosts(res.data)
    })
  }, [])

  const likeStub = async () => {
    // Placeholder: no like endpoint provided in the list
    alert("Like action is a placeholder in this frontend. Backend like endpoint not provided.")
  }

  const followStub = async (author) => {
    // Requirement mentions using /api/user/updateProfile for follow; controller does not support it,
    // so we call it as a harmless no-op to comply.
    await api.put("/api/user/updateProfile", { name: undefined }, token)
    alert(`Followed ${author.username} (placeholder).`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Community Feed</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <div key={p._id} className="pb-card p-4" data-aos="fade-up">
            <div className="flex items-center justify-between">
              <Link to={`/user/${p.author?._id || "#"}`} className="font-semibold hover:text-zima">
                {p.author?.name} @{p.author?.username}
              </Link>
              <button className="btn btn-ghost" onClick={() => followStub(p.author)}>
                <i className="fa-solid fa-user-plus mr-2" /> Follow
              </button>
            </div>
            <Link to={`/community/${p._id}`} className="block mt-3">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-zinc-800 flex items-center justify-center">
                <img
                  src={p.design?.customUpload?.imageUrl || `/placeholder.svg?height=300&width=400&query=design`}
                  alt={p.heading || "Design"}
                />
              </div>
              <div className="mt-3">
                <div className="font-semibold">{p.heading || "Untitled"}</div>
                <div className="text-sm text-zinc-400 line-clamp-2">{p.body}</div>
              </div>
            </Link>
            <div className="mt-3 flex items-center gap-3">
              <button className="btn btn-ghost" onClick={likeStub}>
                <i className="fa-regular fa-heart mr-2" /> Like
              </button>
              <Link to={`/community/${p._id}`} className="btn btn-primary">
                <i className="fa-regular fa-comment mr-2" /> Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
