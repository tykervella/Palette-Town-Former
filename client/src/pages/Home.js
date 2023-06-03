import React from 'react';
import { useQuery } from '@apollo/client';

import FeaturedDeck from '../components/FeaturedDeck';
import TrendingPalettes from '../components/TrendingPalettes';
import CaughtDecks from '../components/CaughtDecks';
import TopListing from '../components/TopListing';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ImageSlider from '../components/ImagesSlider';
import { SliderData } from '../components/SliderData';


import banner from "../assets/pokemon.paint.banner.noBG.png"


const Home = () => {
  return (
    // primary container for entire page
    <Container>
      {/* banner */}
      
      <ImageSlider slides={SliderData} />

      
    </Container>
  )
};

export default Home;

