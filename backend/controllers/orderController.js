import Order from "../models/order.js"

const userCarts = new Map() // in-memory demo

export const getCart = async (req, res) => {
  const cart = userCarts.get(req.user.id) || []
  res.json({ items: cart })
}

export const addToCart = async (req, res) => {
  const cart = userCarts.get(req.user.id) || []
  cart.push(req.body) // { designId, productId, variant, quantity, designSnapshot }
  userCarts.set(req.user.id, cart)
  res.json({ items: cart })
}

export const checkout = async (req, res) => {
  try {
    const items = userCarts.get(req.user.id) || []
    if (!items.length) return res.status(400).json({ message: "Cart empty" })
    const payload = await Order.createFromCartItems(req.user.id, items, {})
    const order = await Order.create(payload)
    userCarts.set(req.user.id, [])
    res.json(order)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.orderId)
  if (!order) return res.status(404).json({ message: "Not found" })
  res.json(order)
}

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.json(orders)
}

export const batchStatus = async (req, res) => {
  // stub
  res.json({ batchId: req.params.batchId, status: "queued_for_print" })
}
