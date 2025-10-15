const mongoose = require("mongoose")
const { Schema } = mongoose

const CommunityPostSchema = new Schema({
  design: { type: Schema.Types.ObjectId, ref: "Design", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  heading: { type: String },
  body: { type: String },
  tags: [{ type: String }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
  visibility: { type: String, enum: ["public", "private", "friends"], default: "public" },
  createdAt: { type: Date, default: Date.now },
  pinned: { type: Boolean, default: false },
})

CommunityPostSchema.index({ tags: 1 })
module.exports = mongoose.model("CommunityPost", CommunityPostSchema)
