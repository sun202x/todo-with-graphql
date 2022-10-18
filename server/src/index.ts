import { ApolloServer } from 'apollo-server';
import resolvers from './resolver';

const { readFileSync } = require('fs');
const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});