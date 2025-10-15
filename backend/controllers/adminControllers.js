import User from "../models/user.js"
import Product from "../models/product.js"
import Order from "../models/order.js"
import Trend from "../models/trend.js"

export const adminDashboard = async (_req, res) => {
  const [users, orders, products, trends] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Product.countDocuments(),
    Trend.countDocuments(),
  ])
  res.json({ totals: { users, orders, products, trends } })
}

export const adminUsers = async (_req, res) => {
  const users = await User.find().select("name username email roles createdAt")
  res.json(users)
}

export const adminProducts = async (_req, res) => {
  const products = await Product.find()
  res.json(products)
}

export const adminOrders = async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 })
  res.json(orders)
}

export const adminTrends = async (_req, res) => {
  const trends = await Trend.find().sort({ score: -1 })
  res.json(trends)
}

export const adminComplaints = async (_req, res) => {
  const users = await User.find({ "complaints.0": { $exists: true } }).select("username complaints")
  res.json(users)
}
