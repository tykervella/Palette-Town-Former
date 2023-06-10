import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_TO_DECK } from "../../utils/mutations";

function CardElement({ cardId, cardImage, cardName, cardType, superType, deckId }) {
  const [addToDeck] = useMutation(ADD_TO_DECK);

  const handleAddToDeck = () => {
    addToDeck({
      variables: {
        deckId: deckId,
        cardId: cardId,
        cardName: cardName,
        cardImage: cardImage,
        cardType: cardType,
        superType: superType,
      },
    })
      .then((response) => {
        // Handle the response if needed
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        // Handle the error if needed
        console.error(error);
      });
  };

  return (
    <div key={cardId} className="shadow-lg rounded">
      <img src={cardImage} alt={cardName} className="hover:scale-150 mt-4" />
      <h3 className="truncate text-center mt-2 text-white bg-[#0B3C49] rounded p-1 text-sm">{cardName}</h3>
      <div className="text-center">
        <button className="bg-[#AFD7CA] hover:bg-[#FFEC99] text-black p-2 m-2 rounded" onClick={handleAddToDeck}>
          Add to Deck
        </button>
      </div>
    </div>

  );
}

export default CardElement;
