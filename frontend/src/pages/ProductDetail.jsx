"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../lib/api.js"
import { useAuth } from "../context/AuthContext.jsx"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const nav = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    api.get(`/api/products/${id}`).then((res) => {
      if (res.ok) setProduct(res.data)
        const firstImage = res.data?.images?.[0];
localStorage.setItem("baseImage", firstImage)
    })
  }, [id])

  const firstVariant = useMemo(() => product?.variants?.[0] || null, [product])

  const startDesign = async () => {
    if (!token) return nav("/login", { state: { from: `/products/${id}` } })
    const res = await api.post(
      "/api/designs",
      {
        title: `${product?.name || "Design"} Draft`,
        productRef: id,
        public: false,
      },
      token,
    )
    if (res.ok) nav(`/editor/${res.data._id}`)
  }

  if (!product)
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <img src="/loading-product.jpg" alt="loading" />
      </div>
    )

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      <div className="pb-card p-4" data-aos="fade-right">
        <img
          src={product.images?.[0] || `/placeholder.svg?height=500&width=600&query=product`}
          alt={product.name}
          className="w-full h-auto rounded-xl"
        />
      </div>
      <div data-aos="fade-left">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-zinc-300">{product.description || "Premium customizable merch product."}</p>
        {firstVariant && (
          <div className="mt-4">
            <div className="text-unakite font-semibold">from ₹{firstVariant.basePrice || 299}</div>
          </div>
        )}
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary" onClick={startDesign}>
            <i className="fa-solid fa-pen-ruler mr-2" aria-hidden /> Use as Canvas
          </button>
          <button className="btn btn-ghost" onClick={() => window.history.back()}>
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
