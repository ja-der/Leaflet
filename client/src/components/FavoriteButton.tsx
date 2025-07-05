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
    e.stopPropagation();
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
      className={`
        p-3 rounded-full backdrop-blur-lg transition-all duration-200 
        ${
          isFavorited
            ? "bg-red-500/90 text-white shadow-lg shadow-red-500/25"
            : "bg-black/50 text-white hover:bg-red-500/90"
        } 
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"} 
        ${className}
      `}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
    </button>
  );
}
