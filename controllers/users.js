const User = require("../models/users");
const bcrypt = require("bcryptjs");
const { auth } = require("../middleware/auth");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Check User Already Exists
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).send({ message: "Email is already exist" });

    // Create User Object
    user = new User({
      username,
      email,
      password,
      role,
      creator: null,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log("user is user", user);

    await user.save();
    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    console.log("Error ----> ", error);
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
    if (!user) return res.status(404).send("Usemr Not Found");
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
