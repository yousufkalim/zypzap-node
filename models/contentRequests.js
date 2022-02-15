const { Schema, model } = require("mongoose");

const contentRequestSchema = new Schema(
  {
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
        required: true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = model("Content_Requests", contentRequestSchema);
