const categoryModel = require("../models/category.schema");

const categoryCreate = async (req, res) => {
  try {
    let cat = await categoryModel.create(req.body);
    return res.redirect("/product");
  } catch (error) {
    return res.redirect("/category");
  }
};

const categoryPage = (req, res) => {
  res.render("category");
};

const updateCatData = async (req, res) => {
  let { id } = req.params;
  try {
    let cat = await categoryModel.findByIdAndUpdate(id, { subCatId: req.body.subId });
    res.send(cat);
  } catch (error) {
    res.send(error)
  }
}

const getCatData = async (req, res) => {
  try {
    let catData = await categoryModel.find()
      .populate({
        path: "subCatId",       
        populate: {
          path: "extraCatId" 
        }
      });
    res.send(catData);
  } catch (error) {
    res.send(error)
  }
}
module.exports = { categoryCreate, categoryPage, updateCatData , getCatData};
