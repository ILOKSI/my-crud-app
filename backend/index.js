import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import typeDefs from './graphql/types/index.js';
import resolvers from './graphql/resolvers/resolvers.js';


const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
];


const MONGO_URI = 'mongodb://localhost:27017/mu-crud-app'
mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log(`🚀  Database started ${MONGO_URI}`))
  .catch(err => console.error(err))

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
const HOST = process.argv[2];
const PORT = process.argv[3];
const { url } = await startStandaloneServer(server, {
    listen: { host: HOST,port: PORT },
});
  
console.log(`🚀  Server ready at: ${url}`);