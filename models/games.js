const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    game_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    vote: {
      type: Number,
    },
    Description: {
      type: String,
    },
    thumbnails: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Games", gameSchema);
