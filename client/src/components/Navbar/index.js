import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import logo from "../Navbar/assets/pokemon-logo-noBG.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }; 

  return (
    <header className="bg-primary text-light mb-4 py-3">
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col className="d-flex align-items-center">
            <Link className="text-light me-4" to="/">
              <img src={logo} alt="Logo" className="h-16 w-16" />
            </Link>
            <div className="btn-group">
              <Link className="btn bg-primary" to="/page1"> 
                Home
              </Link>
              <Link className="btn bg-primary" to="/page2"> 
                Create
              </Link>
              <Link className="btn bg-primary" to="/page3"> 
                Marketplace
              </Link>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <div className="rounded-circle bg-secondary profile-pic me-2"></div>
            <span className="text-white">Profile Name</span>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Navbar;
