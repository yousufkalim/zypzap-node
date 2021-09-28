// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { validateExample, isValidated } = require("../middleware/validators");

// Routes
router.post("/", isValidated, loginUser);
router.get("/", isValidated, logoutUser);

// Export
module.exports = router;
