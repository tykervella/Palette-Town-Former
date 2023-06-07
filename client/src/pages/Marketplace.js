import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_LISTINGS } from '../utils/queries';
import axios from 'axios';
import ProductList from '../components/ProductList/index';
import Cart from '../components/Cart';
import CategoryMenu from '../components/CategoryMenu';

function Marketplace() {
  // const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('');

  const { loading, error, data } = useQuery(GET_LISTINGS);

  const list = data?.allListings || [];
  console.log(data);
  if (loading) {
    return <div>Loading...</div>
  };


  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };


  return (
    <div className="grid grid-cols-12 mt-3 border-2 border-transparent">
      <div className="bg-white col-span-8 border-2 border-red-700 min-h-screen">
        {loading ? (
          <p>Loading listings...</p>
        ) : (
          list.map((listing) => (
            <ProductList
              id={listing._id}
              cardId={listing.cardId}
              image={listing.cardImage}
              cardName={listing.cardName}
              cardType={listing.cardType}
              price={listing.price}
            />
          ))
        )}
      </div>

      <div className="bg-white col-span-4 ml-4 border-2 border-red-700 min-h-screen">
        <CategoryMenu
        onSearch={handleSearch}
        onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default Marketplace;
