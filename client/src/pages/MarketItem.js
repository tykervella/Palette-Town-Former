import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cart from '../components/Cart';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51NF2M3EAK05WJdkzfJ4xgfLTmi7c6bjbIxRh07crt6UXgwdhMSqfA7ixKMt18vdst7ZZQsd3Z1IsVlvGTHESiQLp00zrpgghKO');

const MarketItem = () => {

  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards/`, {
          params: {
            q: `id:${id}`,
          },
        });
        const { data } = response;
        if (data.data.length > 0) {
          const item = data.data[0];
          setItem(item);
        } else {
          console.error('No item found');
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handlePurchase = async () => {

    try {
      const response = await axios.post('/api/payment/simulate-payment', {
        itemId: item.id,
        price: item.price,
        paymentMethod: 'stripe',
      });

      if (response.data.success) {
        console.log('Payment succeeded:', response.data.paymentIntent);
      } else {
        console.error('Payment failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="market-item">
      <img src={item.images} alt={item.name} />
      <h2>{item.name}</h2>
      <p>Rarity: {item.rarity}</p>
      <p>Description: {item.flavorText}</p>
      <p>Price: ${item.price}</p>
      <p>Seller: {item.seller}</p>

      <Elements stripe={stripePromise}>
        <Cart item={item} handlePurchase={handlePurchase} />
      </Elements>
    </div>
  );
};

export default MarketItem;