const { Router } = require("express");
const { categoryCreate, categoryPage,updateCatData, getCatData } = require("../controller/category.controller");

const cat_router = Router();

cat_router.post("/category", categoryCreate);
cat_router.get("/category", categoryPage);
cat_router.patch("/update/:id", updateCatData);
cat_router.get("/getdata", getCatData);   

module.exports = cat_router;
