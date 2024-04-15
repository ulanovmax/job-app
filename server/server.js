import cors from "cors";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers.js";
import typeDefs from "./schemas/index.js";
import cookieParser from "cookie-parser"
import {authMiddleware, getAuthInfo, handleLogin, handleLogout} from "./auth.js";
import corsOptions from "./cors.js";
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

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use('/graphql', expressMiddleware(apolloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL Server running on http://localhost:${PORT}/graphql`);
});
