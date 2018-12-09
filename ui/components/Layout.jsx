import React from 'react';
import Grid from '@material-ui/core/Grid';
import NowOnline from './NowOnline';
import MainChat from './MainChat';
import MessagePanel from './MessagePanel';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    backgroundColor: 'white'
  }
});

class Layout extends React.Component {

  render() {
    const { classes } = this.props;
    return (
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
    );
  }
};

export default withStyles(styles)(Layout);

