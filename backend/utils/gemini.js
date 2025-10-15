import fetch from "node-fetch"

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

export async function geminiGenerateText(prompt) {
  const API_KEY = process.env.GEMINI_API_KEY
  if (!API_KEY) throw new Error("GEMINI_API_KEY missing")
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  }
  const res = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return data
}
