"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { userContext } from "@/app/contexts/AuthContext";

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

  const { state } = userContext();
  console.log(state["authenticated"]);
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
    <main className="flex min-h-screen bg-primary flex-col items-center justify-between p-24">
      <div className="book-list">
        {/* Map over the books array and render each book */}
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <div className="book-cover">
              {/* Use the Next.js Image component for optimized image rendering */}
              <Image
                src={book.coverImageUrl}
                alt={book.title}
                width={200}
                height={300}
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
    </main>
  );
}
