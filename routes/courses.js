// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
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
router.post("/", auth, validateCourses, isValidated, createCourse);
router.get("/", getAllCourses);
router.get("/:id", auth, getOneCourse);
router.put("/:id", auth, validateCourses, isValidated, updateCourse);
router.delete("/:id", auth, deleteCourse);

// Export
module.exports = router;
