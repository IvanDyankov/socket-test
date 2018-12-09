import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  vertical: {
    alignItems: 'center'
  }
});

class MessagePanel extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="row" className={classes.vertical}>
        <Grid item xs={9}>
          <TextField
            autoFocus
            placeholder="Write a Message"
            margin="normal"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={2} >
          <Button color="primary" size="large" fullWidth variant="outlined">Send</Button>
        </Grid>
      </Grid>
    );
  }
};

export default withStyles(styles)(MessagePanel);
