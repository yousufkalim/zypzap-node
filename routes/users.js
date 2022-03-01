// Init
const router = require("express").Router();
const { imageUpload, upload } = require("../middleware/imageUpload");

const passport = require("../controllers/auth/withGoogle");
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
router.put("/uploadprofileimage/:id", auth, uploadProfileImage);
//router.put("/uploadimage/:id", auth, imageUpload, uploadProfileImage);
// SignUp
router.post("/", validateUsers, isValidated, createUser);
router.get("/:id", getOneUser);
router.put("/:id", auth, updateOneUser);
router.delete("/:id", auth, deleteOneUser);
router.post("/login", loginUser);

router.post("/logout", auth, logoutUser);

router.post("/logout/all", auth, logoutAll);

// Export
module.exports = router;
