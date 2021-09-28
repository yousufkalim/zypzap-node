// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { validateExample, isValidated } = require("../middleware/validators");

// Routes
router.get("/", getAllSearchResults);
router.get("/filter", isValidated, getAllSearchByFilter);

// Export
module.exports = router;
