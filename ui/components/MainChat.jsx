import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AppContext from './appContext';

const styles = theme => ({
  mainChat: {
    height: '85vh',
    minHeight: '400px',
    overflowX: 'scroll'
  }
});

class MainChat extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppContext.Consumer>
        {({ messages }) => (
           <Paper className={classes.mainChat}>
            {messages.map((message, idx) => (
              <Typography  key={idx} gutterBottom variant="subtitle2" color="textPrimary" align="left" style={{margin:'10px 30px'}}>
              {message}
              </Typography>
            ))}
           </Paper>
        )}
      </AppContext.Consumer>
    );
  }
};

export default withStyles(styles)(MainChat);
