"use client"

import { createContext, useContext, useMemo, useState, useEffect } from "react"
import { api } from "../lib/api.js"
import { useAuth } from "./AuthContext.jsx"

const CartCtx = createContext(null)

export function CartProvider({ children }) {
  const { token } = useAuth()
  const [items, setItems] = useState([])

  const refresh = async () => {
    if (!token) return
    const res = await api.get("/api/orders/cart", token)
    if (res.ok) setItems(res.data.items)
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const value = useMemo(
    () => ({
      items,
      add: async (payload, tokenOverride) => {
        const res = await api.post("/api/orders/cart", payload, tokenOverride || token)
        if (res.ok) setItems(res.data.items)
        return res
      },
      checkout: async () => {
        const res = await api.post("/api/orders/checkout", {}, token)
        if (res.ok) setItems([])
        return res
      },
      refresh,
    }),
    [items, token],
  )

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  return useContext(CartCtx)
}
