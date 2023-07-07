"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Link from "next/link";
import { useState, useEffect } from "react";

function NavbarComponent() {
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
                style={{ textDecoration: "none !important" }}
                className="text-white"
              >
                Home
              </Link>
            </button>
            {/* 
            {isLoggedIn ? (
              <button className="NavbarButton mx-2">
                <Link
                  href="/login"
                  className="text-white"
                  style={{ textDecoration: "none !important" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </Link>
              </button>
            ) : (
              <button className="NavbarButton mx-2">
                <Link
                  href="/login"
                  className="text-white"
                  style={{ textDecoration: "none !important" }}
                >
                  Login
                </Link>
              </button>
            )} */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
