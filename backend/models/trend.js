const mongoose = require("mongoose")
const { Schema } = mongoose

const TrendSchema = new Schema(
  {
    tag: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 },
    sources: [String],
    lastSeenAt: { type: Date, default: Date.now },
    exampleDesigns: [{ type: Schema.Types.ObjectId, ref: "Design" }],
  },
  { timestamps: true },
)

module.exports = mongoose.model("Trend", TrendSchema)
