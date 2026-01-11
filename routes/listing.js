const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js")
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listing.js")
const multer = require('multer');

//save the data at the cloudinary
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

router
    .route("/")
    .get( wrapAsync(listingController.index)) //Index Route
    .post(isLoggedIn,validateListing,
        upload.single("listing[image]") , //multer will bring the image data in req.file
        wrapAsync(listingController.createListing)) //create route
   
 
//New Route 
router.get("/new",isLoggedIn,listingController.renderNewForm)
 
router
    .route("/:id")
    .get( wrapAsync(listingController.showListings)) //Show Route
    .put( isLoggedIn ,isOwner, upload.single("listing[image]") ,validateListing, wrapAsync(listingController.updateListing)) //Update Route 
    .delete( isLoggedIn,isOwner,wrapAsync(listingController.deleteListing)) //Delete route



//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm))

module.exports = router;


//Update route
// router.put("/:id",validateListing, wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
// }));
//Update route