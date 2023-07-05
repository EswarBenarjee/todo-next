"use client";

import React from "react";

import { FcCheckmark } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";

import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function premium() {
  return (
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
                <Button variant="outline-primary" className="w-100">
                  Basic Plan Activated
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
                <Button variant="primary" className="w-100">
                  Buy Premium
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default premium;
