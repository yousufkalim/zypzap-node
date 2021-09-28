// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { validateExample, isValidated } = require("../middleware/validators");

// Routes
router.get("/", getAllGames);
router.get("/:id", getOneGame);
router.post("/", isValidated, createGame);
router.put("/:id", isValidated, updateGame);

// Export
module.exports = router;
