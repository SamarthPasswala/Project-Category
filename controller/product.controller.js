const mongoose = require("mongoose");
const productModel = require("../models/product.schema");
const categoryModel = require("../models/category.schema");
const subCategoryModel = require("../models/subcategory.schema");
const extraCatModel = require("../models/extracategory.schema");


const productPage = async (req, res) => {
  try {
    let data = await productModel.find();
    let cat = await categoryModel.find();
    let subCat = await subCategoryModel.find();
    let extraCat = await extraCatModel.find();
    return res.render("product", { data, cat, subCat, extraCat });
  } catch (error) {
    console.log(error);
  }
};

const viewPage = async (req, res) => {
  try {
    let data = await productModel.find().populate("categoryId subCatId extraCatId");
    return res.render("view", { data });
  } catch (error) {
    console.log(error);
  }
};

// insert data
const addProduct = async (req, res) => {
  try {
    await productModel.create(req.body);
    return res.redirect("/view");
  } catch (error) {
    console.log(error);
  }
};

// delete data
const deleteData = async (req, res) => {
  try {
    let { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.redirect("/view");
  } catch (error) {
    console.log(error);
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate("categoryId subCatId extraCatId");
    const categories = await categoryModel.find();
    const subCategories = await subCategoryModel.find();
    const extraCategories = await extraCatModel.find();
    res.render("editproduct", { product, categories, subCategories, extraCategories });
  } catch (error) {
    console.log(error);
    res.redirect("/view");
  }
};

// Update product data
const updateData = async (req, res) => {
  try {
    let { id } = req.params;
    await productModel.findByIdAndUpdate(id, req.body);
    res.redirect("/view");
  } catch (error) {
    console.log(error);
    res.redirect("/view");
  }
};
module.exports = { productPage, viewPage, addProduct, deleteData, getProductById, updateData };
