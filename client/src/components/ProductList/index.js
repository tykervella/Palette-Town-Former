import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('https://api.pokemontcg.io/v2/cards');
        setListings(response.data.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="product=list">
      {listings.map((listing) => (
        <Link to={`/listing/${listing.id}`} key={listing.id}>
          <div className="product-card">
            <img src={listing.images.small} alt={listing.name} />
            <h3>{listing.name}</h3>
            <p>Card Type: {listing.types.join(', ')}</p>
            <p>Price: ${listing.price}</p>
            <p>Seller: {listing.seller}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;