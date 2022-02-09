// Init
const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  postFavoriteCourse,
  setSubscription,
} = require("../controllers/users");
const {
  loginUser,
  logoutUser,
  logoutAll,
  getData,
} = require("../controllers/login");
const { auth } = require("../middleware/auth");
const {
  validateUsers,
  isValidated,
} = require("../middleware/validators/users");

// Routes
router.post("/setSubscription", auth, setSubscription);
router.get("/getuserbytoken", auth, getData);
router.get("/", getAllUsers);
router.post("/favoriteCourse", auth, postFavoriteCourse);
// SignUp
router.post("/", validateUsers, isValidated, createUser);
router.get("/:id", getOneUser);
router.put("/:id", auth, updateOneUser);
router.delete("/:id", auth, deleteOneUser);
router.post("/login", loginUser);

router.post("/logout", auth, logoutUser);

router.post("/logout/all", auth, logoutAll);

// Export
module.exports = router;
