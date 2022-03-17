const videoUpload = require("../middleware/videoUpload");
// const uploadFile = require("../middleware/video")();
const { upload } = require("../middleware/imageUpload");
const singleUpload = upload.single("video");
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
router.post("/", auth, singleUpload, postVideo);
// router.post("/video", auth, uploadFile, postVideo);
router.post("/addviews/:id", addViews);
router.put("/:id", auth, validateVideos, isValidated, updateVideo);
router.delete("/:id", auth, deleteVideo);
// Export
module.exports = router;
