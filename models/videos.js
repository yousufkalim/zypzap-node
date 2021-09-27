const { Schema, model } = require("mongoose");

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    src_url: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Creators",
    },

    description: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],

    game_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Games",
      },
    ],
    views: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Publish", "Process", "Private", "Restricted", "Edited", "Review"],
    },
    thumbnail: {
      type: String,
    },
    course: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
  },
  {
    timeStamp: true,
  }
);

module.exports = model("Videos", videoSchema);
