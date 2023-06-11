import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import Auth from '../utils/auth';
import {  useParams } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_POST, GET_DECK_FOR_POST } from "../utils/queries";

import DeckElement from '../components/DeckElement';



const Post = () => {
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;

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
    <Container className="">
      <Row>
        <Col xs={12} className='bg-[#AFD7CA] text-center rounded'>
          <h1 className=''>{postName}</h1>
          <p>{postText}fasfsafsafsafsafsafasafsa</p>
        </Col>
      </Row>

      <Row>
        <Col xs={8}>
          {/* Deck listings */}
          <Row className="flex-row justify-content-center">
            {decklist.map((card) => (
              <Col key={card.cardId} xs={6} md={4} lg={2} className="bg-[#0B3C49] rounded shadow-lg m-2 mb-4 mt-4 text-white">
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
        </Col>

        <Col xs={4}>
          {/* Color Palettes */}
          <Row className="rounded-lg">
            {colors.map((color, index) => (
              <Col
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={2}
                className=''>

                <div className="mt-4 p-4 card" style={{ backgroundColor: color }}>
                  <h3 className="text-center sm:text-black">{color}</h3>
                </div>

              </Col>
            ))}
          </Row>

          <Row className="flex-row justify-content-center rounded bg-[#AFD7CA] p-2 mt-4">
            <ul className='text-2xl'>Users who caught this post</ul>
            <li className="ml-10">asjkldglajwedg</li>
            <li className="ml-10">asjkldglajwedg</li>
            <li className="ml-10">asjkldglajwedg</li>
          </Row>

        </Col>
      </Row>
    </Container>

  );

};

export default Post;
