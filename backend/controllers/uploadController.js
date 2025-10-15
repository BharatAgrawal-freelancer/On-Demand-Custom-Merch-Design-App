import { configureCloudinary } from "../config/cloudinary.js"

export const uploadImage = async (req, res) => {
  try {
    const { imageUrl, base64 } = req.body
    const cloudinary = configureCloudinary()
    const uploadSource = base64 || imageUrl
    if (!uploadSource) return res.status(400).json({ message: "Provide imageUrl or base64" })
    const result = await cloudinary.uploader.upload(uploadSource, { folder: "merch" })
    res.json({ url: result.secure_url, publicId: result.public_id })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
