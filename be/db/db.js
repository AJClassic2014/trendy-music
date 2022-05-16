var mongoose = require("mongoose"),
  db = mongoose.connection,
  DB_URL = "mongodb://localhost:27017/work";

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL);

module.exports = mongoose;
