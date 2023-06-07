import React from 'react';
import ImageSlider from '../ImagesSlider';
import { SliderData } from '../SliderData';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TopListings = () => {
  return (
    <Container>
        <h2 className="text-black mb-4 mt-4">Today's Top Listings</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <ImageSlider slides={SliderData} />
        </Col>
      </Row>
    </Container>
  );
}

export default TopListings;
