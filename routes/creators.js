// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  postCreator,
  getCreator,
  getsearch,
  addFollower,
  addDetails,
} = require("../controllers/creators");
const {
  validateCreators,
  isValidated,
} = require("../middleware/validators/creators");

// Routes   addFollower
router.post("/addFollower", auth, addFollower);
router.get("/search", auth, getsearch);
router.post("/addDetails/:id", auth, addDetails);
router.post("/:id", validateCreators, isValidated, auth, postCreator);
router.get("/:id", getCreator);

// Export
module.exports = router;
