const Course = require("../models/courses");
const User = require("../models/users");

exports.createCourse = async (req, res) => {
  const { creator } = req.body;
  try {
    const user = await User.findById(creator);
    if (!user) return res.status(404).send("User does not found");
    const course = new Course(req.body);
    await course.save();
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
  try {
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) res.status(404).send("Courses Not Found");

    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getOneCourse = async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findById(_id);
    if (!course) res.status(404).send("Not Found");
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCourse = async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) return res.status(404).send("Course Not Found");
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteCourse = async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedCourse = await Course.findByIdAndDelete(_id);
    if (!deletedCourse) return res.status(404).send("Course Not Found");
    res.send(deletedCourse);
  } catch (error) {
    res.status(500).send(error);
  }
};
