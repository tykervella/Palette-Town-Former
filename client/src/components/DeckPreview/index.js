import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


function DeckPreview({ key, deckId, deckName, cardImage }) {
  const defaultImage = "https://i.ibb.co/R6t83fW/blank-Card.png";

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate(`/deck/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    
    <Col key={key} xs={12} sm={6} md={4} className="mb-4">
      <div className="rounded-lg mt-4 border p-4">
        <img src={cardImage ? cardImage : defaultImage} alt={deckName} />
        <h3 className="mt-4 mb-0 text-black text-center sm:text-black">{deckName}</h3>
        <button onClick={handleClick} className="bg-[#FFEC99] hover:bg-[#AFD7CA] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">      
            View Deck
          </button>
     </div>
    </Col>
        
  );
}

export default DeckPreview;
