const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    name: String!
    profileIMG: String
    email: String!
    password: String
    decks: [Deck!]
    listings: [Listing!]
    posts: [Post!]
    bio: String

  }

  type Deck {
    _id: ID!
    deckName: String!
    deckOwner: String!
    createdAt: String 
    cards: [Card!]
  }

  type Card {
    cardId: String!
    cardName: String!
    cardImage: String!
    cardType: String!
    superType: String!
    quantity: Int!
    # ... other card fields
  }


  type Comment {
    _id: ID!
    commentText: String!
    commentAuthor: String!
    createdAt: String!
  }

  type Palette {
    _id: ID!
    colorOne: String! 
    colorTwo: String!
    colorThree: String!
    colorFour: String! 
    colorFive: String! 
  }

  type Post {
    _id: ID!
    deckOwner: String!
    deckName: String!
    postText: String
    createdAt: String
    comments: [Comment!]
    colors: [Palette!]
    commentCount: Int!
  }

  type Listing {
    _id: ID!
    cardId: String!
    cardName: String!
    cardImage: String!
    cardType: String!
    superType: String!
    price: Float!
    seller: String! 
    createdAt: String
    # ... other card fields
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    decks(username: String!): [Deck]
    deck(deckId: ID!): Deck
    listings(username: String!): [Listing]
    listing(listingId: ID!): Listing
    allListings: [Listing]
    posts(username: String!): [Post]
    post(postId: ID!): Post
    filteredListings(searchQuery: String, selectedTypes: [String!], selectedColors: [String!]): [Listing]
    sortedListings(sortOption: String): [Listing]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDeck(
      deckOwner: String!
      deckName: String!
      ): Deck
    addComment(
      deckId: ID!, 
      commentText: String!
      commentAuthor: String!
    ): Deck
    addListing(
      cardId: String!
      cardName: String!
      cardImage: String!
      cardType: String!
      superType: String!
      price: Float!
      seller: String! 
    ): Listing
    addPost(
      deckOwner: String!
      deckName: String!
      postText: String
    ): Post
    addCardToDeckList(
      deckId: ID!, 
      cardId: String!
      cardName: String!
      cardImage: String!
      cardType: String!
      superType: String!
    ): Deck
    
    removeDeck(deckId: ID!): Deck
    removeComment(deckId: ID!, commentId: ID!): Deck
    removeCard(deckId: ID!, cardId: String!): Deck
    
    updateCardQuantity(
      deckId: ID! 
      cardId: ID! 
      quantity: Int!
    ): Deck
    updateDeckName(
      deckId: ID! 
      deckName: String!
    ): Deck
  
    }

`;

module.exports = typeDefs;
