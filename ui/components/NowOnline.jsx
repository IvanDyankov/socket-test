import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import AppContext from '../appContext';

export default () =>
  <AppContext.Consumer>
    {({ onlineUsers }) => (
      <List>
        {
          Object.keys(onlineUsers).map(userId => (
            <ListItem button key={userId}>
              <Avatar alt="User Avatar" src={onlineUsers[userId].picture} />
              <Typography variant="subtitle2" style={{ marginLeft: '10px' }}>
                {onlineUsers[userId].displayName}
              </Typography>
            </ListItem>
          ))
        }
    </List>
    )}
  </AppContext.Consumer>
