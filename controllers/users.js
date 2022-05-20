const User = require("../models/users");
const Course = require("../models/courses");
const bcrypt = require("bcryptjs");
const { auth } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { generateAuthToken } = require("../middleware/auth");
const { sendEmail } = require("../middleware/sendMail");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Check User Already Exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: "Email is already exist" });

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
    if (user) {
      sendEmail(email);
    }
    const token = await generateAuthToken(user);

    res.json({ message: "User Registered Successfully", user: user, token });
  } catch (error) {
    console.log("Error ----> ", error);
    res.status(500).send(error);
  }
};
// return a message if subscribed successfully
exports.setSubscription = async (req, res) => {
  try {
    const { userId } = req.body;
    let user = await User.findById(userId);
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
const filterData = (profile_photo, prefrence_games, gameType, plateForm, gameMood) => {
  let myFind = {};
  if (profile_photo) {
    myFind.profile_photo = profile_photo;
  }
  if (gameType) {
    myFind.gameType = gameType;
  }
  if (prefrence_games) {
    myFind.prefrence_games = prefrence_games;
  }
  if (plateForm) {
    myFind.plateForm = plateForm;
  }
  if (gameMood) {
    myFind.gameMood = gameMood;
  }
  return myFind;
};
exports.addProfileInfo = async (req, res) => {
  try {
    const { profile_photo, prefrence_games, gameType, plateForm, gameMood } = req.body;
    let myFind = filterData(profile_photo, prefrence_games, gameType, plateForm, gameMood);

    const _id = req.params.id;
    const user = await User.findByIdAndUpdate(_id, myFind, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.basicInfo = async (req, res) => {
  try {
    const _id = req.params.id;
    const { username, phone_number, email } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      {
        username,
        phone_number,
        email,
      },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    console.log("Error ---> ", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err });
  }
};
exports.enrolledCourseAndStarted = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { student: userId },
      },
      { new: true }
    );
    if (!course) return res.send({ message: "Course not found" });
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { enrolled_courses: { course_id: courseId, started: true } },
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
  const { courseId, userId } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { student: userId },
      },
      { new: true }
    );

    if (!course) return res.send({ message: "Course not found" });
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { enrolled_courses: { course_id: courseId, started: false } },
      },
      { new: true }
    );
    if (user === null) return res.send({ message: "User not found" });
    res.json({ user, course });
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
  try {
    const { courseId, userId } = req.body;
    const users = await User.findById(userId);
    const course = await Course.findById(courseId);
    if (!users || !course) {
      return res.status(404).send("User Not Found");
    } else {
      const user = await User.updateOne(
        { _id: userId },
        {
          $push: { wishlist_courses: courseId },
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
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id })
      .populate({
        path: "wishlist_courses",
        populate: {
          path: "creator",
          populate: {
            path: "user_id",
            model: "Users",
          },
        },
      })
      .populate({
        path: "enrolled_courses.course_id",
        populate: {
          path: "creator",
          populate: {
            path: "user_id",
            model: "Users",
          },
        },
      })
      .populate({
        path: "creator",
        populate: {
          path: "courses",
          populate: {
            path: "videos",
            model: "Videos",
          },
        },
      });
    if (!user) return res.status(404).send("User Not Found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateOneUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteOneUser = async (req, res) => {
  try {
    const _id = req.params.id;
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
    // const _id = req.params.id;
    // const path = req.file.location;
    // const user = await User.findByIdAndUpdate(
    //   _id,
    //   { profile_photo: path },
    //   { new: true }
    // );
    res.send(req.file);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.loginWithGoogle = async (req, res) => {
  try {
    const profile = req.user;
    const user = await User.findOne({ email: profile.email });
    if (!user) {
      const newUser = new User();
      newUser.username = profile.displayName;
      newUser.role = "User";
      newUser.email.push(profile.email);
      const token = await generateAuthToken(newUser);
      await newUser.save();
      return res.redirect(process.env.Redirct_URL + `?SignupByGoogle=true&&user=${token}`);
    } else {
      const token = await generateAuthToken(user);
      return res.redirect(process.env.Redirct_URL + `?SignupByGoogle=true&&user=${token}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.loginWithFacebook = async (req, res) => {
  try {
    const profile = req.user;
    const user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      const newUser = new User();
      newUser.username = profile.displayName;
      newUser.role = "User";
      const eMail = profile.emails[0].value;
      newUser.email.push(eMail);
      const token = await generateAuthToken(newUser);
      await newUser.save();
      return res.redirect(process.env.Redirct_URL + `?SignupByFacebook=true&&user=${token}`);
    } else {
      const token = await generateAuthToken(user);
      return res.redirect(process.env.Redirct_URL + `?SignupByFacebook=true&&user=${token}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.loginWithTwitch = async (req, res) => {
  try {
    const profile = req.user;
    const user = await User.findOne({ email: profile.email });
    if (!user) {
      const newUser = new User();
      newUser.username = profile.display_name;
      newUser.userId = profile.id;
      newUser.role = "User";
      const eMail = profile.email;
      newUser.email.push(eMail);
      const token = await generateAuthToken(newUser);
      await newUser.save();
      return res.redirect(process.env.Redirct_URL + `?SignupByTwitch=true&&user=${token}`);
    } else {
      const token = await generateAuthToken(user);
      return res.redirect(process.env.Redirct_URL + `?SignupByTwitch=true&&user=${token}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.loginWithDiscord = async (req, res) => {
  try {
    const profile = req.user;
    const user = await User.findOne({ email: profile.email });
    if (!user) {
      const newUser = new User();
      newUser.username = profile.username;
      newUser.userId = profile.id;
      const eMail = profile.email;
      newUser.email.push(eMail);
      newUser.role = "User";
      const token = await generateAuthToken(newUser);
      await newUser.save();
      return res.redirect(process.env.Redirct_URL + `?SignupByDiscord=true&&user=${token}`);
    } else {
      const token = await generateAuthToken(user);
      return res.redirect(process.env.Redirct_URL + `?SignupByDiscord=true&&user=${token}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
