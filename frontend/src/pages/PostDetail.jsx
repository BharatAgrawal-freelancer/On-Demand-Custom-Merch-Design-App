"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { api } from "../lib/api.js"

export default function PostDetail() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    api.get(`/api/community/${postId}`).then((res) => {
      if (res.ok) setPost(res.data)
    })
  }, [postId])

  if (!post)
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <img src="/loading-post.jpg" alt="loading" />
      </div>
    )

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <Link to={`/user/${post.author?._id || "#"}`} className="hover:text-zima font-semibold">
          {post.author?.name} @{post.author?.username}
        </Link>
        <div className="text-sm text-zinc-400">{new Date(post.createdAt).toLocaleString()}</div>
      </div>
      <h1 className="text-3xl font-bold mt-2">{post.heading || "Untitled"}</h1>
      <p className="mt-2 text-zinc-300">{post.body}</p>
      <div className="mt-6 pb-card p-3">
        <img
          src={post.design?.customUpload?.imageUrl || `/placeholder.svg?height=400&width=600&query=design`}
          alt="design"
          className="w-full rounded-xl"
        />
      </div>
    </div>
  )
}
