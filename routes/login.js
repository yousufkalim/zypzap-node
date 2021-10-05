// Init
const router = require("express").Router();
const { loginUser, logoutUser } = require("../controllers/login");

// Routes
router.post("/", loginUser);
router.post("/", logoutUser);

// Export
module.exports = router;
