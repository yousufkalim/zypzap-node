// Init
const router = require("express").Router();
const {
  getAllSearchResults,
  getAllSearchByFilter,
} = require("../controllers/search");

// Routes
router.get("/", getAllSearchResults);
router.get("/filter", getAllSearchByFilter);

// Export
module.exports = router;
