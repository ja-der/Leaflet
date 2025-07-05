import axios from "axios";

// change to non-hard coded in production
const API_BASE = "http://localhost:3001";

export const fetchBooks = (page = 0, limit = 12, query = "") => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(query && { q: query }),
  });

  return axios.get(`${API_BASE}/books?${params}`);
};

export const searchBooks = (query: string, page = 0, limit = 12) => {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    limit: limit.toString(),
  });

  return axios.get(`${API_BASE}/books/search?${params}`);
};

export const fetchBookById = (id: string) => {
  return axios.get(`${API_BASE}/books/${id}`);
};

// user favourites
export const getFavorites = () => axios.get(`${API_BASE}/user/favorites`);

export const addFavorite = (bookId: string, bookData: any) =>
  axios.post(`${API_BASE}/user/favorites`, { bookId, bookData });

export const removeFavorite = (bookId: string) =>
  axios.delete(`${API_BASE}/user/favorites/${bookId}`);

export const checkFavorite = (bookId: string) =>
  axios.get(`${API_BASE}/user/favorites/${bookId}`);

// user reviews
export const addReview = (
  bookId: string,
  rating: number,
  reviewText: string,
  bookData: any
) =>
  axios.post(`${API_BASE}/user/reviews`, {
    bookId,
    rating,
    reviewText,
    bookData,
  });

export const getBookReviews = (bookId: string) =>
  axios.get(`${API_BASE}/user/reviews/${bookId}`);
