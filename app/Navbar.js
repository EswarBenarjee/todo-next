"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Link from "next/link";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

function NavbarComponent({ currentPage }) {
  const { push } = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  });

  const [alternatePage, setAlternatePage] = useState("");

  useEffect(() => {
    // Set the alternate page
    if (currentPage == "login") setAlternatePage("register");
    else setAlternatePage("login");
  }, []);

  const [hasPremium, setHasPremium] = useState(false);

  useEffect(() => {
    fetch("/api/premium/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHasPremium(data.hasPremium);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  }, []);

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="favicon.ico"
              width="35"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <b className="px-2">To Do</b>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <button className="NavbarButton mx-2">
              <Link
                href="/"
                className="text-white"
                style={{ textDecoration: "none !important" }}
              >
                Home
              </Link>
            </button>

            {isLoggedIn && !hasPremium && (
              <button className="NavbarButton mx-2">
                <Link
                  href="/premium"
                  className="text-white"
                  style={{ textDecoration: "none !important" }}
                >
                  Premium
                </Link>
              </button>
            )}

            {!isLoggedIn && (
              <button className="NavbarButton mx-2">
                <Link
                  href="/pricing"
                  className="text-white"
                  style={{ textDecoration: "none !important" }}
                >
                  Pricing
                </Link>
              </button>
            )}

            {isLoggedIn ? (
              <button className="NavbarButton mx-2">
                <Link
                  href="/login"
                  className="text-white"
                  style={{ textDecoration: "none !important" }}
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    push("/login");
                  }}
                >
                  Logout
                </Link>
              </button>
            ) : (
              <button className="NavbarButton mx-2">
                <Link
                  href={`/${alternatePage}`}
                  className="text-white"
                  style={{ textDecoration: "none !important" }}
                >
                  {alternatePage}
                </Link>
              </button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
