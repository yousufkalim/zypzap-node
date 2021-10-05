// Init
const router = require("express").Router();
const {
  createContentRequest,
  getAllContentRequests,
  getOneContentRequest,
  updateContentRequest,
  deleteContentRequest,
} = require("../controllers/contentRequests");
const {
  validateContentRequests,
  isValidated,
} = require("../middleware/validators/contentRequests");

// Routes
router.post("/", validateContentRequests, isValidated, createContentRequest);
router.get("/", getAllContentRequests);
router.get("/:id", getOneContentRequest);
router.put("/:id", validateContentRequests, isValidated, updateContentRequest);
router.delete("/:id", deleteContentRequest);

// Export
module.exports = router;
