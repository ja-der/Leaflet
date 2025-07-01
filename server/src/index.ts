import express from "express";
import favouriteRouter from "./routes/favouriteRoutes";
import booksRouter from "./routes/bookRoutes";
import cors from "cors";

const app = express();
const port = 3001;

// Add CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Your Next.js client URL
    credentials: true,
  })
);

app.use(express.json());
app.use("/books", booksRouter);
app.use("/favourites", favouriteRouter);

app.get("/", (_req, res) => {
  res.send("Hello from the backend");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
