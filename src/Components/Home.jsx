import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <Row className="hero-img">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center text-light hero-text">
              Welcome to myHome
            </h1>
            <h4 className="text-center text-light mt-3">
              Find your next home in minutes
            </h4>
          </Col>
        </Row>
      </Container>
    </Row>
  );
}

export default Home;
