import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Auth from '../utils/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_DECK } from "../utils/queries";

import DeckElement from '../components/DeckElement';

const Post = () => {
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();

  const { _id } = useParams();
  const [decklist, setDecklist] = useState([]);

  const { loading: deckLoading, error: deckError, data: deckData } = useQuery(GET_DECK, { variables: { deckId: _id } });

  useEffect(() => {
    if (deckData && deckData.deck) {
      const cardList = deckData.deck.cards.map((card) => ({
        cardName: card.cardName,
        cardIMG: card.cardImage,
        cardType: card.cardType,
        quantity: card.quantity,
        cardId: card.cardId
      }));
      setDecklist(cardList);
    }
  }, [deckData]);

  if (deckLoading) {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (deckError) {
    console.log(deckError);
    return <div>Error loading deck</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4 mx-auto flex-row mt-4 px-4 mb-4 border-2 border-red-700 bg-white">
        <h1>{deckData.deck.deckName}</h1>


        <div className="grid grid-cols-12 gap-4 mx-auto flex-row mt-4 px-4 mb-4 border-2 border-red-700 bg-white">
          {/* Render the decklist */}
          {decklist.map((card) => (
            <DeckElement
              key={card.cardId}
              deckId={_id}
              cardId={card.cardId}
              cardImage={card.cardIMG}
              cardName={card.cardName}
              superType={card.superType}
              quantity={card.quantity}
              counter={false}
            />
          ))}
        </div>

        <p>{deckData.deck.}</p>
      
    </div>
  );
};

export default Post;
