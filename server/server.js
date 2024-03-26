import cors from "cors";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { readFile } from "node:fs/promises";
import { resolvers } from "./resolvers.js";

const PORT = 9000;

const app = express();

// app.post("/login", handleLogin);

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL Server running on http://localhost:${PORT}/graphql`);
});

const typeDefs = await readFile("./schemas/schema.graphql", "utf-8");

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
