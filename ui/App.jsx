import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import Layout from './components/Layout';


// Create an http link:
const httpLink = new HttpLink();

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://${location.hostname}${location.port ? `:${location.port}`: ''}/graphql`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Layout selfDisplayName={user.displayName} selfPicture={user.picture} userId={user.id} />
      </ApolloProvider>
    )
  }
};

const addUserMutation = gql`
  mutation addUser($id: ID!, $displayName: String!, $picture: String!) {
    addUser(id: $id, displayName: $displayName, picture: $picture) {
      id
    }
  }
`;

client.mutate({
  mutation: addUserMutation,
  variables: {
    id: user.id,
    displayName: user.displayName,
    picture: user.picture
  }
}).then(() => ReactDOM.render(<App />, document.getElementById('main')));

export default App;
