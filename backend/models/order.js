const mongoose = require("mongoose")
const { Schema } = mongoose

const OrderItemSchema = new Schema(
  {
    design: { type: Schema.Types.ObjectId, ref: "Design" },
    designSnapshot: Schema.Types.Mixed,
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variant: { type: Schema.Types.Mixed },
    quantity: { type: Number, default: 1 },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { _id: true },
)

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, default: "created" },
    paymentProvider: String,
    paymentRef: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    podOrderId: String,
    podStatus: Schema.Types.Mixed,
    batchId: { type: String },
    isBatchPrinted: { type: Boolean, default: false },
    shippingAddress: Schema.Types.Mixed,
    notes: String,
  },
  { timestamps: true },
)

OrderSchema.statics.computeUnitPrice = (quantity, customTiers) => {
  const defaultTiers = [
    { min: 1, max: 1, price: 300 },
    { min: 2, max: 10, price: 280 },
    { min: 11, max: 50, price: 260 },
    { min: 51, max: 100, price: 240 },
  ]
  const tiers = Array.isArray(customTiers) && customTiers.length ? customTiers : defaultTiers
  for (const t of tiers) {
    if (quantity >= t.min && quantity <= t.max) return t.price
  }
  return tiers[tiers.length - 1].price
}

OrderSchema.statics.createFromCartItems = async function (userId, items, opts = {}) {
  let subtotal = 0
  const orderItems = []
  for (const it of items) {
    const unitPrice = this.computeUnitPrice(it.quantity, opts.priceTiers)
    const totalPrice = unitPrice * it.quantity
    subtotal += totalPrice
    orderItems.push({
      design: it.designId,
      designSnapshot: it.designSnapshot || {},
      product: it.productId,
      variant: it.variant || {},
      quantity: it.quantity,
      unitPrice,
      totalPrice,
    })
  }
  const shipping = opts.shipping || 0
  const discount = opts.discount || 0
  const total = subtotal + shipping - discount
  return {
    user: userId,
    items: orderItems,
    subtotal,
    shipping,
    discount,
    total,
    currency: opts.currency || "INR",
    status: "pending_payment",
  }
}

module.exports = mongoose.model("Order", OrderSchema)
