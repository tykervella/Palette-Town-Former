import React from "react";
import { useQuery } from "@apollo/client";

import TrendingPalettes from "../components/TrendingPalettes";
import CaughtDecks from "../components/CaughtDecks";
import TopListing from "../components/TopListing";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <div className="">
      <Container>
        {/* start of dark mode toggle button */}
        <div className="toggle">
          <input type="checkbox" id="toggle" />
          <label htmlFor="toggle"></label>
        </div>

        {/* banner */}
        <Row>
          <Col className="banner-section border border-black rounded-xl p-16 m-2 bg-[#AFD7CA]">
            <Row className="text-center"></Row>

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

        {/* trending palettes */}
        <Row>
          <Col>
            <div>
              <TrendingPalettes />
            </div>
          </Col>
        </Row>

        {/* bottom row */}
        <div className="d-flex align-items-stretch"> 
          {/* caught decks */}
          <Col md={7}>
            <h2 className="text-black mb-6">Caught Decks</h2>
            <div className="border border-black rounded-xl bg-[#376D5B] p-16 m-2 mb-4">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CaughtDecks />
              </div>
            </div>
          </Col>
          <Col md={5}>
            {/* top listings decks */}
            <h2 className="text-black mb-6">Today's Top Listing</h2>
            <div className="border border-black rounded-xl bg-[#376D5B] p-16 m-2 mb-4">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <TopListing />
              </div>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default Home;
