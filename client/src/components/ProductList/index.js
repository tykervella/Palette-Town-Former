import React from 'react';
import { Link } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductList = (props) => {

  return (
      <Col sm={4} className='border border-black'>
        <Link to={`/listing/${props.id}`}>

          {/* card name/title */}
          <h3 className='text-lg text-center'>{props.cardName}</h3>

          {/* primary card image */}
          <div className='card-image text-center'>
            <img src={props.images} alt={props.cardName} />
          </div>
          {/* card type */}
          <p className='text-center'>Card Type: {props.cardTypes}</p>

          {/* card details */}
          <div className='card-details'>
            <Row>

              <Col>
                {/* card price */}
                <p>Price: ${props.price}</p>
              </Col>

              <Col>
                {/* go to listing button */}
                <button className=' bg-gray-400 rounded-xl'>Go To Listing</button>
              </Col>

            </Row>
            <p>Seller: {props.seller}</p>
          </div>
        </Link>
      </Col>
  );
};


export default ProductList;