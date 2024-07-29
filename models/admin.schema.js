const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  confirmPass: String
});

const userModel = mongoose.model("adminTbl", adminSchema);

module.exports = userModel;