"use client";

import React from "react";

import { FcCheckmark } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
import { BiRupee } from "react-icons/bi";

import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import NavbarComponent from "../Navbar";

export default function premium() {
  const { push } = useRouter();

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
        if (data.error === "Invalid User") {
          push("/login");
        }

        if (data.success) {
          setHasPremium(data.hasPremium);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  }, []);

  const takePremium = () => {
    fetch("/api/payment", {
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
        if (data.error === "Invalid User") {
          push("/login");
        }

        if (data.success) {
          window.location.assign(data.url);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  };

  const revertPremium = () => {
    if (!hasPremium) return;

    fetch("/api/premium/revert", {
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
        if (data.error === "Invalid User") {
          push("/login");
        }

        if (data.success) {
          toast.success("Reverted to Basic Plan");
          toast.success("Refund will be initiated soon");
          setHasPremium(false);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  };

  return (
    <div>
      <NavbarComponent />
      <main className="text-center p-5">
        <Container className="p-5">
          <h2 className="mb-5">Choose The Best Plan For You</h2>

          <Row>
            <Col s={6} md={4}>
              <Card>
                <Card.Body className="px-5">
                  <Card.Title className="text-center text-success mb-4">
                    Basic
                  </Card.Title>
                  <Card.Text>
                    <FcCheckmark className="me-2" />
                    Register
                  </Card.Text>
                  <Card.Text>
                    <FcCheckmark className="me-2" />
                    Login
                  </Card.Text>
                  <Card.Text>
                    <FcCheckmark className="me-2" />
                    Add New ToDo Item
                  </Card.Text>
                  <Card.Text>
                    <RxCross1 className="me-2 text-danger" />
                    Edit ToDo Item
                  </Card.Text>
                  <Card.Text>
                    <FcCheckmark className="me-2" />
                    Delete ToDo Item
                  </Card.Text>
                  <Card.Text>
                    <RxCross1 className="text-danger me-2" />3 Maximum Todos
                  </Card.Text>

                  <Card.Text>
                    <BiRupee className="me-2" />
                    Free
                  </Card.Text>

                  <Card.Text>
                    <Button
                      variant={hasPremium ? "primary" : "outline-primary"}
                      onClick={revertPremium}
                      className="w-100"
                    >
                      {hasPremium
                        ? "Revert back to Basic Plan"
                        : "Basic Plan Activated"}
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col s={0} md={4}></Col>
            <Col s={6} md={4} className="mt-5 mt-md-0">
              <Card>
                <Card.Body className="px-5">
                  <Card.Title className="text-center text-danger mb-4">
                    Premium
                  </Card.Title>
                  <Card.Text>
                    <FcCheckmark className="me-2" />
                    Register
                  </Card.Text>
                  <Card.Text>
                    <FcCheckmark className="me-2" />
                    Login
                  </Card.Text>
                  <Card.Text>
                    <FcCheckmark className="me-2" />
                    Add New ToDo Item
                  </Card.Text>
                  <Card.Text>
                    <FcCheckmark className="me-2" />
                    Edit ToDo Item
                  </Card.Text>
                  <Card.Text>
                    <FcCheckmark className="me-2" />
                    Delete ToDo Item
                  </Card.Text>
                  <Card.Text>
                    <FcCheckmark className="me-2" />
                    Unlimited Todos
                  </Card.Text>

                  <Card.Text
                    style={hasPremium ? { textDecoration: "line-through" } : {}}
                  >
                    <BiRupee className="me-2" />
                    10
                  </Card.Text>

                  <Card.Text>
                    <Button
                      variant={hasPremium ? "outline-primary" : "primary"}
                      className="w-100"
                      onClick={() => {
                        if (!hasPremium) {
                          takePremium();
                        }
                      }}
                    >
                      {hasPremium
                        ? "Premium Plan Activated"
                        : "Activate Premium"}
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
