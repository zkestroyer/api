import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/studentResolvers.js';

/**
 * Starts the Apollo Server for the Student Management System.
 */
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3003 },
  });

  console.log(`🚀 Server ready at: ${url}`);
  console.log(`Access Apollo Sandbox to run queries and mutations at ${url}`);
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
