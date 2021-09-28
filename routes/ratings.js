// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { validateExample, isValidated } = require("../middleware/validators");

// Routes
router.get("/", getAllRatings);
router.get("/:id", getOneRating);
router.post("/", isValidated, createRatings);
router.put("/:id", isValidated, updateRating);
router.delete("/:id", isValidated, deleteRating);

// Export
module.exports = router;
