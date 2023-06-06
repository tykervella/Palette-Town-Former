import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_LISTINGS } from '../utils/queries';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import CategoryMenu from '../components/CategoryMenu';

function Marketplace() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { loading, error, data } = useQuery(GET_LISTINGS);

  useEffect(() => {
    if (data) {
      setListings(data.listings);
    }
  }, [data]);

  useEffect(() => {
    filterListings();
  }, [listings, searchQuery, selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filterListings = () => {
  let filtered = [...listings];

  if (selectedCategory !== 'All') {
    filtered = filtered.filter((listing) => listing.category === selectedCategory);
  }

  if (searchQuery) {
    const lowerCaseQuery = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (listing) =>
        listing.name.toLowerCase().includes(lowerCaseQuery) ||
        listing.type.toLowerCase().includes(lowerCaseQuery) ||
        listing.subtype.toLowerCase().includes(lowerCaseQuery) ||
        listing.color.toLowerCase().includes(lowerCaseQuery)
    );
  }

  setFilteredListings(filtered);
};

  return (
    <Container className="border border-black p-4 m-2">
      <div className="col-span-8 border-2 border-red-700 min-h-screen">
        {/* <Cart /> */}
        <CategoryMenu onSearch={handleSearch} />
        <div className="grid grid-cols-12 mt-3 border-2 border-transparent">
          {loading ? (
            <p>Loading listings...</p>
          ) : (
            filteredListings.map((listing) => (
              <ProductList
                key={listing.id}
                image={listing.image}
                cardName={listing.name}
                cardType={listing.type}
                price={listing.price}
              />
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

export default Marketplace;


//   const getCards = (cardName, cardType, cardSubtype, cardColor, pageNumber) => {
//     let queryString = '';

//     if (cardName !== '') {
//       queryString += `name:${cardName} `;
//     }

//     if (cardType !== '0') {
//       queryString += `supertype:${cardType} `;
//     }

//     if (cardSubtype !== '0') {
//       queryString += `subtypes:${cardSubtype} `;
//     }

//     if (cardColor !== '0') {
//       queryString += `types:${cardColor} `;
//     }

//     axios
//       .get('https://api.pokemontcg.io/v2/cards', {
//         params: {
//           q: queryString.trim(),
//           page: pageNumber,
//           pageSize: 9,
//         },
//       })
//       .then(response => {
//         const rawData = response.data;
//         const cardsArray = rawData.data.map(card => ({
//           id: card.id,
//           name: card.name,
//           series: card.set.name,
//           series_symbol: card.set.images.symbol,
//           images: card.images,
//           types: card.types,
//           supertype: card.supertype,
//         }));
//         setCards(cardsArray);
//       })
//       .catch(error => {
//         console.error(error);
//         setCards([]);
//       });
//   };

//   const handleSearch = (cardName, cardType, cardSubtype, cardColor) => {
//     getCards(cardName, cardType, cardSubtype, cardColor, 1);
//   };


//   return (
    
//     <Container className="border border-black p-4 m-2">
//       <div className="col-span-8 border-2 border-red-700 min-h-screen">
//         <SearchCards onSearch={handleSearch} />
//         <div className="grid grid-cols-12 mt-3 border-2 border-transparent">
//           {/* Render the card list */}
//           {cards.map((card) => (
//             <CardElement key={card.id} image={card.images.small} cardName={card.name} />
//           ))}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Marketplace;