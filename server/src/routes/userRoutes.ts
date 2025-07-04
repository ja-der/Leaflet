import { Router } from "express";
import {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  checkFavorite,
  addReview,
  getBookReviews,
} from "../controllers/userController";

const userRouter = Router();

userRouter.post("/favorites", addToFavorites);
userRouter.delete("/favorites/:bookId", removeFromFavorites);
userRouter.get("/favorites", getUserFavorites);
userRouter.get("/favorites/:bookId", checkFavorite);

userRouter.post("/reviews", addReview);
userRouter.get("/reviews/:bookId", getBookReviews);

export default userRouter;
