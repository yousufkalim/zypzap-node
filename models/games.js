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
      enum: [
        "Action",
        "Adventure",
        "Metaverse",
        "MMOG",
        "Car Racing",
        "FPS",
        "RTS",
        "RPG",
        "Turn by Turn Strategy",
        "Simulation",
        "Sport",
        "Trading card",
        "Puzzle",
      ],
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
