const mongoose = require("mongoose");

const extraCatSchema = new mongoose.Schema({
  extracatname: String,
});

const extraCatModel = mongoose.model("extraCategoryTbl", extraCatSchema);

module.exports = extraCatModel;