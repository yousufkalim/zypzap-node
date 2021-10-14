const mongoose = require("mongoose");

async function Search(DBName, query, cb) {
  try {
    mongoose.connection.db.collection(DBName, (err, collection) => {
      if (err) console.log(err);
      collection.find({ $text: { $search: query } }).toArray(cb);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = Search;
