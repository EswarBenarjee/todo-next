"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export default function Login() {
  const { push } = useRouter();

  if (localStorage.getItem("token")) push("/");

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const login = (e) => {
    e.preventDefault();

    setLoading(true);

    fetch("/api/users/login", {
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
        toast.success("Login successful");
        push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <main>
      <Container style={{ minHeight: "80vh" }} className="mt-5">
        <Row className="d-flex justify-content-around align-items-center h-100">
          <Col
            xs={12}
            md={6}
            className="py-5 py-md-2 d-flex justify-content-around align-items-center"
          >
            <img
              data-aos="fade-zoom-in"
              src="./login.png"
              alt="Login"
              className="w-50 w-md-100"
            />
          </Col>
          <Col xs={12} md={6} className="p-5 py-md-2">
            <Form
              onSubmit={(e) => (buttonDisabled ? e.preventDefault() : login(e))}
            >
              <h3 className="text-center mb-4">
                {loading ? "Processing..." : "Login"}
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
                  onClick={() => push("/register")}
                >
                  Register
                </Button>
                <Button variant="primary" type="submit" className=" w-25">
                  {buttonDisabled ? "No Login" : "Login"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
