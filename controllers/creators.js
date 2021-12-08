const Creator = require("../models/creators");
const User = require("../models/users");

exports.postCreator = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    let creator = await Creator.findOne({ user_id: req.params.id });
    console.log("creator", creator);
    if (creator)
      return res.status(400).send({ message: "User is already a creator" });

    if (!user) return res.status(400).send("User Not Found");
    creator = new Creator({ ...req.body, user_id: req.params.id });

    let newUser = {
      creator: creator._id,
    };
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: newUser,
      },
      {
        new: true,
      }
    );
    await creator.save();

    res.status(201).send(creator);
  } catch (error) {}
};
exports.getCreator = async (req, res) => {
  try {
    let creator = await Creator.findOne({ user_id: req.params.id });
    console.log("creator", creator);
    if (!creator) return res.status(400).send({ message: "creator not found" });
    res.json({ creator });
  } catch (error) {}
};
