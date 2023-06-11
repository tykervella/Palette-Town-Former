import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Auth from '../utils/auth';
import { useNavigate, useParams } from 'react-router-dom';
import {  useQuery, useApolloClient } from '@apollo/client';
import { GET_POST, GET_DECK_FOR_POST } from "../utils/queries";

import DeckElement from '../components/DeckElement';



const Post = () => {
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();

  const { _id } = useParams();
  const [decklist, setDecklist] = useState([]);
  const [deckName, setDeckName] = useState();
  const [captureCount, setCaptureCount] = useState(null);
  const [colors, setColors] = useState([]);
  const [postName, setPostName] = useState("");
  const [postOwner, setPostOwner] = useState("");
  const [postText, setPostText] = useState("");
  const [caughtUsers, setCaughtUsers] = useState([]);

  const { loading: postLoading, error: postError, data: postData } = useQuery(GET_POST, { variables: { postId: _id } });

  const client = useApolloClient(); //

  const fetchDeckData = async () => {
    if (deckName) {
      console.log("loaded", deckName)
      try {
        const { data } = await client.query({
          query: GET_DECK_FOR_POST,
          variables: { deckName: deckName },
        });
        console.log(data)
        const cardList = data.deckForPost.cards.map((card) => ({
          cardName: card.cardName,
          cardIMG: card.cardImage,
          cardType: card.cardType,
          quantity: card.quantity,
          cardId: card.cardId
        }));
        setDecklist(cardList);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (postData && postData.post) {
      setCaptureCount(postData.post.captureCount);
      setColors([postData.post.color1, postData.post.color2, postData.post.color3, postData.post.color4, postData.post.color5]);
      setDeckName(postData.post.deckName); // deckName is already being set
      setPostName(postData.post.postName);
      setPostOwner(postData.post.postOwner);
      setPostText(postData.post.postText);
      setCaughtUsers(postData.post.caughtUsers);
    }
  }, [postData]);

  useEffect(() => {
    fetchDeckData();
  }, [deckName]);

  if (postLoading) {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (postError) {
    console.log(postError);
    return <div>Error loading post</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4 mx-auto flex-row mt-4 px-4 mb-4 border-2 border-red-700 bg-white">
      <h1>{postName}</h1>
  
      {/* Color Palettes  */}
      <Row className="flex-wrap border border-black rounded-lg bg-[#FFFFF7]">
        {colors.map((color, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={2}
            className={`mb-4 ${index !== colors.length - 1 ? 'pr-0' : ''} ${index !== 0 ? '-ml-6' : ''}`}
          >
            <div className="mt-4 p-4" style={{ backgroundColor: color }}>
              <h3 className="mt-4 mb-0 text-white text-center sm:text-black">{color}</h3>
            </div>
          </Col>
        ))}
      </Row>
  
      {/* deck listings */}
      <Row className="flex-row justify-content-center">
        {decklist.map((card) => (
          <Col key={card.cardId} xs={6} md={4} lg={2} className="">
            <DeckElement
              deckId={_id}
              cardId={card.cardId}
              cardImage={card.cardIMG}
              cardName={card.cardName}
              superType={card.superType}
              quantity={card.quantity}
              counter={false}
            />
          </Col>
        ))}
      </Row>

      <Row className="flex-row justify-content-center">
        Post Text: 
        {postText}
      </ Row>

      <Row className="flex-row justify-content-center">
        <ul>Users who caught this post</ul>
          <li>asjkldglajwedg</li>
          <li>asjkldglajwedg</li>
          <li>asjkldglajwedg</li>
      </Row>

    </div>
  );
  
};

export default Post;
