import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import logo from "../Navbar/assets/pallet-town-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import decode from 'jwt-decode';

const CustomNavbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const token = Auth.getToken();
  const username = token ? Auth.getProfile().data.username : null;


  return (
    <Navbar variant="dark" expand="lg" className="text-white mb-4 py-3 custom-navbar" style={{ backgroundColor: '#AFD7CA' }}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-md me-auto align-items-center">
            <Link className="nav-link text-white me-4" to="/">
              Home
            </Link>
            <Link to="#" style={{ textDecoration: 'none' }}>
              <span className="nav-link text-white me-4">
                Create
              </span>
            </Link>

            <NavDropdown title="Marketplace" id="basic-nav-dropdown" className="text-white me-4">
              <NavDropdown.Item href="/marketplace">Top Listings</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Saved Decks
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Your Cart
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Navbar.Brand className="text-center flex-grow-1">
            <Link className="text-white d-inline-block" to="/" style={{ textDecoration: 'none' }}>
              <img
                src={logo}
                alt="Logo"
                className="h-66 w-auto d-inline-block align-top"
                style={{ marginBottom: "0px" }}
              />
            </Link>
          </Navbar.Brand>

          <Nav className="align-items-center ms-auto">
            <Nav.Link className="text-white d-flex align-items-center me-4">
              {token && (
                <>
                  <span className="me-2">Signed in as:</span>
                  {/* {profileIMG && (
                    <div
                      className="profile-picture"
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        backgroundImage: `url(${profileIMG})`,
                        backgroundSize: "cover",
                        marginRight: "5px"
                      }}
                    ></div>
                  )} */}
                  <a className="text-white" href="/Profile">{username}</a>
                </>
              )}
              {!token && (
                <Link className="text-white" to="/login">Login</Link>
              )}
            </Nav.Link>
            {token && (
              <Nav.Link className="text-white" onClick={logout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
