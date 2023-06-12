import React, { useState, useEffect } from "react";
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";

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
    <div>
      <h1>Checkout</h1>
      
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <CartItem
            key={index}
            listingId={item._id}
            cardImage={item.cardImage}
            cardName={item.cardName}
            price={item.price}
          />
        ))
      ) : (
        <div>No Items in your Cart...</div>
      )}
  
      <div>Total: {totalPrice}</div>
    </div>
  );
}


export default Checkout;