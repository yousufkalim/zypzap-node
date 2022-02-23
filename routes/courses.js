// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/imageUpload");
const singleUpload = upload.single("image");
const {
  getAllCourses,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourse,
  getFilteredCourses,
  getTopGames
} = require("../controllers/courses");
const {
  validateCourses,
  isValidated,
} = require("../middleware/validators/courses");

// Routes
router.get("/", getAllCourses);
router.get("/search", searchCourse);
router.post(
  "/",
  auth,
  singleUpload,
  validateCourses,
  isValidated,
  createCourse
);
router.get("/filteredCourses", getFilteredCourses);
router.get("/topGames", getTopGames);
router.get("/:id", auth, getOneCourse);
router.put("/:id", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);

// Export
module.exports = router;
