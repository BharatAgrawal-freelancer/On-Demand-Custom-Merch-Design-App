import Design from "../models/design.js"
import Product from "../models/product.js"
export const createDesign = async (req, res) => {
  try {
    const { title, productRef, customUpload, tags, public: isPublic } = req.body

    // fetch product to get its first image
    let baseImage = "no design selected"
    if (productRef) {
      const product = await Product.findById(productRef).select("images")
      if (product && product.images && product.images.length > 0) {
        baseImage = product.images[0]
      }
    }

    // create design
    const design = await Design.create({
      title: title || "Untitled Design",
      owner: req.user.id,
      productRef,
      customUpload,
      tags,
      public: !!isPublic,
      baseImage, // ✅ new field added here
    })

    res.json(design)
  } catch (e) {
    console.error("Design creation failed:", e)
    res.status(500).json({ message: e.message })
  }
}


export const getDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ owner: req.user.id }).sort({ updatedAt: -1 })
    res.json(designs)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getDesignById = async (req, res) => {
  try {
    const d = await Design.findById(req.params.designId)
    if (!d) return res.status(404).json({ message: "Not found" })
    res.json(d)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const updateDesign = async (req, res) => {
  try {
    const { designId } = req.params
    const { overlays, ...rest } = req.body
    const d = await Design.findOneAndUpdate(
      { _id: designId, owner: req.user.id },
      { $set: { ...rest, ...(overlays ? { overlays } : {}) }, updatedAt: new Date() },
      { new: true },
    )
    res.json(d)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const addOverlay = async (req, res) => {
  try {
    const { designId } = req.params
    const design = await Design.findOne({ _id: designId, owner: req.user.id })
    if (!design) return res.status(404).json({ message: "Not found" })
    await design.addOverlay(req.body.overlay)
    res.json(design)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

export const createVersion = async (req, res) => {
  try {
    const { designId } = req.params
    const design = await Design.findOne({ _id: designId, owner: req.user.id })
    if (!design) return res.status(404).json({ message: "Not found" })
    await design.createVersion(req.user.id)
    res.json(design.versions)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const getVersions = async (req, res) => {
  try {
    const design = await Design.findById(req.params.designId).select("versions")
    res.json(design?.versions || [])
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const setCollaborators = async (req, res) => {
  try {
    const { designId } = req.params
    const { collaborators } = req.body
    const d = await Design.findOneAndUpdate(
      { _id: designId, owner: req.user.id },
      { $set: { collaborators } },
      { new: true },
    )
    res.json(d.collaborators)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
