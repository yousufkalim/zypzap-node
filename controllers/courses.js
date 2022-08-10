const Course = require('../models/courses');
const User = require('../models/users');
const Creater = require('../models/creators');
const Notifications = require('../models/notifications');
const Game = require('../models/games');
const mongoose = require('mongoose');
const path = require('path');
const { getVideoDurationInSeconds } = require('get-video-duration');
// const AWS = require("aws-sdk");
// Note: All these need to be done
const Video = require('../models/videos');
exports.createCourse = async (req, res) => {
  try {
    const { formDataOne, formDataFive, formDataSix, id } = req.body;
    const newCreator = await Creater.findById(id)
      .populate('followers')
      .populate({
        path: 'courses',
        populate: [
          {
            path: 'videos',
            model: 'Videos',
          },
        ],
      })
      .populate('user_id');
    if (!newCreator) return res.status(404).send('Creator does not found');
    const {
      course_name,
      // gameName,
      gameName,
      selectedGamename,
      gameLevel,
      gameType,
      gameMood,
      gamePlateForm,
      description,
    } = formDataOne;

    const newCourse = {
      course_name: course_name,
      level: gameLevel,
      gameName: gameName,
      gameType: gameType,
      mode: gameMood,
      plateform: gamePlateForm,
      description: description,
      creator: id,
      price: 0,
      // game_id: gameName,
      selectedGamename,
      videos: formDataFive,
      thumbnail: formDataSix,
    };
    let course = new Course(newCourse);
    await course.save();
    const daysCount = new Date().getTime() + 604800000; //To set Expiry date for notification
    const sevenDays = new Date(daysCount); //Set date after 7days
    const notification = await Notifications.create({
      title: 'New Course added',
      expiry_date: sevenDays,
      from: id,
    });
    newCreator.followers.map(async (follower) => {
      await User.findByIdAndUpdate(
        follower.id,
        {
          $push: { notifications: notification.id },
        },
        { new: true }
      );
    });
    const newcreator = await Creater.findByIdAndUpdate(
      newCreator._id,
      {
        $push: { courses: course._id },
      },
      { new: true }
    );
    res.send({ course, creator: newCreator });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({
        path: 'creator',
        populate: {
          path: 'user_id',
          model: 'Users',
        },
      })
      .populate('videos')
      .sort('-created_at');
    if (!courses) res.status(404).send('Courses Not Found');
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};
const coursesFilter = (plateForm, level, mode, price) => {
  let myFind = [];
  if (plateForm) {
    myFind = [...myFind, { plateform: plateForm }];
  }
  if (level) {
    myFind = [...myFind, { level: level }];
  }
  if (mode) {
    myFind = [...myFind, { mode: mode }];
  }
  if (price) {
    if (price === 'all') {
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
    const level = req.query.level;
    const mode = req.query.mode;
    const price = req.query.price;
    let myFind = coursesFilter(plateForm, level, mode, price);
    if (myFind.length === 0 && gameType === '') {
      return res.send(myFind);
    }
    if (myFind.length === 0 && gameType) {
      const games = await Game.find({ category: gameType });
      const gameIds = games.map((a) => a._id);

      let foundGames = await Course.find({ game_id: { $in: gameIds } })
        .populate('game_id')
        .populate({
          path: 'creator',
          populate: {
            path: 'user_id',
            model: 'Users',
          },
        })
        .populate('videos');
      return res.send(foundGames);
    } else {
      const courses = await Course.find({
        $and: myFind,
      })
        .populate('game_id')
        .populate({
          path: 'creator',
          populate: {
            path: 'user_id',
            model: 'Users',
          },
        })
        .populate('videos');
      if (!courses) return res.status(404).send('Courses does not found');
      if (gameType) {
        const newCourses = courses.filter((course) => course?.game_id?.category === gameType);
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
        path: 'creator',
        populate: {
          path: 'user_id',
          model: 'Users',
        },
      })
      .populate({
        path: 'creator',
        populate: {
          path: 'courses',
          model: 'Courses',
        },
      })
      .populate('videos')
      .populate('game_id');

    if (!course) res.status(404).send('Not Found');
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.filterCourses = async (req, res) => {
  try {
    delete req.body.category;

    Object.keys(req.body).map((item) => {
      if (req.body[item].length === 0) {
        delete req.body[item];
      }
    });

    const courses = await Course.find(req.body)
      .populate({
        path: 'creator',
        populate: {
          path: 'user_id',
          model: 'Users',
        },
      })
      .populate('videos')
      .sort({ createdAt: -1 });

    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.searchCourse = async (req, res) => {
  const name = req.query.name;
  try {
    const course = await Course.find({
      course_name: { $regex: name, $options: '$i' },
    })
      .populate('videos')
      .populate({
        path: 'creator',
        populate: {
          path: 'user_id',
          model: 'Users',
        },
      });

    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateCourse = async (req, res) => {
  const { formDataOne, formDataFive, id } = req.body;
  try {
    const {
      course_name,
      gameName,
      selectedGamename,
      gameLevel,
      gameType,
      gameMood,
      gamePlateForm,
      description,
    } = formDataOne;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        course_name: course_name,
        level: gameLevel,
        mode: gameMood,
        gameType: gameType,
        gameName: gameName,
        selectedGamename,
        plateform: gamePlateForm,
        description: description,
        $push: { videos: formDataFive },
      },
      { new: true }
    );
    if (!course) return res.status(404).send('Course Not Found');
    const creator = await Creater.findById(course.creator).populate('followers');
    const notification = await Notifications.create({
      title: 'Course Updated By Creator',
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
    if (!deletedCourse) return res.status(404).send('Course not found');
    const Creator = await Creater.findById(deletedCourse.creator);
    if (!Creator) return res.status(404).send('Creator not found');
    const courses = Creator.courses;
    const newCourses = courses.filter((course) => course !== courseId);
    Creater.courses = newCourses;
    const creator = await Creator.save();
    await User.updateMany(
      { 'enrolled_courses.course_id': courseId },
      { $pull: { enrolled_courses: { course_id: courseId } } }
    );
    res.status(200).send({ creator: creator });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getTopGames = async (req, res) => {
  try {
    const number = req.query.type;

    /// Top ten and trendy games
    if (number == 1) {
      const courses = await Course.find({})
        .populate({
          path: 'creator',
          populate: {
            path: 'user_id',
            model: 'Users',
          },
        })
        .populate('videos')
        .sort({ rating: -1 })
        .limit(10);
      res.send(courses);
    }
    /// Latest Courses
    if (number == 2) {
      const courses = await Course.find({})
        .populate({
          path: 'creator',
          populate: {
            path: 'user_id',
            model: 'Users',
          },
        })
        .populate('videos')
        .sort({ createdAt: -1 });

      res.send(courses);
    }
    //   top ten NFT games
    if (number == 3) {
      const games = await Game.find({ category: 'NFT' }).sort({
        createdAt: -1,
      });

      const gameIds = games.map((a) => a._id);

      let foundGames = await Course.find({ game_id: { $in: gameIds } })
        .populate('game_id')
        .populate({
          path: 'creator',
          populate: {
            path: 'user_id',
            model: 'Users',
          },
        })
        .populate('videos');
      res.send(foundGames);
    }
    //   top ten Metaverse games
    if (number == 4) {
      const games = await Game.find({ category: 'Metaverse' }).sort({
        createdAt: -1,
      });

      const gameIds = games.map((a) => a._id);

      let foundGames = await Course.find({ game_id: { $in: gameIds } })
        .populate('game_id')
        .populate({
          path: 'creator',
          populate: {
            path: 'user_id',
            model: 'Users',
          },
        })
        .populate('videos');

      res.send(foundGames);
    }
    //  top reated content creators
    if (number == 5) {
      const users = await User.find({
        creator: { $ne: null },
      })
        .populate({
          path: 'creator',
          populate: {
            path: 'courses',
            model: 'Courses',
          },
        })
        .sort({ createdAt: -1 });

      // const Creator = users.filter((user) => users.creator !== null);
      res.send(users);
    }
    ///  Top New Games
    if (number == 6) {
      const games = await Game.find({}).sort({ createdAt: -1 });
      const gameIds = games.map((a) => a._id);

      let foundGames = await Course.find({ game_id: { $in: gameIds } })
        .populate('game_id')
        .populate({
          path: 'creator',
          populate: {
            path: 'user_id',
            model: 'Users',
          },
        })
        .populate('videos');
      res.send(foundGames);
    }
    /// top ten reality games
    if (number == 7) {
      const games = await Game.find({ category: 'Reality' }).sort({
        createdAt: -1,
      });

      const gameIds = games.map((a) => a._id);

      let foundGames = await Course.find({ game_id: { $in: gameIds } })
        .populate('game_id')
        .populate({
          path: 'creator',
          populate: {
            path: 'user_id',
            model: 'Users',
          },
        })
        .populate('videos');
      res.send(foundGames);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteCourseEpisode = async (req, res) => {
  const courseId = req.params.id;
  const { video } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { videos: video._id },
      },
      { new: true }
    );
    if (!course) return res.status(404).send('Course not found');
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};
