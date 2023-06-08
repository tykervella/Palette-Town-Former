import { gql } from '@apollo/client';

export const GET_DECK = gql`
  query Deck($deckId: ID!) {
  deck(deckId: $deckId) {
    cardCount
    cards {
      cardId
      cardImage
      cardName
      cardType
      superType
      quantity
    }
  }
}
`

export const GET_USER = gql`
query Query($username: String!) {
  user(username: $username) {
    decks {
      _id
      cards {
        cardImage
      }
      deckName
      published
    }
    email
    posts {
      _id
      colors {
        colorFive
        colorFour
        colorOne
        colorThree
        colorTwo
      }
      deckName
    }
    profileIMG
    username
  }
}`

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
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
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const GET_LISTINGS = gql`
  query allListings {
  allListings {
    _id
    cardId
    cardName
    cardImage
    cardType
    superType
    price
    seller
    createdAt
  }
}
`;