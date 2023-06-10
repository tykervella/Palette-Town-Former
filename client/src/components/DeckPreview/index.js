import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function DeckPreview({ sectionData }) {
  return (
    <Container className="border border-black rounded-lg bg-white">
      <Row className="flex-wrap">
        {sectionData.slice(0, 3).map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <div className="rounded-lg mt-4 border p-4" style={{ backgroundColor: item.title }}>
              <img src={item.image} alt={item.title} />
              <h3 className="mt-4 mb-0 text-white text-center sm:text-black">{item.title}</h3>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DeckPreview;

