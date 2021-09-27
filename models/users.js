const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: [
      {
        type: String,
        required: true,
      },
    ],
    phone_number: [
      {
        type: String,
        required: true,
      },
    ],
    password: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Creators",
    },
    profile_photo: {
      type: String,
    },
    social_ids: [
      {
        platform: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  {
    timeStamp: true,
  }
);

module.exports = model("Users", userSchema);
