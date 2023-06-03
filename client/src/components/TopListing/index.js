import React from 'react';
import ImageSlider from '../ImagesSlider';
import { SliderData } from '../SliderData';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TopListings = () => {
    return (
        <Container>
            <ImageSlider slides={SliderData} />
        </Container>
    )
}


export default TopListings;