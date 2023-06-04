import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SliderData } from "./SliderData";

import likeButton from "../TrendingPalettes/assets/pokeball-like.png";

const TrendingPalettes = () => {
  const firstSectionData = SliderData.slice(0, 5);
  const secondSectionData = SliderData.slice(5, 10);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="mt-8 mb-4 text-xl font-bold text-left px-2">
          Trending Palettes
        </h2>
        <div className="bg-black p-1">
          <div className="border border-black rounded-lg">
            <Container className="bg-white p-4 px-4">
              <div className="border-black border-2 rounded-lg p-2 mb-4">
                <Row className="flex-wrap">
                  <Col sm={12} md={9} className="mb-4 md:mb-0">
                    <Row className="flex-wrap">
                      {firstSectionData.map((item, index) => (
                        <Col key={index} sm={6} md={2}>
                          <div>
                            <h3>{item.title}</h3>
                            <img src={item.image} alt={item.title} />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col sm={12} md={3}>
                    <div className="bg-gray-200 p-4">
                      <div className="text-center">
                        <h4 className="mt-4 text-lg font-semibold">
                          Deck Name
                        </h4>
                        <p className="text-sm">@username</p>
                        <div className="flex items-center justify-center">
                          <button className="bg-blue-500 text-xs text-white py-1 px-3 mt-2 rounded">
                            View Deck
                          </button>
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

              <div className="border-black border-2 rounded-lg p-2">
                <Row className="flex-wrap">
                  <Col sm={12} md={9} className="mb-4 md:mb-0">
                    <Row className="flex-wrap">
                      {secondSectionData.map((item, index) => (
                        <Col key={index} sm={6} md={2}>
                          <div>
                            <h3>{item.title}</h3>
                            <img src={item.image} alt={item.title} />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col sm={12} md={3}>
                    <div className="bg-gray-200 p-4">
                      <div className="text-center">
                        <h4 className="mt-4 text-lg font-semibold">
                          Deck Name
                        </h4>
                        <p className="text-sm">@username</p>
                        <div className="flex items-center justify-center">
                          <button className="bg-blue-500 text-xs text-white py-1 px-3 mt-2 rounded">
                            View Deck
                          </button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPalettes;
