import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@apollo/client';
import { GET_LISTINGS } from '../../utils/queries';

const ProductList = (props) => {

  // const [listings, setListings] = useState([]);

  // const { loading, error, data } = useQuery(GET_LISTINGS);
  // const list = data?.allListings || [];
  // console.log(data);
  // if (loading) {
  //   return <div>Loading...</div>
  // };
  // } if (!listings.length) {
  //   return <div>No listings yet...</div>
  // }

  return (
    <>
      <Link to={`/listing/${props.id}`}>
        <div className="product-card">
          <img src={props.images} alt={props.cardName} />
          <h3>{props.cardName}</h3>
          <p>Card Type: {props.cardTypes}</p>
          <p>Price: ${props.price}</p>
          {/* <p>Seller: {props.seller}</p> */}
        </div>
      </Link>
    </>
  );
};

export default ProductList;