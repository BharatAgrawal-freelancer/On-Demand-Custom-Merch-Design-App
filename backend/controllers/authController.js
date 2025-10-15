import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js" // CommonJS export; import default via .js path resolved by Node ES module interop

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Missing fields" })
    }
    const exists = await User.findOne({ $or: [{ email }, { username }] })
    if (exists) return res.status(409).json({ message: "User exists" })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, username, email, passwordHash, roles: ["user"] })
    const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.json({ token, user: { id: user._id, name: user.name, username: user.username, email: user.email } })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body
    const user = await User.findOne({
      $or: [{ email: emailOrUsername?.toLowerCase() }, { username: emailOrUsername?.toLowerCase() }],
    })
    if (!user) return res.status(404).json({ message: "User not found" })
    const ok = await bcrypt.compare(password, user.passwordHash || "")
    if (!ok) return res.status(401).json({ message: "Invalid credentials" })
    const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.json({ token, user: { id: user._id, name: user.name, username: user.username, email: user.email } })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
