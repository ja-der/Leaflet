"use client";
import { useFavorites } from "../../hooks/useFavorites";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, loading, removeFromFavorites } = useFavorites();
  const router = useRouter();

  const handleRemove = async (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await removeFromFavorites(bookId);
  };

  const handleBookClick = (bookId: string) => {
    router.push(`/book/${bookId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p>Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            My Favorites
          </h1>
          <p className="text-gray-600">Books you've saved for later</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No favorites yet</p>
            <button
              onClick={() => router.push("/landing")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Discover Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((favorite) => (
              <Card
                key={favorite._id}
                className="cursor-pointer hover:shadow-lg transition relative"
                onClick={() => handleBookClick(favorite.bookId)}
              >
                <button
                  onClick={(e) => handleRemove(favorite.bookId, e)}
                  className="absolute top-2 right-2 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <CardHeader className="flex flex-col items-center">
                  {favorite.bookData?.coverUrl ? (
                    <img
                      src={favorite.bookData.coverUrl}
                      alt={favorite.bookData.title}
                      className="w-32 h-48 object-cover rounded"
                    />
                  ) : (
                    <div className="w-32 h-48 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
                      No Cover
                    </div>
                  )}
                  <CardTitle className="text-center text-lg mt-2">
                    {favorite.bookData?.title || "Unknown Title"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-gray-600">
                  <p>{favorite.bookData?.author || "Unknown Author"}</p>
                  {favorite.bookData?.firstPublishYear && (
                    <div className="text-xs text-gray-500 mt-1">
                      First published: {favorite.bookData.firstPublishYear}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-2">
                    Added: {new Date(favorite.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
