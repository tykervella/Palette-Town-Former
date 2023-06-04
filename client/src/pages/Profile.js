import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import likeButton from "./assets/pokeball-like.png";
import { SliderData } from "./assets/SliderData";

const Profile = () => {
  const firstSectionData = SliderData.slice(0, 5);
  const secondSectionData = SliderData.slice(0, 5);

  return (
    <Container>
      <div className="border border-black p-4">
        <Row>
          <Col md={6} className="border-right border-black pr-4">
            <Form className="text-white">
              <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" id="name" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" id="username" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Bio:</Form.Label>
                <Form.Control as="textarea" id="bio" rows={4} />
              </Form.Group>
            </Form>
          </Col>
          <Col md={6} className="text-center">
            <div className="w-24 h-24 rounded-circle bg-red-500"></div>
          </Col>
        </Row>
      </div>



    
      <div className="border border-black rounded-lg p-2 mb-4">
        <Row className="flex-wrap">
          {firstSectionData.map((item, index) => (
            <Col key={index} xs={6} sm={4} md={3}>
              <div>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} />
              </div>
            </Col>
          ))}
          <Col sm={12} md={3}>
            <div className="bg-gray-200 p-4">
              <div className="text-center">
                <h4 className="mt-4 text-lg font-semibold">Deck Name</h4>
                <p className="text-sm">@username</p>
                <div className="flex items-center justify-center">
                  <Button className="bg-blue-500 text-xs text-white py-1 px-3 mt-2 rounded">
                    View Deck
                  </Button>
                  <a href="#" className="text-red-500 text-2xl ml-4">
                    <img
                      src={likeButton}
                      alt="Like"
                      style={{ width: "40px", height: "auto" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="border border-black rounded-lg p-2">
        <Row className="flex-wrap">
          {secondSectionData.map((item, index) => (
            <Col key={index} xs={6} sm={4} md={3}>
              <div>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} />
              </div>
            </Col>
          ))}
          <Col sm={12} md={3}>
            <div className="bg-gray-200 p-4">
              <div className="text-center">
                <h4 className="mt-4 text-lg font-semibold">Deck Name</h4>
                <p className="text-sm">@username</p>
                <div className="flex items-center justify-center">


                          <Button className="bg-blue-500 text-xs text-white py-1 px-3 mt-2 rounded">
                            View Deck
                            </Button>
                  <a href="#" className="text-red-500 text-2xl ml-4">
                    <img
                      src={likeButton}
                      alt="Like"
                      style={{ width: "40px", height: "auto" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Profile;


