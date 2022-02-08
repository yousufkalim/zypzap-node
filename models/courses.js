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
    views: {
      type: String,
    },
    level: {
      type: String,
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
    },
    mood: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Courses", courseSchema);
