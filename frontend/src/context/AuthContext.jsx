"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { api } from "../lib/api.js"

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("pb_token") || "")
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("pb_user")
    return s ? JSON.parse(s) : null
  })

  useEffect(() => {
    if (token) localStorage.setItem("pb_token", token)
    else localStorage.removeItem("pb_token")
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem("pb_user", JSON.stringify(user))
    else localStorage.removeItem("pb_user")
  }, [user])

  const value = useMemo(
    () => ({
      token,
      user,
      setUser,
      login: async (emailOrUsername, password) => {
        const res = await api.post("/api/auth/login", { emailOrUsername, password })
        if (res.ok) {
          setToken(res.data.token)
          setUser(res.data.user)
          return { ok: true }
        }
        return { ok: false, message: res.error }
      },
      signup: async ({ name, username, email, password }) => {
        const res = await api.post("/api/auth/register", { name, username, email, password })
        if (res.ok) {
          setToken(res.data.token)
          setUser(res.data.user)
          return { ok: true }
        }
        return { ok: false, message: res.error }
      },
      logout: () => {
        setToken("")
        setUser(null)
      },
    }),
    [token, user],
  )

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  return useContext(AuthCtx)
}
