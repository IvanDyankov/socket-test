import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import AppContext from './appContext';

const styles = () => ({
  vertical: {
    alignItems: 'center'
  }
});

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
    const { classes } = this.props;
    return (
      <AppContext.Consumer>
        {({ sendMessage }) => (
          <Grid container direction="row" className={classes.vertical} spacing={8}>
            <Grid item xs={10}>
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
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                color="primary"
                size='large'
                fullWidth
                variant="outlined"
                onClick={() => {
                  sendMessage(this.messageInput.current.props.value)
                  this.setMessage('');
                }
                }
              >
                Send
              </Button>
            </Grid>
          </Grid>
        )}
      </AppContext.Consumer>

    );
  }
};

export default withStyles(styles)(MessagePanel);
