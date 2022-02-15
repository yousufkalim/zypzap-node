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
    },
    price: {
      type: Number,
    },
    level: {
      type: Number,
      enum: ["1", "2", "3", "4", "5"],
    },
    game_id: {
      type: Schema.Types.ObjectId,
      ref: "Games",
    },
    description: {
      type: String,
    },
    plateform: {
      type: String,
      enum: ["xbox", "pc", "mobile", "ps4"],
    },
    mode: {
      type: String,
      enum: ["single", "multiplayer"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Courses", courseSchema);
