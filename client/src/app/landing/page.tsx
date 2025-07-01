"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useDebounce } from "react-use";
import { fetchBooks } from "../../api/api";
import BookCard from "@/components/BookCard";

export default function LandingPage() {
  const [bookList, setBookList] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useDebounce(() => setDebouncedQuery(query), 500, [query]);

  // main function to fetch popular books on landing page
  const fetchPopular = async (pageNum = 0, searchQuery = "") => {
    // Prevent multiple concurrent requests
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetchBooks(pageNum, 12, searchQuery);
      const newBooks = response.data.books || [];

      if (pageNum === 0) {
        // reset list if first page (on first load or reloads)
        setBookList(newBooks);
      } else {
        setBookList((prev) => [...prev, ...newBooks]);
      }

      // Check if we have more books
      setHasMore(newBooks.length > 0);
    } catch (error) {
      console.error("Failed to fetch popular books", error);
    } finally {
      //set loading to false when request is finished
      setLoading(false);
    }
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
      hasMore &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  // Fetch books upon first load
  useEffect(() => {
    fetchPopular(0);
  }, []);

  // Handle debounced query for search
  useEffect(() => {
    if (debouncedQuery !== query) return;
    setPage(0);
    fetchPopular(0, debouncedQuery);
  }, [debouncedQuery]);

  // handle pagination when page number changes
  useEffect(() => {
    if (page > 0) {
      fetchPopular(page, debouncedQuery);
    }
  }, [page]);

  // scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-50 to-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Discover Your Next Favourite Book
        </h1>
        <p className="text-gray-600 mb-4 max-w-xl text-2xl">
          Search from millions of books
        </p>
        <p className="text-gray-600 mb-8 max-w-xl">
          Start typing to search, or scroll to discover more books
        </p>
        <div className="w-full max-w-xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a book title, author, or keyword..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {bookList.map((book, index) => (
          <BookCard key={`${book.key}-${index}`} book={book} />
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Loading more books...</p>
        </div>
      )}

      {/* End of results */}
      {!hasMore && bookList.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No more books to load</p>
        </div>
      )}
    </main>
  );
}
