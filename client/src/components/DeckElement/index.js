import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CARD_QUANTITY, REMOVE_CARD } from "../../utils/mutations";
import { TiMinus, TiPlus } from "react-icons/ti";

function DeckElement({ deckId, cardId, cardImage, cardName, superType, quantity }) {
  const [value, setValue] = useState(quantity);

  const [updateCardQuantity] = useMutation(UPDATE_CARD_QUANTITY);
  const [removeCard] = useMutation(REMOVE_CARD);

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
      if (newValue === 0) {
        await removeCard({
          variables: {
            deckId: deckId,
            cardId: cardId,
          },
        });
        window.location.reload();

      } else {
        await updateCardQuantity({
          variables: {
            deckId: deckId,
            cardId: cardId,
            quantity: newValue,
          },
        });
      }
      window.location.reload();
    } catch (error) {
      console.log("Failed to update card quantity:", error);
    }
  };


  return (
    <div className="col-span-4 my-2 flex flex-col items-center shadow-lg">
    <img src={cardImage} alt={cardName} data={cardId} />
    <h1 className="truncate text-center text-white bg-[#0B3C49] rounded p-1 text-xs">{cardName}</h1>
    <div className="flex items-center mt-1">

      {/* Decrease button */}
      <button
        className="mr-2"
        onClick={handleDecrement}
        disabled={value === 0}
      >
        <TiMinus />
      </button>

      {/* Current value */}
      <h1 className="text-xs text-white">{value}</h1>

      {/* Increase button */}
      <button
        className="ml-2"
        onClick={handleIncrement}
        disabled={value === 4 && superType !== "Energy"}
      >
        <TiPlus />
      </button>

    </div>
  </div>
  );
}

export default DeckElement;
