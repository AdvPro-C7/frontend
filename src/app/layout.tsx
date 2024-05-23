import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./contexts/AuthContext";

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
      <body style={{ fontFamily: "Montserrat, sans-serif" }}>
        <AuthContextProvider>
          <Navbar />
          <main className="bg-primary min-h-screen">{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
