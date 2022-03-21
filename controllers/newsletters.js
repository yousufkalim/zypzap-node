const Newsletters = require("../models/newsletter");

exports.getAll = async (req, res) => {
  try {
    const newsletters = await Newsletters.find().sort({ createdAt: -1 });
    res.json({ success: true, newsletters });
  } catch (err) {
    console.log("Error ---> ", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

exports.create = async (req, res) => {
  try {
    const newsletter = await Newsletters.create(req.body);
    console.log(newsletter);
    res.json({ success: true, newsletter });
  } catch (err) {
    console.log("Error ---> ", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};
