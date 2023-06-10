import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation } from '@apollo/client';

import { UPDATE_DECK_NAME  } from '../../utils/mutations';
import { useParams, useNavigate } from 'react-router-dom';


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
      alert("Deck Names must be 30 characters or shorter!");
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

    if (quantity === 60 ) {
      navigate(`/publish/${_id}`)
    } else {
      alert("Your deck must be exactly 60 cards!")
    }
    

  }

  return (
    <div>
      <div className="grid grid-cols-12 w-11/12 flex-row ml-2 mt-3 border-2 border-transparent">
        {editing ? (
          // Render the form when in editing mode
          <Form className="col-span-6 mx-auto">
            <Form.Group className="mb-3 mt-3">
              <Form.Control
                type="text"
                id="name"
                placeholder="Deck Name"
                value={name}
                onChange={handleNameChange}
                style={{ width: "300px" }}
              />
              <p className="text-muted mt-2">{name.length}/30</p>
            </Form.Group>
          </Form>
        ) : (
          // Render the deck name when not in editing mode
          <h3 className="col-span-6 text-center">{deckName}</h3>
        )}
        <h3 className="col-span-6 text-center">{quantity}/60</h3>
      </div>

      <div className="grid grid-cols-12 flex-row items-center justify-items-center justify-between ml-2 mt-1">
        {editing ? (
          // Render the update button when in editing mode
          <button className="btn text-xs col-span-4" onClick={handleUpdate}>
            Update
          </button>
        ) : (
          // Render the edit button when not in editing mode
          <button className="btn text-xs col-span-4" onClick={handleEdit}>
            Edit Deck Title
          </button>
        )}
        <button className="btn text-xs col-span-4 ml-4" onClick={handlePublish}>
          Publish Deck
        </button>
      </div>
    </div>
  );
}

export default BuilderInfo;
