import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Message from './Message';

const styles = theme => ({
  mainChat: {
    height: '85vh',
    minHeight: '400px',
    overflowX: 'scroll'
  },
  textMessage: {
    margin:'10px 30px'
  }
});

const getChatHistoryQuery = gql`
  {
    getChatHistory {
      id
      text
      user {
        displayName
        picture
      }
      timestamp
    }
  }
`;

const chatMessageSentSubscription = gql`
  subscription {
    chatMessageSent {
      id
      text
      user {
        displayName
        picture
      }
      timestamp
    }
  }
`;

class MainChat extends React.Component {

  constructor(props) {
    super(props);
    this.bottomOfChat = React.createRef();
  }

  scrollToBottomOfChat = () => {
    this.bottomOfChat.current.scrollIntoView({ behavior: "instant" });
  }

  onUpdateChat = (prev, { subscriptionData }) => {
    if (!subscriptionData.data) return prev;
    const newMessage = subscriptionData.data.chatMessageSent;
    return Object.assign({}, prev, {
      getChatHistory: [...prev.getChatHistory, newMessage]
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.mainChat}>
        <Query query={getChatHistoryQuery}
          onCompleted={() => setTimeout(this.scrollToBottomOfChat, 30)}
        >
          {({ loading, error, data: { getChatHistory }, subscribeToMore }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            subscribeToMore({
              document: chatMessageSentSubscription,
              updateQuery: this.onUpdateChat
            });
            return (
              <List>
                { getChatHistory.map( msg => <Message key={msg.id} id={msg.id} user={msg.user} text={msg.text} timestamp={msg.timestamp} />)}
                <div style={{ clear: "both" }} ref={this.bottomOfChat} />
              </List>
            );
          }}
        </Query>
      </Paper>
    )
  }
};

export default withStyles(styles)(MainChat);
