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
exports.getAllCreator = async (req, res) => {
  try {
    const totalNewsCreator = await Newsletters.find({ type: "creator" });

    const totalCreator = totalNewsCreator.length;
    res.json({ success: true, totalCreator });
  } catch (err) {
    console.log("Error ---> ", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};
//  get all creator in members
exports.getAllMembers = async (req, res) => {
  try {
    const allNewsLetter = await Newsletters.find({});

    const allMembers = allNewsLetter.length;
    res.json({ success: true, allMembers });
  } catch (err) {
    console.log("Error ---> ", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};
