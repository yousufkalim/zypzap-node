const Course = require("../models/courses");
const User = require("../models/users");
const Creater = require("../models/creators");

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
const coursesFilter = (game_type, Plateform, Mode, Price, course_type) => {
  let myFind = [];
  if (Plateform) {
    myFind = [...myFind, { plateform: Plateform }];
  }
  if (Mode) {
    myFind = [...myFind, { mood: Mode }];
  }
  if (Price) {
    myFind = [...myFind, { price: { $lt: Price } }];
  }
  if (course_type) {
    myFind = [...myFind, { type: course_type }];
  }
  return myFind;
};
exports.getFilteredCourses = async (req, res) => {
  const { game_type, Plateform, Mode, Price, course_type, Category } = req.body;
  try {
    let myFind = coursesFilter(game_type, Plateform, Mode, Price, course_type);
    const courses = await Course.find({
      $and: myFind,
    }).populate("game_id");
    if (!courses) return res.status(404).send("User does not found");
    let GameType = [];
    GameType = courses.filter(
      (course) => course?.game_id?.category === game_type
    );
    res.send(GameType);
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
exports.searchCourse = async (req, res) => {
  //const _id = req.params.id;
  const { name } = req.body;
  try {
    const course = await Course.find({
      course_name: { $regex: name, $options: "$i" },
    });
    
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
    const deletedCourse = await Rating.findByIdAndDelete(_id);
    if (!deletedCourse) return res.status(404).send("Rating not found");
    res.send(deletedCourse);
  } catch (error) {
    res.status(500).send(error);
  }
};
// when a new viewer see a course
exports.postViews = async (req, res) => {
  const _id = req.params.id;
  try {
    const Course = await Rating.findById(_id);
    Course.views = Course.views + 1;
    await Course.save();
    res.send(Course);
  } catch (error) {
    res.status(500).send(error);
  }
};
