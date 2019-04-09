import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';

const styles = () => ({
  vertical: {
    alignItems: 'center'
  }
});

const sendMessageMutation = gql`
  mutation sendMessage($text: String!, $userId: ID! ) {
    sendMessage(messageText: $text , userId: $userId)
  }
`;

class MessagePanel extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ''
    }
    this.messageInput = React.createRef();
  }

  setMessage = (message) => {
    this.setState({ message });
  }

  render() {
    const { classes, userId } = this.props;
    return (
      <Mutation mutation={sendMessageMutation}>
        {(sendMessage) => (
          <Grid container direction="row" className={classes.vertical} spacing={8}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                placeholder="Write a Message"
                margin="normal"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.message}
                onChange={
                  (e) => this.setMessage(e.target.value)
                }
                ref={this.messageInput}
                onKeyPress={(e) => {
                  const code = e.charCode || e.keyCode;
                  if (code == 13 && this.state.message !== '') {
                    sendMessage({
                      variables: {
                        text: this.messageInput.current.props.value,
                        userId
                      }
                    })
                    this.setMessage('');
                  }
                }}
              />
            </Grid>
          </Grid>
        )}
      </Mutation>
    );
  }
};

export default withStyles(styles)(MessagePanel);
