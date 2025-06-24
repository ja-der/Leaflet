import express from "express";
import favouriteRouter from "./routes/favouriteRoutes";
import booksRouter from "./routes/bookRoutes"

const app = express();
const port = 3001;

app.use(express.json());
app.use('/books', booksRouter);
app.use('/favourites', favouriteRouter);

app.get("/", (_req, res) => {
  res.send("Hello from the backend");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
