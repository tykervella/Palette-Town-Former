import React, { useState } from "react";

function DeckElement({ cardId, cardImage, cardName, quantity }) {
  const [value, setValue] = useState(quantity);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    setValue(value - 1);
  };

  return (
    <div className="col-span-4 my-2 flex flex-col items-center">
      <img src={cardImage} alt={cardName} data={cardId}/>
      <h1 className="text-xs mt-1 text-center">{cardName}</h1>
      <div className="flex items-center mt-1">
        <button
          className="btn text-xs text-center p-2 w-2 h-2"
          onClick={handleDecrement}
          disabled={value === 0}
        >
          -
        </button>
        <h1 className="text-xs mx-2">{value}</h1>
        <button
          className="btn w-2 text-xs p-2 h-2"
          onClick={handleIncrement}
          disabled={value === 4}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default DeckElement;
