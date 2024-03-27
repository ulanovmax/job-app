import cors from "cors";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers.js";
import typeDefs from "./schemas/index.js";

const PORT = 9000;

const app = express();

// app.post("/login", handleLogin);

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL Server running on http://localhost:${PORT}/graphql`);
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  // authMiddleware,
  expressMiddleware(apolloServer)
);
