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
      type: String,
      enum: ["true", "false"],
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("newsletters", newsletterSchema);
