const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  p_name: String,
  p_image: String,
  p_dsc: String,
  p_rate: Number,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryTbl",
  },
  subCatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategoryTbl",
  },
  extraCatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "extraCategoryTbl",
  },
})

const productModel = mongoose.model("productTbl", productSchema);

module.exports = productModel;