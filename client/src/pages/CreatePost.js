import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Auth from '../utils/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_DECK_NAME, ADD_POST } from '../utils/mutations';
import { GET_DECK } from "../utils/queries";

const CreatePost = () => {
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;
  // const navigate = useNavigate();
  const { _id } = useParams();
  const [name, setName] = useState("");
  const [decklist, setDecklist] = useState([]);


  
  const handleNameChange = (e) => {
    const inputName = e.target.value;
    if (inputName.length <= 30) {
      setName(inputName);
    } else {
      alert("Deck Names must be 30 characters or shorter!");
    }
  };

  const { loading, error, data} = useQuery(GET_DECK, { variables: { deckId: _id } });
  
  useEffect(() => {
    if (data && data.deck) {
      const decklistFromData = data.deck.cards.map((card) => ({
        cardId: card.cardId,
        image: card.cardImage,
        cardName: card.cardName,
        quantity: card.quantity,
        superType: card.superType,
      }));
      setDecklist(decklistFromData);
    }
  }, [data, _id]);
  
  
  console.log(data)

  // const [addPost, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(ADD_POST);


  // const handleAddPost = async () => {
  //   try {
  //     const response = await addPost({ variables: { deckOwner: user_name, deckName: name } });
  //     const newPost = response.data.addDeck._id;
  //     console.log(newPost)
  //     ;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // if (deckLoading) {
  //   return (
  //     <Container>
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </Container>
  //   );
  // }

  // if (deckError) {
  //   console.log(deckError);
  //   return <div>Error loading deck</div>;
  // }

  return (
    <div className="grid grid-cols-12 gap-4 mx-auto flex-row mt-4 px-4 mb-4 border-2 border-red-700 bg-white">
      <Form className="text-black mx-auto">
        <Form.Group className="mb-3 mt-3 mx-auto">
          <Form.Control
            type="text"
            id="name"
            placeholder="Deck Name"
            value={name}
            onChange={handleNameChange}
            style={{ width: '300px' }}
          />
          <p className="text-muted mt-2">{name.length}/30</p>
        </Form.Group>
        <Button >Create Deck</Button>
      </Form>
    </div>
  );
};

export default CreatePost;
