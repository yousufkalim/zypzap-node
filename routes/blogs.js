// Init
const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  getAllBlogs,
  getOneBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs");
const { validateBlog, isValidated } = require("../middleware/validators/blogs");

// Routes
router.post("/", validateBlog, isValidated, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getOneBlog);
router.put("/:id", isValidated, updateBlog);
router.delete("/:id", deleteBlog);

// Export
module.exports = router;
