// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { validateExample, isValidated } = require("../middleware/validators");

// Routes
router.get("/", getAllUsers);
router.post("/", isValidated, createUser);
router.get("/:id", getOneUser);
router.put("/:id", validateExample, isValidated, updateOneUser);
router.delete("/:id", validateExample, isValidated, deleteOneUser);

// Export
module.exports = router;
