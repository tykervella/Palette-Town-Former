import React from 'react';
import { useQuery } from '@apollo/client';

import TrendingPalettes from '../components/TrendingPalettes';
import CaughtDecks from '../components/CaughtDecks';
import TopListing from '../components/TopListing';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  return (
    // primary container for entire page
    <div>
    <Container className=''>

      {/* banner */}
      <Row>
        <Col xs='auto' className='border border-black rounded-xl bg-red-200 p-16 m-2'>
          <Row className='text-center'>
              <h2 className='text-3xl font-bold text-white'>Banner Section</h2>
          </Row>

          <Row className='float-right'>
            <button className='border border-black rounded-xl bg-red-400 p-1'>Go To MarketPlace</button>
          </Row>
        </Col>
      </Row>

      {/* trending palettes/decks */}
      <Row>
        <Col xs='auto' className='border border-black rounded-xl bg-slate-400 m-2'>
          <h2 className='text-3xl font-bold text-white text-center'>Trending Palettes</h2>
            <div><TrendingPalettes /></div>
        </Col>
      </Row>

      {/* bottom row */}
      <Row>
        {/* caught decks */}
        <Col xs="auto" className='border border-black rounded-xl bg-slate-400 p-16 m-2'>
          <h2 className='text-3xl font-bold text-white text-center'>Caught Decks</h2>
            <div><CaughtDecks/></div>
            
        </Col>
        {/* top card listings */}
        <Col xs="3" className='border border-black rounded-xl bg-slate-400 p-16 m-2'>
          <h2 className='text-3xl font-bold text-white text-center'>Today's Top Listings</h2>
            <div><TopListing/></div>
        </Col>
      </Row>

    </Container>
  </div>
  )
};

export default Home;

