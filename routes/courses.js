// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { validateExample, isValidated } = require("../middleware/validators");

// Routes
router.get("/", getAllCourses);
router.get("/:id", getOneCourse);
router.post("/", isValidated, createCourse);
router.put("/:id", isValidated, updateCourse);
router.delete("/:id", isValidated, deleteCourse);

// Export
module.exports = router;
