"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Book {
  coverImageUrl: string;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
  description: string;
  price: number;
  stock: number;
  isbn: string;
  category: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  const warningCountString = localStorage.getItem("warningCount");
  const warningCount = warningCountString ? parseInt(warningCountString) : 0;

  useEffect(() => {
    fetch("http://localhost:8080/api/best-selling-books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.slice(0, 10));
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, []);

  return (
    <>
      {warningCount > 2 && (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-24"
          role="alert"
        >
          <p className="font-bold">Peringatan!</p>
          <p>
            Anda sudah mendapatkan 2 peringatan, sekali lagi Anda mendapatkan
            peringatan maka akun Anda akan diblokir.
          </p>
        </div>
      )}

      <div className="book-list">
        {/* map over the books array and render each book */}
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <div className="book-cover">
              {/* use the Next.js Image component for optimized image rendering */}
              <Image
                src={book.coverImageUrl}
                alt={book.title}
                width={200}
                height={240}
              />
            </div>
            <div className="book-info">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">{book.author}</p>
              <p className="book-publisher">{book.publisher}</p>
              <p className="book-published-date">{book.publishDate}</p>
              <p className="book-description">{book.description}</p>
              <p className="book-price">{book.price}</p>
              <p className="book-stock">Stock: {book.stock}</p>
              <p className="book-isbn">{book.isbn}</p>
              <p className="book-category">{book.category}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
