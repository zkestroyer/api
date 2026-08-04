import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/studentResolvers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Serve static UI
  app.use(express.static(path.join(__dirname, '../public')));

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server)
  );

  const PORT = 3003;
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  
  console.log(`🚀 GraphQL UI ready at http://localhost:${PORT}`);
  console.log(`🚀 GraphQL API ready at http://localhost:${PORT}/graphql`);
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
