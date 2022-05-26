const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.auth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization").replace("Bearer ", "");
    console.log("decode is 1");
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("decode is ", decoded);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticated" });
  }
};

exports.generateAuthToken = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN_SECRET);

  user.tokens = user.tokens.concat({
    token,
  });
  await user.save();
  return token;
};
