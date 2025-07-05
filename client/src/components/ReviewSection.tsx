import { useState, useEffect } from "react";
import { addReview, getBookReviews } from "../api/api";
import { Star } from "lucide-react";

interface Review {
  _id: string;
  userId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

interface ReviewSectionProps {
  bookId: string;
  bookData: {
    title: string;
    author?: string;
  };
}

export default function ReviewSection({
  bookId,
  bookData,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getBookReviews(bookId);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setSubmitting(true);
    try {
      await addReview(bookId, rating, reviewText, bookData);
      setReviewText("");
      setRating(5);
      setShowForm(false);
      fetchReviews(); // Refresh reviews
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(
        "Failed to submit review. You may have already reviewed this book."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onRate?: (rating: number) => void
  ) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmitReview}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            {renderStars(rating, true, setRating)}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Share your thoughts about this book..."
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">
            No reviews yet. Be the first to review this book!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-3">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.reviewText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
