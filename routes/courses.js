// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/imageUpload");
const singleUpload = upload.array("files");
const {
  getAllCourses,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourse,
  getFilteredCourses,
  getTopGames,
  deleteCourseEpisode,
  filterCourses,
} = require("../controllers/courses");
const {
  validateCourses,
  isValidated,
} = require("../middleware/validators/courses");

// Routes
router.get("/", getAllCourses);
// router.get("/search", searchCourse);
router.post("/", createCourse);

router.post("/filter", filterCourses); //newsearch

router.get("/filteredCourses", getFilteredCourses);
router.get("/topGames", getTopGames);
router.get("/:id", getOneCourse);
router.put("/:id", auth, deleteCourseEpisode);
router.put("/", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);

// Export
module.exports = router;
