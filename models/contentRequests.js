const { Schema, model } = require("mongoose");

const contentRequestSchema = new Schema({
  game: [
    {
      type: Schema.Types.ObjectId,
      ref: "Games",
    },
  ],
  request_by: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  description: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

module.exports = model("Content_Requests", contentRequestSchema);
