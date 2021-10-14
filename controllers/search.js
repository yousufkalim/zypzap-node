const Search = require("../utils/search");

exports.getAllSearchResults = async (req, res) => {
  const searchQuery = req.query.search;

  try {
    if (searchQuery != null) {
      Search(process.env.DB_NAME, searchQuery, function (err, docs) {
        if (err) return res.status(400).send({ err });
        return res.send(docs);
      });
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
