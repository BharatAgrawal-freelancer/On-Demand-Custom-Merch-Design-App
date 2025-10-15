const mongoose = require("mongoose")
const { Schema } = mongoose

const VariantSchema = new Schema(
  {
    sku: String,
    size: String,
    color: String,
    basePrice: { type: Number, default: 0 },
    stockType: { type: String, enum: ["pod", "stock"], default: "pod" },
  },
  { _id: false },
)

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String },
    description: String,
    images: [String],
    printableArea: {
      width: Number,
      height: Number,
    },
    variants: [VariantSchema],
    metadata: Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

ProductSchema.index({ slug: 1 })

module.exports = mongoose.model("Product", ProductSchema)
