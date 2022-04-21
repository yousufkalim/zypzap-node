// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  postCreator,
  getCreator,
  getsearch,
  addFollower,
  addDetails,
  topRatedCreator,
} = require("../controllers/creators");
const {
  validateCreators,
  isValidated,
} = require("../middleware/validators/creators");

// Routes   addFollower
router.post("/addFollower", auth, addFollower);
router.get("/search", getsearch);
router.get("/topRatedCreator", topRatedCreator);
router.get("/:id", getCreator);
router.post("/addDetails/:id", auth, addDetails);
router.post("/:id", validateCreators, isValidated, auth, postCreator);

// Export
module.exports = router;
