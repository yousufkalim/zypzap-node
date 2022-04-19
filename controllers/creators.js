const Creator = require("../models/creators");
const User = require("../models/users");

exports.postCreator = async (req, res) => {
  try {
    const { expertiseGame, profile_photo, gameType, gameMood, plateForm } =
      req.body;
    const _id = req.params.id;
    const user = await User.findById(_id);
    let creator = await Creator.findById(_id);
    if (creator)
      return res.status(400).send({ message: "User is already a creator" });
    if (!user) return res.status(400).send("User Not Found");
    creator = new Creator({ user_id: req.params.id });

    let newUser = {
      expertiseGame,
      profile_photo,
      gameType,
      gameMood,
      plateForm,
      creator: creator._id,
      role: "Creator",
    };
    const newUsers = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: newUser,
      },
      {
        new: true,
      }
    );
    await creator.save();
    res.status(201).send({ newUsers, creator });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.addDetails = async (req, res) => {
  const { goodGame, is_Online, level, audience } = req.body;
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        role: "creator",
      },
      {
        new: true,
      }
    );
    await User.findOne({ _id: req.params.id });
    let creator = new Creator();
    creator.gameyouaregoodat = goodGame;
    creator.onlineTeaching = is_Online;
    creator.level = level;
    creator.audience = audience;
    await creator.save();

    res.send(creator);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getCreator = async (req, res) => {
  try {
    let creator = await Creator.findOne({ _id: req.params.id })
      .populate({
        path: "courses",
        populate: [
          {
            path: "videos",
            model: "Videos",
          },
        ],
      })
      .populate("user_id");

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
    }).populate({
      path: "creator",
      populate: {
        path: "courses",
        model: "Courses",
      },
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

    const updateUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: { following: creator.user_id },
      },
      { new: true }
    );
    const creator1 = await Creator.findOneAndUpdate(
      { _id: creator_id },
      { $push: { followers: user_id } },
      { new: true }
    );
    res.send({ user: updateUser, creator: creator1 });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
