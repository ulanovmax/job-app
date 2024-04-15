import cors from "cors";
import express from "express";
import { readFile } from 'node:fs/promises';

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers.ts";

import cookieParser from "cookie-parser"
import {authMiddleware, getAuthInfo, handleLogin, handleLogout} from "./auth.ts";
import corsOptions from "./cors.ts";
import jwt from "jsonwebtoken";

const PORT = 9000;

const app = express();

app.use(cors(corsOptions), cookieParser(), express.json(), authMiddleware);

app.post("/login", handleLogin);
app.post("/logout", handleLogout);
app.get("/auth", getAuthInfo)

const getContext = ({ req }) => {
  const decoded = jwt.decode( req.cookies["accessToken"]);
  return { context: decoded }
}

const typeDefs = await readFile('./src/schemas/schema.graphql', 'utf8');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// @ts-ignore
await apolloServer.start();

// @ts-ignore
app.use('/graphql', expressMiddleware(apolloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL Server running on http://localhost:${PORT}/graphql`);
});
