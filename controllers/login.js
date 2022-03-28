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
exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const _id = req.params.id;
  try {
    
    let user = await User.findById(_id);
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Exists" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Password" });
    }
    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    await user.save();
    res.json({ success: true, user });
  } catch (error) {}
};
exports.getData = async (req, res) => {
  res.status(200).send(req.user);
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
