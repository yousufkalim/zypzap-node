const ContentRequest = require("../models/contentRequests");
const User = require("../models/users");

exports.createContentRequest = async (req, res) => {
  const { request_by } = req.body;
  try {
    const user = await User.findById(request_by);
    if (!user) return res.status(404).send("User not Found");
    const contentRequest = new ContentRequest(req.body);
    await contentRequest.save();
    res.status(201).send(contentRequest);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllContentRequests = async (req, res) => {
  try {
    const contentRequests = await ContentRequest.find().populate("game");
    if (!contentRequests)
      return res.status(404).send("Content Requests does not Found");
    res.send(contentRequests);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOneContentRequest = async (req, res) => {
  const _id = req.params.id;
  try {
    const contentRequest = await ContentRequest.findById(_id);
    if (!contentRequest)
      return res.status(404).send("Content Request does not found");
    res.send(contentRequest);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateContentRequest = async (req, res) => {
  const _id = req.params.id;
  try {
    const contentRequest = await ContentRequest.findByIdAndUpdate(
      _id,
      req.body
    );
    if (!contentRequest)
      return res.status(404).send("Content Request does not update");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteContentRequest = async (req, res) => {
  const _id = req.params.id;
  try {
    const contentRequest = await ContentRequest.findByIdAndDelete(_id);
    if (!contentRequest)
      return res.status(404).send("Content Request does not delete");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.contentRequestVote = async (req, res) => {
  const { course_request_id, user_id } = req.body;
  try {
    console.log("jhsfcghgjahb", user_id);
    const contentRequest = await ContentRequest.findById(course_request_id);
    console.log("contentRequest", contentRequest);
    const likes = contentRequest.likes;
    console.log("likes", likes);
    const like = likes.filter((_) => _.equals(user_id));
    console.log("hgcjscbk", like);
    if (!like) contentRequest.likes.push(user_id);
    await contentRequest.save();
    res.send(contentRequest);
  } catch (error) {}
};
