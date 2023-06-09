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
    <Container className="">
      <Row>
       {/* left column */}
        <Col md={7} className="bg-white border-2 border-red-700 min-h-screen">
        <Row xs={1} sm={2} md={4} lg={4} className="g-4">
          {loading ? (
            <p>Loading listings...</p>
          ) : (
            list.map((listing) => (
              <ProductList
                key={listing._id}
                id={listing._id}
                images={listing.cardImage}
                cardName={listing.cardName}
                cardType={listing.cardType}
                price={listing.price}
              />
            ))
          )}
          </Row>
        </Col>
        {/* right column */}
        <Col md={5} className="bg-white border-2 border-red-700 min-h-screen">
          <CategoryMenu
            onSearch={handleSearch}
            onSort={handleSort}
          />
        </Col>

      </Row>
    </Container>
  );
};

export default Marketplace;
