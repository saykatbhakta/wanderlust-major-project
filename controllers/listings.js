const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
   
    .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing=async (req, res, next) => {

    let response=await geocodingClient
    .forwardGeocode({
        query:req.body.listing.location,
        limit: 1,
      })
        .send()



 let url=req.file.path;
 let filename=req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename}

    newListing.geometry=response.body.features[0].geometry;

    let savedListing  =await newListing.save();
    console.log(savedListing);
    
    req.flash("success", "New listing created!");
    res.redirect("/listings");

};

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}