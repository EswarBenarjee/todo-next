import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import "bootstrap/dist/css/bootstrap.min.css";

import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "To Do Application",
  description: "A simple To Do Application which uses Next.js and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
