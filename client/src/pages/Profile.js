import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";

import CircleImage from "./assets/profile-pic.webp";
import ProfileInfo from "../components/ProfileInfo";
import PaletteBox from "../components/PaletteBox";
import DeckPreview from "../components/DeckPreview";
import FeaturedListing from "../components/FeaturedListing";
// import UpdateProfile from "../components/UpdateForm";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [postsArr, setPostsArr] = useState([]);
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username: user_name },
  });

  useEffect(() => {
    if (data) {
      const user = data.user;
      const postsLength = user.posts.length;

      const updatePostsArr = () => {
        const newPostsArr = [];
        for (let i = 0; i < postsLength; i++) {
          const colors = user.posts[i];
          const images = user.posts[i];
          const postName = user.posts[i].postName; // Add postName
          const postOwner = user.posts[i].postOwner; // Add postkOwner
          const postId = user.posts[i]._id;

          const newPost = [
            {
              title: colors.color1,
              image: images.image1,
              postName: postName, // Pass postName
              postOwner: postOwner, // Pass postOwner
              postId: postId,
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
        setIsLoading(false); // Set isLoading to false once data is fetched
      };

      updatePostsArr();
    }
  }, [data]);

  if (loading || isLoading) {
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

  const userId = data.user._id;
  const name = data.user.name;
  const bio = data.user.bio;
  const user = data.user;

  return (
    <Container>
      <h2 className="mb-4 mt-4 text-[#0B3C49]">Your Profile</h2>
      <div className="p-4 mb-6 bg-[#4B957E] rounded-md">
        <Row className="border-4 border-[#FFEC99] rounded-md p-4">
          <Col md={7} lg={8} className="border-black pr-4">
            <ProfileInfo
              key={userId}
              name={name}
              username={user_name}
              bio={bio}
              className="text-white"
            />
          </Col>
          <Col md={5} lg={4} className="text-center">
            <div className="mt-10 d-flex flex-column align-items-center">
              <div className="w-52 h-50 bg-[#0B3C49] rounded-circle mb-3">
                <img
                  src={CircleImage}
                  alt="Profile Circle"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <button className="bg-[#FFEC99] text-xl text-[#0B3C49] py-1 px-3 rounded">
                Update Profile
              </button>
            </div>
          </Col>
        </Row>
      </div>

      <h2 className="mt-14 mb-4 text-[#0B3C49]">Your Palettes</h2>

      {postsArr.map((sectionData, index) => (
        <PaletteBox
          key={index}
          sectionData={sectionData}
          postName={sectionData[0].postName} // Pass postName to PaletteBox
          postOwner={sectionData[0].postOwner} // Pass postOwner to PaletteBox
          postId={sectionData[0].postId} // Pass postOwner to PaletteBox
        />
      ))}

      <Row>
        <Col md={6}>
          <h2 className="text-[#0B3C49] mb-4 mt-4">Your Decks</h2>
          {postsArr.map((sectionData, index) => (
            <DeckPreview
              key={index}
              sectionData={sectionData}
              postName={sectionData[0].postName} // Pass postName to DeckPreview
              postOwner={sectionData[0].postOwner} // Pass postOwner to DeckPreview
            />
          ))}
        </Col>
        <Col md={6}>
          <h2 className="text-[#0B3C49] mt-4 mb-4">Your Listings</h2>
          {postsArr.map((sectionData, index) => (
            <FeaturedListing
              key={index}
              sectionData={sectionData}
              postName={sectionData[0].postName} // Pass postName to FeaturedListing
              postOwner={sectionData[0].postOwner} // Pass postOwner to FeaturedListing
            />
          ))}
        </Col>
      </Row>

      <div className="mt-4" style={{ paddingBottom: "50px" }}></div>
    </Container>
  );
};

export default Profile;
