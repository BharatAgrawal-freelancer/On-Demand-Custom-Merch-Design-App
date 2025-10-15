const mongoose = require("mongoose")
module.exports = {
  User: require("./user"),
  Product: require("./product"),
  Design: require("./design"),
  CommunityPost: require("./communityPost"),
  Order: require("./order"),
  Trend: require("./trend"),
}
