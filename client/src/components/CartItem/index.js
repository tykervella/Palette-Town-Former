import React, { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { FaTrashAlt } from 'react-icons/fa'


function CartItem({ key, listingId, cardImage, cardName, price }) {


    return (
        <Row key={key} className="mb-3">
          <Col md={3}>
            <img src={cardImage} alt={cardName} style={{ width: "50%" }} className="img-fluid" />
          </Col>
          <Col md={6}>
            <div>{cardName}</div>
            <div>${price}</div>
          </Col>

          <FaTrashAlt/>
        </Row>
      );
    }

export default CartItem;
