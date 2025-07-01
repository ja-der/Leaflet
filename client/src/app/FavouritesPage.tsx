import React, { useEffect, useState } from "react";
import { getFavorites, removeFavorite, addReview } from "../api/api";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [review, setReview] = useState("");

  const refresh = () => getFavorites().then((res) => setFavorites(res.data));

  useEffect(() => {
    refresh();
  }, []);

  const submitReview = (id: string) => {
    addReview(id, review).then(refresh);
  };

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.map((book) => (
        <div key={book.id}>
          <p>{book.title}</p>
          {book.review && (
            <p>
              <strong>Review:</strong> {book.review}
            </p>
          )}
          <input
            type="text"
            placeholder="Leave a review..."
            onChange={(e) => setReview(e.target.value)}
          />
          <button onClick={() => submitReview(book.id)}>Submit Review</button>
          <button onClick={() => removeFavorite(book.id).then(refresh)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
