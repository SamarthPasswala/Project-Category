//pass = hkxp lmrh iijx kxgs

const mongoose = require('mongoose')
require('dotenv').config()
let URL = process.env.DB_URL
let db = async(req,res)=>{
    await mongoose.connect(
        URL
    )
    console.log("DataBase is Connected");
}

module.exports = db