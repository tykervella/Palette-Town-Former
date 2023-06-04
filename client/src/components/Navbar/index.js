import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import logo from "../Navbar/assets/logo-correct.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomNavbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="text-whitemb-4 py-3 custom-navbar">
      <Container>
      <Navbar.Brand className="text-center">
      <Link className="text-white me-4 d-inline-block" to="/" style={{ textDecoration: 'none' }}>
        <img
          src={logo}
          alt="Logo"
          className="h-66 w-auto d-inline-block align-top"
          style={{ marginBottom: "0px" }}
        />
        <h1 className="text-black text-xs mb-0">Where HexCodes and Pokemon Collide</h1>
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" text-md me-auto">
            <Link className="nav-link text-white ms-6" to="/page1">
              Home
            </Link>
            <Link className="btn btn-primary" to="/profile"> 
              Create
            </Link>

            <NavDropdown title="Marketplace" id="basic-nav-dropdown" className="text-white ">
              <NavDropdown.Item href="#action/3.1">Top Listings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Saved Decks
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Your Cart
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="align-items-center">
            <Nav.Link className="text-white d-flex align-items-center">
              <span className="me-2">Signed in as:</span>
              <div
                className="profile-picture"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  marginRight: "5px"
                }}
              ></div>
              <a className="text-white" href="#login">PokemonLover4000</a>
            </Nav.Link>
            <Nav.Link className="text-white" onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
