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
  console.log("hcsc", req.params.id);
  try {
    let creator = await Creator.findOne({ _id: req.params.id });
    if (!creator) return res.status(400).send({ message: "creator not found" });
    res.json({ creator });
  } catch (error) {}
};
exports.getsearch = async (req, res) => {
  const { name } = req.body;
  try {
    const users = await User.find({
      username: { $regex: name, $options: "$i" },
      creator: { $ne: null },
    });
    if (users.length === 0) {
      res.status(404).send("Not Found");
    } else {
      res.send(users);
    }
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
      console.log("Invalid user id or creator id");
      return res.status(400).send({ message: "user or creator not found" });
    }
    // console.log(user.creator, "fdghjklhjk");
    if (user.creator) {
      console.log("i am here");
      const creatorAsUser = Creator.findById(user.creator);
      Creator.updateOne(
        { _id: creatorAsUser._id },
        { $push: { following: creator.user_id } }
      );
      const creator = Creator.findById(creator_id);
      Creator.updateOne({ _id: creator_id }, { $push: { follower: user_id } });
      res.send("Following Successfully", creator, creatorAsUser);
    } else {
      console.log("user = ", user);
      console.log("Creator = ", creator);
      const user1 = await User.updateOne(
        { _id: user_id },
        {
          $push: { following: creator.user_id },
        },
        { new: true }
      );

      console.log("user Updated", user1);
      const creator1 = await Creator.updateOne(
        { _id: creator_id },
        { $push: { follower: user_id } },
        { new: true }
      );

      res.send("Following Successfully");
    }
  } catch (error) {
    console.trace(error);
    res.status(500).send(error);
  }
};
