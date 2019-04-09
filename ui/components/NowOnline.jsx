import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const getUsersQuery = gql`
  {
    getUsers {
      id,
      displayName,
      picture
    }
  }
`;

export default ({ selfDisplayName, selfPicture }) =>(
  <Query query={getUsersQuery}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      return (
        <List>
          {
            data.getUsers.map(user => (
              <ListItem button key={user.id}>
                <Avatar alt="User Avatar" src={user.picture} />
                <Typography variant="subtitle2" style={{ marginLeft: '10px' }}>
                  {user.displayName}
                </Typography>
              </ListItem>
            ))
          }
      </List>
      );
    }}
  </Query>
);


