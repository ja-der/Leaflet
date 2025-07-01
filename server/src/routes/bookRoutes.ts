import { Router } from "express";
import { getPopularBooks, searchBook } from "../controllers/bookController";

const userRouter = Router();

userRouter.get("/", getPopularBooks);
userRouter.get("/search", searchBook);

export default userRouter;
