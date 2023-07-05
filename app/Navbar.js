import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Link from "next/link";
import { useState, useEffect } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function NavbarComponent({ isLoggedIn }) {
  isLoggedIn = false;

  // const [providers, setProviders] = useState(null);

  // useEffect(() => {
  //   const setProviders = async () => {
  //     const response = await getProviders();
  //     setProviders(response);
  //   };

  //   setProviders();
  // }, []);

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
            {/* {isLoggedIn ? (
              <button type="button" onClick={signOut} className="NavbarButton">
                Sign Out
              </button>
            ) : (
              providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="NavbarButton"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))
            )} */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
