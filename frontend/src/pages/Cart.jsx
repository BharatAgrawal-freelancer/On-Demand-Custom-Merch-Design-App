"use client"

import { useEffect } from "react"
import { useCart } from "../context/CartContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"

export default function Cart() {
  const { items, refresh, checkout } = useCart()
  const { token } = useAuth()

  useEffect(() => {
    if (token) refresh()
  }, [token]) // eslint-disable-line

  const subtotal = items.reduce((s, it) => s + (it.quantity || 1) * (it.unitPrice || 0), 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-3">
        {items.map((it, idx) => (
          <div key={idx} className="pb-card p-3 flex items-center gap-3">
            <img
              src={it.designSnapshot?.overlays?.[0]?.imageUrl || `/placeholder.svg?height=80&width=80&query=item`}
              alt="item"
              className="w-16 h-16 rounded-lg"
            />
            <div className="flex-1">
              <div className="font-semibold">Design #{(it.designId || "").slice(-5)}</div>
              <div className="text-sm text-zinc-400">Qty {it.quantity || 1}</div>
            </div>
            <div className="text-unakite font-semibold">₹{it.unitPrice || 0}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="text-zinc-400">Subtotal</div>
        <div className="text-unakite font-semibold">₹{subtotal}</div>
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={async () => {
          const res = await checkout()
          if (res.ok) alert("Checkout complete!")
          else alert(res.error || "Checkout failed")
        }}
      >
        Checkout
      </button>
    </div>
  )
}
