import Product from "../models/product.js"
import Design from "../models/design.js"
import User from "../models/user.js"

export const searchAll = async (req, res) => {
  const q = (req.query.q || "").trim()
  if (!q) return res.json({ products: [], designs: [], users: [] })
  const regex = new RegExp(q, "i")
  const [products, designs, users] = await Promise.all([
    Product.find({ $or: [{ name: regex }, { slug: regex }, { category: regex }] }).limit(20),
    Design.find({ $or: [{ title: regex }, { tags: regex }] }).limit(20),
    User.find({ $or: [{ name: regex }, { username: regex }] })
      .select("name username profilePhoto")
      .limit(20),
  ])
  res.json({ products, designs, users })
}
