// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { validateExample, isValidated } = require("../middleware/validators");

// Routes
router.get("/", getAllUsers);
router.post("/", validateExample, isValidated, postAllUsers);
router.post("/:id", validateExample, isValidated, postOneUser);
router.get("/:id", getAllUsers);
router.put("/:id", validateExample, isValidated, updateUser);
router.delete("/:id", validateExample, isValidated, deleteUser);

// Export
module.exports = router;
