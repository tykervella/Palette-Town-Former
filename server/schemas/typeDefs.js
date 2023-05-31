const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Deck {
    _id: ID
    deckName: String
    deckList: String
    deckOwner: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    decks(username: String): [Thought]
    deck(deckId: ID!): Thought
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDeck(deckName: String!, deckList: String!, deckOwner: String!): Deck
    addComment(
      deckId: ID!
      commentText: String!
      commentAuthor: String!
    ): Deck
    removeDeck(deckId: ID!): Deck
    removeComment(deckId: ID!, commentId: ID!): Deck
  }
`;

module.exports = typeDefs;
