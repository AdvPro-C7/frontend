import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Nunito } from "next/font/google";

export const metadata: Metadata = {
  title: "Buku.ID | Toko Buku Online Terlengkap di Indonesia",
  description: "Discover Worlds Between Pages",
};

const nunito = Nunito({ subsets: ['latin'], display: 'fallback' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">  
        <body  className={nunito.className}>
        <AuthContextProvider>
          <Navbar />
          <main className="bg-primary min-h-screen">{children}</main>
          <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
        </AuthContextProvider>
      </body>
    </html>
  );
}
