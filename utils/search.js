const mongoose = require("mongoose");

async function Search(DBName, query, cb) {
  try {
    mongoose.connection.db.collection(DBName, (err, collection) => {
      if (err) console.log(err);
      collection.find({ $text: { $search: "shan@gmail.com" } }).toArray(cb);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = Search;
