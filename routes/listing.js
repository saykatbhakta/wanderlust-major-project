const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner, validateListing} = require("../middleware.js");
const listingController=require("../controllers/listings.js");

//----------index & create route-------------------------------

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listing[image]"),validateListing,
    wrapAsync(listingController.createListing));
//----------new route---------------------------------

router.get("/new", isLoggedIn,listingController.renderNewForm);

