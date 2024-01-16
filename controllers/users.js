const User = require("../models/user.js");


module.exports.renderSignupForm= (req, res) => {
    res.render("users/signup.ejs")
};




module.exports.logout= (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
};