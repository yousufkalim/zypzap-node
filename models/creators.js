const { Schema, model } = require("mongoose");

const creatorSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    gameLevel: {
      type: String,
      enum: ["initial", "medium", "pro"],
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    bio: {
      type: String,
    },
    address: {
      street_name: {
        type: String,
      },
      postal_code: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      billing_address: {
        type: String,
      },
      mailing_address: {
        type: String,
      },
    },
    bank_info: {
      bank_name: {
        type: String,
      },
      account_number: {
        type: String,
      },
      branch_number: {
        type: String,
      },
      IBAN: {
        type: String,
      },
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    content_requests: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content_Requests",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Creators", creatorSchema);
