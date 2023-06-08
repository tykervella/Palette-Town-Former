import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_DECK } from '../utils/queries';
import axios from 'axios'; // Import axios for making API requests

import CardElement from '../components/CardElement';
import SearchCards from '../components/SearchCards';
import DeckElement from '../components/DeckElement';

function DeckBuilder() {
  const { _id } = useParams(); // Retrieve _id from URL params
  const [cards, setCards] = useState([]);
  const [decklist, setDecklist] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0); // New state variable for total quantity

  const { loading, error, data } = useQuery(GET_DECK, {
    variables: { deckId: _id },
  });

  useEffect(() => {
    if (data && data.deck) {
      // Retrieve the decklist from the GraphQL response data and update the state
      const decklistFromData = data.deck.cards.map((card) => ({
        cardId: card.cardId,
        image: card.cardImage,
        cardName: card.cardName,
        quantity: card.quantity,
        superType: card.superType,
      }));
      setDecklist(decklistFromData);

      // Calculate the total quantity
      const total = decklistFromData.reduce((acc, card) => acc + card.quantity, 0);
      setTotalQuantity(total);
    }
  }, [data]);

  const getCards = (cardName, cardType, cardSubtype, cardColor, pageNumber) => {
    let queryString = '';

    if (cardName !== '') {
      queryString += `name:${cardName} `;
    }

    if (cardType !== '0') {
      queryString += `supertype:${cardType} `;
    }

    if (cardSubtype !== '0') {
      queryString += `subtypes:${cardSubtype} `;
    }

    if (cardColor !== '0') {
      queryString += `types:${cardColor} `;
    }

    axios
      .get('https://api.pokemontcg.io/v2/cards', {
        params: {
          q: queryString.trim(),
          page: pageNumber,
          pageSize: 12,
        },
      })
      .then((response) => {
        const rawData = response.data;
        const cardsArray = rawData.data.map((card) => ({
          id: card.id,
          name: card.name,
          series: card.set.name,
          series_symbol: card.set.images.symbol,
          images: card.images,
          types: card.types !== undefined ? card.types : ['other'],
          supertype: card.supertype,
        }));
        setCards(cardsArray);
      })
      .catch((error) => {
        console.error(error);
        setCards([]);
      });
  };

  const handleSearch = (cardName, cardType, cardSubtype, cardColor) => {
    getCards(cardName, cardType, cardSubtype, cardColor, 1);
  };

  const handleRefresh = () => {
    const storedCardName = sessionStorage.getItem('cardName');
    const storedCardType = sessionStorage.getItem('cardType');
    const storedCardSubtype = sessionStorage.getItem('cardSubtype');
    const storedCardColor = sessionStorage.getItem('cardColor');

    getCards(
      storedCardName || '',
      storedCardType || '0',
      storedCardSubtype || '0',
      storedCardColor || '0',
      1
    );
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 ml-auto mr-auto flex-row mt-4 px-4">
      {/* Left side. Search Element */}
      <div className="col-span-8 border-2 border-red-700 min-h-screen">
        <SearchCards onSearch={handleSearch} onRefresh={handleRefresh} />
        <div className="grid grid-cols-12 mt-3 border-2 border-transparent">
          {/* Render the card list */}
          {cards.map((card) => (
            <CardElement
              key={card.id}
              cardId={card.id}
              cardImage={card.images.small}
              cardName={card.name}
              cardType={card.types[0]}
              superType={card.supertype}
              deckId={_id}
            />
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
          <h1 className="col-span-3 text-center">{totalQuantity}/60</h1>
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
              key={card.cardId}
              deckId={_id}
              cardId={card.cardId}
              cardImage={card.image}
              cardName={card.cardName}
              superType={card.superType}
              quantity={card.quantity}
              onUpdateQuantity={(newQuantity) => {
                const updatedDecklist = decklist.map((c) => {
                  if (c.cardId === card.cardId) {
                    return { ...c, quantity: newQuantity };
                  }
                  return c;
                });
                setDecklist(updatedDecklist);

                // Calculate the total quantity
                const total = updatedDecklist.reduce((acc, c) => acc + c.quantity, 0);
                setTotalQuantity(total);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeckBuilder;