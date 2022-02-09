const Rating = require("../models/ratings");
const Course = require("../models/courses");
const User = require("../models/users");

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
  const { rating, comment, Course, rating_by } = req.body;
  try {
    const user = await User.findById(rating_by);
    const newCourse = await Course.findById(Course);
    if (!user || !newCourse)
      return res.status(400).send({ message: "Invalid user or course" });
    const preRating = await Rating.find({ course: Course });
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
    } else {
      let point = 0;
      preRating.map((rate) => {
        console.log(rate.rating, "rate", point);
        point += rate.rating;
      });
      const avr = (point / length).toFixed(2);
      const course = await Course.findByIdAndUpdate(req.body.course, {
        rating: avr,
      });
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
