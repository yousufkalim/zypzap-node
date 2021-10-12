// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { postCreator } = require("../controllers/creators");
const {
  validateCreators,
  isValidated,
} = require("../middleware/validators/creators");

// Routes
router.post("/:id", auth, validateCreators, isValidated, postCreator);

// Export
module.exports = router;
