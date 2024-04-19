const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Listing",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot be greater than 5"],
  },
  reviewText: {
    type: String,
    default: "",
  },
  reviewDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now,
  },
});

// Middleware to automatically populate 'user' and 'listing' fields in find queries
reviewSchema.pre(/^find/, function (next) {
  this.populate("user");
  this.populate("listing");
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
