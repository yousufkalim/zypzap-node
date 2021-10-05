const Rating = require("../models/ratings");

exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.send(ratings);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getOneRating = async (req, res) => {
  const _Id = req.params.id;
  try {
    const rating = await Rating.findOneById(_id);
    if (!rating) return res.status(404).send("Rating Not Found");
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.createRatings = async (req, res) => {
  try {
    const rating = new Rating(req.body);
    await rating.save();
    res.send(rating);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateRating = async (req, res) => {
  const _id = req.params.id;
  try {
    const updatedRating = await Rating.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRating) return res.status(404).send("Rating can't update");
    res.send(updatedRating);
  } catch (error) {
    res.status(500).res.send(error);
  }
};
exports.deleteRating = async (req, res) => {
  const _id = req.params.id;
  try {
    const deleteRating = await Rating.findByIdAndDelete(_id);
    if (!deleteRating) return res.status(404).send("Rating not found");
  } catch (error) {
    res.status(500).send(error);
  }
};
