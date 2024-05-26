"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import BookList from "./book-list/page";
import '../app/auth/auth.css'

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
  return (
    <BookList/>
  );
}
