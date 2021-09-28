// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { isValidated } = require("../middleware/validators");

// Routes
router.post("/:id", isValidated, postCreator);

// Export
module.exports = router;
