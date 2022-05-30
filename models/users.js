const { Schema, model } = require("mongoose");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    username: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    email: [
      {
        type: String,
        required: true,
        unique: true
      }
    ],
    phone_number: { type: String },
    password: {
      type: String
    },
    country: String,
    account_number: String,
    bank_identifier: String,
    iban: String,
    card_holder_name: String,
    card_number: String,
    expiry_date: {
      month: String,
      year: String
    },
    cvv: String,
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Creators"
    },
    profile_photo: {
      type: String
    },
    cover_photo: {
      type: String
    },
    social_ids: [
      {
        platform: {
          type: String
        },
        url: {
          type: String
        }
      }
    ],
    enrolled_courses: [
      {
        course_id: {
          type: Schema.ObjectId,
          ref: "Courses"
        },
        started: {
          type: Boolean
        }
      }
    ],
    wishlist_courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses"
      }
    ],
    subscription: {
      subscribed: { type: Boolean, default: false },
      start_date: Date,
      end_date: Date
    },
    prefrence_games: {
      favourite_games: [String],
      learningRethem: {
        type: String
      },
      current_level: {
        type: String
      },
      target_level: {
        type: String
      }
    },
    expertiseGame: [String],
    plateForm: [String],
    gameType: [String],
    gameMood: {
      type: String
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    notifications: [{ type: Schema.Types.ObjectId, ref: "notifications" }]
  },
  {
    timestamps: true
  }
);

userSchema.index({ username: "text", email: "text" });

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

module.exports = model("Users", userSchema);
