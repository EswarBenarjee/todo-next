"use client";

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import Provider from "components/Provider";

import NavbarComponent from "./Navbar";

export const metadata = {
  title: "To Do Application",
  description: "A simple To Do Application which uses Next.js and MongoDB.",
};

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NavbarComponent />
          {children}
        </Provider>
      </body>
    </html>
  );
}
