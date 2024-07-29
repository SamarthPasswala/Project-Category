const { Router } = require("express");
const { subCatCreate, subCatPage, updateExtraCat, getExtraCatData } = require("../controller/subcategory.controller");

const subcat_router = Router();

subcat_router.post("/subcatcreate",subCatCreate);
subcat_router.get("/subcategory", subCatPage);
subcat_router.patch("/update/:id", updateExtraCat);
subcat_router.get("/getsubcatdata", getExtraCatData);


module.exports = subcat_router;
