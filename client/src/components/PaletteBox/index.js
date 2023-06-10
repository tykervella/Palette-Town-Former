import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import likeButton from '../TrendingPalettes/assets/pokeball-like.png';


function PaletteBox({ key, sectionData, postName, postOwner }) {
  console.log(sectionData);

  return (
    <Row className="flex-wrap border border-black rounded-lg bg-[#376D5B] ">
      {sectionData.map((item, index) => (
        <Col key={index} xs={6} sm={4} md={2} className="mb-4">
          <div className="border border-black p-4" style={{ backgroundColor: item.title }}>
            <img src={item.image} alt={item.title} />
            <h3 className="mt-4 mb-0 text-white sm:text-black">{item.title}</h3>
          </div>
        </Col>
      ))}

      <Col>
        <div className="border border-black p-4">
          <h4 className="mt-2 text-lg font-semibold text-center text-white sm:text-black">
            {postName}
          </h4>
          <p className="text-sm text-center text-white sm:text-black">@{postOwner}</p>
          <div className="flex items-center justify-center flex-col sm:flex-row">
            <Button className="bg-blue-500 text-xs text-white py-1 px-2 mt-4 sm:mt-0 sm:ml-4 rounded">
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
