
const { PubSub } = require('apollo-server-express');
const uuid = require('uuid');

const pubsub = new PubSub();

/* TODO: swap for a real data store */
const mockUsers = [];
const mockMessages = [];

const CHAT_MESSAGE = 'CHAT_MESSAGE';
const USER_ADDED = 'USER_ADDED';

module.exports = {
  Query: {
    getUsers: () => mockUsers,
    getChatHistory: () => mockMessages
  },
  Mutation: {
    addUser: (_, { displayName, picture, id}) => {
      const existingUser = mockUsers.find((user) => user.id === id);
      if (existingUser) return existingUser;
      const user = {
        id,
        displayName,
        picture
      };
      mockUsers.push(user);
      pubsub.publish(USER_ADDED, { userAdded: user });
      return user;
    },
    sendMessage: (_, { messageText: text, userId }) => {
      const user = mockUsers.find(({ id }) => id === userId);
      if (!user) throw new Error('User Not Found!');
      const message = {
        id: uuid.v4(),
        text,
        user,
        timestamp: new Date().getTime()
      };
      mockMessages.push(message);
      pubsub.publish(CHAT_MESSAGE, { chatMessageSent: message });
      return 200;
    }
  },
  Subscription: {
    chatMessageSent: {
      subscribe: () => pubsub.asyncIterator(CHAT_MESSAGE) // don't forget about this method
    },
    userAdded: {
      subscribe: () => pubsub.asyncIterator(USER_ADDED)
    }
  }
};