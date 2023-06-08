import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_DECK = gql`
  mutation Mutation($deckOwner: String!, $deckName: String!) {
  addDeck(deckOwner: $deckOwner, deckName: $deckName) {
    _id
  }
}
`

export const ADD_TO_DECK = gql`
  mutation AddCardToDeckList(
  $deckId: ID!,
  $cardId: String!,
  $cardName: String!
  $cardImage: String!
  $cardType: String!
  $superType: String!
) {
  addCardToDeckList(
    deckId: $deckId
    cardId: $cardId
    cardName: $cardName
    cardImage: $cardImage
    cardType: $cardType
    superType: $superType
  ) {
    cards {
      cardName
    }
  }
}
`

export const REMOVE_CARD = gql`
  mutation Mutation($deckId: ID!, $cardId: String!) {
    removeCard(deckId: $deckId, cardId: $cardId) {
      cards {
        cardName
      }
    }
}`

export const UPDATE_CARD_QUANTITY = gql`
  mutation Mutation(
    $deckId: ID! 
    $cardId: ID! 
    $quantity: Int!
  ) {
  updateCardQuantity(
    deckId: $deckId 
    cardId: $cardId 
    quantity: $quantity
  ) {
    cards {
      quantity
    }
  }
}`
