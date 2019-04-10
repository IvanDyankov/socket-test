# Easy Chat application


This is an example chat application. It uses:

## Back-end
[Auth0](https://auth0.com/) - User auth system with Google Auth stratrgy enabled
[PassposrtJs](http://www.passportjs.org/) - JS library, which adds authentication middleware to your node server
[ApolloGraphQL](https://www.apollographql.com/docs/apollo-server/) - express Apollo server with websocket subscriptions

## Front-end
[ReactJs](https://reactjs.org/) - a popular front end framework for both client and server side rendering of UIs
[MaterialUI](https://material-ui.com/) - Google's collection of React UI elements - great for rapid prototyping and even production ready UIs
[ApolloClientReact](https://www.apollographql.com/docs/react/) - GQL implementation for the FE + websock subscription

To run:

- setup a new Auth0 account and an application
- navigate to the project and run `npm install`
- set up the following environment variables
```sh
  CHAT_CLIENT_SECRET=<client_secret_auth0>
  CHAT_CLIENT_ID=<client_id_auth0>
  CHAT_CLIENT_DOMAIN=<auth0-app-domain>
```
- build the app: `npm run dev`
- start the app: `npm start`
- go to `localhost:3000`


