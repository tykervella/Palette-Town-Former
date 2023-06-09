import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";

import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';

const CreatePost = () => {

  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    if (inputName.length <= 30) {
      setName(inputName);
    } else {
      alert("Deck Names must be 30 characters or shorter!")
    }
  };

  const [addPost, { loading, error, data }] = useMutation(ADD_POST);

  const handleAddPost = async () => {
    try {
      const response = await addPost({ variables: { deckOwner: user_name, deckName: name } });
      const newDeck = response.data.addDeck._id
      navigate(`/deck/${newDeck}`)
      // Perform any additional actions after creating the deck
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
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
            style={{ width: '300px' }} // Set the width to your desired value
          />
          <p className="text-muted mt-2">{name.length}/30</p>
        </Form.Group>

        <Button onClick={handleAddPost}>Create Deck</Button>
      </Form>
    </div>
  );
}

export default CreatePost;
