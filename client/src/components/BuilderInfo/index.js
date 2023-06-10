import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_DECK_NAME } from '../../utils/mutations';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BuilderInfo({ deckId, deckName, quantity }) {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState(deckName);
  const [editing, setEditing] = useState(false);

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    if (inputName.length <= 30) {
      setName(inputName);
    } else {
      alert('Deck Names must be 30 characters or shorter!');
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const [updateDeckName, { loading, error, data }] = useMutation(UPDATE_DECK_NAME);

  const handleUpdate = async () => {
    try {
      const response = await updateDeckName({ variables: { deckId: deckId, deckName: name } });
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = async () => {
    if (quantity === 60) {
      navigate(`/publish/${_id}`);
    } else {
      alert('Your deck must be exactly 60 cards!');
    }
  };

  return (
    <Container>
      <div className="">
        {editing ? (
          // Render the form when in editing mode
          <Form className="d-flex align-items-center">
            <Form.Control
              type="text"
              id="name"
              placeholder="Deck Name"
              value={name}
              onChange={handleNameChange}
              className='bg-transparent text-white border-none m-2'
            />
            <p className="text-muted mt-2">{name.length}/30</p>
            <button className="bg-[#FFEC99] hover:bg-[#AFD7CA] text-black font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline" onClick={handleUpdate}>
              Update
            </button>
          </Form>
        ) : (
          // Render the deck name when not in editing mode
          <h3 className="text-center text-4xl text-white underline text-transform: uppercase">{deckName}</h3>
        )}
        <h3 className="text-center text-white mt-2">{quantity}/60<span className='text-muted'> cards in deck</span></h3>
      </div>

      <Row className="justify-content-center">
        {editing ? (
          // Render the update button when in editing mode
          null
        ) : (
          // Render the edit button and publish button in the same row when not in editing mode
          <>
            <Col className="text-center">
              <button className="bg-[#AFD7CA] hover:bg-[#FFEC99] text-black font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline" onClick={handleEdit}>
                Edit Deck Title
              </button>
            </Col>
            <Col className="text-center">
              <button className="bg-[#FFEC99] hover:bg-[#AFD7CA] text-black font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline" onClick={handlePublish}>
                Publish Deck
              </button>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default BuilderInfo;
