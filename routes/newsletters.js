// Init
const router = require("express").Router();
const { getAll, create } = require("../controllers/newsletters");

// Routes
router.get("/", getAll);
router.post("/", create);

// Export
module.exports = router;
