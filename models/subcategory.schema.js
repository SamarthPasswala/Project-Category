const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  subcatname: String,
  extraCatId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:"extraCategoryTbl",
  }
});

const subCategoryModel = mongoose.model("subCategoryTbl", subCategorySchema);

module.exports = subCategoryModel;