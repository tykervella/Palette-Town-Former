import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import likeButton from '../TrendingPalettes/assets/pokeball-like.png';

function PaletteBox({ sectionData, postName, postOwner, postId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <Container>
      <div className="rounded-lg p-2 mt-4 bg-[#F6F6F6]">
      <div className="flex flex-wrap mb-4 mt-4">
        {sectionData.map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={2}>
            <div className="p-4 transition-transform duration-300 transform-gpu hover:scale-105" style={{ backgroundColor: item.title }}>
              <img src={item.image} alt={item.title} className="w-full mb-2" />
              <h3 className="mb-0 text-[#4B957E] text-center">{item.title}</h3>
            </div>
          </Col>
        ))}
        <Col xs={12} sm={6} md={4} lg={2}>
          <div className="mt-8 ml-4 bg-[#4B957E] rounded-lg p-3 h-60 flex flex-col justify-between">
            <div className="mt-2 border-4 border-[#FFEC99] rounded-lg p-4 flex flex-col">
              <h4 className="mb-2 text-sm font-semibold text-center text-white sm:text-black truncate">
                {postName}
              </h4>
              <p className="mb-4 text-sm text-center text-white sm:text-black">@{postOwner}</p>
              <div className="flex justify-between items-center">
                <button className="mb-2 bg-[#FFEC99] text-sm text-black py-1 px-2 rounded" onClick={handleClick}>
                  View Post
                </button>
                <a href="#" className="text-red-500 text-2xl ml-2">
                  <img
                    src={likeButton}
                    alt="Like"
                    className="w-6 h-6"
                  />
                </a>
              </div>
            </div>
          </div>
        </Col>
      </div>
      </div>
    </Container>
  );
}

export default PaletteBox;





