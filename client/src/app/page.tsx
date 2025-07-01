"use client";
import React, { useEffect, useState } from "react";
import { fetchBooks } from "../api/api";
import Link from "next/link";
import { Search } from "lucide-react";
import { useDebounce } from "react-use";

export default function HomePage() {
  const [books, setBooks] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useDebounce(() => setDebouncedQuery(query), 500, [query]);

  useEffect(() => {
    fetchBooks().then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="min-h-screen  flex  flex-col  items-center  justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Leaflet</h1>
      <input
        className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
        type="text"
        placeholder="What are you interested in today?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
