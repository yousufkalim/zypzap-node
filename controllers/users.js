const User = require("../models/users");

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const isAlreadyRegistered = await User.find({ email });
    if (isAlreadyRegistered)
      return res.status(400).send({ message: "Email is already exist" });

    const user = new User(req.body);
    await user.save();
    res.send(user);
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
    const user = await User.findOneById(_id);
    if (!user) return res.status(404).send("User Not Found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateOneUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(404).send("User Can't Update");
    res.send(updatedUser);
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
