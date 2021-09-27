const { Schema, model } = require("mongoose");

const ratingSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
  },
  rating_by: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = model("Ratings", ratingSchema);
