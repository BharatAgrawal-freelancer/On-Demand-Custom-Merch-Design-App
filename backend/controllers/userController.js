import User from "../models/user.js"
import Design from "../models/design.js"
import Order from "../models/order.js"

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id
    const designs = await Design.find({ owner: userId }).sort({ updatedAt: -1 }).limit(10)
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).limit(10)
    const stats = {
      designsCount: await Design.countDocuments({ owner: userId }),
      ordersCount: await Order.countDocuments({ user: userId }),
      likesReceived: await Design.aggregate([
        { $match: { owner: new (await import("mongoose")).default.Types.ObjectId(userId) } },
        { $project: { count: { $size: "$likes" } } },
        { $group: { _id: null, total: { $sum: "$count" } } },
      ]).then((a) => a[0]?.total || 0),
    }
    res.json({ designs, orders, stats })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).select("-passwordHash").populate("user_designs")
    if (!user) return res.status(404).json({ message: "Not found" })
    res.json(user)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { name, username, bio, profilePhoto, tags, social } = req.body
    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: { name, username, bio, profilePhoto, tags, social } },
      { new: true },
    ).select("-passwordHash")
    res.json(updated)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("followers", "name username profilePhoto")
    res.json(user.followers || [])
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("following", "name username profilePhoto")
    res.json(user.following || [])
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getLikedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "liked_posts",
      populate: [{ path: "design" }, { path: "author", select: "name username" }],
    })
    res.json(user.liked_posts || [])
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getComplaints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("complaints")
    res.json(user.complaints || [])
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
