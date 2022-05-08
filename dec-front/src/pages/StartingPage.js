import React from "react";
import { Container, Row, Col, Image, Navbar } from "react-bootstrap";
import { Drop, Woman, LogoPic } from "../img";
import { Link } from "react-router-dom";
import styles from "../styles/startpage.module.css";
import { Button } from "antd";
const StartingPage = () => {
  return (
    <Container fluid style={{ width: "100%", paddingLeft: "0px" }}>
      <Image
        style={{
          padding: 0,
          position: "sticky",
          top: "0%",
        }}
        src={Drop}
        className="position-fixed h-100"
      ></Image>

      <Navbar
        className="z-100"
        style={{
          width: "100%",
          paddingLeft: "0px",
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
      >
        <Col></Col>
        <Link to="/">
          <Col>
            <img src={LogoPic} alt="Decryptio" />
          </Col>
        </Link>
        <Col></Col>
      </Navbar>

      <Row className="main-content">
        <Col className="d-flex" style={{ pointerEvents: "none" }}>
          <Image src={Woman} className="mx-auto my-auto h-60 p-2" fluid></Image>
        </Col>
        <Col className="d-flex">
          <div className="mx-auto my-auto">
            <h2 style={{ textShadow: "2px 2px grey" }}>
              Welcome to Decryptio Exchange
            </h2>
            <h3 style={{ textShadow: "2px 2px grey" }}>Build Your Portfolio</h3>
            <h4 className={styles.h4} style={{ textShadow: "2px 2px grey" }}>
              Trading your favourite cryptocurrencies
            </h4>

            <Link to="/login">
              <Button
                ghost
                style={{ boxShadow: "3px 4px", borderRadius: "0px" }}
                className="b"
              >
                Begin The Adventure!
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StartingPage;
