import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Auth from '../utils/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { GET_DECK } from "../utils/queries";

const CreatePost = () => {
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;
  // const navigate = useNavigate();
  const { _id } = useParams();
  const [decklist, setDecklist] = useState([]);
  const [deckName, setDeckName] = useState('');
  const [sortedCardTypes, setSortedCardTypes] = useState([]);

  function rgbToHex(r, g, b) {
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  }

  const colors = [
    { name: "Colorless", rgb: "255, 255, 255" },
    { name: "Darkness", rgb: "0, 0, 0" },
    { name: "Dragon", rgb: "120, 81, 169" },
    { name: "Fairy", rgb: "255, 192, 203" },
    { name: "Fighting", rgb: "255, 165, 0" },
    { name: "Fire", rgb: "255, 0, 0" },
    { name: "Grass", rgb: "0, 128, 0" },
    { name: "Lightning", rgb: "255, 255, 0" },
    { name: "Metal", rgb: "192, 192, 192" },
    { name: "Psychic", rgb: "128, 0, 128" },
    { name: "Water", rgb: "0, 0, 255" }
  ];

  function deconstructColor(colorName) {
    const color = colors.find(obj => obj.name === colorName);

    if (color) {
      const [r, g, b] = color.rgb.split(", ").map(Number);
      return { r, g, b };
    }

    return null; // Color not found
  }

  function generateColor(r, g, b) {
    // Generate random values between -10 and -50 or 10 and 50
    const randomR = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 41) + 10);
    const randomG = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 41) + 10);
    const randomB = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 41) + 10);
  
    // Check if any of the original RGB values is equal to 255
    // If so, generate a random number between 0 and -40 for that component
    const newR = (r === 255 ? r + (Math.random() * -40) : r + randomR);
    const newG = (g === 255 ? g + (Math.random() * -40) : g + randomG);
    const newB = (b === 255 ? b + (Math.random() * -40) : b + randomB);
  

    // Ensure the values are within the valid range (0-255)
    const clampedR = Math.min(Math.max(newR, 0), 255);
    const clampedG = Math.min(Math.max(newG, 0), 255);
    const clampedB = Math.min(Math.max(newB, 0), 255);

    return rgbToHex(clampedR, clampedG, clampedB);
  }

  const { loading: deckLoading, error: deckError, data: deckData } = useQuery(GET_DECK, { variables: { deckId: _id } });

  useEffect(() => {
    if (deckData && deckData.deck) {
      const decklistFromData = deckData.deck.cards.map((card) => ({
        cardId: card.cardId,
        image: card.cardImage,
        cardName: card.cardName,
        quantity: card.quantity,
        superType: card.superType,
      }));
      setDecklist(decklistFromData);

      const deckName = deckData.deck.deckName;
      setDeckName(deckName);

      const cardTypeArray = deckData.deck.cards.map((card) => card.cardType);
      const uniqueCardTypes = [...new Set(cardTypeArray)].filter(type => type !== "other");
      const sortedCardTypes = uniqueCardTypes.sort((a, b) => {
        const countA = cardTypeArray.filter(type => type === a).length;
        const countB = cardTypeArray.filter(type => type === b).length;
        return countB - countA;
      });
      setSortedCardTypes(sortedCardTypes);

      console.log(sortedCardTypes);
      console.log(deckName);
    }
  }, [deckData, _id]);

  const [addPost, { loading: postLoading, error: postError, data: postData }] = useMutation(ADD_POST);

  const handleAddPost = async () => {
    try {
      // Check the length of modifiedCardTypes
      const length = sortedCardTypes.length;
      if (length === 1) {
        const repeatedValue = sortedCardTypes[0];
        // Copy the objects until the length is 5
        for (let i = length; i < 5; i++) {
          sortedCardTypes.push(repeatedValue);
        }
      } else if (length === 2) {
        const value0 = sortedCardTypes[0];
        const value1 = sortedCardTypes[1];

        sortedCardTypes.push(value0)
        sortedCardTypes.push(value1)
        sortedCardTypes.push(value0)
      } else if (length === 3) {
        const value0 = sortedCardTypes[0];
        const value1 = sortedCardTypes[1];

        sortedCardTypes.push(value1)
        sortedCardTypes.push(value0)
      } else if (length === 4) {
        const value0 = sortedCardTypes[0];
        sortedCardTypes.push(value0)
      } 

      const modifiedCardTypes = {};

      for (let i = 0; i < 5; i++) {
        if (i < sortedCardTypes.length) {
          const cardType = sortedCardTypes[i];
          const { r, g, b } = deconstructColor(cardType);
          const newColor = generateColor(r, g, b);
          modifiedCardTypes[`color${i + 1}`] = newColor;
        } else {
          modifiedCardTypes[`color${i + 1}`] = '';
        }

      }

     

      const response = await addPost({ 
        variables: { 
          deckOwner: user_name,
          deckName: deckName, 
          color1: modifiedCardTypes.color1,
          color2: modifiedCardTypes.color2,
          color3: modifiedCardTypes.color3,
          color4: modifiedCardTypes.color4,
          color5: modifiedCardTypes.color5
        } });
      const newPost = response.data.addPost._id
      const color1 = response.data.addPost.color1
      console.log(newPost, modifiedCardTypes, color1)
    } catch (error) {
      console.log(error);
    }
  };

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
      <Form className="text-black mx-auto">
        <Form.Group className="mb-3 mt-3 mx-auto">
          <h3 className="col-span-6 text-center">{deckName}</h3>
        </Form.Group>
        <Button onClick={handleAddPost}>Create Deck</Button>
      </Form>
    </div>
  );
};

export default CreatePost;
