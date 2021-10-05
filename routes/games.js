// Init
const router = require("express").Router();
const {
  getAllGames,
  getOneGame,
  createGame,
  updateGame,
} = require("../controllers/games");
const {
  validateGames,
  isValidated,
} = require("../middleware/validators/games");

// Routes
router.get("/", getAllGames);
router.get("/:id", getOneGame);
router.post("/", validateGames, isValidated, createGame);
router.put("/:id", validateGames, isValidated, updateGame);

// Export
module.exports = router;
