var mongoose = require("../db/db");

// 创建schema
const classSchema = new mongoose.Schema({
  singerImg: String,
  singerName: String,
});

const classModel = mongoose.model("singer", classSchema);

module.exports = classModel;
