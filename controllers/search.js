const Users = require("../models/users.js");
const Games = require("../models/games.js");
const Videos = require("../models/videos.js");
const Courses = require("../models/courses.js");

exports.getAllSearchResults = async (req, res) => {
  const searchQuery = req.query.search.replace(
    /[-[\]{}()*+?.,\\^$|#\s]/g,
    "\\$&"
  );

  try {
    if (searchQuery != null) {
      let users = await Users.find({
        $or: [
          { username: { $regex: searchQuery, $options: "$i" } },
          { email: { $regex: searchQuery, $options: "$i" } },
        ],
      }).limit(10);
      let games = await Games.find({
        $or: [
          { game_name: { $regex: searchQuery, $options: "$i" } },
          { category: { $regex: searchQuery, $options: "$i" } },
        ],
      }).limit(10);
      let videos = await Videos.find({
        $or: [
          { title: { $regex: searchQuery, $options: "$i" } },
          { description: { $regex: searchQuery, $options: "$i" } },
          { tags: { $regex: searchQuery, $options: "$i" } },
        ],
      }).limit(10);

      let courses = await Courses.find({
        $or: [
          { course_name: { $regex: searchQuery, $options: "$i" } },
          { description: { $regex: searchQuery, $options: "$i" } },
          { level: { $regex: searchQuery, $options: "$i" } },
        ],
      }).limit(10);

      res.json([
        ...new Set(users),
        ...new Set(games),
        ...new Set(videos),
        ...new Set(courses),
      ]);
    } else {
      res.status(403).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllSearchByFilter = (req, res) => {
  res.send("Filter");
};

exports.filteredData = (req, res) => {
  const filters = req.query;
};
