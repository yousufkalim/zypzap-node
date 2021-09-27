const { Schema, model } = require("mongoose");

const creatorSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
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
        required: true,
      },
      account_number: {
        type: String,
        required: true,
      },
      branch_number: {
        type: String,
        required: true,
      },
      IBAN: {
        type: String,
        required: true,
      },
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Courses",
      },
    ],
    content_requests: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Content_Requests",
      },
    ],
  },
  {
    timeStamp: true,
  }
);

module.exports = model("Creators", creatorSchema);
