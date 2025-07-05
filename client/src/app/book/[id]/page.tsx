"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchBookById } from "../../../api/api";
import FavoriteButton from "../../../components/FavoriteButton";
import ReviewSection from "../../../components/ReviewSection";

interface BookDetails {
  title: string;
  key: string;
  description?: {
    value: string;
  };
  authors?: Array<{
    author: {
      key: string;
    };
  }>;
  covers?: number[];
  first_publish_date?: string;
  first_sentence?: {
    value: string;
  };
  subjects?: string[];
  subject_places?: string[];
  links?: Array<{
    url: string;
    title: string;
  }>;
}

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!params.id) return;

      setLoading(true);
      try {
        const response = await fetchBookById(params.id as string);
        setBook(response.data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p>Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error || "Book not found"}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const coverUrl =
    book.covers?.[0] && book.covers[0] > 0
      ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
      : null;

  const bookId = params.id as string;
  const bookData = {
    title: book.title,
    author: "Unknown Author", // You might want to fetch author names
    coverUrl: coverUrl || undefined,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Books
          </button>
          <FavoriteButton bookId={bookId} bookData={bookData} />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Book Cover */}
              <div className="lg:col-span-1">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={book.title}
                    className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-full max-w-sm mx-auto h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-center p-4">
                      No cover available
                    </span>
                  </div>
                )}
              </div>

              {/* Book Details */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {book.title}
                </h1>

                {/* Publication Date */}
                {book.first_publish_date && (
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      First published: {book.first_publish_date}
                    </span>
                  </div>
                )}

                {/* First Sentence */}
                {book.first_sentence?.value && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Opening Line
                    </h2>
                    <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r">
                      "{book.first_sentence.value}"
                    </blockquote>
                  </div>
                )}

                {/* Description */}
                {book.description?.value && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      Description
                    </h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {book.description.value.split("----------")[0].trim()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Subjects/Genres */}
                {book.subjects && book.subjects.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      Genres & Topics
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {book.subjects.slice(0, 12).map((subject, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition"
                        >
                          {subject}
                        </span>
                      ))}
                      {book.subjects.length > 12 && (
                        <span className="px-3 py-1 text-gray-500 text-sm">
                          +{book.subjects.length - 12} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Locations */}
                {book.subject_places && book.subject_places.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      Settings
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {book.subject_places.slice(0, 8).map((place, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {place}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Links */}
                {book.links && book.links.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      External Links
                    </h2>
                    <div className="space-y-2">
                      {book.links.slice(0, 3).map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <ReviewSection bookId={bookId} bookData={bookData} />
          </div>
        </div>
      </div>
    </div>
  );
}
