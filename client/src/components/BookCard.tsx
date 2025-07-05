import { useRouter } from "next/navigation";
import FavoriteButton from "./FavoriteButton";
import { BookOpen, Star } from "lucide-react";

type Book = {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year?: number;
  cover_i?: number;
};

export default function BookCard({ book }: { book: Book }) {
  const router = useRouter();

  const handleClick = () => {
    const bookId = book.key.split("/").pop();
    router.push(`/book/${bookId}`);
  };

  const bookId = book.key.split("/").pop() || "";
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : undefined;

  const bookData = {
    title: book.title,
    author: book.author_name?.join(", ") || "Unknown Author",
    coverUrl,
    firstPublishYear: book.first_publish_year,
  };

  return (
    <div className="uber-card p-4 cursor-pointer group overflow-hidden relative">
      {/* Favorite Button */}
      <div className="absolute top-4 right-4 z-10 transition-opacity duration-200">
        <FavoriteButton bookId={bookId} bookData={bookData} />
      </div>

      <div onClick={handleClick} className="flex flex-col h-full">
        {/* Book Cover */}
        <div className="relative mb-4 flex justify-center">
          {book.cover_i ? (
            <img
              src={coverUrl}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-32 h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm text-gray-400 rounded-xl shadow-lg">
              <BookOpen className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-black font-semibold text-lg mb-2 line-clamp-2 leading-tight">
            {book.title}
          </h3>

          <p className="text-gray-600 text-sm mb-2 line-clamp-1">
            {book.author_name?.join(", ") ?? "Unknown Author"}
          </p>

          {book.first_publish_year && (
            <div className="mt-auto">
              <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                {book.first_publish_year}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
    </div>
  );
}
