// Init
const router = require("express").Router();

// All Routes
router.use("/users", require("./users"));
router.use("/creators", require("./creators"));
router.use("/videos", require("./videos"));
router.use("/courses", require("./courses"));
router.use("/blogs", require("./blogs"));
router.use("/games", require("./games"));
router.use("/ratings", require("./ratings"));
router.use("/search", require("./search"));
router.use("/contentRequests", require("./contentRequests"));

// Export
module.exports = router;
