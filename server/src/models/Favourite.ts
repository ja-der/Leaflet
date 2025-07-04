import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    bookData: {
      title: String,
      author: String,
      coverUrl: String,
      firstPublishYear: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure user can't favorite same book twice
favouriteSchema.index({ userId: 1, bookId: 1 }, { unique: true });

export const Favourite = mongoose.model("Favourite", favouriteSchema);
