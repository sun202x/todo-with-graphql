import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { PubSub } from 'graphql-subscriptions';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { Db, MongoClient } from 'mongodb';
import { WebSocketServer } from 'ws';
import resolvers from './resolver';

export type gqlContext = {
  db: Db;
  pubsub: PubSub;
};

async function initMongoDB() {
  const MONGO_DB = process.env.DB_HOST;
  let db: Db;

  try {
    if (MONGO_DB) {
      const client = await MongoClient.connect(MONGO_DB, {});
      db = client.db();
      return db;
    }

  } catch (error) {
    console.log(`
      Mongo DB Host not found!
      please add DB_HOST environment variable to .env file

      exiting...
    `);
    process.exit(1);
  }
}

async function startAsync() {
  // 환경변수 사용
  config();

  const { readFileSync } = require('fs');
  const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8');

  const PORT = process.env.PORT;
  const db = await initMongoDB();
  const pubsub = new PubSub();
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // This `app` is the returned value from `express()`.
  const app = express();
  const httpServer = createServer(app);

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ 
    schema,
    // subsction에서 사용하기위한 context 설정
    context: async (ctx, msg, args) => {
      return { pubsub };
    },
  }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/graphql', 
    cors<cors.CorsRequest>(), 
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ db, pubsub })
    })
  );

  // Now that our HTTP server is fully set up, actually listen.
  httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
  });
}

startAsync();