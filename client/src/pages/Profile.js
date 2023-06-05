// import React from "react";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import likeButton from "./assets/pokeball-like.png";
// import { SliderData } from "./assets/SliderData";
import CircleImage from "./assets/profile-pic.webp";

const Profile = () => {
  const firstSectionData = [
    {
      title: "#FFFFFF",
      image:
        "https://assets.pokemon.com/assets//cms2/img/trading-card-game/series/incrementals/pokemon-trading-card-game-classic/inline/full/01.png",
    },
    {
      title: "#FFFFFF",
      image:
        "https://tcg.pokemon.com/assets/img/expansions/tcg-go/cards/en-us/POGO_EN_1-2x.jpg",
    },
    {
      title: "#FFFFFF",
      image: "https://www.bbtoystore.com/mm5/pokemon/PK_S09_NG_u080.jpg",
    },
    {
      title: "#FFFFFF",
      image:
        "https://cdn.shopify.com/s/files/1/0634/7194/3915/products/87a24098-58f1-4a05-b4cc-768cffe0008c_4b3e66b9-87a5-4b7e-9598-d0fa1d67b5a0_600x.png?v=1680792150",
    },
    {
      title: "#FFFFFF",
      image:
        "https://www.playbite.com/wp-content/uploads/2022/09/en_US-XY10-078-lugia-1200x1674.jpg",
    },
  ];

  const secondSectionData = [
    {
      title: "#FFFFFF",
      image: "https://i.ebayimg.com/images/g/O3QAAOSweU9jrt4a/s-l1600.png",
    },
    {
      title: "#FFFFFF",
      image:
        "https://cdn.shopify.com/s/files/1/1952/7119/products/041354_P_ARUSEUSUV.jpg?v=1657175625&width=2048",
    },
    {
      title: "#FFFFFF",
      image: "https://product-images.tcgplayer.com/274436.jpg",
    },
    {
      title: "#FFFFFF",
      image:
        "https://www.codewithmike.com/wp-content/uploads/2022/09/buy-this-charizard.jpg",
    },
    {
      title: "#FFFFFF",
      image:
        "https://www.codewithmike.com/wp-content/uploads/2022/10/the-best-investment-pokemon-cards-in-2022.jpg",
    },
  ];

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleBioChange = (e) => {
    const inputBio = e.target.value;
    if (inputBio.length <= 500) {
      setBio(inputBio);
    }
  };

  return (
    <Container>
      <h2 className="mb-4 mt-4 ">Your Profile</h2>

      <div className="border border-black p-4">
        <Row>
          <Col md={6} className="border-right border-black pr-4">
            <Form className="text-black">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  id="bio"
                  rows={4}
                  placeholder="Bio"
                  value={bio}
                  onChange={handleBioChange}
                />
                <p className="text-muted mt-2">{bio.length}/500</p>
              </Form.Group>
            </Form>
          </Col>
          <Col md={6} className="text-center">
            <div className="d-flex flex-column align-items-center">
              <div className="w-48 h-48 bg-red-500 rounded-circle mb-3">
                <img
                  src={CircleImage}
                  alt="Profile Circle"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <Button className="bg-blue-500 text-xs text-white py-1 px-3 rounded">
                Update Profile
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <h2 className="mt-14 mb-4">Your Pallets</h2>

      <div className="border border-black rounded-lg p-4 mb-8">
        <Row className="flex-wrap">
          {firstSectionData.map((item, index) => (
            <Col key={index} xs={6} sm={4} md={2} className="mb-4">
              <div className="border border-black p-4">
                <img src={item.image} alt={item.title} />
                <h3 className="mt-4 mb-0">{item.title}</h3>
              </div>
            </Col>
          ))}
          <Col
            xs={6}
            sm={4}
            md={2}
            className="mb-4 bg-gray-200 border border-black p-4"
          >
            {/* <div className="border border-black p-4"> */}
            <h4 className="mt-2 text-lg font-semibold text-center">
              Deck Name
            </h4>
            <p className="text-sm text-center">@username</p>
            <div className="flex items-center justify-center">
              <Button className="bg-blue-500 text-xs text-white py-1 px-2 mt-16 rounded">
                View Deck
              </Button>
              <a href="#" className="text-red-500 text-2xl ml-4 mt-16">
                <img
                  src={likeButton}
                  alt="Like"
                  style={{ width: "30px", height: "auto" }}
                />
              </a>
            </div>
            {/* </div> */}
          </Col>
        </Row>
      </div>

      <div className="border border-black rounded-lg p-4">
        <Row className="flex-wrap">
          {secondSectionData.map((item, index) => (
            <Col key={index} xs={6} sm={4} md={2} className="mb-4">
              <div className="border border-black p-4">
                <img src={item.image} alt={item.title} />
                <h3 className="mt-4 mb-0">{item.title}</h3>
              </div>
            </Col>
          ))}
          <Col
            xs={6}
            sm={4}
            md={2}
            className="mb-4 bg-gray-200 border border-black p-4"
          >
            {/* <div className="border border-black p-4"> */}
            <h4 className="mt-2 text-lg font-semibold text-center">
              Deck Name
            </h4>
            <p className="text-sm text-center">@username</p>
            <div className="flex items-center justify-center">
              <Button className="bg-blue-500 text-xs text-white py-1 px-2 mt-16 rounded">
                View Deck
              </Button>
              <a href="#" className="text-red-500 text-2xl ml-4 mt-16">
                <img
                  src={likeButton}
                  alt="Like"
                  style={{ width: "30px", height: "auto" }}
                />
              </a>
            </div>
            {/* </div> */}
          </Col>
        </Row>
      </div>

      <div className="mt-4" style={{ paddingBottom: "50px" }}></div>
    </Container>
  );
};

export default Profile;
