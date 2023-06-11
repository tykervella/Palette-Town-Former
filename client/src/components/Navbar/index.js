import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import logo from "../Navbar/assets/pallet-town-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Modal } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";



const CustomNavbar = () => {
  const [showCartModal, setShowCartModal] = useState(false);

  const handleCartModalClose = () => setShowCartModal(false);
  const handleCartModalShow = () => setShowCartModal(true);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const token = Auth.getToken();
  const username = token ? Auth.getProfile().data.username : null;

  // checks if user is logged in and if not, sends them to login page.
  // if user is logged in, then it sends them to the endpoint passed as a parameter to the function
  const checkStatus = (endpoint) => {
    return token ? `${endpoint}` : "/login";
  };

  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        className="text-white mb-4 py-3 custom-navbar"
        style={{ backgroundColor: "#AFD7CA" }}
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-md me-auto align-items-center">
              <Link className="nav-link text-white me-4" to="/">
                Home
              </Link>

              <NavDropdown title="Create" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={checkStatus("deck/create")}>
                  Create Deck
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={checkStatus("listing/create")}>
                  Create Listing
                </NavDropdown.Item>
              </NavDropdown>
              
              <Link to={checkStatus("marketplace")} style={{ textDecoration: "none" }}>
                <span className="nav-link text-white me-4">Marketplace</span>
              </Link>
            </Nav>

            <Navbar.Brand className="text-center flex-grow-1">
              <Link className="text-white d-inline-block" to="/" style={{ textDecoration: "none" }}>
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
                    <span className="me-2">Signed in as:</span>
                    <Link className="text-white" to="/profile">
                      {username}
                    </Link>
                  </>
                )}
                                {!token && <Link className="text-white" to="/login">Login</Link>}
              </Nav.Link>
              {token && (
                <Nav.Link className="text-white" onClick={logout}>
                  Logout
                </Nav.Link>
              )}
              {token && (
                <Nav.Link className="text-white" onClick={handleCartModalShow}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showCartModal} onHide={handleCartModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your cart content here */}
          <Row className="mb-3">
            <Col md={3}>
              <img src="item-image.jpg" alt="Item" className="img-fluid" />
            </Col>
            <Col md={6}>
              <div>Item Name</div>
              <div>$10.00</div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}>
              <img src="item-image.jpg" alt="Item" className="img-fluid" />
            </Col>
            <Col md={6}>
              <div>Item Name</div>
              <div>$20.00</div>
            </Col>
          </Row>
          <Row>
            <Col md={{ offset: 9, span: 3 }}>
              <div className="text-end">Total: $30.00</div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCartModalClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomNavbar;
