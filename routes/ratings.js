// Init
const router = require("express").Router();
const {
  getAllRatings,
  getOneRating,
  createRatings,
  updateRating,
  deleteRating,
} = require("../controllers/ratings");
const {
  validateRatings,
  isValidated,
} = require("../middleware/validators/ratings");

// Routes
router.get("/", getAllRatings);
router.get("/:id", getOneRating);
router.post("/", validateRatings, isValidated, createRatings);
router.put("/:id", validateRatings, isValidated, updateRating);
router.delete("/:id", validateRatings, isValidated, deleteRating);

// Export
module.exports = router;
