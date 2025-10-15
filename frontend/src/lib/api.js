const ok = (res) => res.status >= 200 && res.status < 300

async function parse(res) {
  const ct = res.headers.get("content-type") || ""
  if (ct.includes("application/json")) return res.json()
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}

export const api = {
  async get(url, token) {
    try {
      const res = await fetch(url, {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      })
      const data = await parse(res)
      return { ok: ok(res), data, error: data?.message }
    } catch (e) {
      return { ok: false, error: e.message }
    }
  },
  async post(url, body, token) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      })
      const data = await parse(res)
      return { ok: ok(res), data, error: data?.message }
    } catch (e) {
      return { ok: false, error: e.message }
    }
  },
  async patch(url, body, token) {
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      })
      const data = await parse(res)
      return { ok: ok(res), data, error: data?.message }
    } catch (e) {
      return { ok: false, error: e.message }
    }
  },
  async put(url, body, token) {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      })
      const data = await parse(res)
      return { ok: ok(res), data, error: data?.message }
    } catch (e) {
      return { ok: false, error: e.message }
    }
  },
}
