import React from 'react';
import { Link } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductList = (props) => {

  return (
    <Col className='rounded-xl bg-[#0B3C49] shadow-lg p-2'>

      {/* card name/title */}
      <h1 className='text-lg text-center text-truncate text-decoration-none bg-[#FFEC99] rounded-lg'>{props.cardName}</h1>

      {/* primary card image */}
      <div className='card-image text-center relative'>
        <img src={props.images} alt={props.cardName} className='w-full hover:scale-150 mt-4 rounded-xl' />
      </div>
      {/* card type */}
      <p className='text-center text-white mt-2'>Card Type: <span className='text-[#AFD7CA]'>{props.cardTypes}</span></p>

      {/* card details */}
      <div className='card-details'>
        <Row>
          <Col>
            {/* card price */}
            <p className='mt-2 text-white'>Price: <span className='text-[#AFD7CA]'>${props.price}</span></p>
          </Col>
          <Col>
            {/* go to listing button */}
            <button className='bg-[#FFEC99] hover:bg-[#4B957E] p-2 rounded-lg'>
              <Link to={`/listing/${props.id}`} className='text-decoration-none text-black'>Listing </Link>
            </button>
          </Col>
        </Row>
        <p className='text-white'>Seller: {props.seller}</p>
      </div>

    </Col>
  );
};

export default ProductList;
