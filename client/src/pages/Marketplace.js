import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";






// *********************************************************************************
// TO JACKSON

// I used this code below from Tyler's card element, deck builder, and builder.js files. This code should be modified to fit your needs in marketitem.js and other files. I just used it as a placeholder to get the jist of how he calls the cards. But this will be done with the api calls for the market. Hopefully this kinda helps. I will edit the styling and box styling once you finish the code to render the following: a search bar similar that will find the cardname, cardtype, cardsubtype, and cardcolor, and the price associated with them. instead of an "add to deck" button, an "add to cart" button, and a "remove from cart" button will be present. You can see a similar funtionality in Tyler's code as previously mentioned as well. Keep me posted when you complete the code so marley and I can style it so it's not uggo 

// -Terri  6/03/2023
// **********************************************************************************






import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_DECK } from '../utils/queries';
import axios from 'axios'; // Import axios for making API requests


import CardElement from '../components/DeckBuilder/components/CardElement';
import SearchCards from '../components/DeckBuilder/components/SearchCards.js';

function Marketplace() {
  const { _id } = useParams(); // Retrieve _id from URL params
  const [cards, setCards] = useState([]);

  // this needs to be a cart related query -Terri

  const { loading, error, data } = useQuery(GET_DECK, {
    variables: { deckId: _id },
  });



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
          pageSize: 9,
        },
      })
      .then(response => {
        const rawData = response.data;
        const cardsArray = rawData.data.map(card => ({
          id: card.id,
          name: card.name,
          series: card.set.name,
          series_symbol: card.set.images.symbol,
          images: card.images,
          types: card.types,
          supertype: card.supertype,
        }));
        setCards(cardsArray);
      })
      .catch(error => {
        console.error(error);
        setCards([]);
      });
  };

  const handleSearch = (cardName, cardType, cardSubtype, cardColor) => {
    getCards(cardName, cardType, cardSubtype, cardColor, 1);
  };


  return (
    
    <Container className="border border-black p-4 m-2">
      <div className="col-span-8 border-2 border-red-700 min-h-screen">
        <SearchCards onSearch={handleSearch} />
        <div className="grid grid-cols-12 mt-3 border-2 border-transparent">
          {/* Render the card list */}
          {cards.map((card) => (
            <CardElement key={card.id} image={card.images.small} cardName={card.name} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Marketplace;
