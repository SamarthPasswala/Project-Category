const userModel = require("../models/admin.schema");
const nodemailer = require("nodemailer");

const index = async (req, res) => {
  return await res.render("index");
}

// signup
const signup = async (req, res) => {
  // console.log(req.body);
  try {
    await userModel.create(req.body);
    // console.log(req.body);
    return res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error);
  }
};

const signupPage = async (req, res) => {
  await res.render("signup");
}

// login
const login = async (req, res) => {

  const { username, password } = req.body;
  let user = await userModel.findOne({ username: username });

  if (user) {
    if (user.password === password) {
      res.send("login");
      return res.cookie("user", "User.username").redirect("/");
    } else {
      console.log("Password Invalid");
    }
  } else {
    console.log("Invalid Username");
    return res.redirect("/login");
  }
}

const loginPage = async (req, res) => {
  await res.render("login")
}

// logout
const logout = (req, res) => {
  req.logout((error) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      return res.redirect("/login");
    }
  })
}


const profile = (req, res) => {
  let user = req.user;
  // console.log(user);
  return res.render("profile", { user });
}

const changePassword = (req, res) => {
  return res.render("changepassword");
}

const changePasswordPage = async (req, res) => {
  console.log(req.body);
  const { oldpassword, newpassword, confirmpassword } = req.body;
  let { id } = req.user;
  // console.log(id);

  let data = await userModel.findById(id);
  console.log(data);
  if (data.password === oldpassword) {
    if (newpassword === confirmpassword) {
      await userModel.findByIdAndUpdate(id, { password: newpassword });
      console.log("Password Change Successfully....");
      return res.redirect("/login")
    } else {
      console.log("New Password n Confirm Password Dosen't Match..");
      return res.redirect("/changepassword");
    }
  } else {
    console.log("Old Password is Wrong..");
    return res.redirect("/changepassword");
  }
}

const resetPassword = (req, res) => {
  return res.render("resetpassword",{
    info: req.flash("info")
  });
}

let otp = Math.floor(100000 + Math.random() * 900000);

const forgetPassword = (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 578,
      secure: false,
      auth: {
        user: "samypasswala78780@gmail.com",
        pass: "hkxp lmrh iijx kxgs",
      },
    });

    const createMail = {
      from: {
        name: "Samarth Passwala",
        address: "samypasswala78780@gmail.com",
      },
      to: req.body.email,
      subject: "Reset Password",
      html: `<h2>OTP : ${otp}</h2>`
    }
    transporter.sendMail(createMail, (error, info) => {
      if (error) {
        console.log("Error sending OTP",error);
      } else {
        console.log(info);
        res.redirect("/resetpassword");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// otp verify
const verifyOTP = (req,res)=>{
  if (req.body.otp === otp.toString()) {
    req.flash("info", "right");  
    res.redirect("/resetpassword");
  } else{
    req.flash("info", "wrong");  
  res.redirect("/resetpassword");
  }
}



module.exports = {
  index, 
  signupPage, signup, login, loginPage, logout,
    profile, changePassword, changePasswordPage, 
  forgetPassword, resetPassword, verifyOTP
}