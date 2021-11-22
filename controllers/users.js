const User = require("../models/users");
const { auth } = require("../middleware/auth");

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const isAlreadyRegistered = await User.findOne({ email });
    if (isAlreadyRegistered)
      return res
        .status(400)
        .send({ message: "Email is already exist", user: isAlreadyRegistered });

    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOneUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findOne({ _id });
    if (!user) return res.status(404).send("User Not Found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateOneUser = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  try {
    const user = await req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteOneUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    if (!deletedUser) return res.status(404).send("User Not Found");
    res.send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
