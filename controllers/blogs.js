const Blog = require("../models/blogs");
const Creator = require("../models/creators");

exports.createBlog = async (req, res) => {
  const { blog_author: creator } = req.body;
  try {
    const user = await Creator.findById(creator);
    if (!user) return res.status(404).send("Creator does not found");
    const blog = new Blog({ ...req.body, blog_images: req.file.path });
    await blog.save();
    res.send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
  try {
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate({
      path: "blog_author",
      populate: {
        path: "user_id",
      },
    });
    if (!blogs) res.status(404).send("Blog Not Found");
    blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.send(blogs);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getOneBlog = async (req, res) => {
  const _id = req.params.id;
  try {
    const blog = await Blog.findById(_id);
    if (!blog) res.status(404).send("Not Found");
    res.send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateBlog = async (req, res) => {
  const _id = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) return res.status(404).send("Course Not Found");
    res.send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteBlog = async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(_id);
    if (!deletedBlog) return res.status(404).send("Course Not Found");
    res.send(deletedBlog);
  } catch (error) {
    res.status(500).send(error);
  }
};
