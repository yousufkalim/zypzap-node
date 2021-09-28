// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { isValidated } = require("../middleware/validators");

// Routes
router.get("/", isValidated, getAllContentRequests);
router.get("/:id", isValidated, getOneContentRequest);
router.post("/", isValidated, createContentRequest);
router.put("/:id", isValidated, updateContentRequest);
router.delete("/:id", isValidated, deleteContentRequest);

// Export
module.exports = router;
