const videoUpload = require("../middleware/videoUpload");
// Init
const router = require("express").Router();
const {
  getAllVideos,
  getOneVideo,
  postVideo,
  updateVideo,
  deleteVideo,
  watchVideo,
} = require("../controllers/videos");
const {
  validateVideos,
  isValidated,
} = require("../middleware/validators/videos");
const { auth } = require("../middleware/auth");

// Routes
router.get("/", auth, getAllVideos);
router.get("/:id", getOneVideo);
router.get("/watch/:id", watchVideo);
router.post("/", auth, videoUpload.single("video"), postVideo);
router.put("/:id", auth, validateVideos, isValidated, updateVideo);
router.delete("/:id", auth, deleteVideo);
// Export
module.exports = router;
