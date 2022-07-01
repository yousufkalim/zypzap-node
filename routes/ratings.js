// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  getAllRatings,
  getOneRating,
  createRatings,
  updateRating,
  deleteRating
} = require("../controllers/ratings");
const {
  validateRatings,
  isValidated
} = require("../middleware/validators/ratings");

// Routes
router.get("/forSingleCourses/:id", getAllRatings);
router.get("/:id", getOneRating);
router.post("/", createRatings);
router.put("/:id", updateRating);
router.delete("/:id", auth, validateRatings, isValidated, deleteRating);

// Export
module.exports = router;
