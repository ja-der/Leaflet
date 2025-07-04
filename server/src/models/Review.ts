import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      maxlength: 2000,
    },
    bookData: {
      title: { type: String, required: true },
      author: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isRecommended: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// One review per user per book
reviewSchema.index({ userId: 1, bookId: 1 }, { unique: true });
// Index for fetching all reviews for a book
reviewSchema.index({ bookId: 1 });

export const Review = mongoose.model("Review", reviewSchema);
