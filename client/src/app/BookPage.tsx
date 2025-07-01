// pages/book/[id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchBookById } from "../api/api";

const BookPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchBookById(id as string).then((res) => setBook(res.data));
    }
  }, [id]);

  return (
    <div>
      <Link href="/">← Back to Home</Link>
      <h1>{book?.title}</h1>
      <p>{book?.description?.value || "No description available."}</p>
    </div>
  );
};

export default BookPage;
