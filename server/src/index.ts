import { ApolloServer } from 'apollo-server';
import resolvers from './resolver';
import { config } from 'dotenv';
import { MongoClient, Db } from 'mongodb';

async function startAsync() {

    // 환경설정 사용
    config();
    
    const MONGO_DB = process.env.DB_HOST;
    let db: Db;
    
    try {
        if (MONGO_DB) {
            const client = await MongoClient.connect(MONGO_DB, {
                
            });
            db = client.db();
        }

    } catch (error) {
        console.log(`
            Mongo DB Host not found!
            please add DB_HOST environment variable to .env file
    
            exiting...
        `);
        process.exit(1);
    }
    
    const { readFileSync } = require('fs');
    const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8');
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => {
        return { db };
      }
    });
    
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
}

startAsync();