import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  nowOnline: {
    height:'100%'
  }
});

class NowOnline extends React.Component {
  render() {
    return (
      <List>
        <ListItem dense button >
          {/* <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" /> */}
          <ListItemText primary={`Line item`} />
        </ListItem>
        <ListItem dense button >
          {/* <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" /> */}
          <ListItemText primary={`Line item`} />
        </ListItem>
      </List>
    );
  }
};

export default withStyles(styles)(NowOnline);
