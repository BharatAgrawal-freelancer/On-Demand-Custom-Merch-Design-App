import jwt from "jsonwebtoken"

export const optionalAuth = (req, _res, next) => {
  const auth = req.headers.authorization || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null
  if (!token) return next()
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id, roles: decoded.roles || ["user"] }
  } catch (_e) {
    // ignore invalid token in optional
  }
  next()
}

export const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null
  if (!token) return res.status(401).json({ message: "Missing token" })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id, roles: decoded.roles || ["user"] }
    return next()
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

// Enforce token for state-changing methods globally
export const enforceAuthOnMutations = (req, res, next) => {
  const method = req.method.toUpperCase()
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    return requireAuth(req, res, next)
  }
  return next()
}

// Admin guard
export const requireAdmin = (req, res, next) => {
  if (!req.user?.roles?.includes("admin")) {
    return res.status(403).json({ message: "Admin only" })
  }
  next()
}
