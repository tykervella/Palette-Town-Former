import { gql } from '@apollo/client';

export const GET_DECK = gql`
  query Decks($deckId: ID!) {
  deck(deckId: $deckId) {
    _id
    deckName
    cards {
      cardId
      cardImage
      cardName
      quantity
      superType
      cardType
    }
  }
}
`

export const GET_POST = gql`
  query Post($postId: ID!) {
    post(postId: $postId) {
      captureCount
      color1
      color2
      color3
      color4
      color5
      deckName
      image1
      image2
      image3
      image4
      image5
      postName
      postOwner
      postText
      caughtUsers {
        caughtUserName
    }
  }
}`

export const GET_DECK_FOR_POST = gql`
  query Post($deckName: String!) {
  deckForPost(deckName: $deckName) {
    _id
    createdAt
    cards {
      cardId
      cardImage
      cardName
      quantity
    }
  }
}`

export const GET_USER = gql`
query User($username: String!) {
  user(username: $username) {
    posts {
      color1
      color2
      color3
      color4
      color5
      image1
      image2
      image3
      image4
      image5
      postName
      postOwner
      _id
    }
    bio
    name
    username
    decks {
      deckName
      cards {
        cardImage
      }
    }
    listings {
      _id
      cardImage
      cardName
      price
    }
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

export const GET_TOP_POSTS = gql`
query Query {
  posts {
    captureCount
    postName
    color1
    color2
    color3
    color4
    color5
    image1
    image3
    image2
    image4
    image5
    postOwner
  }
}`

export const GET_FILTERED_LISTINGS = gql`
  query getFilteredListings($searchQuery: String, $selectedTypes: [String!], $selectedColors: [String!]) {
    filteredListings(searchQuery: $searchQuery, selectedTypes: $selectedTypes, selectedColors: $selectedColors) {
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

export const GET_SORTED_LISTINGS = gql`
  query getSortedListings($sortOption: String) {
    sortedListings(sortOption: $sortOption) {
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