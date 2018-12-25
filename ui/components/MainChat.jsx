import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AppContext from '../appContext';

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

const MainChat = ({ classes }) =>
  <AppContext.Consumer>
    {({ messages }) => (
        <Paper className={classes.mainChat}>
        {
          messages.map((message, idx) =>
            <Typography
              key={idx}
              gutterBottom
              variant="subtitle2"
              color="textPrimary"
              align="left"
              className={classes.textMessage}
            >
              {`${message.displayName}: ${message.text}`}
            </Typography>
          )
        }
        </Paper>
    )}
  </AppContext.Consumer>

export default withStyles(styles)(MainChat);
