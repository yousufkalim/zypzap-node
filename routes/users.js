// Init
const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
} = require("../controllers/users");
const {
  validateUsers,
  isValidated,
} = require("../middleware/validators/users");

// Routes
router.get("/", getAllUsers);
router.post("/", validateUsers, isValidated, createUser);
router.get("/:id", getOneUser);
router.put("/:id", validateUsers, isValidated, updateOneUser);
router.delete("/:id", deleteOneUser);

// Export
module.exports = router;
