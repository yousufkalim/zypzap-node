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
    file_props: {
      fieldname: {
        type: String,
      },
      originalname: {
        type: String,
      },
      encoding: {
        type: String,
      },
      mimetype: {
        type: String,
      },
      destination: {
        type: String,
      },
      filename: {
        type: String,
      },
      path: {
        type: String,
      },
      size: {
        type: Number,
      },
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
    },
    status: {
      type: String,
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
    timestamps: true,
  }
);

module.exports = model("Videos", videoSchema);
