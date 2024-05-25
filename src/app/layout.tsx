import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import CustomerList from "./components/CustomerList";
import WarningsMessageList from "./components/WarningsMessageList";

const nunito = Nunito({ subsets: ['latin'], display: 'fallback' });
export const metadata: Metadata = {
  title: "Buku.ID | Toko Buku Online Terlengkap di Indonesia",
  description: "Discover Worlds Between Pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={nunito.className}>

        <Navbar />
        <BookList books={[]} />
        <CustomerList />
        <WarningsMessageList />
       <main className="bg-primary min-h-screen">{children}</main>
      </body>
    </html>
  );
}
