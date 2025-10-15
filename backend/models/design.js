const mongoose = require("mongoose")
const { Schema } = mongoose

const OverlaySchema = new Schema(
  {
    type: { type: String, enum: ["image", "text", "shape", "sticker"], required: true },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    scaleX: { type: Number, default: 1 },
    scaleY: { type: Number, default: 1 },
    rotation: { type: Number, default: 0 },
    opacity: { type: Number, default: 1 },
    zIndex: { type: Number, default: 0 },
    imageUrl: String,
    imageMeta: Schema.Types.Mixed,
    text: String,
    fontFamily: String,
    fontSize: Number,
    color: String,
    textStyle: { type: String, enum: ["normal", "bold", "italic", "underline"], default: "normal" },
    assetId: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
)

const DesignSchema = new Schema(
  {
    title: { type: String, default: "Untitled Design" },
   baseImage: { type: String, default: "no design selected" },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productRef: { type: Schema.Types.ObjectId, ref: "Product" },
    customUpload: {
      imageUrl: String,
      meta: Schema.Types.Mixed,
    },
    overlays: { type: [OverlaySchema], default: [] },
    tags: [{ type: String }],
    aiPrompt: { type: String },
    aiSuggestions: [{ type: Schema.Types.Mixed }],
    collaborators: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["editor", "viewer", "owner"], default: "editor" },
      },
    ],
    public: { type: Boolean, default: false },
    publishedAt: Date,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    commentsCount: { type: Number, default: 0 },
    versions: [
      {
        snapshot: Schema.Types.Mixed,
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    metadata: Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  },
  { timestamps: true },
)

DesignSchema.methods.addOverlay = function (overlay) {
  if (this.overlays.length >= 5) throw new Error("Max 5 overlays supported")
  this.overlays.push(overlay)
  this.updatedAt = new Date()
  return this.save()
}

DesignSchema.methods.createVersion = function (userId) {
  this.versions.push({
    snapshot: { overlays: this.overlays, tags: this.tags, aiPrompt: this.aiPrompt },
    createdBy: userId,
    createdAt: new Date(),
  })
  return this.save()
}

module.exports = mongoose.model("Design", DesignSchema)
