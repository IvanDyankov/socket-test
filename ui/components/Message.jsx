import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';

const Message = ({ id, user: { displayName, picture }, text, timestamp }) =>
  <ListItem button key={id}>
    <ListItemAvatar>
      <Avatar alt="User Avatar" src={picture} />
    </ListItemAvatar>

    <ListItemText
      primary={displayName}
      secondary={
        <Typography component="span" color="textPrimary">
          {text}
        </Typography>
      }
      />
  </ListItem>

export default Message;