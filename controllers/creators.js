const Creator = require("../models/creators");
const User = require("../models/users");

exports.postCreator = async (req, res) => {
    try {
        const user = User.findById(req.params.id);
        if (!user) return res.status(400).send("User Not Found");
        const creator = new Creator({req.body, user_id: req.params.id});
        res.status(201).send(creator);
    await creator.save();
    if (!user) return res.status(400).send("User Not Found");
    
  } catch (error) {}
};
