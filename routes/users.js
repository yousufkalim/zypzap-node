// Init
const router = require("express").Router();
const User = require("../models/users");
const { imageUpload, upload } = require("../middleware/imageUpload");
var passport = require("passport");
const session = require("express-session");
require("../controllers/auth/loginWithDiscord")(passport);
require("../controllers/auth/loginWithGoogle")(passport);
require("../controllers/auth/loginWithTwitch")(passport);
require("../controllers/auth/loginWithFacebook")(passport);

const {
  getAllUsers,
  createUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  addToWishLists,
  setSubscription,
  enrolledCourse,
  enrolledCourseAndStarted,
  addProfileInfo,
  uploadProfileImage,
  loginWithGoogle,
  loginWithFacebook,
  loginWithTwitch,
  loginWithDiscord,
} = require("../controllers/users");
const {
  loginUser,
  logoutUser,
  logoutAll,
  getData,
} = require("../controllers/login");
const { auth } = require("../middleware/auth");
const {
  validateUsers,
  isValidated,
} = require("../middleware/validators/users");
const singleUpload = upload.single("image");

// Routes
//Enrolled Courses
router.post("/enrolledCourse", auth, enrolledCourse);
router.post("/enrolledCourseAndStarted", auth, enrolledCourseAndStarted);
router.post("/setSubscription", auth, setSubscription);
router.get("/getuserbytoken", auth, getData);
router.get("/", getAllUsers);
router.post("/addToWishLists", auth, addToWishLists);
router.put("/addProfileInfo/:id", addProfileInfo);
//  upload image
router.put("/uploadprofileimage/:id", singleUpload, uploadProfileImage);
//router.put("/uploadimage/:id", auth, imageUpload, uploadProfileImage);
// SignUp
router.post("/", validateUsers, isValidated, createUser);
router.get("/:id", getOneUser);
router.put("/:id", auth, updateOneUser);
router.delete("/:id", auth, deleteOneUser);
router.post("/login", loginUser);

router.post("/logout", auth, logoutUser);

router.post("/logout/all", auth, logoutAll);

// login  with discord
router.get("/auth/discord", passport.authenticate("discord"));
router.get(
  "/auth/discord/callback",
  passport.authenticate("discord"),
  loginWithDiscord
);
// login with google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FAILURE_REDIRECT,
    successReturnToOrRedirect: process.env.GOOGLE_CALLBACK,
  })
);
router.get("/auth/google/success", loginWithGoogle);

// login with facebook facebook
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: process.env.FAILURE_REDIRECT,
    successReturnToOrRedirect: process.env.FACEBOOK_CALLBACK,
  })
);
router.get("/auth/facebook/success", loginWithFacebook);
//login with twitch
router.get("/auth/twitch", passport.authenticate("twitch"));

router.get(
  "/auth/twitch/callback",
  passport.authenticate("twitch", {
    failureRedirect: process.env.FAILURE_REDIRECT,
  }),
  loginWithTwitch
);
// Export
module.exports = router;
