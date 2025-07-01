import axios from "axios";

// change to non-hard coded
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

// export const fetchBookById = (id: string) =>
//   axios.get(`${API_BASE}/books/${id}`);

// export const getFavorites = () => axios.get(`${API_BASE}/favorites`);
// export const addFavorite = (book: { id: string; title: string }) =>
//   axios.post(`${API_BASE}/favorites`, book);
// export const removeFavorite = (id: string) =>
//   axios.delete(`${API_BASE}/favorites/${id}`);
// export const getFavoriteById = (id: string) =>
//   axios.get(`${API_BASE}/favorites/${id}`);
// export const addReview = (id: string, review: string) =>
//   axios.post(`${API_BASE}/favorites/${id}/review`, { review });
