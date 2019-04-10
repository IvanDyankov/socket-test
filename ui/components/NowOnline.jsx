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

const getNewUsersSubscription = gql`
  subscription {
    userAdded {
      id
      displayName
      picture
    }
  }
`;

export default () =>(
  <Query query={getUsersQuery}>
    {({ loading, error, data: { getUsers }, subscribeToMore }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      subscribeToMore({
        document: getNewUsersSubscription,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newUser = subscriptionData.data.userAdded;
          return Object.assign({}, prev, {
            getUsers: [...prev.getUsers, newUser]
          });
        }

      });
      return (
        <List>
          {
            getUsers.map(user => (
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


