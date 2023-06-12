import React from 'react';
import Auth from '../../utils/auth';

import { Row, Col } from "react-bootstrap";
import { FaTrashAlt } from 'react-icons/fa'
import { useMutation } from '@apollo/client';

import { REMOVE_FROM_CART } from '../../utils/mutations';



function CartItem({ key, listingId, cardImage, cardName, price }) {
    const token = Auth.getToken();
    const username = token ? Auth.getProfile().data.username : null;

    const [removeFromCart] = useMutation(REMOVE_FROM_CART);

    const handleRemoveFromCart = async () => {
        try {
            await removeFromCart({
                variables: {
                    username: username,
                    listingId: listingId
                },
            });
            // Refresh the window location
            window.location.reload();
        } catch (error) {
            console.error("Error removing item from cart", error);
        }
    };



    return (
        <Row key={key} className="mb-3">
            <Col md={3}>
                <img src={cardImage} alt={cardName} style={{ width: "50%" }} className="img-fluid" />
            </Col>
            <Col md={6}>
                <div>{cardName}</div>
                <div>${price}</div>
            </Col>

            <FaTrashAlt onClick={handleRemoveFromCart} style={{ cursor: 'pointer' }} />
        </Row>
    );
}

export default CartItem;
