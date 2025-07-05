"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, BookOpen, Menu } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">Leaflet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/landing"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                isActive("/landing")
                  ? "bg-white text-black"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="font-medium">Discover</span>
            </Link>

            <Link
              href="/favorites"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                isActive("/favorites")
                  ? "bg-white text-black"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="font-medium">Favorites</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-2">
              <Link
                href="/landing"
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all ${
                  isActive("/landing")
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-4 h-4" />
                <span>Discover</span>
              </Link>

              <Link
                href="/favorites"
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all ${
                  isActive("/favorites")
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-4 h-4" />
                <span>Favorites</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
