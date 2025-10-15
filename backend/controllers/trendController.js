import Trend from "../models/trend.js"
export const listTrends = async (_req, res) => {
  const trends = await Trend.find().sort({ score: -1 })
  res.json(trends)
}
