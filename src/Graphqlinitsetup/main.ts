import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import http from 'http';
import cookieParser from "cookie-parser";
import compression from "compression";
import { User } from "../User";
import JWTService from "../service/Token.service";
import { GraphqlContext } from "../types/interfaces";
import { Twwets } from "../Tweet";
import { LikePosts } from "../likepost";
export async function GraphqlInit() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(compression());

  app.get("/slam", (req, res) =>
    res.status(200).json({ message: "Hello world" })
  );
  const graphqlServer = new ApolloServer<GraphqlContext>({
    typeDefs: `
    ${User.typeDefs}
    ${Twwets.typeDefs}
    ${LikePosts.typeDefs}
    type Query {
      ${User.queries}
      ${Twwets.queries}
      ${LikePosts.queries}
    }
    type Mutation {
      ${User.mutations}
      ${Twwets.mutations}
      ${LikePosts.mutations}
    }
    
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Twwets.resolvers.queries,
        ...LikePosts.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Twwets.resolvers.mutations,
        ...LikePosts.resolvers.mutations,
      },
      ...User.resolvers.extraResolver,
      ...Twwets.resolvers.extraResolver
    }
  })
  await graphqlServer.start();

  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => {
        return {
          user: req.headers.authorization
            ? JWTService.decodeToken(
              req.headers.authorization.split("Bearer ")[1]
            )
            : undefined,
        };
      },
    })
  );
  return app;
}