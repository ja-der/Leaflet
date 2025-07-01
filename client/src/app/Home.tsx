import React, { useEffect, useState } from "react";
import { fetchBooks, addFavorite } from "../api/api";

const Home = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetchBooks().then((res) => setBooks(res.data));
  }, []);

  return (
    <div>
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.key}>
          <p>{book.title}</p>
          <button
            onClick={() =>
              addFavorite({ id: book.key.split("/").pop(), title: book.title })
            }
          >
            Save to Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
