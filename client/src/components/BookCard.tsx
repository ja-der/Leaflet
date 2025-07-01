// components/BookCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Book = {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year?: number;
  cover_i?: number;
};

type Author = {
  key: string;
  name: string;
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <Card className="w-full hover:shadow-lg transition">
      <CardHeader className="flex flex-col items-center">
        {book.cover_i ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            alt={book.title}
            className="w-32 h-48 object-cover rounded"
          />
        ) : (
          <div className="w-32 h-48 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
            No Cover
          </div>
        )}
        <CardTitle className="text-center text-lg mt-2">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-sm text-gray-600">
        <p>{book.author_name?.join(", ") ?? "Unknown Author"}</p>
        <div className="text-xs text-gray-500 mt-1">
          {book.first_publish_year &&
            `First published: ${book.first_publish_year}`}
        </div>
      </CardContent>
    </Card>
  );
}
