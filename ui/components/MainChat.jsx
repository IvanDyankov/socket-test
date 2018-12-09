import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  mainChat: {
    height: '85vh',
    minHeight: '400px'
  }
});

class MainChat extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.mainChat}>
        <Typography gutterBottom variant="subtitle2" color="textPrimary" align="left" style={{margin:'10px 30px'}}>
            Standard license
        </Typography>
        <Typography gutterBottom variant="subtitle2" color="textPrimary" align="left" style={{margin:'10px 30px'}}>
            Standard license
        </Typography>
        <Typography gutterBottom variant="subtitle2" color="textPrimary" align="left" style={{margin:'10px 30px'}}>
            Standard license
        </Typography>

      </Paper>
    );
  }
};

export default withStyles(styles)(MainChat);
