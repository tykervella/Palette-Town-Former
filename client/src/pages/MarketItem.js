import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_LISTINGS, ADD_TO_CART } from '../utils/queries';
import { ADD_TO_CART as ADD_TO_CART_MUTATION } from '../utils/mutations';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cart from '../components/Cart';
import axios from 'axios';

import { Container, Row, Col } from 'react-bootstrap';

// const stripePromise = loadStripe('pk_test_51NF2M3EAK05WJdkzfJ4xgfLTmi7c6bjbIxRh07crt6UXgwdhMSqfA7ixKMt18vdst7ZZQsd3Z1IsVlvGTHESiQLp00zrpgghKO');

const MarketItem = () => {

  const { id } = useParams();
  const [listing, setListing] = useState(null);
  // const [addToCart] = useMutation(ADD_TO_CART_MUTATION);

  const { loading, error, data } = useQuery(GET_LISTINGS);

  useEffect(() => {
    if (data && data.allListings) {
      const foundListing = data.allListings.find((item) => item._id === id);
      setListing(foundListing);
    }
  }, [data, id]);

  useEffect(() => {
    if (listing) {
      fetchAdditionalData()
    }
  }, [listing]);

  const fetchAdditionalData = async () => {
    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/cards/${listing.cardId}`);
      const data = await response.json();

      if (data.success) {
        const card = data.card;

        setListing((prevListing) => ({
          ...prevListing,
          cardName: card.name,
          cardImage: card.images.small,
          averageSellingPrice: card.tcgplayer.prices.averagePrice.toFixed(2),
        }));
      } else {
        console.error('Failed to fetch additional data', data.error);
      }
    } catch (error) {
      console.error('Failed to fetch additional data', error);
    }
  };

  // const handleAddToCart = () => {
  //   addToCart({ variables: { listingId: id } })
  //     .then(() => {
  //       console.log('Item added to cart successfully');
  //     })
  //     .catch((error) => {
  //       console.error('Failed to add item to cart', error);
  //     });
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching listing data</div>;
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <Container className="d-flex justify-content-center mb-4">
    <Row className="rounded-xl bg-[#0B3C49] shadow-lg p-2">
      {/* left column-card name and img */}
      <div className="d-flex border-2 border-[#FFEC99] rounded p-4">
        <div>
          <h2 className="text-center text-truncate text-decoration-none bg-[#FFEC99] rounded-lg">
            {listing.cardName}
          </h2>
          <img src={listing.cardImage} alt={listing.cardName} className="hover:scale-150" />
        </div>
        <div className="ml-10 mt-20 text-white">
          <p className="text-2xl">
            Card ID: <span className="text-[#AFD7CA] text-xl">{listing.cardId}</span>
          </p>
          <p className="text-2xl">
            Card Type: <span className="text-[#AFD7CA]">{listing.cardType}</span>
          </p>
          <p className="text-2xl">
            SuperType: <span className="text-[#AFD7CA]">{listing.superType}</span>
          </p>
          <p className="text-2xl">
            Price: <span className="text-[#AFD7CA]">${listing.price}</span>
          </p>
          <p className="text-2xl">
            Seller: <span className="text-[#AFD7CA]">{listing.seller}</span>
          </p>
          {listing.averageSellingPrice && (
            <p>
              Average Selling Price: <span className="text-[#AFD7CA]">${listing.averageSellingPrice}</span>
            </p>
          )}
        </div>
      </div>
      {/* <button onClick={handleAddToCart}>Add to Card</button> */}
    </Row>
  </Container>
  


  );
};

export default MarketItem;