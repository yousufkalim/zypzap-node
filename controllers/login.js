const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { generateAuthToken } = require("../middleware/auth");

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("Email or password is incorrect");
    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(401).send("Email or password is incorrect");
    const token = await generateAuthToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("Logout successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logout from all devices successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};
