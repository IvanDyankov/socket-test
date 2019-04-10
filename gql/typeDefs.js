const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    getUsers: [User]
    getChatHistory(newSince: String): [ChatMessage]
  }

  type Mutation {
    addUser(id: ID!, displayName: String!, picture: String!): User
    sendMessage(messageText: String!, userId: ID!): Int
  }

  type Subscription {
    chatMessageSent: ChatMessage
    userAdded: User
  }

  type User {
    id: ID!
    displayName: String
    picture: String
  }

  type ChatMessage {
    id: ID!
    text: String!
    user: User
    timestamp: String
  }
`;