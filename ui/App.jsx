import React from 'react';
import ReactDOM from 'react-dom';
import AppContext from './appContext';
import Layout from './components/Layout';

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
    this.socket.emit('newClient', user);
    this.socket.on('onlineList', data => {
      this.setState({ onlineUsers: {...this.state.onlineUsers, ...data }});
    });
  }

  sendMessage = (msg) => {
    this.setState({
      messages: [...this.state.messages, msg]
    });
  }
  render() {
    const { messages, onlineUsers } = this.state
    return (
      <AppContext.Provider
        value={{
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
