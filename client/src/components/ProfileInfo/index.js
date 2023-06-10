import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function ProfileInfo({ key, name, username, bio }) {

  return (
    <Container key={key} className="text-white">
      <Row className="mb-3" key={name}>
        <Col>
          <h5>Name:</h5>
          <p className="p-1 text-black bg-white">{name}</p>
        </Col>
      </Row>
      <Row className="text-white mb-3" key={username}>
        <Col>
          <h5>Username:</h5>
          <p className="p-1 text-black bg-white">{username}</p>
        </Col>
      </Row>
      <Row className="mb-3" key={bio}>
        <Col>
          <h5>Bio:</h5>
          <p className="p-1 text-black bg-white">{bio}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileInfo;

