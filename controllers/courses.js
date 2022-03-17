const Course = require("../models/courses");
const User = require("../models/users");
const Creater = require("../models/creators");
const Notifications = require("../models/notifications");
const Game = require("../models/games");
const mongoose = require("mongoose");

exports.createCourse = async (req, res) => {
  try {
    const {
      game_id,
      course_name,
      creator,
      price,
      mode,
      type,
      plateform,
      description,
      level,
    } = req.body;
    const data = {
      game_id,
      course_name,
      creator,
      mode,
      type,
      plateform,
      description,
      level,
    };
    const file = req.file;
    const newCreator = await Creater.findById(creator).populate("followers");

    if (!newCreator) return res.status(404).send("Creator does not found");
    const course = new Course(data);
    course.thumbnail = file.location;
    if (price === "free") {
      course.price = 0;
    } else {
      course.price = price;
    }

    await course.save();
    const daysCount = new Date().getTime() + 604800000; //To set Expiry date for notification
    const sevenDays = new Date(daysCount); //Set date after 7days
    const notification = await Notifications.create({
      title: "New Course added",
      expiry_date: sevenDays,
      from: data.creator,
    });
    newCreator.followers.map(async (follower) => {
      let Updateuser = await User.findByIdAndUpdate(
        follower.id,
        {
          $push: { notifications: notification.id },
        },
        { new: true }
      );
    });
    res.send(course);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({
        path: "creator",
        populate: {
          path: "user_id",
          model: "Users",
        },
      })
      .populate("videos");
    if (!courses) res.status(404).send("Courses Not Found");
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};
const coursesFilter = (plateForm, mode, price) => {
  let myFind = [];
  if (plateForm) {
    myFind = [...myFind, { plateform: plateForm }];
  }
  if (mode) {
    myFind = [...myFind, { mode: mode }];
  }
  if (price) {
    if (price === "all") {
      myFind = [...myFind, { price: { $gt: 0 } }];
    } else {
      myFind = [...myFind, { price: { $lte: price } }];
    }
  }
  return myFind;
};
// filter Courses by game_type, Plateform, Mode, Price, course_type
exports.getFilteredCourses = async (req, res) => {
  try {
    const gameType = req.query.gameType;
    const plateForm = req.query.plateForm;
    const mode = req.query.mode;
    const price = req.query.price;
    let myFind = coursesFilter(plateForm, mode, price);
    if (myFind.length === 0 && gameType === "") {
      return res.send(myFind);
    }
    if (myFind.length === 0 && gameType) {
      const games = await Game.find({ category: gameType });
      const gameIds = games.map((a) => a._id);

      let foundGames = await Course.find({ game_id: { $in: gameIds } })
        .populate("videos")
        .populate("game_id");

      return res.send(foundGames);
    } else {
      const courses = await Course.find({
        $and: myFind,
      })
        .populate("videos")
        .populate("game_id");
      if (!courses) return res.status(404).send("Courses does not found");
      if (gameType) {
        const newCourses = courses.filter(
          (course) => course?.game_id?.category === gameType
        );
        res.send(newCourses);
      } else {
        res.send(courses);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getOneCourse = async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findById(_id)
      .populate({
        path: "creator",
        populate: [
          {
            path: "user_id",
            model: "Users",
          },
          { path: "courses", model: "Courses" },
        ],
      })
      .populate("videos");
    if (!course) res.status(404).send("Not Found");
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.searchCourse = async (req, res) => {
  const name = req.query.name;
  try {
    const course = await Course.find({
      course_name: { $regex: name, $options: "$i" },
    }).populate("videos");
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateCourse = async (req, res) => {
  const _id = req.params.id;
  const { mode } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(
      _id,
      { videos: null },
      { new: true }
    );

    if (!course) return res.status(404).send("Course Not Found");
    const creator = await Creater.findById(course.creator).populate(
      "followers"
    );
    const notification = await Notifications.create({
      title: "Course Updated By Creator",
      from: creator,
    });
    creator.followers.map(async (follower) => {
      let Updateuser = await User.findByIdAndUpdate(
        follower.id,
        {
          $push: { notifications: notification.id },
        },
        { new: true }
      );
    });
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) return res.status(404).send("Course not found");
    const Creator = await Creater.findById(deletedCourse.creator);
    if (!Creator) return res.status(404).send("Creator not found");
    const courses = Creator.courses;
    const newCourses = courses.filter((course) => course !== courseId);
    Creater.courses = newCourses;
    const creator = await Creator.save();
    await User.updateMany(
      { "enrolled_courses.course_id": courseId },
      { $pull: { enrolled_courses: { course_id: course_id } } }
    );
    res.send(deletedCourse);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getTopGames = async (req, res) => {
  try {
    const number = req.query.type;

    if (number == 1) {
      const courses = await Course.find({})
        .populate("videos")
        .sort({ rating: -1 })
        .limit(10);
      res.send(courses);
    }
    if (number == 2) {
      const courses = await Course.find({})
        .populate("videos")
        .sort({ createdAt: 1 })
        .limit(10);
      res.send(courses);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
