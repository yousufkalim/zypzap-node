const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    course_name: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Creators",
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Videos",
      },
    ],
    duration: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
    },
    level: {
      type: String,
      enum: ["Casual", "Confirmed", "Hardcore", "Esporter"],
    },
    requirement: [String],
    // game_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Games",
    // },
    selectedGamename: {
      type: String,
    },
    game: {
      type: String,
    },
    gameType: {
      type: String,
      enum: [
        "Action",
        "Adventure",

        "Metaverse",

        "MMOG",

        "Car Racing",

        "Versus Fighting",

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
    student: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    description: {
      type: String,
    },
    plateform: {
      type: String,
      enum: [
        "PC",
        "Mobile Games",
        "PS1/2/3/4/5",
        "Xbox/360/One/X",
        "Retro Consoles",
        "Portable Consoles",
        "Tablet",
      ],
    },
    thumbnail: {
      type: String,
    },
    mode: {
      type: String,
      enum: ["Single", "Multiplayer", "Both"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Courses", courseSchema);
