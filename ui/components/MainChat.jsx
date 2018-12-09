import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  mainChat: {
    flexGrow: 4,
    height:'100%'
  }
});

class MainChat extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper>
        <Typography gutterBottom variant="subtitle1">
            Standard license
        </Typography>
      </Paper>
    );
  }
};

export default withStyles(styles)(MainChat);
