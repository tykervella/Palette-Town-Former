import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CARD_QUANTITY } from "../../utils/mutations";

function DeckElement({ deckId, cardId, cardImage, cardName, superType, quantity }) {
  const [value, setValue] = useState(quantity);

  const [updateCardQuantity] = useMutation(UPDATE_CARD_QUANTITY);

  const handleIncrement = async () => {
    if (value < 4 || superType === "Energy") {
      const newValue = value + 1;
      setValue(newValue);
      try {
        await updateCardQuantity({
          variables: {
            deckId: deckId,
            cardId: cardId,
            quantity: newValue,
          },
        });
        window.location.reload();

      } catch (error) {
        console.log("Failed to update card quantity:", error);
      }
    }
  };

  const handleDecrement = async () => {
    const newValue = value - 1;
    setValue(newValue);
    try {
      await updateCardQuantity({
        variables: {
          deckId,
          cardId,
          quantity: newValue,
        },
      });
      window.location.reload();

    } catch (error) {
      console.log("Failed to update card quantity:", error);
    }
  };

  return (
    <div className="col-span-4 my-2 flex flex-col items-center">
      <img src={cardImage} alt={cardName} data={cardId} />
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
          disabled={value === 4 && superType !== "Energy"}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default DeckElement;
