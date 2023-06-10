import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_TOP_POSTS } from "../utils/queries";
import Auth from "../utils/auth";


import PaletteBox from "../components/PaletteBox";
// import TrendingPalettes from "../components/TrendingPalettes";
import CaughtDecks from "../components/CaughtDecks";
import TopListing from "../components/TopListing";


const Home = () => {

  const [postsArr, setPostsArr] = useState([]);
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;

  const { loading, error, data } = useQuery(GET_TOP_POSTS);

  useEffect(() => {
    if (data) {
      console.log(data)
      const postsLength = data.posts.length;

      const updatePostsArr = () => {
        const newPostsArr = [];
        for (let i = 0; i < postsLength; i++) {
          const colors = data.posts[i];
          const images = data.posts[i];
          const postName = data.posts[i].postName; // Add postName
          const postOwner = data.posts[i].postOwner; // Add postkOwner

          const newPost = [
            {
              title: colors.color1,
              image: images.image1,
              postName: postName, // Pass postName
              postOwner: postOwner, // Pass postOwner
            },
            {
              title: colors.color2,
              image: images.image2,
            },
            {
              title: colors.color3,
              image: images.image3,
            },
            {
              title: colors.color4,
              image: images.image4,
            },
            {
              title: colors.color5,
              image: images.image5,
            },
          ];
          newPostsArr.push(newPost);
        }
        setPostsArr(newPostsArr);
      };

      updatePostsArr();
    }
  }, [data]);

  if (loading)  {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    console.log(error);
    return <div>Error loading profile</div>;
  }

  // const userId = data.user._id;
  // const name = data.user.name;
  // const bio = data.user.bio;
  // const user = data.user;


  return (
    <div className="">
      <Container>
        {/* start of dark mode toggle button */}
        {/* <div class="toggle">
          <input type="checkbox" id="toggle" className="hidden" />
          <label for="toggle"></label>
        </div> */}

        {/* banner */}
        <Row>
          <Col className="banner-section shadow-lg rounded-xl p-20 m-2 bg-[#AFD7CA]">
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
        <h2 className="text-[#0B3C49] mb-6">Your Pallets</h2>
                <Row>
          <Col>
            <div>
            <h2 className="text-[#0B3C49] mb-6">Trending Palettes</h2>

            {postsArr.map((sectionData, index) => (
              <PaletteBox
                key={index}
                sectionData={sectionData}
                postName={sectionData[0].postName} // Pass postName to PaletteBox
                postOwner={sectionData[0].postOwner} // Pass postOwner to PaletteBox
        />
      ))}
            </div>
          </Col>
        </Row>

        {/* bottom row */}
        <div className="mt-8 d-flex flex-wrap"> {/* Added flex-wrap */}
          {/* caught decks */}
          <Col md={7} className="mb-4">
            <h2 className="text-[#0B3C49] mb-6">Caught Decks</h2>
            <div className="border border-black rounded-xl bg-[#0B3C49] p-16 m-2">
              <CaughtDecks />
            </div>
          </Col>
          <Col md={5}>
            {/* top listings decks */}
            <h2 className="text-[#0B3C49] mb-6">Highest Value Listing</h2>
            <div className="border border-black rounded-xl bg-[#0B3C49] p-12 m-4">
              <TopListing />
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default Home;