import React from "react";

function CardElement({ image, cardName, onAddToDecklist }) {
  const handleAddToDecklist = () => {
    onAddToDecklist(image, cardName);
  };

  return (
    <div className="col-span-4">
      <img src={image} alt={cardName} />
      <h3>{cardName}</h3>
      <button className="addcardbtn" onClick={handleAddToDecklist}>
        Add to Deck
      </button>
    </div>
  );
}

export default CardElement;
