const User = require("../models/users");
const Course = require("../models/courses");
const bcrypt = require("bcryptjs");
const { auth } = require("../middleware/auth");
const passport = require("./auth/withGoogle");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Check User Already Exists
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).send({ message: "Email is already exist" });

    // Create User Object
    user = new User({
      username,
      email,
      password,
      role,
      creator: null,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    console.log("Error ----> ", error);
    res.status(500).send(error);
  }
};
// return a message if subscribed successfully
exports.setSubscription = async (req, res) => {
  const { user_id } = req.body;
  try {
    let user = await User.findById(user_id);
    if (!user) return res.status(404).send("User Not Found");

    const daysCount = new Date().getTime() + 2592000000; //To set Expiry date for subscription (!month)
    const thirthyDays = new Date(daysCount);
    user.subscription.subscribed = true;
    user.subscription.start_date = new Date.now();
    user.subscription.end_date = thirthyDays;
    res.json({ success: true });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.addProfileInfo = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.enrolledCourseAndStarted = async (req, res) => {
  const { course_id, user_id } = req.body;
  //console.log("Enter");
  try {
    const course = await Course.findById(course_id);
    if (!course) return res.send({ message: "Course not found" });
    const user = await User.findByIdAndUpdate(
      user_id,
      {
        $set: { enrolled_courses: { started: true } },
      },
      { new: true }
    );
    if (user === null) return res.send({ message: "User not found" });
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.enrolledCourse = async (req, res) => {
  const { course_id, user_id } = req.body;
  console.log("Enter", user_id);
  try {
    const course = await Course.findByIdAndUpdate(course_id, {
      $push: { student: user_id },
    });
    if (!course) return res.send({ message: "Course not found" });
    const user = await User.findByIdAndUpdate(
      user_id,
      {
        $push: { enrolled_courses: { course_id, started: false } },
      },
      { new: true }
    );
    if (user === null) return res.send({ message: "User not found" });
    console.log("user", user);
    // course.student.push(user_id);
    // await course.save();
    console.log("course", course);
    res.send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).send("Users Not Found");
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.addToWishLists = async (req, res) => {
  const { course_id, user_id } = req.body;
  try {
    const users = await User.findById(user_id);
    const course = await Course.findById(course_id);
    if (!users || !course) {
      return res.status(404).send("User Not Found");
    } else {
      const user = await User.updateOne(
        { _id: user_id },
        {
          $push: { wishlist_courses: course_id },
        },
        { new: true }
      );
      res.send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getOneUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findOne({ _id });
    if (!user) return res.status(404).send("User Not Found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateOneUser = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteOneUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    if (!deletedUser) return res.status(404).send("User Not Found");
    res.send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
// upload image
exports.uploadProfileImage = async (req, res) => {
  try {
    const _id = req.params.id;
    const path = req.file.path;
    const user = await User.findByIdAndUpdate(
      _id,
      { profile_photo: path },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
