const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        unique: true,
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
    enrolled_courses: [
      {
        course_id: {
          type: Schema.Types.ObjectId,
          ref: "Courses",
        },
      },
    ],
    subscription: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timeStamp: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.pre("save", async function (next) {
  console.log("encrypting the password");
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = model("Users", userSchema);
