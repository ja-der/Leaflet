import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";

interface FavoriteButtonProps {
  bookId: string;
  bookData: {
    title: string;
    author: string;
    coverUrl?: string;
    firstPublishYear?: number;
  };
  className?: string;
}

export default function FavoriteButton({
  bookId,
  bookData,
  className = "",
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorited: checkIsFavorited,
  } = useFavorites();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favorited = await checkIsFavorited(bookId);
      setIsFavorited(favorited);
    };
    checkFavoriteStatus();
  }, [bookId, checkIsFavorited]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    setLoading(true);

    try {
      if (isFavorited) {
        const success = await removeFromFavorites(bookId);
        if (success) setIsFavorited(false);
      } else {
        const success = await addToFavorites(bookId, bookData);
        if (success) setIsFavorited(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={loading}
      className={`p-2 rounded-full transition-colors ${
        isFavorited
          ? "text-red-500 hover:text-red-600"
          : "text-gray-400 hover:text-red-500"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
    </button>
  );
}
