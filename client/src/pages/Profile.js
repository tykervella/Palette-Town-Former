import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";

import likeButton from "./assets/pokeball-like.png";
import CircleImage from "./assets/profile-pic.webp";
import ProfileInfo from "../components/ProfileInfo";
import PaletteBox from "../components/PaletteBox";
import UpdateProfile from "../components/UpdateForm";
import Auth from "../utils/auth";

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

      function findDeckByDeckName(deckName) {
        const decks = user.decks;
        for (let i = 0; i < decks.length; i++) {
          if (decks[i].deckName === deckName) {
            return decks[i].cards;
          }
        }
        return null; // Return null if no matching deck is found
      }

      const postDeckCards = user.posts.map((post) =>
        findDeckByDeckName(post.deckName)
      );

      const updatePostsArr = () => {
        const newPostsArr = [];
        for (let i = 0; i < postsLength; i++) {
          const colors = user.posts[i];
          const images = postDeckCards[i];

          const newPost = [
            {
              title: colors.color1.substring(0, 7),
              image: images[0].cardImage || "#",
            },
            {
              title: colors.color2.substring(0, 7),
              image: images[1].cardImage || "#",
            },
            {
              title: colors.color3.substring(0, 7),
              image: images[2].cardImage || "#",
            },
            {
              title: colors.color4.substring(0, 7),
              image: images[3].cardImage || "#",
            },
            {
              title: colors.color1.substring(0, 7),
              image: images[4].cardImage || "#",
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
      <h2 className="mb-4 mt-4">Your Profile</h2>

      <div className="border border-[black] rounded-lg p-4 mb-8 bg-[#AFD7CA]">
        <Row>
          <Col md={6} className="border-right border-black pr-4">
            <ProfileInfo
              key={userId}
              name={name}
              username={user_name}
              bio={bio}
            />
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

      {postsArr.map((sectionData, index) => (
        <PaletteBox key={index} sectionData={sectionData} />
      ))}
      
      <div className="border border-black rounded-lg p-4 bg-[#AFD7CA] mb-4"></div>

      <div className="mt-4" style={{ paddingBottom: "50px" }}></div>
    </Container>
  );
};

export default Profile;
