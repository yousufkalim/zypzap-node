const { Query } = require("mongoose");
const Creator = require("../models/creators");
const User = require("../models/users");

exports.postCreator = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    let creator = await Creator.findOne({ user_id: req.params.id });
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
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.addDetails = async (req, res) => {
  const { goodGame, isOnline, level, audience } = req.body;
  try {
    let creator = await Creator.findOne({ _id: req.params.id });
    creator.gameyouaregoodat = goodGame;
    creator.onlineTeaching = isOnline;
    creator.level = level;
    creator.audience = audience;
    creator.save();

    res.send(creator);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getCreator = async (req, res) => {
  try {
    let creator = await Creator.findOne({ _id: req.params.id });
    if (!creator) return res.status(400).send({ message: "creator not found" });
    res.json({ creator });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getsearch = async (req, res) => {
  const name = req.query.name;
  try {
    const users = await User.find({
      username: { $regex: name, $options: "$i" },
      creator: { $ne: null },
    });
    const Creator = users.filter((user) => users.creator !== null);
    res.send(Creator);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.addFollower = async (req, res) => {
  const { user_id, creator_id } = req.body;
  try {
    const user = await User.findById(user_id);
    const creator = await Creator.findById(creator_id);
    if (!user || !creator) {
      return res.status(400).send({ message: "user or creator not found" });
    }

    const updateUser = await User.updateOne(
      { _id: user_id },
      {
        $push: { following: creator.user_id },
      },
      { new: true }
    );

    const creator1 = await Creator.updateOne(
      { _id: creator_id },
      { $push: { follower: user_id } },
      { new: true }
    );

    res.send("Following Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
