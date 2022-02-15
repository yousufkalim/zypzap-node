// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
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
router.post("/", auth, validateGames, isValidated, createGame);
router.put("/:id", auth, validateGames, isValidated, updateGame);

// Export
module.exports = router;
