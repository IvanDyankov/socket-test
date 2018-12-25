import React from 'react';
import ReactDOM from 'react-dom';
import AppContext from './appContext';
import Layout from './components/Layout';

// TODO:
// Announce Client joined
// Annouce Client left
// SameClient on a new Tab is treated like a new Client
// Listen for enter Key
// Only emit 'chatMessage' if text !== ''
// Add unit tests :)

class App extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io();
    this.state = {
      messages: [],
      onlineUsers: {}
    };
  }

  componentDidMount() {
    this.registerClient();
    this.socket.on('onlineList', data => this.updateOnlineUsers(data));
    this.socket.on('echoChatMessage', data => this.updateMessages(data))
  }

  registerClient = () => this.socket.emit('newClient', user);

  sendMessage = (text) =>
    this.socket.emit('chatMessage', { displayName: user.displayName, text });

  updateOnlineUsers = (newUser) =>
    this.setState({ onlineUsers: {...this.state.onlineUsers, ...newUser }});

  updateMessages = (newMsg) =>
    this.setState({ messages: [...this.state.messages, newMsg ]});

  render() {
    const { messages, onlineUsers } = this.state
    return (
      <AppContext.Provider
        value={{
          displayName: user.displayName,
          sendMessage: this.sendMessage,
          messages,
          onlineUsers
        }}
      >
        <Layout />
      </AppContext.Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
