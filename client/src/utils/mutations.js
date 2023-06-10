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

export const ADD_POST = gql`
  mutation Mutation(
    $deckOwner: String!, $deckName: String!, $color1: String!, $color2: String!, $color3: String!, $color4: String!, $color5: String!, $image1: String!, $image2: String!, $image3: String!, $image4: String!, $image5: String!, $postText: String) {
  addPost(deckOwner: $deckOwner, deckName: $deckName, color1: $color1, color2: $color2, color3: $color3, color4: $color4, color5: $color5, image1: $image1, image2: $image2, image3: $image3, image4: $image4, image5: $image5, postText: $postText) {
    _id
  }
}`

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

export const UPDATE_DECK_NAME = gql`
  mutation Mutation(
    $deckId: ID!, 
    $deckName: String!
    ) {
    updateDeckName(
      deckId: $deckId, 
      deckName: $deckName) 
    {
    _id
    deckName
  }
}`
