const Review = require("../models/review.js");
const Listing = require("../models/listing.js")

module.exports.newReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    //review object 
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save()
    await listing.save();

    req.flash("success", "New Review Created!!")
    res.redirect(`/listings/${listing._id}`)
};

module.exports.delReview = async (req, res) => {
    const { id, reviewId } = req.params;
    // Remove review reference from listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    // Delete the review document itself
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!!")
    res.redirect(`/listings/${id}`);
};