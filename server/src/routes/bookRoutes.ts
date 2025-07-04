import { Router } from "express";
import {
  getPopularBooks,
  searchBook,
  getBookById,
} from "../controllers/bookController";

const bookRouter = Router();

bookRouter.get("/", getPopularBooks);
bookRouter.get("/search", searchBook);
bookRouter.get("/:id", getBookById);

export default bookRouter;
