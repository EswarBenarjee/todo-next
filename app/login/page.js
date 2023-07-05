"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useRouter } from "next/navigation";

export default function Login() {
  const { push } = useRouter();

  const login = (e) => {
    e.preventDefault();

    // Get username and password
    const username = e.target[0].value;
    const password = e.target[1].value;

    // Send request to server
    fetch("http://localhost:5000/api/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Save token to local storage
        localStorage.setItem("token", data.token);
        console.log(data.token);
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
            <Form onSubmit={login}>
              <h3 className="text-center mb-4">Login</h3>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  className="me-4 w-25"
                  onClick={() => push("/register")}
                >
                  Register
                </Button>
                <Button variant="primary" type="submit" className=" w-25">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
}