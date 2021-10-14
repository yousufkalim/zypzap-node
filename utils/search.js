const mongoose = require("mongoose");
const Users = require("../models/users.js");
async function Search(collectionName, query) {
  try {
    mongoose.connection.db.collection(
      collectionName,
      async (err, collection) => {
        if (err) console.log(err);
        const result = await collection.find({ $text: { $search: query } });
        console.log(result);
        return result;
      }
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = Search;
