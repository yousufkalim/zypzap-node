// Init
const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
} = require("../controllers/users");
const { loginUser, logoutUser, logoutAll } = require("../controllers/login");
const { auth } = require("../middleware/auth");
const {
  validateUsers,
  isValidated,
} = require("../middleware/validators/users");

// Routes
router.get("/", getAllUsers);
router.post("/", validateUsers, isValidated, createUser);
router.get("/:id", getOneUser);
router.put("/:id", auth, updateOneUser);
router.delete("/:id", auth, deleteOneUser);

router.post("/login", loginUser);

router.post("/logout", auth, logoutUser);

router.post("/logout/all", auth, logoutAll);

// Export
module.exports = router;
