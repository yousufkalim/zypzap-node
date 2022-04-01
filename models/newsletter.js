// Init
const mongoose = require("mongoose");

// Schema
const newsletterSchema = new mongoose.Schema(
  {
    email: String,
    type: {
      type: String,
      enum: ["all", "user", "creator"],
    },
    tester: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("newsletters", newsletterSchema);
