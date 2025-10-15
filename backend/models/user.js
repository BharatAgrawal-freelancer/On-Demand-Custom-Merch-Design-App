const mongoose = require("mongoose")
const { Schema } = mongoose

const SocialSchema = new Schema(
  {
    provider: String,
    providerId: String,
  },
  { _id: false },
)

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String },
    profilePhoto: { type: String },
    bio: { type: String, default: "" },
    tags: [{ type: String }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    user_designs: [{ type: Schema.Types.ObjectId, ref: "Design" }],
    liked_posts: [{ type: Schema.Types.ObjectId, ref: "CommunityPost" }],
    liked_users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    complaints: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        status: { type: String, enum: ["open", "resolved", "dismissed"], default: "open" },
      },
    ],
    social: [SocialSchema],
    createdAt: { type: Date, default: Date.now },
    roles: [{ type: String, enum: ["user", "admin", "designer"], default: "user" }],
  },
  { timestamps: true },
)

UserSchema.index({ username: 1 })
UserSchema.index({ email: 1 })

module.exports = mongoose.model("User", UserSchema)
