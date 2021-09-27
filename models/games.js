const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  game_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: [
    {
      type: string,
    },
  ],
});

module.exports = model("Games", gameSchema);
