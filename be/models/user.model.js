var mongoose = require("./../db/db");

// 创建schema
const classSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const classModel = mongoose.model("user", classSchema);

module.exports = classModel;
