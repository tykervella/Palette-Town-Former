import { gql } from '@apollo/client';

export const GET_DECK = gql`
  query GetDeck($deckId: ID!) {
    deck(deckId: $deckId) {
      deckName
      cards {
        cardId
        cardName
        cardImage
        cardType
        quantity
      }
    }
  }
`;
