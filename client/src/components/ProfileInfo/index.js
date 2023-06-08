import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function ProfileInfo({ key, name, username, bio }) {

  return (
    <Container key={key} className="text-black">
      <Row className="mb-3" key={name}>
        <Col>
          <h5>Name:</h5>
          <p>{name}</p>
        </Col>
      </Row>
      <Row className="mb-3" key={username}>
        <Col>
          <h5>Username:</h5>
          <p>{username}</p>
        </Col>
      </Row>
      <Row className="mb-3" key={bio}>
        <Col>
          <h5>Bio:</h5>
          <p>{bio}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileInfo;
