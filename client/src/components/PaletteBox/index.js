import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import likeButton from '../TrendingPalettes/assets/pokeball-like.png';

function PaletteBox({ sectionData, postName, postOwner }) {
  return (
    <Row className="flex-wrap border border-black rounded-lg bg-[#FFFFF7]">
  {sectionData.map((item, index) => (
    <Col key={index} xs={12} sm={6} md={4} lg={2} className={` mb-4 ${index !== sectionData.length - 1 ? 'pr-0' : ''} ${index !== 0 ? '-ml-6' : ''}`}>
      <div className=" mt-4 p-4" style={{ backgroundColor: item.title }}>
        <img src={item.image} alt={item.title} className="w-full" style={{ marginBottom: '-1rem' }} />
        <h3 className="mt-4 mb-0 text-white text-center sm:text-black">{item.title}</h3>
      </div>
    </Col>
      ))}

      <Col>
        <div className="rounded-lg mt-16 border bg-[#0B3C49] border-black p-4">
          <h4 className="mt-2 text-lg font-semibold text-center text-white sm:text-black">
            {postName}
          </h4>
          <p className="text-sm text-center text-white sm:text-black">@{postOwner}</p>
          <div className="flex items-center justify-center flex-col sm:flex-row">
            <Button className="bg-[#0B3C49] text-xs text-[#0B3C49] py-1 px-2 mt-4 sm:mt-0 sm:ml-4 rounded">
              View Post
            </Button>
            <a href="#" className="text-red-500 text-2xl ml-0 mt-4 sm:mt-0 sm:ml-4">
              <img
                src={likeButton}
                alt="Like"
                style={{ width: "30px", height: "auto" }}
              />
            </a>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default PaletteBox;



