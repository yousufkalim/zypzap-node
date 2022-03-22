const Game = require("../models/games");

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    if (!games) return res.status(404).send("Not Found");
    res.send(games);
  } catch (error) {
    res.status("500").send(error);
  }
};

exports.getOneGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).send("Not Found");
    res.send(game);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.searchGame = async (req, res) => {
  console.log("qwertyu");
  const name = req.query.name;
  console.log("name", name);
  try {
    const games = await Game.find({
      game_name: { $regex: name, $options: "$i" },
    });
    res.send(games);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).send(newGame);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateGame = async (req, res) => {
  const _id = req.params.id;
  const allowedUpdates = ["game_name", "category", "thumbnail"];
  const updates = Object.keys(req.body);
  const isValidateUpdates = updates.every((update) => allowedUpdates(update));
  if (!isValidateUpdates) return res.status(400).send("Not Allowed");

  try {
    const game = Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) return res.status(404).send("Not Found");
    res.send(game);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.category = async (req, res) => {
  const { category } = req.body;
  try {
    const game = await Game.find({ category });
    if (!game) return res.status(404).send("Not Found");
    res.send(game);
  } catch (error) {
    res.status(500).send(error);
  }
};
//  missing delete API
