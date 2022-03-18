const mongoose = require("mongoose");

async function Search(collectionName, query) {
  try {
    mongoose.connection.db.collection(
      collectionName,
      async (err, collection) => {
        const result = await collection.find({ $text: { $search: query } });
        return result;
      }
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = Search;
