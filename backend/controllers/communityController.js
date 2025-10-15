import CommunityPost from "../models/communityPost.js"
import Design from "../models/design.js"

export const feed = async (req, res) => {
  try {
    const { tag } = req.query
    const q = { visibility: "public" }
    if (tag) q.tags = tag
    const posts = await CommunityPost.find(q)
      .sort({ createdAt: -1 })
      .populate("design")
      .populate("author", "name username")
    res.json(posts)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getPost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.postId).populate("design").populate("author", "name username")
    if (!post) return res.status(404).json({ message: "Not found" })
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const createPost = async (req, res) => {
  try {
    const { designId, heading, body, tags } = req.body
    const d = await Design.findById(designId)
    if (!d) return res.status(404).json({ message: "Design not found" })
    const post = await CommunityPost.create({ design: d._id, author: req.user.id, heading, body, tags })
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
