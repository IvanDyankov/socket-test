import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class MainChat extends React.Component {

  render() {
    return (
      <Grid container justify="center" direction="row">
        <Grid item xs="9">
          <TextField
            style={{ marginRight: 8 }}
            placeholder="Write a Message"
            margin="normal"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs="3">
          <Button variant="outlined" color="primary">Send</Button>
        </Grid>
      </Grid>
    );
  }
};

export default MainChat;
