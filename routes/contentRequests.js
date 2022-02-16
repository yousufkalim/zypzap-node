// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  createContentRequest,
  getAllContentRequests,
  getOneContentRequest,
  updateContentRequest,
  deleteContentRequest,
  contentRequestVote,
} = require("../controllers/contentRequests");
const {
  validateContentRequests,
  isValidated,
} = require("../middleware/validators/contentRequests");

// Routes
router.post(
  "/",
  auth,
  validateContentRequests,
  isValidated,
  createContentRequest
);
router.get("/", getAllContentRequests);
router.get("/:id", getOneContentRequest);
router.put("/postCoursesVote", contentRequestVote);
router.put(
  "/:id",
  auth,
  validateContentRequests,
  isValidated,
  updateContentRequest
);
router.delete("/:id", auth, deleteContentRequest);

// Export
module.exports = router;
