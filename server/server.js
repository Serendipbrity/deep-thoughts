const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import typeDefs/resolvers
const { typeDefs, resolvers } = require('./schemas');

// import connection to database
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

// create a new Apollo server and pass it in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create  anew instance of an Apollo server with the GraphQl shcema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });


  // listen for connection then start server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Use GraphQl at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer(typeDefs, resolvers);