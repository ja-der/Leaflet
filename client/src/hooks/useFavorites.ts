import { useState, useEffect } from "react";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} from "../api/api";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await getFavorites();
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (bookId: string, bookData: any) => {
    try {
      await addFavorite(bookId, bookData);
      fetchFavorites(); // Refresh the list
      return true;
    } catch (error) {
      console.error("Error adding favorite:", error);
      return false;
    }
  };

  const removeFromFavorites = async (bookId: string) => {
    try {
      await removeFavorite(bookId);
      fetchFavorites(); // Refresh the list
      return true;
    } catch (error) {
      console.error("Error removing favorite:", error);
      return false;
    }
  };

  const isFavorited = async (bookId: string) => {
    try {
      const response = await checkFavorite(bookId);
      return response.data.isFavorited;
    } catch (error) {
      console.error("Error checking favorite:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    fetchFavorites,
  };
};
