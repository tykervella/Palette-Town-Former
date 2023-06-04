import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_DECK } from '../../utils/getdeck'; // Import the GraphQL query

import CardElement from './components/CardElement.js';
import SearchCards from './components/SearchCards.js';
import DeckElement from './components/DeckElement.js';
import Energy from './components/Energy.js';

function DeckBuilder() {
  const { _id } = useParams(); // Retrieve _id from URL params
  const [cards, setCards] = useState([]);
  const [decklist, setDecklist] = useState([]);

  const { loading, error, data } = useQuery(GET_DECK, {
    variables: { deckId: _id },
  });

  useEffect(() => {
    if (data && data.deck) {
      // Retrieve the decklist from the GraphQL response data and update the state
      const decklistFromData = data.deck.cards.map((card) => ({
        image: card.cardImage,
        cardName: card.cardName,
        // Add any additional properties you need from the card model
      }));
      setDecklist(decklistFromData);
    }
  }, [data]);

  const getCards = (cardName, cardType, cardSubtype, cardColor, pageNumber) => {
    // Rest of the code
  };

  const handleSearch = (cardName, cardType, cardSubtype, cardColor) => {
    // Rest of the code
  };

  const addCardToDecklist = (image, cardName) => {
    // Rest of the code
  };

  return (
    <div className="grid grid-cols-12 gap-4 ml-auto mr-auto flex-row mt-4 px-4">
      {/* Left side. Search Element */}
      <div className="col-span-8 border-2 border-red-700 min-h-screen">
        <SearchCards onSearch={handleSearch} />
        <div className="grid grid-cols-12 mt-3 border-2 border-transparent">
          {/* Render the card list */}
          {cards.map((card) => (
            <CardElement key={card.id} image={card.images.small} cardName={card.name} />
          ))}
        </div>
      </div>

      {/* Right Side. WIP Deck Element */}
      <div className="col-span-4 ml-4 border-2 border-red-700 min-h-screen">
        {/* Deck Name */}
        <div className="grid grid-cols-12 w-11/12 flex-row ml-2 mt-3 border-2 border-transparent">
          <input
            id="searchbar"
            className="col-span-9 rounded text-center border-2 border-red-700"
            placeholder="Deck Name"
            value={data && data.deck ? data.deck.deckName : ''}
          />
          <h1 className="col-span-3 text-center">{decklist.length}/60</h1>
        </div>

        <div className="grid grid-cols-12 flex-row items-center justify-items-center justify-between ml-2 mt-1">
          <button className="btn text-xs col-span-4" id="savebtn">
            Save as Draft
          </button>
          <button className="btn text-xs col-span-4 ml-4" id="searchbtn">
            Publish Deck
          </button>
        </div>

        <div className="grid grid-cols-12 w-11/12 flex-row ml-2 mt-3 border-2 border-transparent">
          {/* Render the decklist */}
          {decklist.map((card) => (
            <DeckElement
              key={card.id}
              image={card.image}
              cardName={card.cardName}
              onAddToDecklist={addCardToDecklist}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeckBuilder;