const { Schema, model } = require('mongoose');

const draftSchema = new Schema(
  {
    formDataTwo: [
      {
        name: { type: String },
        path: { type: String },
        file: { type: Object }
      }
    ],
    step: {
      type: Number
    },
    course_name: {
      type: String
    },
    gameName: {
      type: String
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Creators'
    },
    videos: [String],
    duration: {
      type: String
    },
    rating: {
      type: Number,
      default: 0
    },
    price: {
      type: Number
    },
    level: {
      type: String
    },
    requirement: [String],
    selectedGamename: {
      type: String
    },
    game: {
      type: String
    },
    gameType: {
      type: String
    },
    description: {
      type: String
    },
    plateform: {
      type: String
    },
    thumbnail: {
      type: String
    },
    mode: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Draft', draftSchema);
