const extraCatModel = require("../models/extracategory.schema");

const extraCatCreate = async (req, res) => {
  try {
    let extraCat = await extraCatModel.create(req.body);
    return res.redirect("/product");
  } catch (error) {
    return res.redirect("/extracategory");
  }
}

const extraCatPage = (req, res) => {
  return res.render("extracategory");
}

module.exports = { extraCatCreate, extraCatPage }
