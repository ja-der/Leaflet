import express from "express";
import favouriteRouter from "./routes/favouriteRoutes";
import booksRouter from "./routes/bookRoutes";
import userRouter from "./routes/userRoutes";
import cors from "cors";
import connectDB from "./config/database";

const app = express();
const port = 3001;

connectDB();

// Add CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/books", booksRouter);
app.use("/favourites", favouriteRouter);
app.use("/user", userRouter);

app.get("/", (_req, res) => {
  res.send("Hello from the backend");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
