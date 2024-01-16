if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 8080;

const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")
const userRouter = require("./routes/user.js");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

//----------------ejs require---------------------------
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"))

//----------------ejs-mate require---------------------------

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname, "/public")));
//----------------mongoose require---------------------------
const mongoose = require("mongoose");
const { connect } = require("http2");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connection successfull")
    }).catch((err) => {
        console.log(err)
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/",userRouter);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"))
})


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message })
    // res.status(statusCode).send(message);
})

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`)
});