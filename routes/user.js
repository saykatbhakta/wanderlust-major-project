const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup))
//---------------------------------------------------------------

router.get("/logout",userController.logout);


module.exports = router;