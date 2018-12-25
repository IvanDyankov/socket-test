import React from 'react';
import Grid from '@material-ui/core/Grid';
import NowOnline from './NowOnline';
import MainChat from './MainChat';
import MessagePanel from './MessagePanel';
import { withStyles } from '@material-ui/core/styles';
import AppContext from './appContext';

const styles = theme => ({
  root: {
    backgroundColor: 'white'
  }
});

// TODO rename me!
class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  sendMessage = (msg) => {
    this.setState({
      messages: [...this.state.messages, msg]
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <AppContext.Provider
        value={{
          sendMessage: this.sendMessage,
          messages: this.state.messages,
        }}
      >
        <div className={classes.root}>
          <Grid container className={classes.main} justify="space-around" direction="row">
            <Grid item xs={2} >
              <NowOnline />
            </Grid>
            <Grid item xs={9}>
              <Grid container direction="column">
                <MainChat />
                <MessagePanel />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </AppContext.Provider>
    );
  }
};

export default withStyles(styles)(Layout);

