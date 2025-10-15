import Product from "../models/product.js"

export const listProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: "Not found" })
    res.json(product)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
