import { geminiGenerateText } from "../utils/gemini.js"

export const generateTextOverlay = async (req, res) => {
  try {
    const { theme, prompt } = req.body
    const textPrompt = prompt || `Give a short quote for a ${theme || "aesthetic"} themed merch design. 6 words max.`
    const data = await geminiGenerateText(textPrompt)
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Stay Inspired"
    res.json({ text: content })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

// Image gen is stubbed to return a placeholder URL. Replace with proper image generation later.
export const generateImageOverlay = async (req, res) => {
  const { theme } = req.body
  res.json({
    imageUrl: `/placeholder.svg?height=512&width=512&query=ai+generated+${encodeURIComponent(theme || "design")}`,
  })
}

export const trendAiSuggestions = async (_req, res) => {
  res.json({
    suggestions: [
      { tag: "Minimalist", score: 85 },
      { tag: "Y2K", score: 78 },
    ],
  })
}

export const suggestTags = async (req, res) => {
  const { title = "" } = req.body
  res.json({ tags: ["minimalist", "pastelcore", "weebcore"].filter((t) => title.toLowerCase().includes(t[0])) })
}
