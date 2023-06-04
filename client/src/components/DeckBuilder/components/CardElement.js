import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_TO_DECK } from "../../../utils/mutations";

function CardElement({ cardId, cardImage, cardName, cardType, deckId }) {
  const [addToDeck] = useMutation(ADD_TO_DECK);

  const handleAddToDeck = () => {
    addToDeck({
      variables: {
        deckId: deckId,
        cardId: cardId,
        cardName: cardName,
        cardImage: cardImage,
        cardType: cardType,
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
    <div key={cardId} className="col-span-4">
      <img src={cardImage} alt={cardName}  />
      <h3>{cardName}</h3>
      <button className="addcardbtn" onClick={handleAddToDeck}>
        Add to Deck
      </button>
    </div>
  );
}

export default CardElement;
