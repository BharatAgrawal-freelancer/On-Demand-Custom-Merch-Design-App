"use client"

import { useEffect, useState } from "react"
import { api } from "../lib/api.js"
import ProductCard from "../components/ProductCard.jsx"

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get("/api/products").then((res) => {
      if (res.ok) setProducts(res.data)
    })
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  )
}
