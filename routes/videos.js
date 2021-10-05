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

// Routes
router.get("/", getAllVideos);
router.get("/:id", getOneVideo);
router.post("/", validateVideos, isValidated, postVideo);
router.put("/:id", validateVideos, isValidated, updateVideo);
router.delete("/:id", deleteVideo);
// Export
module.exports = router;
