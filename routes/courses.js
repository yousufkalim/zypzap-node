// Init
const router = require("express").Router();
const {
  getAllCourses,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");
const {
  validateCourses,
  isValidated,
} = require("../middleware/validators/courses");

// Routes
router.post("/", validateCourses, isValidated, createCourse);
router.get("/", getAllCourses);
router.get("/:id", getOneCourse);
router.put("/:id", validateCourses, isValidated, updateCourse);
router.delete("/:id", deleteCourse);

// Export
module.exports = router;
