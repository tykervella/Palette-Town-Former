import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = (props) => {

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