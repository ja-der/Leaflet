"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, Home } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Leaflet
          </Link>

          <div className="flex space-x-6">
            <Link
              href="/landing"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isActive("/landing")
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Search className="w-4 h-4" />
              Discover
            </Link>

            <Link
              href="/favorites"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isActive("/favorites")
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Heart className="w-4 h-4" />
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
