// Init
const router = require("express").Router();
const {
  getAllVideos,
  getOneVideo,
  postVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videos");
const {
  validateVideos,
  isValidated,
} = require("../middleware/validators/videos");
const { auth } = require("../middleware/auth");

// Routes
router.get("/", auth, getAllVideos);
router.get("/:id", getOneVideo);
router.post("/", auth, validateVideos, isValidated, postVideo);
router.put("/:id", auth, validateVideos, isValidated, updateVideo);
router.delete("/:id", auth, deleteVideo);
// Export
module.exports = router;
