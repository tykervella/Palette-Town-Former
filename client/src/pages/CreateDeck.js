import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_DECK } from '../utils/mutations';

const CreateDeck = () => {
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();

  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    if (inputName.length <= 30) {
      setName(inputName);
    } else {
      alert('Deck Names must be 30 characters or shorter!');
    }
  };

  const [createDeck, { loading, error, data }] = useMutation(CREATE_DECK);

  const handleCreateDeck = async () => {
    try {
      const response = await createDeck({ variables: { deckOwner: user_name, deckName: name } });
      const newDeck = response.data.addDeck._id;
      navigate(`/deck/${newDeck}`);
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
    <Container className="flex justify-center m-10">
      <Row>
        <Col className="max-w-3xl w-full p-8 bg-[#4B957E] text-white rounded-lg shadow-lg">
          <div className='border-2 border-[#FFEC99] p-2 rounded-lg'>
          <h2 className="text-4xl font-bold m-6 underline">Create your Pokemon Deck</h2>
          <div className="text-center">
            <Form className="text-black mx-auto">
              <div className="w-80 mx-auto">
                <Form.Group className="box-shadow-xl p-4 rounded-lg">
                  <Form.Control
                    type="text"
                    id="name"
                    placeholder="Deck Name"
                    value={name}
                    onChange={handleNameChange}
                    className="bg-transparent border-b-2 border-[#376D5B] p-2 text-white leading-tight focus:outline-none"
                  />
                  <p className="mt-2 text-white">{name.length}/30</p>
                </Form.Group>
              </div>

              <button onClick={handleCreateDeck} className="bg-[#FFEC99] hover:bg-[#AFD7CA] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Create Deck
              </button>
            </Form>
          </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateDeck;
