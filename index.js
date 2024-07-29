
const express = require("express");
const db = require("./config/adminDb");
const { router } = require("./routers/admin.router");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const { localAuth } = require("./middleware/adminAuth");
const { p_router } = require("./routers/product.router");
const flash = require("connect-flash");
const cat_router = require("./routers/category.router");
const subcat_router = require("./routers/subcategory.router");
const extracat_router = require("./routers/extracategory.router");

const port = 8081;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "private-key" }));

localAuth(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(flash());
app.use(router)
app.use(p_router);
app.use(cat_router);
app.use(subcat_router);
app.use(extracat_router);

app.listen(port, (error) => {
  db();
  if (!error) {
    console.log("Server start at:- http://localhost:" + port);
  }
})