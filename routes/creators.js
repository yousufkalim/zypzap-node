// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  postCreator,
  getCreator,
  getsearch,
  addFollower,
} = require("../controllers/creators");
const {
  validateCreators,
  isValidated,
} = require("../middleware/validators/creators");

// Routes   addFollower
router.get("/addFollower", auth, addFollower);
router.get("/search", auth, getsearch);
router.post("/:id", validateCreators, isValidated, auth, postCreator);
router.get("/:id", auth, getCreator);

// Export
module.exports = router;
