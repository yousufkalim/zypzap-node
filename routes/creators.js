// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { postCreator, getCreator } = require("../controllers/creators");
const {
  validateCreators,
  isValidated,
} = require("../middleware/validators/creators");

// Routes
router.post("/:id", validateCreators, isValidated, auth, postCreator);
router.get("/:id", auth, getCreator);

// Export
module.exports = router;
