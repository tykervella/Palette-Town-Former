import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


function FeaturedListing({ key, listingId, cardName, cardImage, price }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate(`/listing/${listingId}`);
    } catch (error) {
      console.log(error);
    }
  };

    return (
        
          
            
      <Col key={key} xs={12} sm={6} md={4} className="mb-4">
        <div className="rounded-lg mt-4 border  p-4" >
          <img src={cardImage} alt={cardName} />
          <h3 className="mt-4 mb-0 text-center sm:text-black">{cardName}</h3>
          <h3 className="mt-4 mb-0 text-center sm:text-black">{price}</h3>
          <button onClick={handleClick} className="bg-[#FFEC99] hover:bg-[#AFD7CA] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">      
            View Listing
          </button>
        </div>
      </Col>
         
          
        
      );
    }

export default FeaturedListing;