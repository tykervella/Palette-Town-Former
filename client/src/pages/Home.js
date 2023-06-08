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
    <div className="">
      <Container>
        {/* start of dark mode toggle button */}
        <div class="toggle">
          <input type="checkbox" id="toggle" />
          <label for="toggle"></label>
        </div>

        {/* banner */}
        <Row>
          <Col className='banner-section border border-black rounded-xl p-16 m-2 bg-[#AFD7CA]'>
            <Row className='text-center'>
              {/* <h2 className='text-3xl font-bold text-white text-center'>Banner Section</h2> */}
            </Row>

            <Row className="float-right">
              {/* banner marketplace button */}
              <div id="container">
                <button className="learn-more">
                  <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                  </span>
                  <span className="button-text">Marketplace</span>
                </button>
              </div>
            </Row>

          </Col>
        </Row>

        {/* trending palettes/decks */}
        <Row>
          <Col className='border border-black rounded-xl bg-[#376D5B] p-10 m-2'>
            <h2 className='text-3xl font-bold text-white text-center mb-4'>Trending Palettes</h2>
            <div><TrendingPalettes /></div>
          </Col>
        </Row>

        {/* bottom row */}
        <Row>
          {/* caught decks */}
          <Col className='border border-black rounded-xl bg-[#376D5B] p-16 m-2 mb-4'>
            <h2 className='text-3xl font-bold text-white text-center'>Caught Decks</h2>
            <div><CaughtDecks /></div>
          </Col>
          {/* top card listings */}
          <Col className='border border-black rounded-xl bg-[#376D5B] p-16 m-2 mb-4'>
            <h2 className='text-3xl font-bold text-white text-center mb-4'>Today's Top Listings</h2>
            <div><TopListing /></div>
          </Col>
        </Row>

      </Container>
    </div>
  )
};

export default Home;

