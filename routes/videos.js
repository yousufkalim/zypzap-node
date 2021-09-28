// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { validateExample, isValidated } = require("../middleware/validators");

// Routes
router.get("/", getAllVideos);
router.get("/:id", getOneVideo);
router.post("/", validateExample, isValidated, postVideo);
router.put("/:id", isValidated, updateVideo);
router.delete("/:id", isValidated, deleteVideo);
// Export
module.exports = router;
