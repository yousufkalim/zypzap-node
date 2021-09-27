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
        required: true,
        ref: "Videos",
      },
    ],
    duration: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
    },
    level: {
      type: String,
    },
    game_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Games",
      },
    ],
    description: {
      type: String,
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = model("Courses", courseSchema);
