import React from 'react';
import Grid from '@material-ui/core/Grid';
import NowOnline from './NowOnline';
import MainChat from './MainChat';
import MessagePanel from './MessagePanel';
import { withStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';

const styles = theme => ({
  root: {
    backgroundColor: 'white'
  }
});

const addUserMutation = gql`
  mutation addUser($id: ID!, $displayName: String!, $picture: String!) {
    addUser(id: $id, displayName: $displayName, picture: $picture) {
      id
    }
  }
`;

const Layout = ({ classes, selfDisplayName, selfPicture, userId }) =>
  <div className={classes.root}>
    <Grid container className={classes.main} justify="space-around" direction="row">
      <Grid item xs={2} >
        <NowOnline selfDisplayName={selfDisplayName} selfPicture={selfPicture}/>
      </Grid>
      <Grid item xs={9}>
        <Grid container direction="column">
          <MainChat />
          <MessagePanel userId={userId} />
        </Grid>
      </Grid>
    </Grid>
  </div>

export default withStyles(styles)(Layout);
