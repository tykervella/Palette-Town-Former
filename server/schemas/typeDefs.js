const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    decks: [Deck!]!
  }

  type Comment {
    _id: ID!
    commentText: String!
    commentAuthor: String!
    createdAt: String!
  }

  type Deck {
    _id: ID!
    deckName: String
    deckOwner: String
    createdAt: String
    cards: [Card!]
    comments: [Comment!]
    published: Boolean!
    cardCount: Int!
    commentCount: Int!
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    decks(username: String!): [Deck]
    deck(deckId: ID!): Deck
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDeck(deckOwner: String!): Deck
    addComment(
      deckId: ID!, 
      commentText: String!
      commentAuthor: String!
    ): Deck
    removeDeck(deckId: ID!): Deck
    removeComment(deckId: ID!, commentId: ID!): Deck
    removeCard(deckId: ID!, cardId: ID!): Deck
    addCardToDeckList(
      deckId: ID!, 
      cardId: String!
      cardName: String!
      cardImage: String!
      cardType: String!
      superType: String!
    ): Deck
    updateCardQuantity(
      deckId: ID! 
      cardId: ID! 
      quantity: Int!
    ): Deck
  
    }

`;

module.exports = typeDefs;
