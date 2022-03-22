// Init
const router = require("express").Router();
const {
  getAll,
  create,
  getAllCreator,
  getAllMembers,
} = require("../controllers/newsletters");

// Routes
router.get("/", getAll);
router.get("/creator", getAllCreator);
router.get("/all", getAllMembers);
router.post("/", create);

// Export
module.exports = router;
