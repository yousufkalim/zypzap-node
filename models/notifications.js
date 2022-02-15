const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    title: {
      type: String,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    expiryDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model("notifications", notificationSchema);
