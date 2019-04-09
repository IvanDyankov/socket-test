
const { PubSub } = require('apollo-server-express');
const uuid = require('uuid');

const pubsub = new PubSub();

const mockUsers = [];

const mockMessages = [];

const CHAT_MESSAGE = 'CHAT_MESSAGE';

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
      subscribe: () => pubsub.asyncIterator(CHAT_MESSAGE) // don't forget about this mehtod
    }
  }
};