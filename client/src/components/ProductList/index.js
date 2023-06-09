import React from 'react';
import { Link } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductList = (props) => {

  return (
    <Col className='rounded-xl bg-white shadow-lg p-2'>
      <Link to={`/listing/${props.id}`}>
        {/* card name/title */}
        <h3 className='text-lg text-center overflow-hidden whitespace-nowrap text-truncate'>{props.cardName}</h3>

        {/* primary card image */}
        <div className='card-image text-center'>
          <img src={props.images} alt={props.cardName} className='w-full hover:scale-150' />
        </div>
        {/* card type */}
        {/* <p className='text-center'>Card Type: {props.cardTypes}</p> */}

        {/* card details */}
        <div className='card-details'>
          <Row className='mt-4'>
            <Col>
              {/* card price */}
              <p className=''>Price: ${props.price}</p>
            </Col>
            <Col>
              {/* go to listing button */}
              <button className='bg-gray-400 rounded-xl p-1'>Go To Listing</button>
            </Col>
          </Row>
          {/* <p>Seller: {props.seller}</p> */}
        </div>
      </Link>
    </Col>
  );
};

export default ProductList;
