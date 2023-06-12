import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CART } from '../utils/queries';
import CartItem from '../components/CartItem';

const Checkout = () => {
  const { loading, error, data } = useQuery(GET_CART);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching cart data</div>
  }

  const { cart } = data;

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.items.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice.toFixed(2);
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <CartItem
              key={item.listingId}
              listingId={item.listingId}
              cardImage={item.cardImage}
              cardName={item.cardName}
              price={item.price}
            />
          ))}
          <h3>Total Price: ${calculateTotalPrice()}</h3>

        </>
      )}
    </div>
  );
};

export default Checkout;