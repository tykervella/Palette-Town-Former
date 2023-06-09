import React from 'react';
import { Link } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductList = (props) => {

  return (
    <Col className='rounded-xl bg-white shadow-lg p-2'>

      {/* card name/title */}
      <h1 className='text-lg text-center text-truncate text-decoration-none'>{props.cardName}</h1>

      {/* primary card image */}
      <div className='card-image text-center relative'>
        <img src={props.images} alt={props.cardName} className='w-full hover:scale-150 mt-4' />
      </div>
      {/* card type */}
      <p className='text-center'>Card Type: {props.cardTypes}</p>

      {/* card details */}
      <div className='card-details'>
        <Row>
          <Col>
            {/* card price */}
            <p className='mt-5'>Price: ${props.price}</p>
          </Col>
          <Col>
            {/* go to listing button */}
            <button className='bg-gray-400 rounded-xl p-2 mt-5'>
              <Link to={`/listing/${props.id}`} className='text-decoration-none text-white'>Listing </Link></button>
          </Col>
        </Row>
        <p>Seller: {props.seller}</p>
      </div>

    </Col>
  );
};

export default ProductList;
