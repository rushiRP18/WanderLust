const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js")
const Review = require("../models/review.js");
const Listing = require("../models/listing.js")
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewControler = require("../controllers/review.js")


//Reviews
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewControler.newReview));

//del review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewControler.delReview));

module.exports = router;
