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
  addViews,
  getviews,
} = require("../controllers/videos");
const {
  validateVideos,
  isValidated,
} = require("../middleware/validators/videos");
const { auth } = require("../middleware/auth");

// Routes
router.get("/getviews/:id", getviews);
router.get("/", auth, getAllVideos);
router.get("/:id", getOneVideo);
//router.get("/getviews/:id", getviews);
router.get("/watch/:id", watchVideo);
router.post("/", auth, videoUpload.single("video"), postVideo);
router.post("/addviews/:id", addViews);
getviews;
router.put("/:id", auth, validateVideos, isValidated, updateVideo);
router.delete("/:id", auth, deleteVideo);
// Export
module.exports = router;
