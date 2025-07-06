"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useDebounce } from "react-use";
import { fetchBooks } from "../api/api";
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
  const fetchPopular = async (
    pageNum = 0,
    searchQuery = "",
    shouldScroll = false
  ) => {
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

      // Only scroll if explicitly requested (when user searches)
      if (shouldScroll) {
        window.scrollTo({
          top: 600,
          behavior: "smooth",
        });
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

  // Update the useEffect for debounced query to include scroll parameter
  useEffect(() => {
    if (debouncedQuery !== query) return;
    setPage(0);
    // Only scroll if there's actually a search query
    fetchPopular(0, debouncedQuery, debouncedQuery.length > 0);
  }, [debouncedQuery]);

  // Keep the initial load without scrolling
  useEffect(() => {
    fetchPopular(0);
  }, []);

  // Keep pagination without scrolling
  useEffect(() => {
    if (page > 0) {
      fetchPopular(page, debouncedQuery, false);
    }
  }, [page]);

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
      <div
        className="relative h-screen bg-cover justify-center items-center text-center flex flex-col bg-center bg-no-repeat px-6"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 items-center justify-center flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Discover Your Next Favourite Book
          </h1>
          <p className="text-white mb-4 max-w-xl text-2xl">
            Search from millions of books
          </p>
          <p className="text-white mb-8 max-w-xl">
            Start typing to search, or scroll to discover more books
          </p>
          <div className="w-full max-w-xl ">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a book title, author, or keyword..."
              className="text-white w-full px-4 py-3 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            />
          </div>
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
