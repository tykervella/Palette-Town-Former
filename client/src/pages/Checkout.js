import React, { useState, useEffect } from "react";
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import { Container, Row, Col } from "react-bootstrap";

import { GET_CART } from '../utils/queries';
import CartItem from '../components/CartItem';

const Checkout = () => {
  const token = Auth.getToken();
  const username = token ? Auth.getProfile().data.username : null;
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const client = useApolloClient();
  const navigate = useNavigate();



  useEffect(() => {
    const total = cartItems.reduce((total, item) => total + item.price, 0);
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  useEffect(() => {
    if (username) {
      const fetchCart = async () => {
        try {
          const { data } = await client.query({
            query: GET_CART,
            variables: { username: username }
          });
    
          if (data && data.user.cart) {
            setCartItems(data.user.cart);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };

      fetchCart();
    }
  }, [username, client]);


  return (
    <Container className="mt-5 text-center shadow-lg mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <h1 className="mb-10">Checkout</h1>

      {cartItems.length > 0 ? (
        <Row className="cart-items-container">
          {cartItems.map((item, index) => (
            <Col key={index} xs={12} md={6} lg={6} xl={6}>
              <CartItem
                listingId={item._id}
                cardImage={item.cardImage}
                cardName={item.cardName}
                price={item.price}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mb-4">No Items in your Cart...</div>
      )}

      <div className="d-flex justify-content-end p-4">
        <h5 className="mr-3">Total: <span className="text-[#4B957E]">${totalPrice}</span></h5>
      </div>
    </Container>
  );
}

export default Checkout;