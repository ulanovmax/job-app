import cors from "cors";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers.js";
import typeDefs from "./schemas/index.js";
import cookieParser from "cookie-parser"
import {authMiddleware, getAuthInfo, handleLogin, handleLogout} from "./auth.js";

const PORT = 9000;

const app = express();

const whitelist = ['http://localhost:5173']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions), cookieParser(), express.json(), authMiddleware);

app.post("/login", handleLogin);
app.post("/logout", handleLogout);
app.get("/auth", getAuthInfo)

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use('/graphql', expressMiddleware(apolloServer));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL Server running on http://localhost:${PORT}/graphql`);
});
