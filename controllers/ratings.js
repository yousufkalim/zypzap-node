const Rating = require("../models/ratings");
const Course = require("../models/courses");

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
    console.log(req.body.course);
    const preRating = await Rating.find({ course: req.body.course });
    const length = preRating.length;
    if (length === 0) {
      const course = await Course.findByIdAndUpdate(
        req.body.course,
        { rating: req.body.rating },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log("course", course);
    } else {
      let point = 0;
      preRating.map((rate) => {
        console.log(rate.rating, "rate", point);
        point += rate.rating;
      });
      console.log("avg rating", point);
      const avr = (point / length).toFixed(2);

      const course = await Course.findByIdAndUpdate(req.body.course, {
        rating: avr,
      });
      console.log("course", avr);
    }

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
