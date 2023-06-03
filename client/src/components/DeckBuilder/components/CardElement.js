import React from "react";

function CardElement({ image, cardName }) {
  return (
    <div className="col-span-4 my-2 flex flex-col items-center">
      <img src={image} alt={cardName} />
      <h1 className="text-s mt-1 text-center">{cardName}</h1>
      <button className="width-full btn text-xs text-center mt-1" id="searchbtn">Add to Deck!</button>
    </div>
  );
}

export default CardElement;
