var mongoose = require("../db/db");

// 创建schema
const classSchema = new mongoose.Schema({
  videoImg: String,
  videoName: String,
  videoUrl: String,
  singerId: String,
});

const classModel = mongoose.model("video", classSchema);

module.exports = classModel;
