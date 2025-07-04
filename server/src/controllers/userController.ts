import { Request, Response } from "express";
import { Favourite, Review } from "../models";

// remove for production
const TEMP_USER_ID = "temp-user-123";

export const addToFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId, bookData } = req.body;

    const favorite = new Favourite({
      userId: TEMP_USER_ID,
      bookId,
      bookData,
    });

    await favorite.save();
    res.status(201).json({
      message: "Added to favorites",
      favorite,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Book already in favorites",
      });
      return;
    }
    console.error("Add favorite error:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

export const removeFromFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;

    const result = await Favourite.deleteOne({ userId: TEMP_USER_ID, bookId });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Favorite not found" });
      return;
    }

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Remove favorite error:", error);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};

export const getUserFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const favorites = await Favourite.find({ userId: TEMP_USER_ID }).sort({
      createdAt: -1,
    });
    res.json(favorites);
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

export const checkFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;

    const favorite = await Favourite.findOne({ userId: TEMP_USER_ID, bookId });
    res.json({ isFavorited: !!favorite });
  } catch (error) {
    console.error("Check favorite error:", error);
    res.status(500).json({ error: "Failed to check favorite status" });
  }
};

export const addReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId, rating, reviewText, bookData } = req.body;

    const review = new Review({
      userId: TEMP_USER_ID,
      bookId,
      rating,
      reviewText,
      bookData,
    });

    await review.save();
    res.status(201).json({
      message: "Review added",
      review,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "You have already reviewed this book",
      });
      return;
    }
    console.error("Add review error:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
};

export const getBookReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
