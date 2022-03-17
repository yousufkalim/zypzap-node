const Rating = require("../models/ratings");
const Course = require("../models/courses");
const User = require("../models/users");

exports.getAllRatings = async (req, res) => {
  try {
    const course = req.params.id;
    const ratings = await Rating.find({ course });
    res.send(ratings);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getOneRating = async (req, res) => {
  const rating_id = req.params.id;
  try {
    const rating = await Rating.findOneById(rating_id);
    if (!rating) return res.status(404).send("Rating Not Found");
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.createRatings = async (req, res) => {
  const { rating, course, rating_by, comment } = req.body;
  try {
    const user = await User.findById(rating_by);
    const newCourse = await Course.findById(course);

    if (!user || !newCourse)
      return res.status(400).send({ message: "Invalid user or course" });

    const preRating = await Rating.find({ course: course });
    if (preRating.length === 0) {
      const newCourse = await Course.findByIdAndUpdate(
        course,
        { rating: rating },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      let point = 0;
      preRating.map((rate) => {
        point += rate.rating;
      });

      const avr = (point / preRating.length).toFixed(1);
      const newCourse = await Course.findByIdAndUpdate(
        course,
        { rating: avr },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    const newRating = new Rating(req.body);
    await newRating.save();
    res.send(newRating);
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
    res.send({ message: "Delete Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
