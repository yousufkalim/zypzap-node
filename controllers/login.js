const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { generateAuthToken } = require("../middleware/auth");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check User Exists
    let user = await User.findOne({ email: email }).populate({
      path: "creator",
    });
    if (!user) {
      return res.status(400).send({ message: "User Not Exists" });
    }
    // Match Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid Password" });
    }

    const token = await generateAuthToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getData = async (req, res) => {
  console.log("get is", req.user);

  res.status(200).send(req.user);
};

exports.logoutUser = async (req, res) => {
  console.log("req body is ", req.user);
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
