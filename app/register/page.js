"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState, useEffect } from "react";

import NavbarComponent from "../Navbar";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    if (localStorage.getItem("token")) push("/");
  }, []);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const register = (e) => {
    e.preventDefault();

    setLoading(true);

    // Send request to server
    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.error) {
          return toast.error(data.error);
        }

        localStorage.setItem("token", data.token);
        toast.success("Registration successful");
        push("/");
      })
      .catch((err) => {
        toast.error(err.message);

        setLoading(false);
      });
  };

  useEffect(() => {
    if (
      user.username.length > 3 &&
      user.username.length < 256 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      <NavbarComponent />

      <main className="text-center p-5">
        <Container style={{ minHeight: "80vh" }} className="mt-5">
          <Row className="d-flex justify-content-around align-items-center h-100">
            <Col
              xs={12}
              md={6}
              className="py-5 py-md-2 d-flex justify-content-around align-items-center"
            >
              <img
                data-aos="fade-zoom-in"
                src="./register.png"
                alt="Register"
                className="w-50 w-md-100"
              />
            </Col>
            <Col xs={12} md={6} className="p-5 py-md-2">
              <Form
                onSubmit={(e) =>
                  buttonDisabled ? e.preventDefault() : register(e)
                }
              >
                <h3 className="text-center mb-4">
                  {loading ? "Processing..." : "Register"}
                </h3>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) =>
                      setUser({
                        ...user,
                        username: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setUser({
                        ...user,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button
                    variant="outline-primary"
                    className="me-4 w-25"
                    onClick={() => push("/login")}
                  >
                    Login
                  </Button>
                  <Button variant="primary" type="submit" className=" w-25">
                    {buttonDisabled ? "No Register" : "Register"}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
